export const cutOffText = (text: string, maxLength: number) => {
  if (text.length < maxLength) return text;
  return text.slice(0, maxLength) + "...";
};

export const CacheBustParam = {
  key: "_cache_bust",
  getValue: () => Date.now().toString(),
};
