export default function getCaretPosition() {
  if (typeof window === "undefined")
    throw new Error(
      "getCaretPosition should only be run in a browser environment"
    );
  const selection = window.getSelection()!;
  // Workaround for rect giving (0, 0) on blank lines on Firefox
  // https://stackoverflow.com/a/44261188
  // Seriously, wtf, Firefox?
  let range = selection.getRangeAt(0);
  range = range.cloneRange();
  range.setStart(range.startContainer, 0);
  const rect = range.getBoundingClientRect();
  return {
    top: rect.top + rect.height,
    left: rect.right, // we don't use rect.left because we want this to be the bottom *right* corner
  };
}
