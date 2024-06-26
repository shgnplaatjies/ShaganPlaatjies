import { MutableRefObject } from "react";

export const cutOffText = (text: string, maxLength: number) => {
  if (text.length < maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const CacheBustParam = {
  key: "_cache_bust",
  getValue: () => Date.now().toString(),
};

export const isHTMLElementRef = (
  ref: any
): ref is MutableRefObject<HTMLElement> =>
  ref !== null && ref.current && ref.current instanceof HTMLElement;
