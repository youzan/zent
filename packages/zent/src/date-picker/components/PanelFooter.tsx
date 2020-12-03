interface IPanelFooterProps {
  leftNode?: React.ReactNode;
  rightNode: React.ReactNode;
}
const PanelFooter: React.FC<IPanelFooterProps> = ({
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
