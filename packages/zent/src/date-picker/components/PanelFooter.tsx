import { FC, PropsWithChildren } from 'react';

interface IPanelFooterProps {
  leftNode?: React.ReactNode;
  rightNode: React.ReactNode;
}
const PanelFooter: FC<PropsWithChildren<IPanelFooterProps>> = ({
  rightNode,
  leftNode = null,
}) => {
  return (
    <div className="zent-datepicker-panel-footer">
      {rightNode}
      {leftNode}
    </div>
  );
};
export default PanelFooter;
