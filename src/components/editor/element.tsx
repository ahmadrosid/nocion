import { RenderElementProps } from "slate-react";
import { Node } from "slate";
import clsx from "clsx";

function CodeElement(props: RenderElementProps) {
  return (
    <pre className="bg-gray-200 rounded my-4 p-4" {...props.attributes}>
      <code>{props.children}</code>
    </pre>
  );
}

function DefaultElement({ element, attributes, children }: RenderElementProps) {
  const elementIsEmpty = Node.string(element).length === 0;
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
    case "code":
      return <CodeElement {...props} />;
    default:
      return <DefaultElement {...props} />;
  }
}
