import { Editor, Element, Node } from "slate";

export function getActiveNode(editor: Editor): Element | undefined {
  const { selection } = editor;
  if (!selection) return undefined;
  const element = Node.parent(editor, Editor.node(editor, selection.anchor)[1]);
  if (!Element.isElement(element)) return undefined;
  return element;
}
