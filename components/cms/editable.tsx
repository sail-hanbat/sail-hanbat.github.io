'use client';

import type { CSSProperties, ElementType } from 'react';
import { useRef } from 'react';
import { InlineText } from '@/components/cms/inline-text';
import { usePageContent } from '@/components/cms/page-content-provider';

export function EditableText({
  path,
  as = 'span',
  className,
  multiline = true,
  style,
}: {
  path: string;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  style?: CSSProperties;
}) {
  const { editMode, getValue, setValue } = usePageContent<unknown>();
  const value = String(getValue(path) ?? '');
  return (
    <InlineText
      as={as}
      className={className}
      style={style}
      multiline={multiline}
      editing={editMode}
      value={value}
      onChange={(nextValue) => setValue(path, nextValue)}
    />
  );
}

export function EditableImage({
  path,
  alt,
  className,
  wrapperClassName,
}: {
  path: string;
  alt: string;
  className?: string;
  wrapperClassName?: string;
}) {
  const { editMode, getImageUrl, selectImage, removeImage } = usePageContent<unknown>();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const src = getImageUrl(path);

  return (
    <div className={`cms-editable-image${wrapperClassName ? ` ${wrapperClassName}` : ''}`}>
      {/* Uploaded CMS images have runtime URLs and intentionally bypass next/image optimization. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      {src ? <img className={className} src={src} alt={alt} /> : <div className={`${className ?? ''} cms-image-placeholder`} aria-label="Image placeholder" />}
      {editMode && (
        <div className="cms-image-actions">
          <button type="button" onClick={() => inputRef.current?.click()}>{src ? 'Replace' : 'Add image'}</button>
          {src && <button type="button" onClick={() => removeImage(path)}>Remove</button>}
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,image/avif"
            onChange={(event) => {
              const file = event.target.files?.[0];
              if (file) selectImage(path, file);
              event.currentTarget.value = '';
            }}
          />
        </div>
      )}
    </div>
  );
}

export function InlineListControls({
  onAdd,
  onRemove,
  onMoveUp,
  onMoveDown,
}: {
  onAdd?: () => void;
  onRemove?: () => void;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
}) {
  const { editMode } = usePageContent<unknown>();
  if (!editMode) return null;

  return (
    <span className="cms-inline-controls" contentEditable={false}>
      {onMoveUp && <button type="button" aria-label="Move up" onClick={onMoveUp}>↑</button>}
      {onMoveDown && <button type="button" aria-label="Move down" onClick={onMoveDown}>↓</button>}
      {onAdd && <button type="button" aria-label="Add" onClick={onAdd}>＋</button>}
      {onRemove && <button type="button" aria-label="Remove" onClick={onRemove}>×</button>}
    </span>
  );
}

export function EditableUrl({ path, label = 'Link URL' }: { path: string; label?: string }) {
  const { editMode, getValue, setValue } = usePageContent<unknown>();
  if (!editMode) return null;
  return (
    <label className="cms-inline-url">
      <span>{label}</span>
      <input type="url" value={String(getValue(path) ?? '')} onChange={(event) => setValue(path, event.target.value)} />
    </label>
  );
}
