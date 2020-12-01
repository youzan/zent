import cn from 'classnames';
import Icon from '../../../icon';

interface ISlideOperationProps {
  disablePrev: boolean;
  disableNext: boolean;
  onPrevChange: () => void;
  onNextChange: () => void;
}

function SlideOperation({
  disablePrev,
  disableNext,
  onPrevChange,
  onNextChange,
}: ISlideOperationProps) {
  return (
    <>
      <Icon
        type="left"
        className={cn({
          'icon-disabled': disablePrev,
        })}
        onClick={onPrevChange}
      />
      <Icon
        type="right"
        className={cn({
          'icon-disabled': disableNext,
        })}
        onClick={onNextChange}
      />
    </>
  );
}

export default SlideOperation;
