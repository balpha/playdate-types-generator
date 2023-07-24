import { generateAnnotation } from "./generate";

(function () {
  const generated = generateAnnotation();

  (window as any).__lua_annotation = generated;

  //@ts-ignore
  copy(generated.annotationFile);
})();
