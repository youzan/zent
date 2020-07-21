import * as React from 'react';
import { forwardRef } from 'react';

export interface ISelectSearchProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onIndexChange(delta: number): void;
  onEnter(): void;
  multiple?: boolean;
}

interface ISelectImperativeHandlers {
  focus: () => void;
}

/**
 * 多选时的最小搜索输入框宽度
 */
const MIN_SEARCH_INPUT_WIDTH = 10;

function SelectSearch(
  {
    placeholder,
    onChange,
    onIndexChange,
    onEnter,
    multiple,
    value,
  }: ISelectSearchProps,
  cmdRef: React.RefObject<ISelectImperativeHandlers>
) {
  const ref = React.useRef<HTMLInputElement>(null);
  const measureRef = React.useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = React.useState(0);

  React.useImperativeHandle(cmdRef, () => ({
    focus: () => {
      ref.current!.focus({
        preventScroll: true,
      });
    },
  }));

  React.useLayoutEffect(() => {
    ref.current!.focus({
      preventScroll: true,
    });
  }, []);

  // We measure width and set to the input immediately
  const mirrorValue = value || placeholder;
  React.useLayoutEffect(() => {
    setInputWidth(measureRef.current.scrollWidth);
  }, [mirrorValue]);

  return (
    <span
      className="zent-select-search-wrap"
      style={
        multiple
          ? { width: Math.max(inputWidth, MIN_SEARCH_INPUT_WIDTH) }
          : null
      }
    >
      <input
        ref={ref}
        placeholder={placeholder}
        className="zent-select-search"
        value={value}
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
        {mirrorValue}
      </span>
    </span>
  );
}

export default forwardRef(SelectSearch);
