import React, { useEffect, useRef } from "react";
import { selectLastNode } from "@/lib/utils";

type RowItem = { text: string; index: number };

export default function ContentTitle({
  text,
  addRow,
}: {
  text: string;
  addRow: (param: RowItem) => void;
}) {
  const contentRef = useRef<HTMLDivElement>();

  const handleOnUp = (event: KeyboardEvent) => {
    const { key } = event;
    if (!contentRef?.current?.innerText) {
      return;
    }

    if (key == "Enter" && document.activeElement === contentRef.current) {
      if (!event.shiftKey) {
        addRow({ text: "", index: 0 });
        event.preventDefault();
      } else {
        contentRef.current.innerText = contentRef.current.innerText + "\n";
        selectLastNode(contentRef.current);
      }
    }
  };

  const handleOnDown = (event: KeyboardEvent) => {
    // TODO: handle something
    const { key } = event;
    if (key == "Enter" && document.activeElement === contentRef.current) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    window.addEventListener("keyup", handleOnUp);
    window.addEventListener("keydown", handleOnDown);
    return () => {
      window.removeEventListener("keyup", handleOnUp);
      window.removeEventListener("keydown", handleOnDown);
    };
  }, []);

  return (
    <div
      ref={contentRef}
      suppressContentEditableWarning={true}
      contentEditable={true}
      className="text-[#37352F] font-bold text-[48px] p-2 pt-1 focus:outline-none"
    >
      {text}
    </div>
  );
}
