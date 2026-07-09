"use client";
import { useCallback, useEffect, useRef, useState } from "react";
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
    scopeReady = Promise.all([evalScope(core, mini), registerSynthSounds()])
      .then(() => undefined)
      .catch((err) => {
        scopeReady = null;
        throw err;
      });
  }
  return scopeReady;
};

// PortfolioPageContent renders its children twice at once (a desktop wrapper and a
// mobile wrapper, toggled by CSS display, not mount state), so MusicSection mounts two
// concurrent useStrudelCycles instances. Only the first one to mount is allowed to own
// the shared AudioContext/scheduler; every later concurrent instance stays inert so a
// window resize across the sm breakpoint can't create two overlapping schedulers.
let activeInstanceId: symbol | null = null;

export const useStrudelCycles = (strudelPattern: string) => {
  const instanceIdRef = useRef<symbol | null>(null);
  if (instanceIdRef.current === null) {
    instanceIdRef.current = Symbol("strudel-instance");
  }

  const [status, setStatus] = useState<StrudelPlaybackStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const replRef = useRef<StrudelRepl | null>(null);

  useEffect(() => {
    const id = instanceIdRef.current;
    if (activeInstanceId === null) {
      activeInstanceId = id;
      setIsActive(true);
    }
    return () => {
      if (activeInstanceId === id) {
        activeInstanceId = null;
      }
    };
  }, []);

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
    if (!isActive) return;

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
  }, [strudelPattern, getRepl, isActive]);

  const stop = useCallback(() => {
    if (!isActive) return;
    replRef.current?.stop();
    setStatus("stopped");
  }, [isActive]);

  useEffect(() => {
    return () => {
      replRef.current?.stop();
    };
  }, []);

  return { status, error, start, stop, isActive };
};
