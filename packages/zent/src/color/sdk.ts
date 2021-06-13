import { generate } from './generator';
import { themeRefs } from './theme-ref';

export enum IThemeScene {
  defaultHoverBg = 'default-hover-bg',
  primaryHoverBg = 'primary-hover-bg',
  primaryBg = 'primary-bg',
  primaryActiveBg = 'primary-active-bg',
}

export interface IBrandItem {
  color: string; // color hex value
  name: string; // color css variable name
}
export interface IBrandAllItem extends IBrandItem {
  index: number;
  var: string; // css variable
  scene: IThemeScene; // scene
}

type IGetBrandVars = (vars: string[], color: string) => Array<IBrandItem>;
export interface IBrandSdk {
  primaryColor: string;
  getThemeColor: () => string; // hex
  generateColors: (hex: string) => string[];
  generateBrands: (hex: string) => IBrandAllItem[];
  getBrandByScene: (scene: IThemeScene) => Array<string>;
  getBrandColorByScene: (scene: IThemeScene, hex: string) => IBrandItem[];
  getAllBrandColor: (hex: string) => IBrandAllItem[];
  setBrandColorByScene: (scene: IThemeScene, hex: string) => void;
  setAllBrandColor: (hex: string) => void;
}

const brandRelation = [
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

const nameAndVar = brandRelation.reduce((pre, item) => {
  pre[item.scene] = item.var;
  return pre;
}, {});

const getBrandVars: IGetBrandVars = (Vars, color) => {
  if (Vars && Vars.length) {
    return Vars.map(nameVar => ({
      name: `--${nameVar}`,
      color,
    }));
  }
  return [];
};

const getAllBrandColor = (hex: string) => {
  checkHex(hex);
  const calcColors = generate(hex);
  return brandRelation.reduce((pre, current) => {
    return pre.concat(
      getBrandVars(themeRefs[current.var], calcColors[current.index])
    );
  }, []);
};

const getBrandByScene = (scene: IThemeScene) => {
  return themeRefs?.[nameAndVar?.[scene]] || [];
};

const getBrandColorByScene = (scene: IThemeScene, hex: string) => {
  const brandVars = getBrandByScene(scene);
  const colors = generate(hex);
  const colorInfo = brandRelation.find(item => scene === item.scene);
  return getBrandVars(brandVars, colors[colorInfo.index]);
};

const checkHex = hex => {
  if (!hex) {
    throw new Error('hex is not defined');
  }
  return;
};

export const BrandSdk: IBrandSdk = {
  primaryColor: '#155bd4',

  getBrandByScene,

  getBrandColorByScene,

  getAllBrandColor,

  getThemeColor() {
    return (
      document.documentElement.style.getPropertyValue('--primary-bg') ||
      this.primaryColor
    );
  },

  generateBrands(hex) {
    checkHex(hex);
    const calcColors = generate(hex);
    return brandRelation.reduce((pre, current) => {
      return pre.concat({ ...current, color: calcColors[current.index] });
    }, []);
  },

  generateColors(hex: string) {
    checkHex(hex);
    return generate(hex);
  },

  setAllBrandColor(hex: string) {
    checkHex(hex);
    const brandVars = getAllBrandColor(hex);
    brandVars.forEach(item => {
      document.documentElement.style.setProperty(item.name, item.color);
    });
  },

  setBrandColorByScene(scene: IThemeScene, hex: string) {
    checkHex(hex);
    const brandVars = getBrandColorByScene(scene, hex);
    const colors = generate(hex);
    const colorInfo = brandRelation.find(item => scene === item.scene);
    brandVars.forEach(item => {
      document.documentElement.style.setProperty(
        item.name,
        colors[colorInfo.index]
      );
    });
  },
};
