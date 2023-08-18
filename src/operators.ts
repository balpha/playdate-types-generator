import { OperatorParseResult } from "./parse";

export const KNOWN_OPERATORS: Record<
  string,
  | Pick<
      OperatorParseResult,
      "table" | "name" | "parameterTypes" | "returnType"
    >
  | undefined
> = {
  "-v": {
    table: "playdate.geometry.vector2D",
    name: "unm",
    parameterTypes: [],
    returnType: "pd_vector2D",
  },
  "v1 + v2": {
    table: "playdate.geometry.vector2D",
    name: "add",
    parameterTypes: ["pd_vector2D"],
    returnType: "pd_vector2D",
  },
  "v1 - v2": {
    table: "playdate.geometry.vector2D",
    name: "sub",
    parameterTypes: ["pd_vector2D"],
    returnType: "pd_vector2D",
  },
  "v1 * s": {
    table: "playdate.geometry.vector2D",
    name: "mul",
    parameterTypes: ["number"],
    returnType: "pd_vector2D",
  },
  "v1 * v2": {
    table: "playdate.geometry.vector2D",
    name: "mul",
    parameterTypes: ["pd_vector2D"],
    returnType: "number",
  },
  "v1 * t": {
    table: "playdate.geometry.vector2D",
    name: "mul",
    parameterTypes: ["pd_affineTransform"],
    returnType: "pd_vector2D",
  },
  "v / s": {
    table: "playdate.geometry.vector2D",
    name: "div",
    parameterTypes: ["number"],
    returnType: "pd_vector2D",
  },
  "t1 * t2": {
    table: "playdate.geometry.affineTransform",
    name: "mul",
    parameterTypes: ["pd_affineTransform"],
    returnType: "pd_affineTransform",
  },
  "t * v": {
    table: "playdate.geometry.affineTransform",
    name: "mul",
    parameterTypes: ["pd_vector2D"],
    returnType: "pd_vector2D",
  },
  "t * p": {
    table: "playdate.geometry.affineTransform",
    name: "mul",
    parameterTypes: ["pd_point"],
    returnType: "pd_point",
  },
  "p + v": {
    table: "playdate.geometry.point",
    name: "add",
    parameterTypes: ["pd_vector2D"],
    returnType: "pd_point",
  },
  "p1 - p2": {
    table: "playdate.geometry.point",
    name: "sub",
    parameterTypes: ["pd_point"],
    returnType: "pd_vector2D",
  },
  "p * t": {
    table: "playdate.geometry.point",
    name: "mul",
    parameterTypes: ["pd_affineTransform"],
    returnType: "pd_point",
  },
  "p1 .. p2": {
    table: "playdate.geometry.point",
    name: "concat",
    parameterTypes: ["pd_point"],
    returnType: "pd_lineSegment",
  },
};
