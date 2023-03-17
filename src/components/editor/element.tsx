import { RenderElementProps, useFocused, useSelected } from "slate-react";
import { Node } from "slate";
import clsx from "clsx";

function HeadingElement({ element, attributes, children }: RenderElementProps) {
  if (element.type !== "heading") return null;
  const HeadingTag = `h${element.level}`;
  return <HeadingTag {...attributes}>{children}</HeadingTag>;
}

function CodeElement(props: RenderElementProps) {
  return (
    <pre className="bg-gray-200 rounded my-4 p-4" {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

function DefaultElement({ element, attributes, children }: RenderElementProps) {
  const selected = useSelected();
  const focused = useFocused();

  const elementIsEmpty =
    selected && focused && Node.string(element).length === 0;
  return (
    <p
      className={clsx(
        "py-1",
        elementIsEmpty &&
          "before:absolute before:content-['Press_/_for_commands'] before:text-gray-500"
      )}
      {...attributes}
    >
      {children}
    </p>
  );
}

export default function Element(props: RenderElementProps) {
  switch (props.element.type) {
    case "heading":
      return <HeadingElement {...props} />;
    case "code":
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
}
