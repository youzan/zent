import * as React from 'react';
import noop from '../../utils/noop';

const XMLNS = 'http://www.w3.org/2000/svg';
const prefixCls = 'zent-datepicker-panel-header';
const transformMap = {
  left: '',
  right: 'matrix(-1 0 0 1 18 0)',
};
const Path = 'M10 11l-1 1-4-4-1-1 5-5 1 1-4 4 4 4z';

interface IArrowProps {
  onClick: () => void;
  type: 'left' | 'right';
}
const DoubleArrow: React.FC<IArrowProps> = ({ onClick, type }) => (
  <svg
    width="18"
    height="14"
    xmlns={XMLNS}
    className={`${prefixCls}-arrow`}
    onClick={onClick}
  >
    <g fillRule="evenodd" transform={transformMap[type]}>
      <path d={Path} />
      <path transform="translate(4)" d={Path} />
    </g>
  </svg>
);

const Arrow: React.FC<IArrowProps> = ({ onClick, type }) => (
  <svg
    width="18"
    height="14"
    xmlns={XMLNS}
    className={`${prefixCls}-arrow`}
    onClick={onClick}
  >
    <path d={Path} transform={transformMap[type]} />
  </svg>
);
interface ITitleProps {
  text: string | number;
  unit?: string;
  onClick?: () => void;
}

export const Title: React.FC<ITitleProps> = ({
  text,
  unit = '',
  onClick = noop,
}) => (
  <div className={`${prefixCls}-title_clickable`} onClick={onClick}>
    {text}
    {unit}
  </div>
);

interface IPanelHeaderProps {
  showSuper?: boolean;
  titleNode?: React.ReactNode;
  onPrev?: () => void;
  onNext?: () => void;
  onTitleClick?: () => void;
  onSuperPrev?: () => void;
  onSuperNext?: () => void;
}
const PanelHeader: React.FC<IPanelHeaderProps> = ({
  showSuper = false,
  titleNode,
  onPrev = noop,
  onNext = noop,
  onSuperPrev = noop,
  onSuperNext = noop,
}) => {
  return (
    <div className={prefixCls}>
      <div>
        {showSuper && <DoubleArrow onClick={onSuperPrev} type="left" />}
        <Arrow onClick={onPrev} type="left" />
      </div>
      <div className={`${prefixCls}-title`}>{titleNode}</div>
      <div>
        <Arrow onClick={onNext} type="right" />
        {showSuper && <DoubleArrow onClick={onSuperNext} type="right" />}
      </div>
    </div>
  );
};
export default PanelHeader;
