import { PdFunction } from "./collect_dom_data";
import { isOperator } from "./parse";

export interface TreeFunctionOrVariable {
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

export interface TreeClass {
  name: string;
  dupe: boolean;
  fullname: string;
  fields: Tree;
}

export interface TreeOperator {
  name: string;
  doc: string;
  parameterTypes: string[];
  returnType: string;
}

export interface Tree {
  [s: string]: TreeClass | TreeFunctionOrVariable | TreeOperator;
}

export function isFunctionOrVariable(
  t: TreeClass | TreeFunctionOrVariable | TreeOperator
): t is TreeFunctionOrVariable {
  return "parameterSets" in t;
}

export function isTreeOperator(
  t: TreeClass | TreeFunctionOrVariable | TreeOperator
): t is TreeOperator {
  return "parameterTypes" in t;
}

export function buildTree(funs: PdFunction[]) {
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
      if (isOperator(overload)) {
        // these only exist once -- no actual overloads
        step[stepKey + "|" + overload.parameterTypes.join("/")] = {
          name: overload.name,
          doc: documentation,
          parameterTypes: overload.parameterTypes,
          returnType: overload.returnType,
        };
        continue;
      }
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
        if (!existing.docs.map(clean).includes(clean(documentation))) {
          existing.docs.push(documentation);
          existing.doc = existing.docs
            .map((s, i) => `### Overload ${i + 1} ###\n` + s)
            .join("\n\n");
        }
      }
      existing.parameterSets.push(overload.params);
    }
  }
  return tree;
}

const clean = (s: string) => s.replace(/\s+Equivalent to.*in the C API\.$/, "");
