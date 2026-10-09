"use client";

import { useEffect, useRef, useState } from "react";
import { sanitizeBlogHtml } from "@/lib/sanitize-html";

type Props = {
  value: string;
  onChange: (html: string) => void;
  onRequestImage?: () => void;
};

export function AdminRichText({ value, onChange, onRequestImage }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState(false);
  const [full, setFull] = useState(false);

  useEffect(() => {
    if (!ref.current || preview) return;
    if (document.activeElement === ref.current) return;
    if (ref.current.innerHTML !== value) ref.current.innerHTML = value || "<p></p>";
  }, [value, preview]);

  function command(cmd: string, arg?: string) {
    ref.current?.focus();
    document.execCommand(cmd, false, arg);
    emit();
  }

  function emit() {
    if (!ref.current) return;
    onChange(sanitizeBlogHtml(ref.current.innerHTML));
  }

  function insertLink() {
    const href = window.prompt("Link URL", "/");
    if (href) command("createLink", href);
  }

  function insertTable() {
    command(
      "insertHTML",
      "<table><thead><tr><th>Heading</th><th>Heading</th></tr></thead><tbody><tr><td>Cell</td><td>Cell</td></tr></tbody></table>",
    );
  }

  return (
    <div className={`go-cms-rte ${full ? "is-full" : ""}`}>
      <div className="go-cms-rte-bar" role="toolbar" aria-label="Formatting">
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("formatBlock", "p")}>
          P
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("formatBlock", "h2")}>
          H2
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("formatBlock", "h3")}>
          H3
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("formatBlock", "h4")}>
          H4
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("bold")}>
          B
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("italic")}>
          I
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("insertUnorderedList")}>
          List
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("insertOrderedList")}>
          1.
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("formatBlock", "blockquote")}>
          Quote
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("insertHorizontalRule")}>
          —
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={insertTable}>
          Table
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={insertLink}>
          Link
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => (onRequestImage ? onRequestImage() : command("insertImage", window.prompt("Image URL") || ""))}
        >
          Image
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("undo")}>
          Undo
        </button>
        <button type="button" onMouseDown={(e) => e.preventDefault()} onClick={() => command("redo")}>
          Redo
        </button>
        <button type="button" onClick={() => setPreview((v) => !v)}>
          {preview ? "Edit" : "Preview"}
        </button>
        <button type="button" onClick={() => setFull((v) => !v)}>
          {full ? "Exit full screen" : "Full screen"}
        </button>
      </div>
      {preview ? (
        <div className="go-cms-rte-preview go-article-body" dangerouslySetInnerHTML={{ __html: sanitizeBlogHtml(value) }} />
      ) : (
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
      )}
    </div>
  );
}

export function insertEditorImage(src: string) {
  document.execCommand("insertImage", false, src);
}
