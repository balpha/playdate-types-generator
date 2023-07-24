import {
  TreeClass,
  TreeFunctionOrVariable,
  buildTree,
  isFunctionOrVariable,
} from "./build_tree";
import { collectDataFromDom } from "./collect_dom_data";
import { writeConstantFields } from "./constants";
import { HARDCODED_TYPES } from "./hardcoded_types";
import { inferParameterType } from "./infer_parameter_type";
import { inferReturnType } from "./infer_return_type";
import { writePrefix } from "./prefix";

export function generateAnnotation() {
  const funs = collectDataFromDom();
  const tree = buildTree(funs);

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
