"use client";
import { MutableRefObject, createContext } from "react";

export type ScrollAreaContext = MutableRefObject<HTMLElement | null> | null;

export const ScrollContext = createContext<ScrollAreaContext>(null);
