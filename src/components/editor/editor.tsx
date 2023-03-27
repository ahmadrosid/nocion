import TopbarContent from "@/components/content/topbar";
import {
  Editable,
  withReact,
  Slate,
  RenderElementProps,
  RenderLeafProps,
} from "slate-react";
import { createEditor, Descendant } from "slate";
import { useCallback, useState, useMemo, useReducer } from "react";
import Element from "./element";
import useElementTransformer from "@/lib/hooks/element-transformer";
import EditorHeader from "./header";
import Leaf from "./leaf";
import PopupContext, { popupReducer } from "@/lib/context/popup-context";
import PopupMenu from "./popup";

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
  const editor = useMemo(() => withReact(createEditor()), []);
  const renderElement = useCallback(
    (props: RenderElementProps) => <Element {...props} />,
    []
  );
  const renderLeaf = useCallback(
    (props: RenderLeafProps) => <Leaf {...props} />,
    []
  );
  const [state, dispatch] = useReducer(useCallback(popupReducer, []), {
    open: false,
    position: {
      top: 0,
      left: 0,
    },
  });
  const { handleKeyDown } = useElementTransformer(editor, dispatch);

  return (
    <div className="w-full h-full overflow-y-scroll">
      <TopbarContent
        isShowToggle={isShowSidebar}
        toggleSidebar={() => setShowSidebar(true)}
        title={title}
        onUpdateTitle={(text) => setTitle(text)}
      />
      <div className="xl:w-[900px] md:w-[650px] px-16 mx-auto">
        <PopupContext.Provider value={{ state, dispatch }}>
          <div>
            <EditorHeader pageIcon={pageIcon} onSelectIcon={onSelectIcon} />

            <Slate editor={editor} value={initialValue}>
              <Editable
                renderElement={renderElement}
                renderLeaf={renderLeaf}
                onKeyDown={handleKeyDown}
                autoFocus
              />
            </Slate>

            <PopupMenu />
          </div>
        </PopupContext.Provider>
      </div>
    </div>
  );
}
