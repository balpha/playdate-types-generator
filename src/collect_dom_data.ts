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
    const titleText = element
      .querySelector<HTMLElement>(":scope > .title")
      ?.innerText?.trim()
      .replace(
        "playdate.ui.gridview:setNumberOfRows(…​)",
        "playdate.ui.gridview:setNumberOfRows(count1, ...)"
      );

    if (!titleText) {
      continue;
    }

    let documentation =
      element
        .querySelector<HTMLElement>(".content, :scope > p")
        ?.innerText?.trim() ?? "";

    const isCallback = element.classList.contains("callback");
    const isVariable = element.classList.contains("variable");
    const isMethod =
      (element.classList.contains("method") ||
        /\s*[\w.]+:/.test(titleText) ||
        ((isVariable || isCallback) &&
          /^playdate\.(frame)?timer\./i.test(titleText)) ||
        titleText.startsWith("playdate.crankIndicator")) &&
      !["playdate.keyboard.hide()"].includes(titleText);

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

  ["x", "y", "id"].forEach((n) => {
    const line = "playdate.pathfinder.node." + n;
    funs.push({
      titleText: line,
      documentation:
        "You can directly read or write x, y and id values on a playdate.pathfinder.node.",
      isCallback: false,
      isMethod: true,
      isVariable: true,
      parseResults: [parse(line, false, true, true) as SuccessfulParseResult],
    });
  });

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
