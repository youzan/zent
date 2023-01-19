import noop from '../../utils/noop';
import Icon from '../../icon';
import { FC, PropsWithChildren } from 'react';

const prefixCls = 'zent-datepicker-panel-header';
interface IArrowProps {
  onClick: () => void;
  type: 'left' | 'right';
}

const DoubleIconArrow: FC<PropsWithChildren<IArrowProps>> = ({
  onClick,
  type,
}) => (
  <Icon
    type={type === 'left' ? 'double-last' : 'double-next'}
    onClick={onClick}
    className={`${prefixCls}-arrow`}
  />
);

const IconArrow: FC<PropsWithChildren<IArrowProps>> = ({ onClick, type }) => (
  <Icon type={type} onClick={onClick} className={`${prefixCls}-arrow`} />
);

interface ITitleProps {
  text: string | number;
  unit?: string;
  onClick?: () => void;
}

export const Title: FC<PropsWithChildren<ITitleProps>> = ({
  text,
  unit = '',
  onClick,
}) => (
  <div className={`${prefixCls}-title_clickable`} onClick={onClick}>
    {text}
    {unit}
  </div>
);

interface IPanelHeaderProps {
  showSuper?: boolean;
  titleNode?: React.ReactNode;
  combinedLeft?: boolean;
  combinedRight?: boolean;
  onPrev: () => void;
  onNext: () => void;
  onSuperPrev?: () => void;
  onSuperNext?: () => void;
}
const PanelHeader: FC<PropsWithChildren<IPanelHeaderProps>> = ({
  showSuper = false,
  titleNode,
  combinedLeft,
  combinedRight,
  onPrev,
  onNext,
  onSuperPrev = noop,
  onSuperNext = noop,
}) => {
  return (
    <div className={prefixCls}>
      <div className={`${prefixCls}-btns`}>
        {!combinedRight && (
          <>
            {showSuper && <DoubleIconArrow onClick={onSuperPrev} type="left" />}
            <IconArrow onClick={onPrev} type="left" />
          </>
        )}
      </div>
      <div className={`${prefixCls}-title`}>{titleNode}</div>
      <div className={`${prefixCls}-btns`}>
        {!combinedLeft && (
          <>
            <IconArrow onClick={onNext} type="right" />
            {showSuper && (
              <DoubleIconArrow onClick={onSuperNext} type="right" />
            )}
          </>
        )}
      </div>
    </div>
  );
};
export default PanelHeader;
