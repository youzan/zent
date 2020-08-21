import * as React from 'react';

export interface ISearchTriggerProps {
  placeholder?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}

function SearchInput(props: ISearchTriggerProps) {
  const ref = React.useRef<HTMLInputElement>(null);
  const { placeholder, value, onChange } = props;

  React.useLayoutEffect(() => {
    ref.current!.focus({
      preventScroll: true,
    });
  }, []);

  return (
    <input
      ref={ref}
      placeholder={placeholder}
      className="zent-cascader--search"
      value={value}
      onChange={onChange}
    />
  );
}

export default React.memo(SearchInput);
