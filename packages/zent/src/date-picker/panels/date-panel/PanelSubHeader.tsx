import { memo } from 'react';

interface IDateSubTitleProps {
  names: string[];
}
const PanelSubHeader: React.FC<IDateSubTitleProps> = ({ names }) => {
  return (
    <ul className="zent-datepicker-panel-sub_header">
      {names.map(item => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
};

export default memo(PanelSubHeader, () => true);
