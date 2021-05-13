import { generate, toHex } from './generator';
import { themeRefs } from './theme-ref';
import { inputToRGB } from '@ctrl/tinycolor';

// todo move size out
const setBrandVars = (Vars, color) => {
  return Vars.map(nameVar => {
    document.documentElement.style.setProperty('--brand-' + nameVar, color);
  });
};

export const BrandSdk = {
  changeAllBrandColor(hex, cb) {
    const calcColors = generate(hex);
    setBrandVars(themeRefs['$brand-primary-default'], calcColors.default);
    setBrandVars(themeRefs['$brand-primary-hover'], calcColors.hover);
    setBrandVars(themeRefs['$brand-primary-active'], calcColors.active);
    cb && cb();
  },

  changeBrandColor(name, color, cb) {
    const pColor = inputToRGB(color);
    document.documentElement.style.setProperty(
      '--brand-' + name,
      toHex(pColor)
    );
    cb && cb();
  },

  changeSize(type, name, size) {
    document.documentElement.style.setProperty('--size-' + type + name, size);
  },

  changeFontSize(name, size, cb) {
    this.changeSize('font-size', name, size);
    cb && cb();
  },

  changeLingHeightSize(name, size, cb) {
    this.changeSize('line-height', name, size);
    cb && cb();
  },

  changeSpacingSize(name, size, cb) {
    this.changeSize('spacing', name, size);
    cb && cb();
  },

  changeBorderRadiusSize(name, size, cb) {
    this.changeSize('border-radius', name, size);
    cb && cb();
  },

  changeBorderWidthSize(name, size, cb) {
    this.changeSize('border-width', name, size);
    cb && cb();
  },
};
