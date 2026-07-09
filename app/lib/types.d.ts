// @strudel/* packages ship no type declarations of their own (verified: no .d.ts
// files in any of their published tarballs), so these ambient shims stand in for
// real types. They cover only the surface this project actually calls; the
// evaluated pattern code itself (note/gain/slow/etc.) is dynamic and untyped.
declare module "@strudel/core" {
  export function repl(config: any): {
    scheduler: any;
    evaluate: (code: string, autostart?: boolean, shouldHush?: boolean) => Promise<any>;
    start: () => void;
    stop: () => void;
    pause: () => void;
    toggle: () => void;
    state: any;
  };
  export function evalScope(...modules: any[]): Promise<any[]>;
}

declare module "@strudel/mini" {
  export function miniAllStrings(): void;
}

declare module "@strudel/transpiler" {
  export function transpiler(code: string, options?: any): { output: string; [key: string]: any };
}

declare module "@strudel/webaudio" {
  export function getAudioContext(): AudioContext;
  export function registerSynthSounds(): Promise<void>;
  export const webaudioOutput: any;
}
