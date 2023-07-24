export interface SuccessfulParseResult {
  success: true;
  table: string;
  dotOrColon: string;
  name: string;
  parameters: string;
  params: {
    name: string;
    optional: boolean;
  }[];
  isMethod: boolean;
}
export interface UnsuccessfulParseResult {
  success: false;
}
export type ParseResult = SuccessfulParseResult | UnsuccessfulParseResult;

export function isSuccessful(r: ParseResult): r is SuccessfulParseResult {
  return r.success;
}

export function parse(
  s: string,
  isCallback: boolean,
  isMethod: boolean
): ParseResult {
  if (isCallback && !/\(/.test(s)) {
    // a couple of the callbacks don't have the parens in the documentation
    s += "()";
  }
  const match = s.trim().match(/^(?:([\w.]+)([.:]))?(\w+)\(([^)]*)\)$/);
  if (!match) {
    console.log("!!!", s);
    return { success: false };
  }
  let [full, table, dotOrColon, name, parameters] = match;

  if (parameters === "{ row1, row2, row3, row4, row5, row6, row7, row8 }") {
    parameters = "eightRows";
  }

  // Once we find "...", we just say the rest of the function is variadic from this point.
  // Interpreting something like "foo(x1, x2, ..., xn)" is probably a waste of effort.
  parameters = parameters.replace(/\.\.\..*/, "...");

  // we don't really have to look at stuff like nested brackets -- as soon as we find
  // an opening square bracket, everything after that is optional.
  const bracketIndex = parameters.indexOf("[");

  const optOrNot =
    bracketIndex < 0
      ? [parameters, ""]
      : [
          parameters.substring(0, bracketIndex),
          parameters.substring(bracketIndex).replace(/[[\]]+/g, " "),
        ];

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

  return {
    success: true,
    table,
    dotOrColon,
    name,
    parameters,
    params,
    isMethod,
  };
}
