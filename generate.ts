import { HARDCODED_TYPES } from "./hardcoded_types";

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

var result = [];
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
        let pType: string | null = "pd_UNKNOWN";
        if (
          parentType === "pd_easingFunctions_lib" &&
          ["t", "b", "c", "d", "a", "p", "s"].includes(pName)
        ) {
          pType = "number";
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
          ].includes(pName) ||
          /^([sd][xy]|[xywh]\d|row\d|.*Count|(min|max)|\w+(Width|Height|Angle|X|Y|Value))$/.test(
            pName
          )
        ) {
          pType = "number";
        } else if (
          [
            "path",
            "text",
            "title",
            "filename",
            "string",
            "truncationString",
          ].includes(pName)
        ) {
          pType = "string";
        } else if (["disable", "flag", "pretty-print"].includes(pName)) {
          pType = "boolean";
        } else if (/callback$/i.test(pName)) {
          pType = "fun()";
        } else if (["color", "bgcolor", "backgroundColor"].includes(pName)) {
          pType = "pd_color";
        } else if (/rect$/i.test(pName)) {
          pType = "pd_rect";
        } else if (/^image\d?$/.test(pName)) {
          pType = "pd_image";
        } else if (["button"].includes(pName)) {
          pType = "pd_button";
        } else if (["table"].includes(pName)) {
          pType = "table";
        } else if (["imageTable"].includes(pName)) {
          pType = "pd_imagetable";
        } else if (["element"].includes(pName)) {
          pType = "any";
        } else if (["fontFamily"].includes(pName)) {
          pType = "pd_font_family";
        } else if (["pattern"].includes(pName)) {
          pType = "pd_pattern";
        } else if (["language"].includes(pName)) {
          pType = "pd_language";
        } else if (["alignment"].includes(pName)) {
          pType = "pd_text_alignment";
        } else if (["file"].includes(pName)) {
          pType = "pd_file_file";
        } else if (["easingFunction"].includes(pName)) {
          pType = "(fun(number, number, number, number): number)";
        } else if (["font"].includes(pName)) {
          pType = "pd_font";
        } else if (["variant"].includes(pName)) {
          pType = "pd_font_variant";
        } else if (["ditherType"].includes(pName)) {
          pType = "pd_dither_type";
        } else if (/^flip\d?$/.test(pName)) {
          pType = parentType === "pd_rect" ? "pd_flip" : "pd_image_flip";
        } else if (/sprite$/i.test(pName)) {
          pType = "pd_sprite";
        } else if (["eightRows"].includes(pName)) {
          pType = "number[]";
        } else if (["character"].includes(pName)) {
          pType = "string|number";
        } else if (["effect"].includes(pName)) {
          pType = "pd_effect";
        } else if (["node"].includes(pName)) {
          pType = "pd_node";
        } else if (pName === "mode" && step.name === "setImageDrawMode") {
          pType = "pd_draw_mode";
        } else if (
          ["r", "r2"].includes(pName) &&
          (/rect/i.test(step.name) || parentType === "pd_rect")
        ) {
          pType = "pd_rect";
        } else if (
          pName === "point" ||
          (pName === "p" && /point p/i.test(step.doc))
        ) {
          pType = "pd_point";
        } else if (pName === "v" && parentType === "pd_vector2D") {
          pType = "pd_vector2D";
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
          ].includes(pName)
        ) {
          pType = "number";
        }
        if (
          new RegExp("if " + pName + " is (true|false)", "i").test(step.doc)
        ) {
          pType = "boolean";
        }

        if (
          step.fullname in HARDCODED_TYPES &&
          pName in HARDCODED_TYPES[step.fullname]
        ) {
          pType = HARDCODED_TYPES[step.fullname][pName]; //even if null!
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
      let returnType =
        step.name === "new" ? parentType.replace(/_lib$/, "") : null;
      function attempt(
        s: string,
        re: RegExp,
        f: (...args: string[]) => string
      ) {
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
        step.doc,
        /as a list: \(seconds, milliseconds\)/,
        () => "(number, number)"
      );
      attempt(step.doc, /(returns|gets) (the|a) number/i, () => "number"); // couild be a list!
      attempt(step.doc, /returns? (?:true|false|a bool)/i, () => "boolean");
      attempt(
        step.name,
        /^get.*(?:height|width|tracking|leading|rate|volume|offset,length)/i,
        () =>
          step.name === "getTextSizeForMaxWidth" ? "(number, number)" : "number"
      );
      attempt(step.name, /^get.*rect/i, () => "pd_rect");
      attempt(step.name, /^get.*image/i, () => "pd_image");
      attempt(step.name, /^get.*color/i, () => "pd_color");
      attempt(step.name, /^(?:is|has|did)[A-Z]/i, () => "boolean");
      attempt(step.doc, /^returns a new /i, () =>
        parentType.replace(/_lib$/, "")
      );
      attempt(parentType, /^pd_easingFunctions_lib$/, () => "number");
      attempt(step.doc, /^returns a table/i, () => "table");
      attempt(step.doc, /^returns a string/i, () => "string");
      attempt(
        step.doc,
        /^returns a (new )?(playdate\.geometry\.)?vector/i,
        () => "pd_vector2D"
      );
      attempt(
        step.doc,
        /^returns a playdate\.geometry\.point/i,
        () => "pd_point"
      );
      attempt(step.doc, /^returns the length/i, () => "number");
      attempt(
        step.doc,
        /^returns[^.]* \(width, height\)/i,
        () => "(number, number)"
      );
      if (parentType === "pd_affineTransform") {
        attempt(step.name, /^[a-z]+edBy$/, () => parentType); // "translatedBy" etc.
      }

      attempt(step.doc, /return|^get/i, () => "pd_UNKNOWN");
      if (
        step.fullname in HARDCODED_TYPES &&
        "__return" in HARDCODED_TYPES[step.fullname]
      ) {
        returnType = HARDCODED_TYPES[step.fullname].__return; //even if null!
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
  const doc = (
    (tree.playdate as TreeClass).fields[n + "|true|."] as TreeFunction
  ).doc;
  const type =
    n === "cranked"
      ? "fun(change: number, acceleratedChange: number)"
      : "fun()";
  result.push(...doc.split("\n").map((l) => "--- " + l));
  result.push(`---@field ${n} nil | (${type})`);
});

function constants(prefix: string, type: string, values: string[]) {
  values.forEach((v) => result.push(`---@field ${prefix}${v} ${type}`));
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
    (f) => !isFunction(f) || !f.isMethod
  );
  result.push("");
  result.push(
    `---@class ${step.fullname === "table" ? "tablelib" : type + "_lib"}`
  );
  statics.forEach((s) => add(s, type + "_lib"));
  if (step.name === "playdate") {
    constants("kButton", "pd_button", [
      "A",
      "B",
      "Up",
      "Down",
      "Left",
      "Right",
    ]);
  } else if (step.name === "graphics") {
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
  } else if (step.name === "image") {
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
  } else if (step.name === "font") {
    constants("kLanguage", "pd_language", ["English", "Japanese"]);
  } else if (step.name === "file") {
    constants("kFile", "pd_filemode", ["Read", "Write", "Append"]);
  } else if (step.name === "keyboard") {
    constants("kCapitalization", "pd_capitalization", [
      "Normal,",
      "Words",
      "Sentences",
    ]);
  }

  if (["geometry", "graphics"].includes(step.name)) {
    const imageOrNot = step.name === "graphics" ? "Image" : "";
    const fliptype = step.name === "graphics" ? "pd_image_flip" : "pd_flip";
    constants("k" + imageOrNot, fliptype, [
      "Unflipped",
      "FlippedX",
      "FlippedY",
      "FlippedXY",
    ]);
  }

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
