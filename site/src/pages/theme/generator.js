import { Pop, BrandSdk, Notify } from 'zent';
import { useState } from 'react';
import { BlockPicker } from 'react-color';

const { getAllBrandColor, generateBrands } = BrandSdk;

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

export default function ColorGenerator({ label, prompt }) {
  const [color, setColor] = useState('#155BD4');
  const [calcColors, setCalcColors] = useState(generateBrands('#155BD4'));

  const onChangeComplete = c => {
    setColor(c.hex);

    const brandVars = getAllBrandColor(c.hex);
    brandVars.forEach(item => {
      document.documentElement.style.setProperty(item.name, item.color);
    });

    setCalcColors(generateBrands(c.hex));
    Notify.success('it works! ');
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
    <>
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
      <span className="zandoc-react-color-picker-prompt">{prompt}</span>
      <p>{label}</p>
      <div className="zandoc-theme-colors">
        {calcColors.map(item => {
          return (
            <div className="zandoc-theme-item" key={item.color}>
              <div
                className="zandoc-theme-color"
                style={{ background: item.color }}
              />
              <span>{item.desc}</span>
            </div>
          );
        })}
      </div>
    </>
  );
}
