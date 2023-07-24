export function inferParameterType(
  parameterName: string,
  functionName: string,
  documentation: string,
  parentType: string
) {
  let inferredType = "pd_UNKNOWN";
  if (
    parentType === "pd_easingFunctions_lib" &&
    ["t", "b", "c", "d", "a", "p", "s"].includes(parameterName)
  ) {
    inferredType = "number";
  } else if (
    [
      "x",
      "y",
      "width",
      "height",
      "scale",
      "yscale",
      "radius",
      "seconds",
      "milliseconds",
      "rate",
      "yScale",
      "delay",
      "length",
      "leadingAdjustment",
      "count",
      "ms",
      "alpha",
      "duration",
      "angle",
      "pixels",
      "w",
      "h",
      "row",
      "column",
      "left",
      "right",
      "top",
      "bottom",
    ].includes(parameterName) ||
    /^([sd][xy]|[xywh]\d|row\d|.*Count|(min|max)|\w+(Width|Height|Angle|X|Y|Value))$/.test(
      parameterName
    )
  ) {
    inferredType = "number";
  } else if (
    [
      "path",
      "text",
      "title",
      "filename",
      "string",
      "truncationString",
    ].includes(parameterName)
  ) {
    inferredType = "string";
  } else if (["disable", "flag", "pretty-print"].includes(parameterName)) {
    inferredType = "boolean";
  } else if (["color", "bgcolor", "backgroundColor"].includes(parameterName)) {
    inferredType = "pd_color";
  } else if (/rect$/i.test(parameterName)) {
    inferredType = "pd_rect";
  } else if (/^(background)?image\d?$/i.test(parameterName)) {
    inferredType = "pd_image";
  } else if (["button"].includes(parameterName)) {
    inferredType = "pd_button";
  } else if (["imageTable"].includes(parameterName)) {
    inferredType = "pd_imagetable";
  } else if (["element"].includes(parameterName)) {
    inferredType = "any";
  } else if (["fontFamily"].includes(parameterName)) {
    inferredType = "pd_font_family";
  } else if (["pattern"].includes(parameterName)) {
    inferredType = "pd_pattern";
  } else if (["language"].includes(parameterName)) {
    inferredType = "pd_language";
  } else if (["alignment"].includes(parameterName)) {
    inferredType = "pd_text_alignment";
  } else if (["signal"].includes(parameterName)) {
    inferredType = "pd_signal";
  } else if (["track"].includes(parameterName)) {
    inferredType = "pd_track";
  } else if (["file"].includes(parameterName)) {
    inferredType = "pd_file_file";
  } else if (/easingfunction$/i.test(parameterName)) {
    inferredType = "(fun(number, number, number, number): number)";
  } else if (["font"].includes(parameterName)) {
    inferredType = "pd_font";
  } else if (["variant"].includes(parameterName)) {
    inferredType = "pd_font_variant";
  } else if (["ditherType"].includes(parameterName)) {
    inferredType = "pd_dither_type";
  } else if (/^flip\d?$/.test(parameterName)) {
    inferredType = parentType === "pd_rect" ? "pd_flip" : "pd_image_flip";
  } else if (/sprite$/i.test(parameterName)) {
    inferredType = "pd_sprite";
  } else if (["eightRows"].includes(parameterName)) {
    inferredType = "number[]";
  } else if (["character"].includes(parameterName)) {
    inferredType = "string|number";
  } else if (["effect"].includes(parameterName)) {
    inferredType = "pd_effect";
  } else if (["node"].includes(parameterName)) {
    inferredType = "pd_node";
  } else if (parameterName === "mode" && functionName === "setImageDrawMode") {
    inferredType = "pd_draw_mode";
  } else if (
    ["r", "r2"].includes(parameterName) &&
    (/rect/i.test(functionName) || parentType === "pd_rect")
  ) {
    inferredType = "pd_rect";
  } else if (
    parameterName === "point" ||
    (parameterName === "p" && /point `?p/i.test(documentation))
  ) {
    inferredType = "pd_point";
  } else if (parameterName === "v" && parentType === "pd_vector2D") {
    inferredType = "pd_vector2D";
  } else if (
    parentType === "pd_synth" &&
    [
      "pitch",
      "volume",
      "when",
      "attack",
      "decay",
      "sustain",
      "release",
      "time",
      "amount",
      "left",
      "right",
    ].includes(parameterName)
  ) {
    inferredType = "number";
  }
  if (
    new RegExp("if `?" + parameterName + "`? is `?(true|false)`?", "i").test(
      documentation
    )
  ) {
    inferredType = "boolean";
  }
  return inferredType;
}
