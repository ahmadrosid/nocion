import TopbarContent from "@/components/content/topbar";
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { createEditor, Descendant } from "slate";
import { useCallback, useState } from "react";
import Element from "./element";
import { useElementTransformer } from "@/lib/hooks/useElementTransformer";
import EditorHeader from "./header";
import Leaf from "./leaf";

const initialValue: Descendant[] = [
  {
    type: "paragraph",
    children: [{ text: "" }],
  },
];

export default function Editor({
  isShowSidebar,
  setShowSidebar,
  setTitle,
  onSelectIcon,
  pageIcon,
  title,
}) {
  const [editor] = useState(() => withReact(createEditor()));
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const { handleKeyDown } = useElementTransformer(editor);
  return (
    <div className="w-full h-full overflow-y-scroll">
      <TopbarContent
        isShowToggle={isShowSidebar}
        toggleSidebar={() => setShowSidebar(true)}
        title={title}
        onUpdateTitle={(text) => setTitle(text)}
      />
      <div className="xl:w-[900px] md:w-[650px] px-16 mx-auto">
        <div>
          <EditorHeader pageIcon={pageIcon} onSelectIcon={onSelectIcon} />

          <Slate editor={editor} value={initialValue}>
            <Editable
              renderElement={renderElement}
              renderLeaf={renderLeaf}
              onKeyDown={handleKeyDown}
            />
          </Slate>
        </div>
      </div>
    </div>
  );
}
