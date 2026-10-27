'use client';

import type { CSSProperties, ElementType } from 'react';
import { useEffect, useRef, useState } from 'react';
import { readEditableText } from '@/lib/editable-text';

/** The browser owns the text nodes, selection and undo history while editing. */
export function InlineText({
  value,
  onChange,
  editing,
  as: Component = 'span',
  className,
  multiline = true,
  style,
}: {
  value: string;
  onChange: (value: string) => void;
  editing: boolean;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLElement | null>(null);
  const composing = useRef(false);
  const wasEditing = useRef(false);
  // Keep SSR text, but never ask React to reconcile browser-edited children.
  // A changing {value} child replaces the text node and resets the caret.
  const [initialText] = useState(value);

  useEffect(() => {
    const element = ref.current;
    const enteringEditMode = editing && !wasEditing.current;
    wasEditing.current = editing;
    // Local input already matches value. Only loads, Cancel and other external
    // updates should touch the DOM; in particular, don't interrupt Korean IME.
    if (!element || composing.current) return;
    if (editing) {
      if (enteringEditMode || readEditableText(element) !== value) {
        element.textContent = value + (value.endsWith('\n') ? '\n' : '');
      }
    } else if (element.textContent !== value || element.childElementCount > 0) {
      element.textContent = value;
    }
  }, [value, editing]);

  return (
    <Component
      ref={ref}
      className={`cms-text ${className ?? ''}${editing ? ' cms-editable-text' : ''}`.trim()}
      style={style}
      contentEditable={editing ? 'plaintext-only' : false}
      suppressContentEditableWarning
      spellCheck={editing}
      role={editing ? 'textbox' : undefined}
      aria-multiline={editing ? multiline : undefined}
      onClick={(event: React.MouseEvent<HTMLElement>) => {
        if (!editing) return;
        event.preventDefault();
        event.stopPropagation();
      }}
      onKeyDown={(event: React.KeyboardEvent<HTMLElement>) => {
        if (event.key === 'Enter' && !multiline && !event.nativeEvent.isComposing) {
          event.preventDefault();
          event.currentTarget.blur();
        }
      }}
      onCompositionStart={() => { composing.current = true; }}
      onCompositionEnd={(event: React.CompositionEvent<HTMLElement>) => {
        composing.current = false;
        onChange(readEditableText(event.currentTarget));
      }}
      onInput={(event: React.FormEvent<HTMLElement>) => {
        if (!composing.current) onChange(readEditableText(event.currentTarget));
      }}
    >
      {initialText}
    </Component>
  );
}
