/* eslint-disable no-console */
import { Pop, BrandSdk, Notify, IThemeScene } from 'zent';
import { useEffect, useState } from 'react';
import { BlockPicker } from 'react-color';
import cx from 'classnames';

import './style.scss';

const { setAllBrandColor, generateBrands } = BrandSdk;

const colors = [
  '#ed6a18',
  '#ed9f18',
  '#edd418',
  '#bad415',
  '#5bd415',
  '#15d48e',
  '#15bad4',
  '#155bd4',
  '#412ad4',
  '#8e15d4',
  '#d415ba',
  '#d42f15',
];

const theme = {
  setTheme(value) {
    window.sessionStorage.setItem('zent-theme-color', value);
    const ev = new CustomEvent('theme-changed', { detail: value });
    document.dispatchEvent(ev);
  },

  getTheme() {
    return window.sessionStorage.getItem('zent-theme-color');
  },
};

export default function ThemeGenerator({
  label,
  prompt,
  onlyTrigger = false,
  className,
}) {
  const [color, setColor] = useState();
  const [calcColors, setCalcColors] = useState([]);

  const onChangeComplete = c => {
    setColor(c.hex);
    setCalcColors(generateBrands(c.hex));
    theme.setTheme(c.hex);

    setAllBrandColor(c.hex);

    console.group('getThemeColor');
    console.info(BrandSdk.getThemeColor());
    console.groupEnd();

    console.group('generateColors');
    console.table(BrandSdk.generateColors(c.hex));
    console.groupEnd();

    console.group('getBrandByScene');
    console.table(BrandSdk.getBrandByScene(IThemeScene.primaryHoverBg));
    console.groupEnd();

    console.group('getBrandColorByScene');
    console.table(
      BrandSdk.getBrandColorByScene(IThemeScene.primaryActiveBg, c.hex)
    );
    console.groupEnd();

    console.group('getAllBrandColor');
    console.table(BrandSdk.getAllBrandColor(c.hex));
    console.groupEnd();

    Notify.success('The theme has been changed');
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

  useEffect(() => {
    const sessionTheme = theme.getTheme();
    const currentTheme = BrandSdk.getThemeColor();
    if (sessionTheme !== currentTheme) {
      const nextTheme = sessionTheme || currentTheme;
      setColor(nextTheme);
      setCalcColors(generateBrands(nextTheme));
      setAllBrandColor(nextTheme);
    }
  }, []);

  useEffect(() => {
    const listener = function (e) {
      setColor(e.detail);
      setCalcColors(generateBrands(e.detail));
    };
    document.addEventListener('theme-changed', listener);
    return () => {
      document.removeEventListener('theme-changed', listener);
    };
  }, []);

  return (
    <>
      <div className={cx('zandoc-react-color', className)}>
        <Pop content={content()} trigger="click" position="bottom-center">
          <div
            className="zandoc-react-color-picker"
            style={{ background: color }}
          >
            {color}
          </div>
        </Pop>
      </div>
      {!onlyTrigger && (
        <>
          <span className="zandoc-react-color-picker-prompt">{prompt}</span>
          <p>{label}</p>
          <div className="zandoc-theme-colors">
            {calcColors.map(item => {
              return (
                <div className="zandoc-theme-item" key={item.color}>
                  <div
                    className="zandoc-theme-color"
                    style={{ background: item.color }}
                  >
                    {item.color}
                  </div>
                  <span>{item.scene}</span>
                </div>
              );
            })}
          </div>
        </>
      )}
    </>
  );
}
