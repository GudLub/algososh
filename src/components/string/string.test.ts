import { reverseString } from "../../utils/utils";

describe("Testing string reversal", () => {
  test("should be rendered correctly with odd number of characters", () => {
    expect(reverseString("hello")).toEqual(["o", "l", "l", "e", "h"]);
  });
  test("should be rendered correctly with even number of characters", () => {
    expect(reverseString("test")).toEqual(["t", "s", "e", "t"]);
  });
  test("should be rendered correctly with one character", () => {
    expect(reverseString("8")).toEqual(["8"]);
  });
  test("should be rendered correctly with empty string", () => {
    expect(reverseString("")).toEqual([]);
  });
});