import { atom } from "jotai";

type BlockType = "h1" | "h2" | "h3" | "p" | "list";

type BlockItem = {
  id: string;
  type: BlockType;
  properties: {
    title: string[][];
    checked: string[][];
  };
  content: string[];
  parent?: string;
};

export type Block = {
  title: string;
  keys: string[];
  currentKey: string[];
  blocks: BlockItem[];
};

export const defaultBlocks: Block = {
  title: "Getting Started",
  keys: [],
  currentKey: [],
  blocks: [],
};

export const blockAtoms = atom<Block>(defaultBlocks);
