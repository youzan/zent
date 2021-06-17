import { generate } from './generator';
import { cssVarRef } from './css-var-ref';

export enum IThemeScene {
  defaultHoverBg = '--theme-default-hover-bg',
  primaryHoverBg = '--theme-primary-hover-bg',
  primaryBg = '--theme-primary-bg',
  primaryActiveBg = '--theme-primary-active-bg',
}

export interface IThemeItem {
  color: string; // color hex value
  name: string; // color css variable name
}

interface IExtraThemeInfo {
  index: number;
  var: string; // css variable
  scene: IThemeScene; // scene
}

export type IThemeAllItem = IThemeItem & IExtraThemeInfo;

type IGetThemeVars = (
  vars: string[],
  color: string,
  origin?: IExtraThemeInfo
) => Array<IThemeItem | IThemeAllItem>;

export interface IThemeSdk {
  getThemeColor: () => string; // hex
  generateColors: (hex: string) => string[];
  getThemeColorByScene: (scene: IThemeScene, hex: string) => IThemeItem[];
  getAllThemeColor: (hex: string) => IThemeAllItem[];
  setThemeColorByScene: (scene: IThemeScene, hex: string) => void;
  setAllThemeColor: (hex: string) => void;
}

const themeRelation = [
  {
    index: 0,
    var: '$primary-100',
    scene: IThemeScene.defaultHoverBg,
    desc: 'lighter hover bg',
  },
  {
    index: 1,
    var: '$primary-400',
    scene: IThemeScene.primaryHoverBg,
    desc: 'primary hover bg',
  },
  {
    index: 2,
    var: '$primary-500',
    scene: IThemeScene.primaryBg,
    desc: 'primary bg',
  },
  {
    index: 3,
    var: '$primary-600',
    scene: IThemeScene.primaryActiveBg,
    desc: 'primary active bg',
  },
];

const nameAndVar = themeRelation.reduce((pre, item) => {
  pre[item.scene] = item.var;
  return pre;
}, {});

const getThemeVars: IGetThemeVars = (Vars, color, origin) => {
  if (Vars && Vars.length) {
    return Vars.map(nameVar => ({
      ...origin,
      name: nameVar,
      color,
    }));
  }
  return [];
};

const getAllThemeColor = (hex: string) => {
  checkHex(hex);
  const calcColors = generate(hex);
  return themeRelation.reduce((pre, current) => {
    return pre.concat(
      getThemeVars(cssVarRef[current.var], calcColors[current.index], current)
    );
  }, []);
};

const getThemeByScene: (scene: IThemeScene) => Array<string> = scene => {
  return cssVarRef?.[nameAndVar?.[scene]] || [];
};

const getThemeColorByScene = (scene: IThemeScene, hex: string) => {
  const themeVars = getThemeByScene(scene);
  const colors = generate(hex);
  const colorInfo = themeRelation.find(item => scene === item.scene);
  return getThemeVars(themeVars, colors[colorInfo.index]);
};

const generateColors = (hex: string) => {
  checkHex(hex);
  return generate(hex);
};

const setAllThemeColor = (hex: string) => {
  checkHex(hex);
  const themeVars = getAllThemeColor(hex);
  themeVars.forEach(item => {
    document.documentElement.style.setProperty(item.name, item.color);
  });
};

const setThemeColorByScene = (scene: IThemeScene, hex: string) => {
  checkHex(hex);
  const themeVars = getThemeColorByScene(scene, hex);
  const colors = generate(hex);
  const colorInfo = themeRelation.find(item => scene === item.scene);
  themeVars.forEach(item => {
    document.documentElement.style.setProperty(
      item.name,
      colors[colorInfo.index]
    );
  });
};

const checkHex = hex => {
  if (!hex) {
    throw new Error('hex is not defined');
  }
  return;
};

const primaryColor = '#155bd4';

export const ThemeSdk: IThemeSdk = {
  getThemeColor() {
    return (
      document.documentElement.style.getPropertyValue('--primary-bg') ||
      primaryColor
    );
  },

  generateColors,

  getThemeColorByScene,

  getAllThemeColor,

  setAllThemeColor,

  setThemeColorByScene,
};
