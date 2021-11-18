import noop from '../../utils/noop';
import Icon from '../../icon';

// const XMLNS = 'http://www.w3.org/2000/svg';
// const transformMap = {
//   left: '',
//   right: 'matrix(-1 0 0 1 18 0)',
// };
// const Path = 'M10 11l-1 1-4-4-1-1 5-5 1 1-4 4 4 4z';

const prefixCls = 'zent-datepicker-panel-header';
interface IArrowProps {
  onClick: () => void;
  type: 'left' | 'right';
}
// const DoubleArrow: React.FC<IArrowProps> = ({ onClick, type }) => (
//   <svg
//     width="14"
//     height="14"
//     xmlns={XMLNS}
//     className={`${prefixCls}-arrow`}
//     onClick={onClick}
//   >
//     <g fillRule="evenodd" transform={transformMap[type]}>
//       <path d={Path} />
//       <path transform="translate(4)" d={Path} />
//     </g>
//   </svg>
// );
//
// const Arrow: React.FC<IArrowProps> = ({ onClick, type }) => (
//   <svg
//     width="14"
//     height="14"
//     xmlns={XMLNS}
//     className={`${prefixCls}-arrow`}
//     onClick={onClick}
//   >
//     <path d={Path} transform={transformMap[type]} />
//   </svg>
// );

const DoubleIconArrow: React.FC<IArrowProps> = ({ onClick, type }) => (
  <Icon
    type={type === 'left' ? 'double-last' : 'double-next'}
    onClick={onClick}
    className={`${prefixCls}-arrow`}
  />
);

const IconArrow: React.FC<IArrowProps> = ({ onClick, type }) => (
  <Icon type={type} onClick={onClick} className={`${prefixCls}-arrow`} />
);

interface ITitleProps {
  text: string | number;
  unit?: string;
  onClick?: () => void;
}

export const Title: React.FC<ITitleProps> = ({ text, unit = '', onClick }) => (
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
const PanelHeader: React.FC<IPanelHeaderProps> = ({
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
