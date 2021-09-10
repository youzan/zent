import { forwardRef, useImperativeHandle, useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../../utils/hooks/useIsomorphicLayoutEffect';
import { runInNextFrame } from '../../utils/nextFrame';

export interface ISearchInputProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export interface ISearchInputImperativeHandlers {
  focus: () => void;
}

export const SearchInput = forwardRef<
  ISearchInputImperativeHandlers,
  ISearchInputProps
>((props, ref) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { placeholder, value, onChange } = props;

  useImperativeHandle(
    ref,
    () => ({
      focus: () => {
        runInNextFrame(() => {
          inputRef.current?.focus({ preventScroll: true });
        });
      },
    }),
    [inputRef]
  );

  useIsomorphicLayoutEffect(() => {
    inputRef.current.focus({
      preventScroll: true,
    });
  }, []);

  return (
    <input
      ref={inputRef}
      placeholder={placeholder}
      className="zent-cascader-v2--search"
      value={value}
      onChange={onChange}
    />
  );
});

SearchInput.displayName = 'SearchInput';
