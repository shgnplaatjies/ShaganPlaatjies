declare module "@strudel/core" {
  export function repl(config: any): any;
  export function note(...args: any[]): any;
}

declare module "@strudel/webaudio" {
  export function getAudioContext(): AudioContext;
  export function initAudioOnFirstClick(): void;
  export const webaudioOutput: any;
  export * from "@strudel/webaudio";
}
