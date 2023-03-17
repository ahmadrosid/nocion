import { KeyboardEvent, useCallback } from "react";
import { Transforms, Editor, Node, Element } from "slate";

function getActiveNode(editor: Editor): Element | null {
  const { selection } = editor;
  if (!selection) return null;
  const element = Node.parent(editor, Editor.node(editor, selection.anchor)[1]);
  if (!Element.isElement(element)) return null;
  return element;
}

export function useElementTransformer(editor: Editor) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const node = getActiveNode(editor);

      switch (event.key) {
        case "`":
          if (node?.type === "code") return;

          const [leaf] = Editor.leaf(editor, editor.selection);
          if (leaf.text !== "``") return;

          event.preventDefault();
          Transforms.setNodes(editor, { type: "code" });
          Editor.deleteBackward(editor, { unit: "word" });
          return;
        case "Enter":
          event.preventDefault();
          if (!event.shiftKey && node.type !== "paragraph") {
            Transforms.insertText(editor, "\n");
          } else {
            Transforms.insertNodes(editor, {
              type: "paragraph",
              children: [{ text: "" }],
            });
          }
          return;
      }
    },
    [editor]
  );

  return { handleKeyDown };
}
