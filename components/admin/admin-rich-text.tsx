"use client";

import { useEffect, useRef } from "react";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";

type Props = {
  value: string;
  onChange: (html: string) => void;
};

export function AdminRichText({ value, onChange }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    if (document.activeElement === ref.current) return;
    if (ref.current.innerHTML !== value) ref.current.innerHTML = value || "<p></p>";
  }, [value]);

  function command(cmd: string, arg?: string) {
    document.execCommand(cmd, false, arg);
    emit();
  }

  function emit() {
    if (!ref.current) return;
    onChange(sanitizeBlogHtml(ref.current.innerHTML));
  }

  function insertLink() {
    const href = window.prompt("Link URL", "https://");
    if (href) command("createLink", href);
  }

  function insertImage() {
    const src = window.prompt("Image URL");
    if (src) command("insertImage", src);
  }

  return (
    <div className="go-cms-rte">
      <div className="go-cms-rte-bar" role="toolbar" aria-label="Formatting">
        <button type="button" onClick={() => command("formatBlock", "H2")}>
          H2
        </button>
        <button type="button" onClick={() => command("formatBlock", "H3")}>
          H3
        </button>
        <button type="button" onClick={() => command("formatBlock", "H4")}>
          H4
        </button>
        <button type="button" onClick={() => command("formatBlock", "P")}>
          P
        </button>
        <button type="button" onClick={() => command("bold")}>
          B
        </button>
        <button type="button" onClick={() => command("italic")}>
          I
        </button>
        <button type="button" onClick={() => command("insertUnorderedList")}>
          List
        </button>
        <button type="button" onClick={() => command("insertOrderedList")}>
          1.
        </button>
        <button type="button" onClick={() => command("formatBlock", "BLOCKQUOTE")}>
          Quote
        </button>
        <button type="button" onClick={() => command("insertHorizontalRule")}>
          —
        </button>
        <button type="button" onClick={insertLink}>
          Link
        </button>
        <button type="button" onClick={insertImage}>
          Image
        </button>
        <button type="button" onClick={() => command("undo")}>
          Undo
        </button>
        <button type="button" onClick={() => command("redo")}>
          Redo
        </button>
        <button type="button" onClick={() => command("removeFormat")}>
          Clear
        </button>
      </div>
      <div
        ref={ref}
        className="go-cms-rte-body"
        contentEditable
        role="textbox"
        aria-label="Post body"
        onInput={emit}
        onBlur={emit}
        suppressContentEditableWarning
      />
    </div>
  );
}
