import { atom } from "jotai";

export const defaultBlocks = {
    title: "Getting Started",
    keys: [],
    currentKey: [],
    blocks: []
};

export const blockAtoms = atom(defaultBlocks);
