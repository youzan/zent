import * as React from 'react';
import Icon from '../../icon';
import noop from '../../utils/noop';
const prefixCls = 'zent-date-picker-panel-header';
interface ITitleCommonNodeProps {
  text: string | number;
  unit?: string;
  onClick?: () => any;
}
export const TitleCommonNode: React.FC<ITitleCommonNodeProps> = ({
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
  onPrev?: () => any;
  onNext?: () => any;
  onTitleClick?: () => any;
  onSuperPrev?: () => any;
  onSuperNext?: () => any;
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
        {showSuper && <Icon type="left" onClick={onSuperPrev} />}
        <Icon type="left" onClick={onPrev} />
      </div>
      <div className={`${prefixCls}-title`}>{titleNode}</div>
      <div>
        <Icon type="right" onClick={onNext} />
        {showSuper && <Icon type="right" onClick={onSuperNext} />}
      </div>
    </div>
  );
};
export default PanelHeader;
