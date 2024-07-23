import { getStatus } from "utils/Letter";
import { describe, expect } from "vitest";

describe("getStatus function", () => {
  test("getStatus", () => {
    expect(getStatus({ original: "a", typed: "b" })).toEqual("incorrect");
    expect(getStatus({ original: "a", typed: "a" })).toEqual("correct");
    expect(getStatus({ original: "a" })).toEqual("untyped");
    expect(getStatus({ typed: "b" })).toEqual("extra");
  });
});
