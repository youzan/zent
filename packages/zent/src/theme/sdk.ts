import { generateColorPalette } from './generator';
import { cssVarRef } from './css-var-ref';

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

const generateThemeRelation = (palette: IColor[], scene: ThemeScene) => {
  const sceneInfo = sceneVariableRelation[scene];
  if (!sceneInfo) return [];

  const cssVariableNames = cssVarRef?.[sceneInfo.variableName];
  if (!cssVariableNames) return [];
  const paletteIndex = sceneInfo.index;
  return cssVariableNames.map(cssVariableName => ({
    cssVariableName,
    color: palette[paletteIndex],
  }));
};

const checkHex = hex => {
  if (!hex) {
    throw new Error('hex is not defined');
  }
  return;
};
class ThemeSdk {
  static defaultTheme = ThemeSdk.generateTheme({
    colors: [{ baseColor: primaryColor, scene: ThemeScenes }],
  });

  static generatePalette(baseColor: IColor): IPalette {
    checkHex(baseColor);
    return generateColorPalette(baseColor);
  }

  static generateTheme(config: IThemeConfig): ITheme {
    const { colors } = config;

    const getSetOfOneThemeColor = (colorConfig: IThemeColorSceneConfig) => {
      const { baseColor, scene } = colorConfig;
      checkHex(baseColor);
      const palette = generateColorPalette(baseColor);
      let currentColors = [];
      if (scene instanceof Array) {
        currentColors = scene.reduce((theme, currentScene) => {
          return theme.concat(generateThemeRelation(palette, currentScene));
        }, []);
      } else {
        currentColors = generateThemeRelation(palette, scene);
      }
      return currentColors;
    };

    const themeColors: IThemeColor[] = colors.reduce(
      (preThemeColors, colorConfig) => {
        let currentColors = [];
        if ('scene' in colorConfig) {
          currentColors = getSetOfOneThemeColor(colorConfig);
        } else {
          currentColors = cssVarRef?.[
            colorConfig.variableName
          ]?.map(cssVariable => ({ color: colorConfig.color, cssVariable }));
        }

        return preThemeColors.concat(currentColors);
      },
      []
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
