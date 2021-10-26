
export function selectLastNode(node) {
    const range = document.createRange();
    range.selectNodeContents(node.lastElementChild);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
}

export function setCaretToEnd(el) {
    let range = document.createRange(),
        sel = window.getSelection(),
        lastKnownIndex = -1;
    for (let i = 0; i < el.childNodes.length; i++) {
        if (isTextNodeAndContentNoEmpty(el.childNodes[i])) {
            lastKnownIndex = i;
        }
    }
    if (lastKnownIndex === -1) {
        throw new Error('Could not find valid text content');
    }
    let row = el.childNodes[lastKnownIndex],
        col = row.textContent.length;
    range.setStart(row, col);
    range.collapse(true);
    sel.removeAllRanges();
    sel.addRange(range);
    el.focus();
}

function isTextNodeAndContentNoEmpty(node) {
    return node.nodeType === Node.TEXT_NODE && node.textContent.trim().length > 0
}
