import { useEffect, useRef, useState } from "react";
import { setCaretToEnd } from "@/lib/utils";
import PopupMenu from "@/components/block/popup";
import useEditorStore from "@/lib/hooks/useEditorStore";

export default function ContentRow({ text, id, addRow, removeRow }) {
  const { setKeys } = useEditorStore();

  const contentRef = useRef<HTMLDivElement>();
  const [openPopup, setOpenPopup] = useState(false);

  const handleOnFocus = () => {
    if (contentRef.current?.innerText?.length == 0) {
      contentRef.current.setAttribute("placeholder", "Type '/' for commands");
    }
  };

  const handleOnBlur = () => {
    if (contentRef.current?.innerText?.length == 0) {
      contentRef.current.setAttribute("placeholder", "");
      setOpenPopup(false);
    }
  };

  const handleOnUp = (event: KeyboardEvent) => {
    const { key } = event;
    const { textContent } = contentRef.current;
    if (document.activeElement !== contentRef.current) {
      return;
    }

    if (key == "Backspace" && textContent === "") {
      if (contentRef.current.getAttribute("placeholder") === "") {
        contentRef.current.setAttribute("placeholder", "Type '/' for commands");
        setOpenPopup(() => {
          return false;
        });
        return;
      }

      removeRow({ text, id });
      return;
    }

    if (key == "Enter") {
      addRow({ text: "", parentId: id });
      contentRef.current.setAttribute("placeholder", "");
      event.preventDefault();
    }

    if (key === "/" && textContent === "/") {
      setOpenPopup(true);
      event.preventDefault();
      return;
    }

    if (key === " ") {
      if (textContent === "# ") {
        console.log(event);
      }
      console.log(`'${textContent}'`);
      return;
    }
  };

  const handleOnDown = (event: KeyboardEvent) => {
    const { key } = event;
    setKeys(key);
    const { textContent } = contentRef.current;
    if (document.activeElement !== contentRef.current) {
      return;
    }

    if (
      contentRef.current.getAttribute("placeholder") !== "" &&
      textContent !== ""
    ) {
      contentRef.current.setAttribute("placeholder", "");
    }

    if (key == "Enter") {
      contentRef.current.setAttribute("placeholder", "");
      event.preventDefault();
      return;
    }
  };

  const onAddClick = () => {
    if (contentRef?.current?.innerText?.length > 0) {
      addRow({ text: "", parentId: id });
      setOpenPopup(false);
    } else {
      setOpenPopup(true);
    }
  };

  const onSelectMenu = () => {
    setOpenPopup(false);
    contentRef.current.textContent = "";
    contentRef.current.focus();
  };

  useEffect(() => {
    if (text == "") {
      contentRef.current.focus();
    } else {
      setCaretToEnd(contentRef.current);
    }

    window.addEventListener("keyup", handleOnUp);
    window.addEventListener("keydown", handleOnDown);
    return () => {
      window.removeEventListener("keyup", handleOnUp);
      window.removeEventListener("keydown", handleOnDown);
    };
  }, [contentRef]);

  return (
    <div
      className="flex items-center relative group active:cursor-grab"
      draggable={true}
    >
      <div className="-left-9 top-1 absolute flex gap-1 items-center">
        <div
          onClick={onAddClick}
          className="hover:bg-gray-200 group-hover:block hidden transition-all rounded cursor-pointer"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-300"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <div className="hover:bg-gray-200 group-hover:block hidden py-1 rounded grabbable">
          <svg
            className="w-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 10 10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3,2 C2.44771525,2 2,1.55228475 2,1 C2,0.44771525 2.44771525,0 3,0 C3.55228475,0 4,0.44771525 4,1 C4,1.55228475 3.55228475,2 3,2 Z M3,6 C2.44771525,6 2,5.55228475 2,5 C2,4.44771525 2.44771525,4 3,4 C3.55228475,4 4,4.44771525 4,5 C4,5.55228475 3.55228475,6 3,6 Z M3,10 C2.44771525,10 2,9.55228475 2,9 C2,8.44771525 2.44771525,8 3,8 C3.55228475,8 4,8.44771525 4,9 C4,9.55228475 3.55228475,10 3,10 Z M7,2 C6.44771525,2 6,1.55228475 6,1 C6,0.44771525 6.44771525,0 7,0 C7.55228475,0 8,0.44771525 8,1 C8,1.55228475 7.55228475,2 7,2 Z M7,6 C6.44771525,6 6,5.55228475 6,5 C6,4.44771525 6.44771525,4 7,4 C7.55228475,4 8,4.44771525 8,5 C8,5.55228475 7.55228475,6 7,6 Z M7,10 C6.44771525,10 6,9.55228475 6,9 C6,8.44771525 6.44771525,8 7,8 C7.55228475,8 8,8.44771525 8,9 C8,9.55228475 7.55228475,10 7,10 Z"></path>
          </svg>
        </div>
      </div>
      <PopupMenu isOpen={openPopup} onSelectMenu={onSelectMenu} />
      <div
        ref={contentRef}
        className="block-editor text-gray-700 text-[16px] focus:outline-none px-2 py-1 w-full cursor-text"
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        suppressContentEditableWarning={true}
        contentEditable={true}
        spellCheck={true}
      >
        {text}
      </div>
    </div>
  );
}
