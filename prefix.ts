export function writePrefix(
  result: string[],
  getPlaydateFunctionDoc: (n: string) => string
) {
  var source_types = [
    "pd_fileplayer",
    "pd_sampleplayer",
    "pd_synth",
    "pd_instrument",
  ].join(" | ");

  var effect_types = [
    "pd_bitcrusher",
    "pd_twopolefilter",
    "pd_onepolefilter",
    "pd_ringmod",
    "pd_overdrive",
    "pd_delayline",
  ].join(" | ");

  [
    "---@meta",
    "",
    "---@type pd_playdate_lib",
    "playdate = playdate",
    "",
    "---@type pd_json_lib",
    "json = json",
    "",
    "---@alias pd_pattern integer[]",
    "",
    "---@type table<string, pd_text_alignment>",
    "kTextAlignment = kTextAlignment",
    "",
    "---@alias pd_font_family table<pd_font_variant, pd_font>",
    "",
    "---@alias pd_source " + source_types,
    "",
    "---@alias pd_effect " + effect_types,
    "",
  ].forEach((l) => result.push(l));

  [
    "pd_UNKNOWN",
    "pd_button",
    "pd_text_alignment",
    "pd_flip",
    "pd_image_flip",
    "pd_color",
    "pd_dither_type",
    "pd_draw_mode",
    "pd_language",
    "pd_filemode",
    "pd_line_cap_style",
    "pd_polygon_fill_rule",
    "pd_stroke_location",
    "pd_font_variant",
    "pd_capitalization",
  ].forEach((c) => result.push(`---@class ${c}`));

  result.push("", "---@class pd_time_table");
  [
    "year",
    "month",
    "day",
    "weekday",
    "hour",
    "minute",
    "second",
    "millisecond",
  ].forEach((f) => result.push(`---@field ${f} number`));

  result.push("", "---@class pd_input_handler");
  [
    "AButtonDown",
    "AButtonHeld",
    "AButtonUp",
    "BButtonDown",
    "BButtonHeld",
    "BButtonUp",
    "downButtonDown",
    "downButtonUp",
    "leftButtonDown",
    "leftButtonUp",
    "rightButtonDown",
    "rightButtonUp",
    "upButtonDown",
    "upButtonUp",
    "cranked",
  ].forEach((n) => {
    const doc = getPlaydateFunctionDoc(n);
    const type =
      n === "cranked"
        ? "fun(change: number, acceleratedChange: number)"
        : "fun()";
    result.push(...doc.split("\n").map((l) => "--- " + l));
    result.push(`---@field ${n} nil | (${type})`);
  });
}
