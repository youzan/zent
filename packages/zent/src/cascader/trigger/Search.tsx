import { useRef } from 'react';
import { useIsomorphicLayoutEffect } from '../../utils/hooks/useIsomorphicLayoutEffect';

export interface ISearchInputProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

export function SearchInput(props: ISearchInputProps) {
  const ref = useRef<HTMLInputElement>(null);
  const { placeholder, value, onChange } = props;

  useIsomorphicLayoutEffect(() => {
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
