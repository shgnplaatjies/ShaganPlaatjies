// declare module "@strudel.cycles/core";
// declare module "@strudel.cycles/mini";
// declare module "@strudel.cycles/tonal";
// declare module "@strudel.cycles/webaudio";
// declare module "@strudel.cycles/react";

declare module "@strudel/core" {
  export function repl(config: any): any;
  export * from "@strudel/core";
}

declare module "@strudel/webaudio" {
  export function getAudioContext(): AudioContext;
  export function initAudioOnFirstClick(): void;
  export const webaudioOutput: any;
  export * from "@strudel/webaudio";
}
