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
  return (
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
  );
}

export default SelectSearch;
