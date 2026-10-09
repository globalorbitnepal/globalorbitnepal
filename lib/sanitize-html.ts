const ALLOWED = new Set([
  "P",
  "BR",
  "H2",
  "H3",
  "H4",
  "STRONG",
  "B",
  "EM",
  "I",
  "U",
  "UL",
  "OL",
  "LI",
  "A",
  "BLOCKQUOTE",
  "HR",
  "IMG",
  "FIGURE",
  "FIGCAPTION",
  "TABLE",
  "THEAD",
  "TBODY",
  "TR",
  "TH",
  "TD",
  "PRE",
  "CODE",
  "SPAN",
]);

function isSafeUrl(value: string) {
  const trimmed = value.trim();
  return (
    trimmed.startsWith("/") ||
    trimmed.startsWith("https://") ||
    trimmed.startsWith("http://") ||
    trimmed.startsWith("mailto:")
  );
}

export function looksLikeHtml(value: string) {
  return /<\/?[a-z][\s\S]*>/i.test(value);
}

export function sanitizeBlogHtml(input: string) {
  if (!input.trim()) return "";
  if (typeof window === "undefined") {
    return input
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/\son\w+=("[^"]*"|'[^']*'|[^\s>]+)/gi, "");
  }
  const template = document.createElement("template");
  template.innerHTML = input;
  const walk = (node: Node) => {
    const children = [...node.childNodes];
    for (const child of children) {
      if (child.nodeType === Node.ELEMENT_NODE) {
        const el = child as HTMLElement;
        if (!ALLOWED.has(el.tagName)) {
          el.replaceWith(...el.childNodes);
          continue;
        }
        for (const attr of [...el.attributes]) {
          const name = attr.name.toLowerCase();
          if (name.startsWith("on") || name === "style") el.removeAttribute(attr.name);
        }
        if (el.tagName === "A") {
          const href = el.getAttribute("href") || "";
          if (!isSafeUrl(href)) el.removeAttribute("href");
          el.setAttribute("rel", "noopener noreferrer");
        }
        if (el.tagName === "IMG") {
          const src = el.getAttribute("src") || "";
          if (!isSafeUrl(src)) el.removeAttribute("src");
        }
        walk(el);
      } else if (child.nodeType === Node.COMMENT_NODE) {
        child.parentNode?.removeChild(child);
      }
    }
  };
  walk(template.content);
  return template.innerHTML;
}

export function htmlToPlainText(html: string) {
  return html
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
