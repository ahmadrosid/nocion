import { KeyboardEvent, useCallback } from "react";
import { Transforms, Editor, Node, Element } from "slate";

function getActiveNode(editor: Editor): Element | undefined {
  const { selection } = editor;
  if (!selection) return undefined;
  const element = Node.parent(editor, Editor.node(editor, selection.anchor)[1]);
  if (!Element.isElement(element)) return undefined;
  return element;
}

export function useElementTransformer(editor: Editor) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const node = getActiveNode(editor);
      if (!node) return;
      const text = Node.string(node);
      if (event.metaKey || event.ctrlKey) {
        switch (event.key) {
          case "b":
            event.preventDefault();
            const bold = Editor.marks(editor)["bold"];
            editor.addMark("bold", !bold);
            return;
          case "i":
            event.preventDefault();
            const italic = Editor.marks(editor)["italic"];
            editor.addMark("italic", !italic);
            return;
          case "u":
            event.preventDefault();
            const underline = Editor.marks(editor)["underline"];
            editor.addMark("underline", !underline);
            return;
        }
      }

      switch (event.key) {
        case "`":
          if (node?.type === "code" || text !== "``") return;
          event.preventDefault();
          Transforms.setNodes(editor, { type: "code" });
          Editor.deleteBackward(editor, { unit: "word" });
          return;
        case " ":
          let headingLevel = 1;
          if (text === "##") headingLevel = 2;
          else if (text === "###") headingLevel = 3;
          else if (text !== "#") return;
          event.preventDefault();
          Transforms.setNodes(editor, { type: "heading", level: headingLevel });
          Editor.deleteBackward(editor, { unit: "word" });
          return;
        case "Enter":
          event.preventDefault();
          if (!event.shiftKey && node.type === "code") {
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
