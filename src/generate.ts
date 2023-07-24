import { writeConstantFields } from "./constants";
import { HARDCODED_TYPES } from "./hardcoded_types";
import { inferParameterType } from "./infer_parameter_type";
import { inferReturnType } from "./infer_return_type";
import { SuccessfulParseResult, isSuccessful, parse } from "./parse";
import { writePrefix } from "./prefix";

interface PdFunction {
  titleText: string;
  documentation: string;
  isCallback: boolean;
  isMethod: boolean;
  isVariable: boolean;
  parseResults: SuccessfulParseResult[];
}

function codeElements() {
  return [...document.querySelectorAll<HTMLElement>("em")].filter(
    (e) => e.childElementCount === 0
  );
}

function wrapCodeInBackticks() {
  codeElements().forEach((e) => (e.innerText = `\`${e.innerText}\``));
}
function removeBackticksAroundCode() {
  codeElements().forEach(
    (e) => (e.innerText = e.innerText.replace(/^`|`$/g, ""))
  );
}

export function generateAnnotation() {
  const funs = [] as PdFunction[];
  const elements = document.querySelectorAll<HTMLElement>(
    ".function, .method, .callback, .variable"
  );
  wrapCodeInBackticks();
  for (let element of elements) {
    const titleText = element
      .querySelector<HTMLElement>(":scope > .title")
      ?.innerText?.trim()
      .replace(
        "playdate.ui.gridview:setNumberOfRows(…​)",
        "playdate.ui.gridview:setNumberOfRows(count1, ...)"
      );

    if (!titleText) {
      continue;
    }

    let documentation =
      element
        .querySelector<HTMLElement>(".content, :scope > p")
        ?.innerText?.trim() ?? "";

    const isCallback = element.classList.contains("callback");
    const isVariable = element.classList.contains("variable");
    const isMethod =
      (element.classList.contains("method") ||
        /\s*[\w.]+:/.test(titleText) ||
        ((isVariable || isCallback) &&
          /^playdate\.(frame)?timer\./i.test(titleText)) ||
        titleText.startsWith("playdate.crankIndicator")) &&
      !["playdate.keyboard.hide()"].includes(titleText);

    const parseResults = titleText
      .split("\n")
      .map((overloadLine) =>
        parse(overloadLine, isCallback, isMethod, isVariable)
      )
      .filter(isSuccessful);

    let otherFun: PdFunction | null = null;

    if (
      titleText === "playdate.sound.sample.new(path)" &&
      documentation.includes("playdate.sound.sample.new(seconds, [format])")
    ) {
      // the docs are incorrectly formatted here
      const bothDocs = documentation
        .split("playdate.sound.sample.new(seconds, [format])")
        .map((s) => s.trim());
      documentation = bothDocs[0];
      const otherDocumentation = bothDocs[1];
      const otherTitleText = "playdate.sound.sample.new(seconds, [format])";
      const otherParseResult = parse(
        otherTitleText,
        isCallback,
        isMethod,
        isVariable
      );

      if (isSuccessful(otherParseResult)) {
        otherFun = {
          titleText: otherTitleText,
          documentation: otherDocumentation,
          isCallback,
          isMethod,
          isVariable,
          parseResults: [otherParseResult],
        };
      }
    }

    if (parseResults.length) {
      funs.push({
        titleText,
        documentation,
        isCallback,
        isMethod,
        isVariable,
        parseResults,
      });
    }
    if (otherFun) {
      funs.push(otherFun);
    }
  }

  removeBackticksAroundCode();

  ["x", "y", "id"].forEach((n) => {
    const line = "playdate.pathfinder.node." + n;
    funs.push({
      titleText: line,
      documentation:
        "You can directly read or write x, y and id values on a playdate.pathfinder.node.",
      isCallback: false,
      isMethod: true,
      isVariable: true,
      parseResults: [parse(line, false, true, true) as SuccessfulParseResult],
    });
  });

  interface TreeFunctionOrVariable {
    name: string;
    fullname: string;
    parameterSets: { name: string; optional: boolean }[][];
    doc: string;
    docs: string[];
    isMethod: boolean;
    isCallback: boolean;
    isVariable: boolean;
    dotOrColon: string;
  }

  interface TreeClass {
    name: string;
    dupe: boolean;
    fullname: string;
    fields: Tree;
  }

  interface Tree {
    [s: string]: TreeClass | TreeFunctionOrVariable;
  }

  var tree = {} as Tree;

  for (const {
    titleText,
    documentation,
    parseResults,
    isCallback,
    isMethod,
    isVariable,
  } of funs) {
    if (!parseResults[0].table) continue;
    const path = parseResults[0].table.split(".");
    const prev = [] as string[];
    var step = tree;
    while (path.length) {
      step[path[0]] =
        step[path[0]] ??
        ({
          name: path[0],
          dupe: prev.includes(path[0]), //file.file
          fullname: parseResults[0].table,
          fields: {},
        } as TreeClass);
      step = (step[path[0]] as TreeClass).fields;
      prev.push(path.shift() as string);
    }
    for (const overload of parseResults) {
      const stepKey =
        overload.name +
        "|" +
        isCallback +
        "|" +
        (isVariable ? "*" : overload.dotOrColon);
      let existing = step[stepKey] as TreeFunctionOrVariable | undefined;
      if (!existing) {
        existing = step[stepKey] = {
          name: overload.name,
          fullname: overload.table + overload.dotOrColon + overload.name,
          parameterSets: [],
          doc: documentation,
          docs: [documentation],
          isMethod: isMethod,
          isCallback: isCallback,
          isVariable: isVariable,
          dotOrColon: overload.dotOrColon,
        };
      } else {
        if (!existing.docs.includes(documentation)) {
          existing.docs.push(documentation);
          existing.doc = existing.docs
            .map((s, i) => `### Overload ${i + 1} ###\n` + s)
            .join("\n\n");
        }
      }
      existing.parameterSets.push(overload.params);
    }
  }

  function isFunctionOrVariable(
    t: TreeClass | TreeFunctionOrVariable
  ): t is TreeFunctionOrVariable {
    return "parameterSets" in t;
  }

  var result = [] as string[];
  var tbd = [...Object.values(tree)] as TreeClass[];
  var unknowns = JSON.parse(JSON.stringify(HARDCODED_TYPES));
  function add(step: TreeClass | TreeFunctionOrVariable, parentType: string) {
    if (isFunctionOrVariable(step)) {
      const overloads = [];
      let isCallback = false;
      for (const params of step.parameterSets) {
        const typedParams = [];
        if (step.dotOrColon === ":") {
          typedParams.push(`self: ${parentType}`);
        }
        if (step.isCallback) {
          isCallback = true;
        }
        params.forEach((pDef) => {
          const pName = pDef.name;

          let pType: string | null;

          if (
            step.fullname in HARDCODED_TYPES &&
            pName in HARDCODED_TYPES[step.fullname]
          ) {
            pType = HARDCODED_TYPES[step.fullname][pName];
          } else {
            pType = inferParameterType(pName, step.name, step.doc, parentType);
          }

          const question = pDef.optional ? "?" : "";
          typedParams.push(
            ["..."].includes(pName) ? pName : `${pName}${question}: ${pType}`
          );
          if (pType === "pd_UNKNOWN" && !["..."].includes(pName)) {
            unknowns[step.fullname] ??= {};
            unknowns[step.fullname][pName] = "";
          }
        });

        const hardcodingKey: string = step.isVariable ? "__value" : "__return";

        let returnType: string | null;
        if (
          step.fullname in HARDCODED_TYPES &&
          hardcodingKey in HARDCODED_TYPES[step.fullname]
        ) {
          returnType = HARDCODED_TYPES[step.fullname][hardcodingKey];
        } else {
          returnType = inferReturnType(step.name, step.doc, parentType);
          if (!returnType && step.isVariable) {
            if (/If (true|false)\b/.test(step.doc)) {
              returnType = "boolean";
            } else if (/^(The n|N)umber of /.test(step.doc)) {
              returnType = "number";
            } else {
              returnType = inferParameterType(
                step.name,
                step.name,
                step.doc,
                parentType
              );
            }
          }
        }
        const ret = returnType ? `: ${returnType}` : "";
        overloads.push(
          step.isVariable ? returnType : `fun(${typedParams.join(", ")})${ret}`
        );
        if (step.fullname === "playdate.graphics.sprite:collisionResponse") {
          // this may also be set to the value directly, instead of setting a callback
          overloads.push("pd_collision_type");
        }
        if (returnType === "pd_UNKNOWN") {
          unknowns[step.fullname] ??= {};
          unknowns[step.fullname][hardcodingKey] = "";
        }
      }
      const allTypes =
        overloads.length > 1
          ? overloads.map((o) => "(" + o + ")").join(" | ")
          : overloads[0];

      if (step.doc) {
        result.push(...step.doc.split("\n").map((l) => "--- " + l));
      }
      if (isCallback) {
        result.push(`---@field ${step.name} nil | (${allTypes})`);
      } else {
        result.push(`---@field ${step.name} ${allTypes}`);
      }
    } else {
      if (step.dupe) {
        result.push(`---@field ${step.name} pd_${step.name}_${step.name}_lib`);
      } else {
        const suffix = step.name === "crankIndicator" ? "" : "_lib";
        result.push(`---@field ${step.name} pd_${step.name}${suffix}`);
      }
      tbd.push(step);
    }
  }

  writePrefix(
    result,
    (name) =>
      (
        (tree.playdate as TreeClass).fields[
          name + "|true|."
        ] as TreeFunctionOrVariable
      ).doc
  );

  function isInstanceField(
    f: TreeClass | TreeFunctionOrVariable,
    parentType: string
  ) {
    if (!isFunctionOrVariable(f)) {
      return false;
    }
    if (f.isMethod) {
      return true;
    }
    if (f.isVariable) {
      return parentType !== "pd_playdate" && parentType !== "pd_keyboard";
    }
    return false;
  }

  while (true) {
    const step = tbd.shift() as TreeClass;
    if (!step) {
      break;
    }
    const type =
      step.fullname === "table"
        ? "table"
        : step.dupe
        ? `pd_${step.name}_${step.name}`
        : `pd_${step.name}`;
    const statics = Object.values(step.fields).filter(
      (f) => !isInstanceField(f, type)
    );

    if (type !== "pd_crankIndicator") {
      result.push("");
      result.push(
        `---@class ${step.fullname === "table" ? "tablelib" : type + "_lib"}`
      );
      statics.forEach((s) => add(s, type + "_lib"));

      writeConstantFields(result, step.name);
    }

    const instanceFields = Object.values(step.fields).filter((f) =>
      isInstanceField(f, type)
    );
    if (instanceFields.length) {
      const ext = ["pd_lfo", "pd_envelope", "pd_controlsignal"].includes(type)
        ? " : pd_signal"
        : "";
      result.push("");
      result.push(
        `---@class ${step.fullname === "table" ? "tablelib" : type}${ext}`
      );
      instanceFields.forEach((s) => add(s, type));
    }
  }

  return {
    annotationFile: result.join("\n"),
    unknownsAndHardcodedJSON: JSON.stringify(unknowns, undefined, 2),
    unknownsAndHardcoded: unknowns,
  };
}
//@ts-ignore
copy(result.join("\n"));

//copy(JSON.stringify(unknowns, undefined, 2));
