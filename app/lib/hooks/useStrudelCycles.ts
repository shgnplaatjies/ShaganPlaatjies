"use client";
import * as strudelCyclesCore from "@strudel.cycles/core";
import { controls, evalScope } from "@strudel.cycles/core";
import * as strudelCyclesMini from "@strudel.cycles/mini";
import "@strudel.cycles/react/dist/style.css";
import * as strudelCyclesTonal from "@strudel.cycles/tonal";
import * as strudelCyclesWebaudio from "@strudel.cycles/webaudio";
import { initAudioOnFirstClick, samples } from "@strudel.cycles/webaudio";
import { useEffect } from "react";
import {
  ThirdPartyStrudelSampleConfig,
  ThirdPartyStrudelSamples,
} from "../constants";

export const useStrudelCycles = () => {
  const preBakeSamples = async (
    sampleConfig: ThirdPartyStrudelSampleConfig[]
  ) =>
    sampleConfig.map(
      async ({ configUrl, binaryUrl }) => await samples(configUrl, binaryUrl)
    );

  const init = async () => {
    if (typeof window === "undefined") return;

    await evalScope(
      controls,
      strudelCyclesCore,
      strudelCyclesMini,
      strudelCyclesWebaudio,
      strudelCyclesTonal
    );

    await preBakeSamples(ThirdPartyStrudelSamples);

    initAudioOnFirstClick();
  };

  useEffect(() => {
    init();
  }, []);
};
