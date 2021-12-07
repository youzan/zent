import Select from './Select';
import { useMemo, useCallback } from 'react';

export const KeySelect = ({ value, onChange, options, ...restProps }) => {
  const validValue = useMemo(() => {
    if (!Array.isArray(value)) {
      const item = options.find(v => v.key === value);
      if (item) {
        return {
          key: value,
          text: item.text,
        };
      }
      return null;
    }
    return value.reduce((key, old) => {
      const item = options.find(v => v.key === key);
      if (!item) {
        return old;
      }
      const v = {
        key: value,
        text: item.text,
      };
      old.push(v);
      return old;
    }, []);
  }, [options, value]);
  const keysOnChange = useCallback(
    value => {
      if (!Array.isArray(value)) {
        if (!value) {
          return onChange(value);
        }
        return onChange(value.key);
      }
      return onChange(value.map(v => v.key));
    },
    [onChange]
  );
  return (
    <Select
      value={validValue}
      onChange={keysOnChange}
      options={options}
      {...restProps}
    />
  );
};
