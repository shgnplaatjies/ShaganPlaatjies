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

// PortfolioPageContent renders its children twice at once (a desktop wrapper - the
// "hidden sm:flex" div - and a mobile wrapper - the "sm:hidden flex" div - toggled by
// CSS display, not mount state), so MusicSection mounts two concurrent
// useStrudelCycles instances. React commits effects in JSX/DOM order, so the desktop
// subtree's effect always fires first and the mobile subtree's always second; that
// mount order is used only to tell the two instances apart, not to decide who's
// "active". Ownership of the shared AudioContext/scheduler is instead decided by
// window.matchMedia("(min-width: 640px)") - the same breakpoint PortfolioPageContent
// uses - re-evaluated on every "change" event and whenever an instance (re)registers,
// so whichever copy is actually visible at the current viewport width owns playback
// and the other renders inert.
const SM_BREAKPOINT_QUERY = "(min-width: 640px)";

let registeredInstanceIds: symbol[] = [];
const ownershipListeners = new Set<() => void>();

const notifyOwnershipListeners = () => {
  ownershipListeners.forEach((listener) => listener());
};

const getViewportQuery = () =>
  typeof window !== "undefined" ? window.matchMedia(SM_BREAKPOINT_QUERY) : null;

export const useStrudelCycles = (strudelPattern: string) => {
  const instanceIdRef = useRef<symbol | null>(null);
  if (instanceIdRef.current === null) {
    instanceIdRef.current = Symbol("strudel-instance");
  }

  const [status, setStatus] = useState<StrudelPlaybackStatus>("idle");
  const [error, setError] = useState<string | null>(null);
  const [isActive, setIsActive] = useState(false);
  const isActiveRef = useRef(false);
  const replRef = useRef<StrudelRepl | null>(null);

  useEffect(() => {
    const id = instanceIdRef.current!;
    registeredInstanceIds.push(id);

    const mediaQuery = getViewportQuery();
    const evaluateActive = () => {
      const isDesktopViewport = mediaQuery ? mediaQuery.matches : true;
      const desktopOwnerId = registeredInstanceIds[0] ?? null;
      const mobileOwnerId = registeredInstanceIds[1] ?? desktopOwnerId;
      const activeOwnerId = isDesktopViewport ? desktopOwnerId : mobileOwnerId;
      const active = activeOwnerId === id;
      isActiveRef.current = active;
      setIsActive(active);
    };

    ownershipListeners.add(evaluateActive);
    notifyOwnershipListeners();
    mediaQuery?.addEventListener("change", evaluateActive);

    return () => {
      registeredInstanceIds = registeredInstanceIds.filter((existing) => existing !== id);
      ownershipListeners.delete(evaluateActive);
      mediaQuery?.removeEventListener("change", evaluateActive);
      notifyOwnershipListeners();
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
    if (!isActiveRef.current) return;

    const bailIfInactive = () => {
      if (isActiveRef.current) return false;
      replRef.current?.stop();
      setStatus("stopped");
      return true;
    };

    try {
      setStatus("loading");
      setError(null);

      await ensureScope();
      if (bailIfInactive()) return;

      const audioContext = getAudioContext();
      if (audioContext.state !== "running") {
        await audioContext.resume();
      }
      if (bailIfInactive()) return;

      await getRepl().evaluate(strudelPattern);
      if (bailIfInactive()) return;

      setStatus("playing");
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setStatus("error");
    }
  }, [strudelPattern, getRepl]);

  const stop = useCallback(() => {
    if (!isActive) return;
    replRef.current?.stop();
    setStatus("stopped");
  }, [isActive]);

  useEffect(() => {
    if (!isActive) {
      replRef.current?.stop();
      setStatus((prev) => (prev === "playing" || prev === "loading" ? "stopped" : prev));
    }
  }, [isActive]);

  useEffect(() => {
    return () => {
      replRef.current?.stop();
    };
  }, []);

  return { status, error, start, stop, isActive };
};
