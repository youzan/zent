import cx from 'classnames';

import Button from '../../button';
import { Direction } from '../constants';
import { ITransferArrowButton } from '../types';
import Icon from '../../icon';

const ArrowButton: React.FC<ITransferArrowButton> = ({
  direction,
  onChange,
  disabled,
  prefix,
}) => {
  return (
    <Button
      type={disabled ? 'default' : 'primary'}
      disabled={disabled}
      onClick={onChange}
      className={`${prefix}__arrow__button`}
    >
      <Icon
        type={Direction.Right === direction ? 'right' : 'left'}
        className={cx(`${prefix}__arrow__icon`, {
          [`${prefix}__arrow__icon--disabled`]: disabled,
        })}
      />
    </Button>
  );
};

export default ArrowButton;
