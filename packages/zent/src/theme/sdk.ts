import { generateColorPalette } from './generator';
import { cssVarRef as rawCssVarRef, cssRgbVarRef } from './css-var-ref';
import { hexToRGBString, IHexToRgbFn } from './utils';

const primaryColor = '#155bd4';

enum ThemeScene {
  DefaultHoverBackgroundColor,
  PrimaryHoverBackgroundColor,
  PrimaryBackgroundColor,
  PrimaryActiveBackgroundColor,
}

type IColor = string;

interface IThemeColor {
  cssVariableName: string;
  color: IColor;
}

interface IThemeColorSceneConfig {
  baseColor: IColor;
  scene: ThemeScene[] | ThemeScene;
}

interface IThemeColorVarConfig {
  color: IColor;
  variableName: string;
}

type IThemeColorConfig = IThemeColorSceneConfig | IThemeColorVarConfig;

interface IThemeConfig {
  colors: IThemeColorConfig[];
}

interface ITheme {
  colors: IThemeColor[];
}

type IPalette = IColor[];

interface ICssVarRef {
  [key: string]: string[];
}

const ThemeScenes = [
  ThemeScene.DefaultHoverBackgroundColor,
  ThemeScene.PrimaryHoverBackgroundColor,
  ThemeScene.PrimaryBackgroundColor,
  ThemeScene.PrimaryActiveBackgroundColor,
];

const themeRelation = [
  {
    index: 0,
    variableName: '$primary-100',
    scene: ThemeScene.DefaultHoverBackgroundColor,
  },
  {
    index: 1,
    variableName: '$primary-400',
    scene: ThemeScene.PrimaryHoverBackgroundColor,
  },
  {
    index: 2,
    variableName: '$primary-500',
    scene: ThemeScene.PrimaryBackgroundColor,
  },
  {
    index: 3,
    variableName: '$primary-600',
    scene: ThemeScene.PrimaryActiveBackgroundColor,
  },
];

const sceneVariableRelation = themeRelation.reduce((pre, item) => {
  pre[item.scene] = item;
  return pre;
}, {});

const generateThemeRelation = (
  palette: IColor[],
  scene: ThemeScene,
  cssVarRefs: ICssVarRef,
  colorHandleFn?: IHexToRgbFn
): IThemeColor[] => {
  const sceneInfo = sceneVariableRelation[scene];
  if (!sceneInfo) return [];

  const cssVariableNames = cssVarRefs?.[sceneInfo.variableName];
  if (!cssVariableNames) return [];
  const paletteIndex = sceneInfo.index;

  return cssVariableNames.map(cssVariableName => ({
    cssVariableName,
    color: colorHandleFn
      ? colorHandleFn(palette[paletteIndex])
      : palette[paletteIndex],
  }));
};

class ThemeSdk {
  static defaultTheme = ThemeSdk.generateTheme({
    colors: [{ baseColor: primaryColor, scene: ThemeScenes }],
  });

  static generatePalette(baseColor: IColor): IPalette {
    if (!baseColor) return [];
    return generateColorPalette(baseColor);
  }

  static generateTheme(config: IThemeConfig): ITheme {
    const { colors } = config;

    const getSetOfOneThemeColor = (
      colorConfig: IThemeColorSceneConfig,
      cssVarRefs: ICssVarRef,
      colorHandleFn?: IHexToRgbFn
    ) => {
      const { baseColor, scene } = colorConfig;
      if (!baseColor) return [];
      const palette = generateColorPalette(baseColor);
      let currentColors: IThemeColor[] = [] as IThemeColor[];
      if (Array.isArray(scene)) {
        currentColors = scene.reduce((theme, currentScene) => {
          return theme.concat(
            generateThemeRelation(
              palette,
              currentScene,
              cssVarRefs,
              colorHandleFn
            )
          );
        }, []);
      } else {
        currentColors = generateThemeRelation(
          palette,
          scene,
          cssVarRefs,
          colorHandleFn
        );
      }
      return currentColors;
    };

    const getThemeColors = (
      cssVarRefs: ICssVarRef,
      colorHandleFn?: IHexToRgbFn
    ) => {
      return colors.reduce((preThemeColors, colorConfig) => {
        let currentColors = [];
        if ('scene' in colorConfig) {
          currentColors = getSetOfOneThemeColor(
            colorConfig,
            cssVarRefs,
            colorHandleFn
          );
        } else {
          currentColors = cssVarRefs?.[colorConfig.variableName]?.map(
            cssVariable => ({
              color: colorHandleFn
                ? colorHandleFn(colorConfig.color)
                : colorConfig.color,
              cssVariable,
            })
          );
        }

        return preThemeColors.concat(currentColors);
      }, []);
    };

    const themeColors: IThemeColor[] = getThemeColors(rawCssVarRef).concat(
      getThemeColors(cssRgbVarRef, hexToRGBString)
    );

    return { colors: themeColors };
  }

  static applyTheme(theme: ITheme) {
    const { colors } = theme;
    colors.forEach(item => {
      document.documentElement.style.setProperty(
        item.cssVariableName,
        item.color
      );
    });
  }
}

export { ThemeScene, ThemeSdk };
