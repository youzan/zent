import Select, { ISelectCommonProps } from './Select';
import { useMemo, useCallback } from 'react';

type IValueType = number | string;
type IValue = IValueType | IValueType[] | null;

interface ISelectProps extends ISelectCommonProps {
  value?: IValue;
  onChange?: (value: IValue) => void;
}

export const KeySelect = ({
  value = null,
  onChange,
  options,
  ...restProps
}: ISelectProps) => {
  const validValue = useMemo(() => {
    if (value === null) {
      return null;
    }
    if (!Array.isArray(value)) {
      const item = options.find(v => v.key === value);
      if (item) {
        return {
          key: value,
          text: item.text,
        };
      }
      return {
        key: value,
        text: value,
      };
    }
    return value.reduce((old, key) => {
      const item = options.find(v => v.key === key);
      if (item) {
        const v = {
          key,
          text: item.text,
        };
        old.push(v);
      }
      return old;
    }, []);
  }, [options, value]);
  const keysOnChange = useCallback(
    value => {
      if (value === null) {
        return onChange(null);
      }
      if (!Array.isArray(value)) {
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
