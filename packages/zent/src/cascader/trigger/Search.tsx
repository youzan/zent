import { useLayoutEffect, useRef } from 'react';

export interface ISearchInputProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchInput(props: ISearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { placeholder, value, onChange } = props;

  useLayoutEffect(() => {
    ref.current.focus({
      preventScroll: true,
    });
  }, []);

  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className="zent-cascader-v2--search"
      value={value}
      onChange={onChange}
    />
  );
}
