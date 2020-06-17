import * as React from 'react';

interface IPanelFooterProps {
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}
const PanelFooter: React.FC<IPanelFooterProps> = ({
  rightNode = null,
  leftNode = null,
}) => {
  return (
    <div className="zent-date-picker-panel-footer">
      {rightNode}
      {leftNode}
    </div>
  );
};
export default PanelFooter;
