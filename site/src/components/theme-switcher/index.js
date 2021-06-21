/* eslint-disable no-console */
import { ColorPicker, ThemeSdk, Notify, ThemeScene } from 'zent';
import { useEffect, useState } from 'react';

import './style.scss';

const { generateTheme, applyTheme } = ThemeSdk;

const i18n = {
  'zh-CN': {
    prompt: '主题切换完成',
  },

  'en-US': {
    prompt: 'Theme has been changed',
  },
};

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

const scene = [
  ThemeScene.DefaultHoverBackgroundColor,
  ThemeScene.PrimaryHoverBackgroundColor,
  ThemeScene.PrimaryBackgroundColor,
  ThemeScene.PrimaryActiveBackgroundColor,
];

const sessionTheme = {
  primaryColor: '#155bd4',

  setTheme(value) {
    window.sessionStorage.setItem('zent-theme-color', value);
  },

  getTheme() {
    return window.sessionStorage.getItem('zent-theme-color');
  },
};

export default function ThemeSwitcher({ locale }) {
  const [color, setColor] = useState();

  const onChangeComplete = hex => {
    setColor(hex);
    sessionTheme.setTheme(hex);

    const theme = generateTheme({ colors: [{ baseColor: hex, scene }] });
    applyTheme(theme);

    Notify.success(i18n[locale].prompt);
  };

  useEffect(() => {
    const sessionThemeColor = sessionTheme.getTheme();
    const primaryThemeColor = sessionTheme.primaryColor;
    const nextThemColor = sessionThemeColor || primaryThemeColor;
    setColor(nextThemColor);
    if (nextThemColor !== primaryThemeColor) {
      const theme = generateTheme({
        colors: [{ baseColor: nextThemColor, scene }],
      });
      console.log('theme', theme);
      applyTheme(theme);
    }
  }, []);

  return (
    <>
      <span className="zandoc-react-theme-switcher">
        <ColorPicker
          color={color}
          type="simple"
          onChange={onChangeComplete}
          presetColors={colors}
        />
      </span>
    </>
  );
}
