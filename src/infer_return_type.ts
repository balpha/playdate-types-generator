export function inferReturnType(
  functionName: string,
  documentation: string,
  parentType: string
) {
  let returnType =
    functionName === "new" ? parentType.replace(/_lib$/, "") : null;
  function attempt(s: string, re: RegExp, f: (...args: string[]) => string) {
    if (returnType) {
      return;
    }
    const m = (s ?? "").match(re);
    if (!m) {
      return;
    }
    returnType = f.apply(null, m);
  }
  attempt(
    documentation,
    /as a list: \(seconds, milliseconds\)/,
    () => "(number, number)"
  );
  attempt(documentation, /(returns|gets) (the|a) number/i, () => "number"); // couild be a list!
  attempt(documentation, /returns? (?:true|false|a bool)/i, () => "boolean");
  attempt(
    functionName,
    /^get.*(?:height|width|tracking|leading|rate|volume|offset,length)/i,
    () =>
      functionName === "getTextSizeForMaxWidth" ? "(number, number)" : "number"
  );
  attempt(functionName, /^get.*rect/i, () => "pd_rect");
  attempt(functionName, /^get.*image/i, () => "pd_image");
  attempt(functionName, /^get.*color/i, () => "pd_color");
  attempt(functionName, /^(?:is|has|did)[A-Z]/i, () => "boolean");
  attempt(documentation, /^returns a new /i, () =>
    parentType.replace(/_lib$/, "")
  );
  attempt(parentType, /^pd_easingFunctions_lib$/, () => "number");
  attempt(documentation, /^returns a table/i, () => "table");
  attempt(documentation, /^returns a string/i, () => "string");
  attempt(
    documentation,
    /^returns a (new )?(playdate\.geometry\.)?vector/i,
    () => "pd_vector2D"
  );
  attempt(
    documentation,
    /^returns a playdate\.geometry\.point/i,
    () => "pd_point"
  );
  attempt(documentation, /^returns the length/i, () => "number");
  attempt(
    documentation,
    /^returns[^.]* \(width, height\)/i,
    () => "(number, number)"
  );
  if (parentType === "pd_affineTransform") {
    attempt(functionName, /^[a-z]+edBy$/, () => parentType); // "translatedBy" etc.
  }

  attempt(documentation, /return|^get/i, () => "pd_UNKNOWN");
  return returnType;
}
