import { TString, TArray } from "../types/types";

export const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

export const swap = (
  arr: TString[] | TArray[] | string[],
  start: number,
  end: number
): void => {
  const check = arr[start];
  arr[start] = arr[end];
  arr[end] = check;
};

export const reverseString = (string: string): string[] => {
  const stringArray = string.split("");
  const lastIndex = stringArray.length - 1;
  for(let i = 0; i < Math.floor(stringArray.length / 2); i++) {
    swap(stringArray, i, lastIndex - i);
  }
  return stringArray;
}
