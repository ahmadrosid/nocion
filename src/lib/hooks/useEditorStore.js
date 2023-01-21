import { useAtom } from "jotai";
import { blockAtoms } from "@/lib/store";

export default function useEditorStore() {
  const [block, setBlockAtom] = useAtom(blockAtoms);
  const setTitle = (value) => setBlockAtom({ ...block, title: value });
  const setKeys = (value) =>
    setBlockAtom({ ...block, keys: [...block.keys, value] });
  const lastKey = block.keys.length > 0 && block.keys.at(-1);

  return { block, lastKey, setTitle, setKeys };
}
