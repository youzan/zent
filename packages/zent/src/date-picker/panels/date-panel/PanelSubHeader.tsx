import * as React from 'react';
interface IDateSubTitleProps {
  names: string[];
}
const PanelSubHeader: React.FC<IDateSubTitleProps> = ({ names }) => {
  return (
    <ul className="zent-date-picker-panel-sub_header">
      {names.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
export default React.memo(PanelSubHeader, () => true);
