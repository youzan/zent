import * as React from 'react';
import cn from 'classnames';
import Icon from '../../../icon';

interface IFlipOperationProps {
  min: number;
  max: number;
  onChange: (target: number, disabled: boolean) => void;
}

function FlipOperation({ min, max, onChange }: IFlipOperationProps) {
  const disablePrev = !min;
  const disableNext = max === min;
  return (
    <>
      <Icon
        type="left"
        className={cn({
          'icon-disabled': disablePrev,
        })}
        onClick={() => onChange(min - 1, disablePrev)}
      />
      <Icon
        type="right"
        className={cn({
          'icon-disabled': disableNext,
        })}
        onClick={() => onChange(min + 1, disableNext)}
      />
    </>
  );
}

export default FlipOperation;
