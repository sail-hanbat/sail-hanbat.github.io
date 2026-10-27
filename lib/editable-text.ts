/**
 * Read logical lines, not innerText's layout-dependent paragraph separators.
 * Browsers use DIV/BR wrappers for pasted lines and a final BR or LF as an
 * empty caret line. Neither should become an extra newline in saved content.
 */
export function readEditableText(element: HTMLElement): string {
  function read(parent: Node): string {
    let text = '';
    let previousWasBlock = false;
    Array.from(parent.childNodes).forEach((child, index) => {
      const tag = child.nodeType === 1 ? (child as Element).tagName : '';
      const isBlock = tag === 'DIV' || tag === 'P';
      if (index > 0 && (previousWasBlock || (isBlock && !text.endsWith('\n')))) {
        text += '\n';
      }
      if (child.nodeType === 3) {
        text += child.textContent ?? '';
      } else if (tag === 'BR') {
        // A terminal BR is the browser's caret placeholder, not a new line.
        if (child !== parent.lastChild) text += '\n';
      } else {
        text += read(child);
      }
      previousWasBlock = isBlock;
    });
    // plaintext-only editing uses a final LF instead of a placeholder BR.
    if (parent.lastChild?.nodeType === 3 && text.endsWith('\n')) text = text.slice(0, -1);
    return text;
  }

  return read(element).replace(/\r\n?/g, '\n');
}
