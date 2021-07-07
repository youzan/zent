import {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useLayoutEffect,
  useRef,
} from 'react';
import cx from 'classnames';
import { createUseIMEComposition } from '../ime-composition';

export interface ISelectSearchProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onIndexChange(delta: number): void;
  onEnter(): void;
  autoWidth?: boolean;
}

interface ISelectImperativeHandlers {
  focus: () => void;
}

const useIMEComposition = createUseIMEComposition();

function SelectSearch(
  {
    placeholder,
    onChange: onChangeProp,
    onIndexChange,
    onEnter,
    autoWidth,
    value: valueProp,
  }: ISelectSearchProps,
  cmdRef: React.ForwardedRef<ISelectImperativeHandlers>
) {
  const ref = useRef<HTMLInputElement>(null);
  const focusSearchInput = useCallback(() => {
    ref.current.focus({
      preventScroll: true,
    });
  }, [ref]);

  const handleKeyboardNav = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
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
    },
    [onIndexChange, onEnter]
  );

  useImperativeHandle(cmdRef, () => ({
    focus: () => {
      focusSearchInput();
    },
  }));

  const { onChange, onCompositionEnd, onCompositionStart, value } =
    useIMEComposition(valueProp, onChangeProp);

  useLayoutEffect(() => {
    focusSearchInput();
  }, [focusSearchInput]);

  // We measure width and set to the input immediately
  const mirrorValue = value || placeholder;
  const searchClass = cx('zent-select-v2-search-wrap', {
    'zent-select-v2-search-wrap-auto-width': autoWidth,
  });

  return (
    <span className={searchClass}>
      <input
        ref={ref}
        placeholder={placeholder}
        className="zent-select-v2-search"
        value={value}
        onChange={onChange}
        onCompositionStart={onCompositionStart}
        onCompositionEnd={onCompositionEnd}
        onKeyDown={handleKeyboardNav}
      />
      {/* Measure Node */}
      {autoWidth && (
        <p className="zent-select-v2-search-mirror" aria-hidden>
          {mirrorValue}
        </p>
      )}
    </span>
  );
}

export default forwardRef(SelectSearch);
