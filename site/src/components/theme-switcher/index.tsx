// eslint-disable-next-line import/no-extraneous-dependencies
import { ColorPicker, Notify } from 'zent';
// eslint-disable-next-line import/no-extraneous-dependencies
import ThemeCssVars from 'zent/theme-css-vars.json';
import { ThemeSdk, ThemeScene } from '@zent/theme-sdk';
import { useEffect, useState } from 'react';

import './style.scss';
import { Locale } from '../../types';

const { generateTheme, applyTheme } = ThemeSdk;

const i18n = {
  'zh-CN': {
    prompt: '主题色已更新',
  },

  'en-US': {
    prompt: 'Theme color has been update',
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

const DEFAULT_THEME_COLOR = '#155bd4';

const sessionTheme = {
  setTheme(value: string) {
    window.sessionStorage.setItem('zent-theme-color', value);

    // Notify theme change in demos
    const evt = new CustomEvent('zent-theme-change', { detail: value });
    window.dispatchEvent(evt);
  },

  getTheme() {
    return (
      window.sessionStorage.getItem('zent-theme-color') ?? DEFAULT_THEME_COLOR
    );
  },
};

interface IThemeSwitcherProps {
  locale: Locale;
}

export default function ThemeSwitcher({ locale }: IThemeSwitcherProps) {
  const [color, setColor] = useState<string>(sessionTheme.getTheme());

  const onChangeComplete = (hex: string) => {
    setColor(hex);
    sessionTheme.setTheme(hex);

    const theme = generateTheme(
      { colors: [{ baseColor: hex, scene }] },
      ThemeCssVars
    );
    applyTheme(theme);

    Notify.success(i18n[locale].prompt);
  };

  useEffect(() => {
    const nextThemColor = sessionTheme.getTheme();
    if (nextThemColor !== DEFAULT_THEME_COLOR) {
      const theme = generateTheme(
        {
          colors: [{ baseColor: nextThemColor, scene }],
        },
        ThemeCssVars
      );
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
          className="zandoc-react-theme-switcher-picker"
        />
      </span>
    </>
  );
}
