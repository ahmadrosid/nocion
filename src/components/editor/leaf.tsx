import clsx from "clsx";
import { RenderLeafProps } from "slate-react";

export default function Leaf({ children, leaf, attributes }: RenderLeafProps) {
  return (
    <span
      {...attributes}
      className={clsx(
        leaf.bold ? "font-bold" : "",
        leaf.italic ? "italic" : "",
        leaf.underline ? "underline" : "",
        leaf.strikethrough ? "line-through" : ""
      )}
    >
      {children}
    </span>
  );
}
