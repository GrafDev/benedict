import {create} from "zustand";
import {IUIStore} from "../../types.ts";
import {getBG} from "../../../features/common";
import {devtools} from "zustand/middleware";

export const useUI = create<IUIStore>()(devtools((set) => ({
    linkBG:"none",
    setLinkBG: (BG: string[]) => set({linkBG:getBG(BG)}),
    mainColor: {dark: "gray.900", light: "gray.100"},
    backgroundColor: {dark: "gray.800", light: "gray.200"},
}),{name: "ui"}))