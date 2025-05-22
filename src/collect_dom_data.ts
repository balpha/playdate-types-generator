import {
  OperatorParseResult,
  SuccessfulParseResult,
  isOperator,
  isSuccessful,
  isSuccessfulNonOperator,
  parse,
} from "./parse";

export interface PdFunction {
  titleText: string;
  documentation: string;
  isCallback: boolean;
  isMethod: boolean;
  isVariable: boolean;
  parseResults: (SuccessfulParseResult | OperatorParseResult)[];
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

  const sroic = document.getElementById(
    "m-graphics.sprite.setRedrawsOnImageChange"
  );
  const sroicClass = sroic?.className;
  sroic?.classList.add("method");

  const getStatus = document.getElementById("f-network.getStatus");
  let getStatusContent = getStatus?.querySelector(".content");
  if (getStatus && !getStatusContent) {
    getStatusContent = document.createElement("div");
    getStatusContent.classList.add("content");
    getStatus
      .querySelectorAll("p")
      .forEach((n) => getStatusContent?.appendChild(n));
    getStatus.appendChild(getStatusContent);
  }
  if (getStatus?.nextElementSibling?.classList?.contains("ulist")) {
    getStatusContent?.appendChild(getStatus.nextElementSibling);
  }

  const elements = document.querySelectorAll<HTMLElement>(
    ".function, .method, .callback, .variable, .property"
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
    const isVariable =
      element.classList.contains("variable") ||
      element.classList.contains("property") ||
      titleText === "playdate.metadata";

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

    // HACK: there's some weird duplication in the docs on this one, *and* there's
    // some special overload behavior -- so for now we just modify one of the dupes
    if (
      titleText === "playdate.network.http:post(path, [headers], data)" &&
      documentation.includes("Equivalent to calling")
    ) {
      titleText = titleText.replace("[headers], ", "");
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

  if (sroic && sroicClass) {
    sroic.className = sroicClass;
  }
  removeBackticksAroundCode();

  function additionalInstanceProperties(
    type: string,
    props: string[],
    doc: string | ((prop: string) => string)
  ) {
    let docFn: (prop: string) => string;
    if (typeof doc === "string") {
      docFn = () => doc;
    } else {
      docFn = doc;
    }
    props.forEach((n) => {
      const line = type + "." + n;
      funs.push({
        titleText: line,
        documentation: docFn(n),
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

  const loopDoc = funs.filter((f) =>
    f.titleText.startsWith("playdate.graphics.animation.loop.new(")
  )[0].documentation;

  additionalInstanceProperties(
    "playdate.graphics.animation.loop",
    [
      "delay",
      "startFrame",
      "endFrame",
      "frame",
      "step",
      "shouldLoop",
      "paused",
    ],
    (prop) => loopDoc.match(new RegExp("`" + prop + "` : (.*)"))![0]
  );

  const blinkerDoc = funs.filter((f) =>
    f.titleText.startsWith("playdate.graphics.animation.blinker.new(")
  )[0].documentation;

  additionalInstanceProperties(
    "playdate.graphics.animation.blinker",
    [
      "onDuration",
      "offDuration",
      "loop",
      "cycles",
      "default",
      "counter",
      "on",
      "running",
    ],
    (prop) => blinkerDoc.match(new RegExp("`" + prop + "`: (.*)"))![0]
  );

  const rectCanBeValues = funs.filter(
    (f) =>
      f.titleText.includes("sourceRect") &&
      (f.documentation.includes(
        "can be a playdate.geometry.rect or four integers"
      ) ||
        f.titleText.startsWith("playdate.graphics.tilemap:drawIgnoringOffset"))
  );
  rectCanBeValues.forEach((fn) => {
    const additions = fn.parseResults
      .filter(isSuccessfulNonOperator)
      .map(
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
