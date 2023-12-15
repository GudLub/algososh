import { TString, TArray } from "../types/types";

export const timeout = (delay: number) => {
  return new Promise((res) => setTimeout(res, delay));
};

export const swap = (
  arr: TString[] | TArray[],
  start: number,
  end: number
): void => {
  const check = arr[start];
  arr[start] = arr[end];
  arr[end] = check;
};


