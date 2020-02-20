import * as React from 'react';
import { Omit } from 'utility-types';
import DateRangeQuickPicker, {
  IDateRangeQuickPickerProps,
} from '../../date-range-quick-picker';
import { DatePickers } from '../../datetimepicker/common/types';
import {
  IFormComponentProps,
  dateRangeDefaultValueFactory,
  IFormFieldChildProps,
} from '../shared';
import { FormField } from '../Field';
import { $MergeParams } from '../utils';
import { useEventCallbackRef } from '../../utils/hooks/useEventCallbackRef';

export type IFormDateRangeQuickPickerFieldProps = IFormComponentProps<
  DatePickers.RangeValue,
  Omit<IDateRangeQuickPickerProps, 'value'>
>;

const DateRangeQuickPickerField: React.FC<{
  childProps: IFormFieldChildProps<DatePickers.RangeValue>;
  props: IFormDateRangeQuickPickerFieldProps;
}> = ({ childProps, props }) => {
  const [chosenDays, setChosenDays] = React.useState<number | undefined>(
    undefined
  );

  const onChangeRef = useEventCallbackRef(childProps.onChange);

  const onChange = React.useCallback(
    (value: DatePickers.RangeValue, chosenDays: number) => {
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

export const FormDateRangeQuickPickerField: React.FunctionComponent<IFormDateRangeQuickPickerFieldProps> = props => {
  return (
    <FormField
      {...props}
      defaultValue={
        (props as $MergeParams<IFormDateRangeQuickPickerFieldProps>)
          .defaultValue || dateRangeDefaultValueFactory
      }
    >
      {childProps => (
        <DateRangeQuickPickerField childProps={childProps} props={props} />
      )}
    </FormField>
  );
};
