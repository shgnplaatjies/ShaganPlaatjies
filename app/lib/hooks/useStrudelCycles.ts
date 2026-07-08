"use client";
import { useCallback, useRef, useState } from "react";
import { repl, evalScope } from "@strudel/core";
import * as core from "@strudel/core";
import * as mini from "@strudel/mini";
import { miniAllStrings } from "@strudel/mini";
import { transpiler } from "@strudel/transpiler";
import { getAudioContext, registerSynthSounds, webaudioOutput } from "@strudel/webaudio";

export type StrudelPlaybackStatus = "idle" | "loading" | "playing" | "stopped" | "error";

type StrudelRepl = ReturnType<typeof repl>;

// Registers `note`, `gain`, `slow`, etc. as globals so the evaluated pattern
// code (a plain string, not a closure) can reference them, and makes string
// arguments like note("...") parse as Strudel mini-notation. registerSynthSounds()
// is also required: superdough's built-in waveforms (e.g. "triangle", the default
// sound for a bare note()) are not usable until registered - without this call,
// playback silently fails per-hap with "sound triangle not found! Is it loaded?".
// All three are one-time, module-wide setup steps shared by every hook instance.
let scopeReady: Promise<void> | null = null;
const ensureScope = () => {
  if (!scopeReady) {
    miniAllStrings();
    scopeReady = Promise.all([evalScope(core, mini), registerSynthSounds()]).then(() => undefined);
  }
  return scopeReady;
};

export const useStrudelCycles = (strudelPattern: string) => {
  const [status, setStatus] = useState<StrudelPlaybackStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const replRef = useRef<StrudelRepl | null>(null);

  const getRepl = useCallback((): StrudelRepl => {
    if (!replRef.current) {
      replRef.current = repl({
        defaultOutput: webaudioOutput,
        getTime: () => getAudioContext().currentTime,
        transpiler,
      });
    }
    return replRef.current;
  }, []);

  const start = useCallback(async () => {
    try {
      setStatus("loading");
      setError(null);

      await ensureScope();

      const audioContext = getAudioContext();
      if (audioContext.state !== "running") {
        await audioContext.resume();
      }

      await getRepl().evaluate(strudelPattern);
      setStatus("playing");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }, [strudelPattern, getRepl]);

  const stop = useCallback(() => {
    replRef.current?.stop();
    setStatus("stopped");
  }, []);

  return { status, error, start, stop };
};
