import { SuccessfulParseResult, isSuccessful, parse } from "./parse";

export interface PdFunction {
  titleText: string;
  documentation: string;
  isCallback: boolean;
  isMethod: boolean;
  isVariable: boolean;
  parseResults: SuccessfulParseResult[];
}

function codeElements() {
  return [...document.querySelectorAll<HTMLElement>("em")].filter(
    (e) => e.childElementCount === 0
  );
}

function wrapCodeInBackticks() {
  codeElements().forEach((e) => (e.innerText = `\`${e.innerText}\``));
}
function removeBackticksAroundCode() {
  codeElements().forEach(
    (e) => (e.innerText = e.innerText.replace(/^`|`$/g, ""))
  );
}

export function collectDataFromDom(): PdFunction[] {
  const funs = [] as PdFunction[];
  const elements = document.querySelectorAll<HTMLElement>(
    ".function, .method, .callback, .variable"
  );
  wrapCodeInBackticks();
  for (let element of elements) {
    let titleText = element
      .querySelector<HTMLElement>(":scope > .title")
      ?.innerText?.trim()
      .replace(
        "playdate.ui.gridview:setNumberOfRows(…​)",
        "playdate.ui.gridview:setNumberOfRows(count1, ...)"
      );

    if (!titleText) {
      continue;
    }

    // Overload resolution in the lua language server is a bit wonky and lets a few
    // obvious issues through. This change makes that less likely
    titleText = titleText
      .replace(
        "playdate.geometry.polygon.new(p1, p2, ..., pn)",
        "playdate.geometry.polygon.new(p1, p2, [p3, p4, p5, p6,] ...)"
      )
      .replace(
        "playdate.geometry.polygon.new(x1, y1, x2, y2, ..., xn, yn)",
        "playdate.geometry.polygon.new(x1, y1, x2, y2, [x3, y3,] ...)"
      );

    let documentation =
      element
        .querySelector<HTMLElement>(".content, :scope > p")
        ?.innerText?.trim() ?? "";

    const isCallback = element.classList.contains("callback");
    const isVariable = element.classList.contains("variable");
    let isMethod =
      (element.classList.contains("method") ||
        /\s*[\w.]+:/.test(titleText) ||
        ((isVariable || isCallback) &&
          /^playdate\.(frame)?timer\./i.test(titleText)) ||
        titleText.startsWith("playdate.crankIndicator")) &&
      !["playdate.keyboard.hide()"].includes(titleText);

    if (titleText === "playdate.sound.instrument.new([synth])") {
      isMethod = false;
    }

    const parseResults = titleText
      .split("\n")
      .map((overloadLine) =>
        parse(overloadLine, isCallback, isMethod, isVariable)
      )
      .filter(isSuccessful);

    let otherFun: PdFunction | null = null;

    if (
      titleText === "playdate.sound.sample.new(path)" &&
      documentation.includes("playdate.sound.sample.new(seconds, [format])")
    ) {
      // the docs are incorrectly formatted here
      const bothDocs = documentation
        .split("playdate.sound.sample.new(seconds, [format])")
        .map((s) => s.trim());
      documentation = bothDocs[0];
      const otherDocumentation = bothDocs[1];
      const otherTitleText = "playdate.sound.sample.new(seconds, [format])";
      const otherParseResult = parse(
        otherTitleText,
        isCallback,
        isMethod,
        isVariable
      );

      if (isSuccessful(otherParseResult)) {
        otherFun = {
          titleText: otherTitleText,
          documentation: otherDocumentation,
          isCallback,
          isMethod,
          isVariable,
          parseResults: [otherParseResult],
        };
      }
    }

    if (parseResults.length) {
      funs.push({
        titleText,
        documentation,
        isCallback,
        isMethod,
        isVariable,
        parseResults,
      });
    }
    if (otherFun) {
      funs.push(otherFun);
    }
  }

  removeBackticksAroundCode();

  function additionalInstanceProperties(
    type: string,
    props: string[],
    doc: string
  ) {
    props.forEach((n) => {
      const line = type + "." + n;
      funs.push({
        titleText: line,
        documentation: doc,
        isCallback: false,
        isMethod: true,
        isVariable: true,
        parseResults: [parse(line, false, true, true) as SuccessfulParseResult],
      });
    });
  }

  additionalInstanceProperties(
    "playdate.pathfinder.node",
    ["x", "y", "id"],
    "You can directly read or write `x`, `y` and `id` values on a `playdate.pathfinder.node`."
  );

  additionalInstanceProperties(
    "playdate.geometry.point",
    ["x", "y"],
    "You can directly read or write the `x` and `y` values of a point."
  );

  additionalInstanceProperties(
    "playdate.geometry.arc",
    ["x", "y", "radius", "startAngle", "endAngle", "clockwise"],
    "You can directly read or write the `x`, `y`, `radius`, `startAngle`, `endAngle` and `clockwise` values of an arc."
  );

  additionalInstanceProperties(
    "playdate.geometry.lineSegment",
    ["x1", "y1", "x2", "y2"],
    "You can directly read or write `x1`, `y1`, `x2`, or `y2` values to a lineSegment."
  );

  additionalInstanceProperties(
    "playdate.geometry.rect",
    ["x", "y", "width", "height"],
    "You can directly read or write `x`, `y`, `width`, or `height` values to a rect."
  );

  additionalInstanceProperties(
    "playdate.geometry.rect",
    ["top", "bottom", "right", "left", "origin", "size"],
    "**READ-ONLY**. While you can directly read or write `x`, `y`, `width`, or `height` values to a rect, the values of `top`, `bottom`, `right`, `left`, `origin`, and `size` are read-only."
  );

  additionalInstanceProperties(
    "playdate.geometry.size",
    ["width", "height"],
    "You can directly read or write  the `width` and `height` values of a `size`."
  );

  additionalInstanceProperties(
    "playdate.geometry.vector2D",
    ["dx", "dy"],
    "You can directly read or write `dx`, or `dy` values to a vector2D."
  );

  const rectCanBeValues = funs.filter(
    (f) =>
      f.titleText === "playdate.graphics.tilemap:draw(x, y, [sourceRect])" ||
      f.titleText.startsWith(
        "playdate.graphics.image:draw(x, y, [flip, [sourceRect]])"
      )
  );
  rectCanBeValues.forEach((fn) => {
    const additions = fn.parseResults.map(
      (pr) =>
        parse(
          (
            pr.table +
            pr.dotOrColon +
            pr.name +
            "(" +
            pr.parameters +
            ")"
          ).replace("sourceRect", "rx, ry, rw, rh"),
          fn.isCallback,
          fn.isMethod,
          fn.isVariable
        ) as SuccessfulParseResult
    );
    fn.parseResults.push(...additions);
  });
  return funs;
}
