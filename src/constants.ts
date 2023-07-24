export function writeConstantFields(result: string[], name: string) {
  function constants(prefix: string, type: string, values: string[]) {
    values.forEach((v) => result.push(`---@field ${prefix}${v} ${type}`));
  }

  if (name === "playdate") {
    constants("kButton", "pd_button", [
      "A",
      "B",
      "Up",
      "Down",
      "Left",
      "Right",
    ]);
  } else if (name === "graphics") {
    constants("kColor", "pd_color", ["Black", "White", "Clear", "XOR"]);
    constants("kDrawMode", "pd_draw_mode", [
      "Copy",
      "WhiteTransparent",
      "BlackTransparent",
      "FillWhite",
      "FillBlack",
      "XOR",
      "NXOR",
      "Inverted",
    ]);
    constants("kLineCapStyle", "pd_line_cap_style", [
      "Butt",
      "Round",
      "Square",
    ]);
    constants("kPolygonFill", "pd_polygon_fill_rule", ["NonZero", "EvenOdd"]);
    constants("kStroke", "pd_stroke_location", [
      "Centered",
      "Outside",
      "Inside",
    ]);
    constants("kVariant", "pd_font_variant", ["Normal", "Bold", "Italic"]);
  } else if (name === "image") {
    constants("kDitherType", "pd_dither_type", [
      "None",
      "DiagonalLine",
      "VerticalLine",
      "HorizontalLine",
      "Screen",
      "Bayer2x2",
      "Bayer4x4",
      "Bayer8x8",
      "FloydSteinberg",
      "Burkes",
      "Atkinson",
    ]);
  } else if (name === "font") {
    constants("kLanguage", "pd_language", ["English", "Japanese"]);
  } else if (name === "file") {
    constants("kFile", "pd_filemode", ["Read", "Write", "Append"]);
  } else if (name === "keyboard") {
    constants("kCapitalization", "pd_capitalization", [
      "Normal,",
      "Words",
      "Sentences",
    ]);
  }

  if (["geometry", "graphics"].includes(name)) {
    const imageOrNot = name === "graphics" ? "Image" : "";
    const fliptype = name === "graphics" ? "pd_image_flip" : "pd_flip";
    constants("k" + imageOrNot, fliptype, [
      "Unflipped",
      "FlippedX",
      "FlippedY",
      "FlippedXY",
    ]);
  }
}
