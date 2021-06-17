/* eslint-disable no-console */
import { ColorPicker, ThemeSdk, Notify } from 'zent';
import { useEffect, useState } from 'react';

import './style.scss';

const { setAllThemeColor } = ThemeSdk;

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

export default function ThemeSwitcher() {
  const [color, setColor] = useState();

  const onChangeComplete = hex => {
    setColor(hex);
    theme.setTheme(hex);

    setAllThemeColor(hex);

    Notify.success('The theme has been changed');
  };

  useEffect(() => {
    const sessionTheme = theme.getTheme();
    const currentTheme = ThemeSdk.getThemeColor();
    const nextTheme = sessionTheme || currentTheme;
    setColor(nextTheme);
    if (sessionTheme !== currentTheme) {
      setAllThemeColor(nextTheme);
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
