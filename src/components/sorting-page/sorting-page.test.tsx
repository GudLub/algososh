 import { bubbleSort, selectionSort } from "./sorting-page-algoritm";

describe("Testing sorting", () => {
  test("by selection should be rendered correctly while the array is descend", () => {
    expect(selectionSort("descend", [3, 10, 1, 2, 5, 0])).toEqual([10, 5, 3, 2, 1, 0]);
  });
  test("by selection should be rendered correctly while the array has one element, descend", () => {
    expect(selectionSort("descend", [3])).toEqual([3]);
  });
  test("by selection should be rendered correctly while the array is empty, descend", () => {
    expect(selectionSort("descend", [])).toEqual([]);
  });
  test("by selection should be rendered correctly while the array is ascend", () => {
    expect(selectionSort("ascend", [3, 10, 1, 2, 5, 0])).toEqual([0, 1, 2, 3, 5, 10]);
  });
  test("by selection should be rendered correctly while the array has one element, ascend", () => {
    expect(selectionSort("ascend", [3])).toEqual([3]);
  });
  test("by selection should be rendered correctly while the array is empty, ascend", () => {
    expect(selectionSort("ascend", [])).toEqual([]);
  });

  test("by bubble should be rendered correctly while the array is descend", () => {
    expect(bubbleSort("descend", [3, 10, 1, 2, 5, 0])).toEqual([10, 5, 3, 2, 1, 0]);
  });
  test("by bubble should be rendered correctly while the array has one element, descend", () => {
    expect(bubbleSort("descend", [3])).toEqual([3]);
  });
  test("by bubble should be rendered correctly while the array is empty, descend", () => {
    expect(bubbleSort("descend", [])).toEqual([]);
  });
  test("by selection should be rendered correctly while the array is ascend", () => {
    expect(bubbleSort("ascend", [3, 10, 1, 2, 5, 0])).toEqual([0, 1, 2, 3, 5, 10]);
  });
  test("by bubble should be rendered correctly while the array has one element, ascend", () => {
    expect(bubbleSort("ascend", [3])).toEqual([3]);
  });
  test("by bubble should be rendered correctly while the array is empty, ascend", () => {
    expect(bubbleSort("ascend", [])).toEqual([]);
  });
});