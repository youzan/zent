import { Pop, changeThemeColor, Notify } from 'zent';
import { useState } from 'react';
import { BlockPicker } from 'react-color';

const colors = [
  '#ED6A18',
  '#ED9F18',
  '#EDD418',
  '#BAD415',
  '#5BD415',
  '#15D48E',
  '#15BAD4',
  '#155BD4',
  '#412AD4',
  '#8E15D4',
  '#D415BA',
  '#D42F15',
];

export default function ColorGenerator() {
  const [color, setColor] = useState('#155BD4');

  const onChangeComplete = c => {
    setColor(c.hex);
    changeThemeColor(c.hex, () => Notify.success('works!'));
  };

  const content = () => {
    return (
      <BlockPicker
        color={color}
        colors={colors}
        onChangeComplete={onChangeComplete}
      />
    );
  };

  return (
    <div className="zandoc-react-color">
      <Pop content={content()} trigger="click" position="bottom-center">
        <div
          className="zandoc-react-color-picker"
          style={{ background: color }}
        >
          {color}
        </div>
      </Pop>
    </div>
  );
}
