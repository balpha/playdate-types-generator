import { writeConstantFields } from "./constants";
import { HARDCODED_TYPES } from "./hardcoded_types";
import { inferParameterType } from "./infer_parameter_type";
import { inferReturnType } from "./infer_return_type";
import { writePrefix } from "./prefix";

function parse(s: string, isCallback: boolean, isMethod: boolean) {
  if (isCallback && !/\(/.test(s)) {
    s += "()";
  }
  const m = s.trim().match(/^(?:([\w.]+)([.:]))?(\w+)\(([^)]*)\)$/);
  if (!m) {
    console.log("!!!", s);
    return null;
  }
  let [full, table, dotOrColon, name, parameters] = m;

  if (parameters === "{ row1, row2, row3, row4, row5, row6, row7, row8 }") {
    parameters = "eightRows";
  }
  parameters = parameters.replace(/\.\.\..*/, "...");

  const bi = parameters.indexOf("[");

  const optOrNot =
    bi >= 0
      ? [
          parameters.substring(0, bi),
          parameters.substring(bi).replace(/[[\]]+/g, " "),
        ]
      : [parameters, ""];

  function singleParams(s: string) {
    return s
      .split(",")
      .map((p) => p.trim())
      .filter((_) => _);
  }

  const params = [
    ...singleParams(optOrNot[0]).map((p) => ({
      name: p,
      optional: false,
    })),
    ...singleParams(optOrNot[1]).map((p) => ({
      name: p,
      optional: p !== "...",
    })),
  ];

  return { table, dotOrColon, name, parameters, params, isMethod };
}

interface PdFunction {
  t: string;
  d: string;
  isCallback: boolean;
  isMethod: boolean;
  p: Exclude<ReturnType<typeof parse>, null>[];
}

const funs: PdFunction[] = [
  ...document.querySelectorAll<HTMLElement>(".function, .method, .callback"),
]
  .map((e) => ({
    t: e.querySelector<HTMLElement>(":scope > .title")?.innerText?.trim() ?? "",
    d:
      e.querySelector<HTMLElement>(".content, :scope > p")?.innerText?.trim() ??
      "",
    isCallback: e.classList.contains("callback"),
    isMethod: e.classList.contains("method"),
  }))
  .filter((i) => i.t)
  .map((i) => ({
    ...i,
    isMethod:
      (i.isMethod || (i.isCallback && /\s*[\w.]+:/.test(i.t))) &&
      i.t !== "playdate.keyboard.hide()",
  }))
  .map((i) => ({
    ...i,
    p: i.t
      .split("\n")
      .map((o) => parse(o, i.isCallback, i.isMethod))
      .filter((_) => _),
  }))
  .filter((_) => _.p.length) as PdFunction[];

interface TreeFunction {
  name: string;
  fullname: string;
  parameterSets: { name: string; optional: boolean }[][];
  doc: string;
  docs: string[];
  isMethod: boolean;
  isCallback: boolean;
  dotOrColon: string;
}

interface TreeClass {
  name: string;
  dupe: boolean;
  fullname: string;
  fields: Tree;
}

interface Tree {
  [s: string]: TreeClass | TreeFunction;
}

var tree = {} as Tree;

for (const { t, d, p, isCallback, isMethod } of funs) {
  if (!p[0].table) continue;
  const path = p[0].table.split(".");
  const prev = [] as string[];
  var step = tree;
  while (path.length) {
    step[path[0]] =
      step[path[0]] ??
      ({
        name: path[0],
        dupe: prev.includes(path[0]), //file.file
        fullname: p[0].table,
        fields: {},
      } as TreeClass);
    step = (step[path[0]] as TreeClass).fields;
    prev.push(path.shift() as string);
  }
  for (const overload of p) {
    let existing = step[
      overload.name + "|" + isCallback + "|" + overload.dotOrColon
    ] as TreeFunction | undefined;
    if (!existing) {
      existing = step[
        overload.name + "|" + isCallback + "|" + overload.dotOrColon
      ] = {
        name: overload.name,
        fullname: overload.table + overload.dotOrColon + overload.name,
        parameterSets: [],
        doc: d,
        docs: [d],
        isMethod: isMethod,
        isCallback: isCallback,
        dotOrColon: overload.dotOrColon,
      };
    } else {
      if (!existing.docs.includes(d)) {
        existing.docs.push(d);
        existing.doc = existing.docs
          .map((s, i) => `## Overload ${i + 1} ##\n` + s)
          .join("\n\n");
      }
    }
    existing.parameterSets.push(overload.params);
  }
  // fixme: sprite.update // sprite:update
}

function isFunction(t: TreeClass | TreeFunction): t is TreeFunction {
  return "parameterSets" in t;
}

var result = [] as string[];
var tbd = [...Object.values(tree)] as TreeClass[];
var unknowns = JSON.parse(JSON.stringify(HARDCODED_TYPES));
function add(step: TreeClass | TreeFunction, parentType: string) {
  if (isFunction(step)) {
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

      let returnType: string | null;
      if (
        step.fullname in HARDCODED_TYPES &&
        "__return" in HARDCODED_TYPES[step.fullname]
      ) {
        returnType = HARDCODED_TYPES[step.fullname].__return;
      } else {
        returnType = inferReturnType(step.name, step.doc, parentType);
      }
      const ret = returnType ? `: ${returnType}` : "";
      overloads.push(`fun(${typedParams.join(", ")})${ret}`);
      if (returnType === "pd_UNKNOWN") {
        unknowns[step.fullname] ??= {};
        unknowns[step.fullname].__return = "";
      }
    }
    const allTypes =
      overloads.length > 1
        ? overloads.map((o) => "(" + o + ")").join(" | ")
        : overloads[0];
    //result.push(`---@field ${step.name} fun(${typedParams.join(", ")})${ret}`);
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
      result.push(`---@field ${step.name} pd_${step.name}_lib`);
    }
    tbd.push(step);
  }
  /*if (step.fields) {
		const type = "pd_" + step.name;
        Object.values(step.fields).forEach(f=>add(f, type));
    }*/
}

writePrefix(
  result,
  (name) =>
    ((tree.playdate as TreeClass).fields[name + "|true|."] as TreeFunction).doc
);

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
    (f) => !isFunction(f) || !f.isMethod
  );
  result.push("");
  result.push(
    `---@class ${step.fullname === "table" ? "tablelib" : type + "_lib"}`
  );
  statics.forEach((s) => add(s, type + "_lib"));

  writeConstantFields(result, step.name);

  const methods = Object.values(step.fields).filter(
    (f) => isFunction(f) && f.isMethod
  );
  if (methods.length) {
    result.push("");
    result.push(`---@class ${step.fullname === "table" ? "tablelib" : type}`);
    methods.forEach((s) => add(s, type));
  }
}

//@ts-ignore
copy(result.join("\n"));

//copy(JSON.stringify(unknowns, undefined, 2));
