"use client";
import { repl } from "@strudel/core";
import {
  getAudioContext,
  initAudioOnFirstClick,
  webaudioOutput,
} from "@strudel/webaudio";

export const useStrudelCycles = (strudelPattern: any) => {
  initAudioOnFirstClick();

  const audioContext = getAudioContext();

  const { scheduler } = repl({
    defaultOutput: webaudioOutput,
    getTime: () => audioContext.currentTime,
  });

  scheduler.setPattern(strudelPattern);

  return {
    start: () => {
      debugger;

      scheduler.start();
    },
    stop: () => scheduler.stop(),
  };
};
