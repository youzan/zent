import * as React from 'react';
import Checkbox from '../../checkbox';
import Pop from '../../pop';
import { IGridInnerSelectionProps } from '../types';

export default function SelectionCheckbox<Data>(
  props: IGridInnerSelectionProps<Data>
) {
  const { disabled, reason, render, record, rowIndex } = props;
  if (render) {
    return <>{render(record, rowIndex)}</>;
  }
  if (disabled && reason) {
    return (
      <Pop trigger="hover" position="top-left" centerArrow content={reason}>
        <Checkbox disabled {...props} />
      </Pop>
    );
  }
  return <Checkbox {...props} />;
}
