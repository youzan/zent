import * as React from 'react';

export interface ISelectSearchProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  onIndexChange(delta: number): void;
  onEnter(): void;
}

function SelectSearch({
  placeholder,
  value,
  onChange,
  onIndexChange,
  onEnter,
}: ISelectSearchProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  React.useLayoutEffect(() => {
    ref.current!.focus({
      preventScroll: true,
    });
  }, []);
  const onKeyDown = React.useCallback<
    React.KeyboardEventHandler<HTMLInputElement>
  >(
    e => {
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
  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className="zent-select-search"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
    />
  );
}

export default SelectSearch;
