import * as React from 'react';
import { ISelectItem } from './Select';
import { forwardRef } from 'react';

export interface ISelectSearchProps {
  placeholder?: string;
  keyword: string;
  value: null | ISelectItem | ISelectItem[];
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onIndexChange(delta: number): void;
  onEnter(): void;
  multiple?: boolean;
}

function SelectSearch(
  {
    placeholder,
    keyword,
    onChange,
    onIndexChange,
    onEnter,
    multiple,
    value,
  }: ISelectSearchProps,
  cmdRef
) {
  const ref = React.useRef<HTMLInputElement>(null);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = React.useState(0);

  React.useLayoutEffect(() => {
    ref.current!.focus({
      preventScroll: true,
    });
  }, [value]);

  React.useImperativeHandle(cmdRef, () => ({
    focus: () => {
      ref.current!.focus({
        preventScroll: true,
      });
    },
  }));

  // We measure width and set to the input immediately
  const mirrorValue = keyword || placeholder;
  React.useLayoutEffect(() => {
    setInputWidth(measureRef.current.scrollWidth);
  }, [mirrorValue]);

  return (
    <span
      className="zent-select-search-wrap"
      style={multiple ? { width: inputWidth } : null}
    >
      <input
        ref={ref}
        placeholder={placeholder}
        className="zent-select-search"
        value={keyword}
        onChange={onChange}
        onKeyDown={e => {
          switch (e.key) {
            case 'ArrowUp':
              onIndexChange(-1);
              break;
            case 'ArrowDown':
              onIndexChange(1);
              break;
            case 'Enter':
              onEnter();
              break;
            default:
              break;
          }
        }}
      />
      {/* Measure Node */}
      <span ref={measureRef} className="zent-select-search-mirror" aria-hidden>
        {mirrorValue}&nbsp;
      </span>
    </span>
  );
}

export default forwardRef(SelectSearch);
