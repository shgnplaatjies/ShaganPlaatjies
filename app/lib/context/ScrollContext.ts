"use client";
import { MutableRefObject, createContext } from "react";

export const ScrollContext = createContext<
  MutableRefObject<HTMLDivElement> | undefined
>(undefined);
