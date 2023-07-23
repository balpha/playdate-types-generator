var HARDCODED_TYPES = {
  "playdate.getSystemMenu": {
    __return: "pd_menu",
  },
  "playdate.graphics.lockFocus": {
    __return: null,
  },
  "table.indexOfElement": {
    __return: "number?",
  },
  "table.getsize": {
    __return: "(number, number)",
  },
  "table.shallowcopy": {
    source: "table",
    destination: "table",
    __return: "table",
  },
  "table.deepcopy": {
    source: "table",
    __return: "table",
  },
  "playdate.getTime": {
    __return: "pd_time_table",
  },
  "playdate.getGMTTime": {
    __return: "pd_time_table",
  },
  "playdate.epochFromTime": {
    time: "pd_time_table",
  },
  "playdate.epochFromGMTTime": {
    time: "pd_time_table",
  },
  "playdate.timeFromEpoch": {
    __return: "pd_time_table",
  },
  "playdate.GMTTimeFromEpoch": {
    __return: "pd_time_table",
  },
  "table.create": {
    __return: "table",
  },
  "playdate.apiVersion": {
    __return: "(number, number)",
  },
  "playdate.setMenuImage": {
    xOffset: "number",
  },
  "playdate.getSystemLanguage": {
    __return: "pd_language",
  },
  "playdate.readAccelerometer": {
    __return: "(number, number, number)",
  },
  "playdate.getButtonState": {
    __return: "(integer, integer, integer)",
  },
  "playdate.getCrankPosition": {
    __return: "number",
  },
  "playdate.getCrankChange": {
    __return: "(number, number)",
  },
  "playdate.getCrankTicks": {
    ticksPerRevolution: "number",
  },
  "playdate.cranked": {
    change: "number",
    acceleratedChange: "number",
  },
  "playdate.getFPS": {
    __return: "number",
  },
  "playdate.getBatteryPercentage": {
    __return: "number",
  },
  "playdate.getBatteryVoltage": {
    __return: "number",
  },
  "playdate.setDebugDrawColor": {
    r: "number",
    g: "number",
    b: "number",
    a: "number",
  },
  "playdate.keyPressed": {
    key: "string",
  },
  "playdate.keyReleased": {
    key: "string",
  },
  "playdate.menu:addCheckmarkMenuItem": {
    __return: "pd_item",
  },
  "playdate.menu:addOptionsMenuItem": {
    options: "string[]",
    initalValue: "string",
    __return: "pd_item",
  },
  "playdate.menu:getMenuItems": {
    __return: "pd_item[]",
  },
  "playdate.menu:removeMenuItem": {
    menuItem: "pd_item",
  },
  "playdate.menu.item:setValue": {
    newValue: "integer|boolean|string",
  },
  "playdate.menu.item:getValue": {
    __return: "integer|boolean|string",
  },
  "playdate.inputHandlers.push": {
    handler: "pd_input_handler",
    masksPreviousHandlers: "boolean",
  },
  "playdate.display.getScale": {
    __return: "number",
  },
  "playdate.display.getMosaic": {
    __return: "(number, number)",
  },
  "playdate.display.getOffset": {
    __return: "(number, number)",
  },
  "playdate.file.open": {
    mode: "pd_filemode",
    __return: "pd_file",
  },
  "playdate.file.listFiles": {
    showhidden: "boolean",
    __return: "string[]",
  },
  "playdate.file.getSize": {
    __return: "number",
  },
  "playdate.file.getType": {
    __return: "",
  },
  "playdate.file.modtime": {
    __return: "",
  },
  "playdate.file.rename": {
    newPath: "string",
  },
  "playdate.file.load": {
    env: "table",
    __return: "fun()",
  },
  "playdate.file.run": {
    env: "table",
    __return: null,
  },
  "playdate.geometry.squaredDistanceToPoint": {
    __return: "number",
  },
  "playdate.geometry.distanceToPoint": {
    __return: "number",
  },
  "playdate.graphics.setLineCapStyle": {
    style: "pd_line_cap_style",
  },
  "playdate.graphics.drawArc": {
    arc: "pd_arc",
  },
  "playdate.graphics.drawCircleAtPoint": {
    p: "pd_point",
  },
  "playdate.graphics.fillCircleAtPoint": {
    p: "pd_point",
  },
  "playdate.graphics.drawPolygon": {
    p: "pd_polygon",
  },
  "playdate.graphics.fillPolygon": {
    p: "pd_polygon",
  },
  "playdate.graphics.setPolygonFillRule": {
    rule: "pd_polygon_fill_rule",
  },
  "playdate.graphics.perlin": {
    z: "number",
    repeat: "number",
    octaves: "number",
    persistence: "number",
    __return: "number",
  },
  "playdate.graphics.perlinArray": {
    z: "number",
    dz: "number",
    repeat: "number",
    octaves: "number",
    persistence: "number",
    __return: "number[]",
  },
  "playdate.graphics.generateQRCode": {
    stringToEncode: "string",
    desiredEdgeDimension: "number",
    callback: "fun(image: pd_image)",
    __return: "pd_timer",
  },
  "playdate.graphics.drawSineWave": {
    startAmplitude: "number",
    endAmplitude: "number",
    period: "number",
    phaseShift: "number",
  },
  "playdate.graphics.setStencilImage": {
    tile: "boolean",
  },
  "playdate.graphics.setStencilPattern": {
    level: "number",
  },
  "playdate.graphics.setStrokeLocation": {
    location: "pd_stroke_location",
  },
  "playdate.graphics.getStrokeLocation": {
    __return: "pd_stroke_location",
  },
  "playdate.graphics.getDrawOffset": {
    __return: "(number, number)",
  },
  "playdate.graphics.getFont": {
    __return: "pd_font",
  },
  "playdate.graphics.getSystemFont": {
    __return: "pd_font",
  },
  "playdate.graphics.drawText": {
    __return: "(number, number)",
  },
  "playdate.graphics.drawLocalizedText": {
    key: "string",
  },
  "playdate.graphics.getLocalizedText": {
    key: "string",
  },
  "playdate.graphics.getTextSize": {
    str: "string",
  },
  "playdate.graphics.drawTextInRect": {
    __return: "(number, number, boolean)",
  },
  "playdate.graphics.imageWithText": {
    __return: "(pd_image, boolean)",
  },
  "playdate.keyboard.setCapitalizationBehavior": {
    behavior: "pd_capitalization",
  },
  "playdate.keyboard.left": {
    __return: "number",
  },
  "playdate.keyboard.width": {
    __return: "number",
  },
  "playdate.math.lerp": {
    t: "number",
  },
  "playdate.simulator.getURL": {
    url: "string",
    __return: "string",
  },
  "playdate.sound.playingSources": {
    __return: "pd_source[]",
  },
  "playdate.timer.keyRepeatTimer": {
    __return: "pd_timer",
  },
  "playdate.timer.keyRepeatTimerWithDelay": {
    delayAfterInitialFiring: "number",
    delayAfterSecondFiring: "number",
    __return: "pd_timer",
  },
  "playdate.timer.allTimers": {
    __return: "pd_timer[]",
  },
  "playdate.frameTimer.allTimers": {
    __return: "pd_frameTimer[]",
  },
  "playdate.menu.item:setTitle": {
    newTitle: "string",
  },
  "playdate.menu.item:getTitle": {
    __return: "string",
  },
  "playdate.file.file:readline": {
    __return: "string",
  },
  "playdate.file.file:read": {
    numberOfBytes: "number",
    __return: "",
  },
  "playdate.file.file:seek": {
    offset: "number",
  },
  "playdate.file.file:tell": {
    __return: "number",
  },
  "playdate.geometry.affineTransform.new": {
    m11: "number",
    m12: "number",
    m21: "number",
    m22: "number",
    tx: "number",
    ty: "number",
  },
  "playdate.sound.getHeadphoneState": {
    changeCallback: "nil | (fun(boolean, boolean))",
    __return: "(boolean, boolean)",
  },
  "playdate.sound.setOutputsActive": {
    headphones: "boolean",
    speaker: "boolean",
  },
  "playdate.sound.getCurrentTime": {
    __return: "number",
  },
  "playdate.geometry.affineTransform:concat": {
    af: "pd_affineTransform",
  },
  "playdate.geometry.affineTransform:transformedPoint": {
    p: "pd_point",
    __return: "pd_point",
  },
  "playdate.geometry.affineTransform:transformXY": {
    __return: "(number, number)",
  },
  "playdate.geometry.affineTransform:transformLineSegment": {
    ls: "pd_lineSegment",
  },
  "playdate.geometry.affineTransform:transformedLineSegment": {
    ls: "pd_lineSegment",
    __return: "pd_lineSegment",
  },
  "playdate.geometry.affineTransform:transformAABB": {
    r: "pd_rect",
  },
  "playdate.geometry.affineTransform:transformedAABB": {
    r: "pd_rect",
    __return: "pd_rect",
  },
  "playdate.geometry.affineTransform:transformPolygon": {
    p: "pd_polygon",
  },
  "playdate.geometry.affineTransform:transformedPolygon": {
    p: "pd_polygon",
    __return: "pd_polygon",
  },
  "playdate.geometry.arc.new": {
    direction: "boolean",
  },
  "playdate.geometry.arc:pointOnArc": {
    distance: "number",
  },
  "playdate.geometry.lineSegment:unpack": {
    __return: "(number, number, number, number)",
  },
  "playdate.geometry.lineSegment:pointOnLine": {
    distance: "number",
  },
  "playdate.geometry.lineSegment:intersectsLineSegment": {
    ls: "pd_lineSegment",
  },
  "playdate.geometry.lineSegment:intersectsPolygon": {
    poly: "pd_polygon",
    __return: "(boolean, pd_point[])",
  },
  "playdate.geometry.lineSegment:intersectsRect": {
    __return: "(boolean, pd_point[])",
  },
  "playdate.geometry.point:unpack": {
    __return: "(number, number)",
  },
  "playdate.geometry.point:squaredDistanceToPoint": {
    __return: "number",
  },
  "playdate.geometry.point:distanceToPoint": {
    __return: "number",
  },
  "playdate.geometry.polygon.new": {
    p1: "pd_point",
    p2: "pd_point",
    numberOfVertices: "number",
  },
  "playdate.geometry.polygon:copy": {
    __return: "pd_polygon",
  },
  "playdate.geometry.polygon:containsPoint": {
    fillRule: "pd_polygon_fill_rule",
  },
  "playdate.geometry.polygon:getBounds": {
    __return: "(number, number, number, number)",
  },
  "playdate.geometry.polygon:length": {
    __return: "number",
  },
  "playdate.geometry.polygon:setPointAt": {
    n: "number",
  },
  "playdate.geometry.polygon:getPointAt": {
    n: "number",
    __return: "pd_point",
  },
  "playdate.geometry.polygon:intersects": {
    p: "pd_polygon",
  },
  "playdate.geometry.polygon:pointOnPolygon": {
    distance: "number",
  },
  "playdate.geometry.rect.fast_intersection": {
    __return: "(number, number, number, number)",
  },
  "playdate.geometry.rect.fast_union": {
    __return: "(number, number, number, number)",
  },
  "playdate.geometry.rect:unpack": {
    __return: "(number, number, number, number)",
  },
  "playdate.geometry.rect:intersection": {
    __return: "pd_rect",
  },
  "playdate.geometry.rect:union": {
    __return: "pd_rect",
  },
  "playdate.geometry.rect:insetBy": {
    __return: "pd_rect",
  },
  "playdate.geometry.rect:offsetBy": {
    __return: "pd_rect",
  },
  "playdate.geometry.rect:centerPoint": {
    __return: "pd_point",
  },
  "playdate.geometry.size:unpack": {
    __return: "(number, number)",
  },
  "playdate.geometry.vector2D:unpack": {
    __return: "(number, number)",
  },
  "playdate.geometry.vector2D:scale": {
    s: "number",
  },
  "playdate.geometry.vector2D:scaledBy": {
    s: "number",
    __return: "pd_vector2D",
  },
  "playdate.geometry.vector2D:dotProduct": {
    __return: "number",
  },
  "playdate.geometry.vector2D:magnitude": {
    __return: "number",
  },
  "playdate.geometry.vector2D:magnitudeSquared": {
    __return: "number",
  },
  "playdate.geometry.vector2D:angleBetween": {
    __return: "number",
  },
  "playdate.graphics.image:load": {
    __return: "(boolean, string?)",
  },
  "playdate.graphics.image:drawAnchored": {
    ax: "number",
    ay: "number",
  },
  "playdate.graphics.image:drawIgnoringOffset": {
    p: "pd_point",
  },
  "playdate.graphics.image:sample": {
    __return: "pd_color",
  },
  "playdate.graphics.image:drawWithTransform": {
    xform: "pd_affineTransform",
  },
  "playdate.graphics.image:transformedImage": {
    xform: "pd_affineTransform",
  },
  "playdate.graphics.image:drawSampled": {
    centerx: "number",
    centery: "number",
    dxx: "number",
    dyx: "number",
    dxy: "number",
    dyy: "number",
    z: "number",
    tile: "boolean",
  },
  "playdate.graphics.image:setMaskImage": {
    maskImage: "pd_image",
  },
  "playdate.graphics.image:clearMask": {
    opaque: "boolean",
  },
  "playdate.graphics.image:drawBlurred": {
    numPasses: "number",
    xPhase: "number",
    yPhase: "number",
  },
  "playdate.graphics.image:invertedImage": {
    __return: "pd_image",
  },
  "playdate.graphics.image:blendWithImage": {
    __return: "pd_image",
  },
  "playdate.graphics.image:blurredImage": {
    numPasses: "number",
    padEdges: "boolean",
    xPhase: "number",
    yPhase: "number",
    __return: "pd_image",
  },
  "playdate.graphics.image:fadedImage": {
    __return: "pd_image",
  },
  "playdate.graphics.image:vcrPauseFilterImage": {
    __return: "pd_image",
  },
  "playdate.graphics.nineSlice.new": {
    imagePath: "string",
  },
};

function parse(s, isCallback, isMethod) {
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

  function singleParams(s) {
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

var funs = [...document.querySelectorAll(".function, .method, .callback")]
  .map((e) => ({
    t: e.querySelector(":scope > .title")?.innerText?.trim(),
    d: e.querySelector(".content, :scope > p")?.innerText?.trim(),
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
  .filter((_) => _.p.length);

var tree = {};

for (const { t, d, p, isCallback, isMethod } of funs) {
  if (!p[0].table) continue;
  const path = p[0].table.split(".");
  const prev = [];
  var step = tree;
  while (path.length) {
    step[path[0]] = step[path[0]] ?? {
      name: path[0],
      dupe: prev.includes(path[0]), //file.file
      fullname: p[0].table,
      fields: {},
    };
    step = step[path[0]].fields;
    prev.push(path.shift());
  }
  for (const overload of p) {
    let existing =
      step[overload.name + "|" + isCallback + "|" + overload.dotOrColon];
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

var result = [];
var tbd = [...Object.values(tree)];
var unknowns = JSON.parse(JSON.stringify(HARDCODED_TYPES));
function add(step, parentType) {
  if (step.parameterSets) {
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
        let pType = "pd_UNKNOWN";
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
      function attempt(s, re, f) {
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
      attempt(
        step.doc,
        /^returns a new /i,
        () => parentType === parentType.replace(/_lib$/, "")
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
  const doc = tree.playdate.fields[n + "|true|."].doc;
  const type =
    n === "cranked"
      ? "fun(change: number, acceleratedChange: number)"
      : "fun()";
  result.push(...doc.split("\n").map((l) => "--- " + l));
  result.push(`---@field ${n} nil | (${type})`);
});

function constants(prefix, type, values) {
  values.forEach((v) => result.push(`---@field ${prefix}${v} ${type}`));
}

while (tbd.length) {
  const step = tbd.shift();
  const type =
    step.fullname === "table"
      ? "table"
      : step.dupe
      ? `pd_${step.name}_${step.name}`
      : `pd_${step.name}`;
  const functions = Object.values(step.fields).filter((f) => !f.isMethod);
  result.push("");
  result.push(
    `---@class ${step.fullname === "table" ? "tablelib" : type + "_lib"}`
  );
  functions.forEach((s) => add(s, type + "_lib"));
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

  const methods = Object.values(step.fields).filter((f) => f.isMethod);
  if (methods.length) {
    result.push("");
    result.push(`---@class ${step.fullname === "table" ? "tablelib" : type}`);
    methods.forEach((s) => add(s, type));
  }
}

copy(result.join("\n"));

//copy(JSON.stringify(unknowns, undefined, 2));
