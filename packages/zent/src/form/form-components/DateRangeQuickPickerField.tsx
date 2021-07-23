import { useCallback, useState } from 'react';

import DateRangeQuickPicker, {
  DateRangeQuickPickerPresetValue,
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import {
  IFormComponentProps,
  dateRangeDefaultValueFactory,
  IFormFieldChildProps,
} from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';
import { RangeDate } from '../../date-picker';

export type IFormDateRangeQuickPickerFieldProps = IFormComponentProps<
  RangeDate,
  Omit<IDateRangeQuickPickerProps, 'value'>
>;

const DateRangeQuickPickerField: React.FC<{
  childProps: IFormFieldChildProps<RangeDate>;
  props: IFormDateRangeQuickPickerFieldProps;
}> = ({ childProps, props }) => {
  const [chosenDays, setChosenDays] = useState<
    DateRangeQuickPickerPresetValue | undefined
  >(undefined);

  const onChangeRef = useEventCallbackRef(childProps.onChange);

  const onChange = useCallback(
    (value: RangeDate, chosenDays: DateRangeQuickPickerPresetValue) => {
      onChangeRef.current?.(value);
      setChosenDays(chosenDays);
    },
    [onChangeRef]
  );

  return (
    <DateRangeQuickPicker
      {...props.props}
      {...childProps}
      chosenDays={chosenDays}
      onChange={onChange}
    />
  );
};

export const FormDateRangeQuickPickerField: React.FC<IFormDateRangeQuickPickerFieldProps> =
  props => {
    return (
      <FormField
        {...props}
        defaultValue={
          (props as $MergeParams<IFormDateRangeQuickPickerFieldProps>)
            .defaultValue ?? dateRangeDefaultValueFactory
        }
      >
        {childProps => (
          <DateRangeQuickPickerField childProps={childProps} props={props} />
        )}
      </FormField>
    );
  };
