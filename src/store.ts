import { atom } from "jotai";
import { ProjUserType } from "./types";

/* GLobal states , similar to redux */

// states for editors
export const jsCode = atom("");
export const htmlCode = atom("");
export const cssCode = atom("");
export const editorFontSize = atom(
  {
    "--e-font-size": "calc(1rem + 0px )",
  }
)
export const projUserType = atom<ProjUserType>("owner")
