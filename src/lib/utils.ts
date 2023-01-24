const alphaNumeric = "0123456789abcdefghijklmnopqrstuvwxyz";

export function selectLastNode(node: Node) {
  const range = document.createRange();
  range.selectNodeContents((node as Element).lastElementChild);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

export function setCaretToEnd(el: Node) {
  let range = document.createRange(),
    sel = window.getSelection(),
    lastKnownIndex = -1;
  for (let i = 0; i < el.childNodes.length; i++) {
    if (isTextNodeAndContentNoEmpty(el.childNodes[i] as Text)) {
      lastKnownIndex = i;
    }
  }
  if (lastKnownIndex === -1) {
    throw new Error("Could not find valid text content");
  }
  let row = el.childNodes[lastKnownIndex] as Text,
    col = row.textContent.length;
  range.setStart(row, col);
  range.collapse(true);
  sel.removeAllRanges();
  sel.addRange(range);
  (el as HTMLElement).focus();
}

function isTextNodeAndContentNoEmpty(node: Node): boolean {
  return node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0;
}

export function isAlphaNumeric(target: string): boolean {
  return alphaNumeric.includes(target);
}
