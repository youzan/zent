import { generate } from './generator';
import { themeRefs } from './theme-ref';

const brandVars = [
  {
    index: 0,
    var: '$primary-100',
    desc: 'lingter hover color',
  },
  {
    index: 1,
    var: '$primary-400',
    desc: 'primary hover color',
  },
  {
    index: 2,
    var: '$primary-500',
    desc: 'primary color',
  },
  {
    index: 3,
    var: '$primary-600',
    desc: 'primary active color',
  },
];

const getBrandVars = (Vars, color) => {
  if (Vars && Vars.length) {
    return Vars.map(nameVar => ({
      name: `--${nameVar}`,
      color,
    }));
  }
  return [];
};

export const BrandSdk = {
  getAllColorRefs() {
    return themeRefs;
  },
  getAllBrandColor(hex) {
    const calcColors = generate(hex);
    return brandVars.reduce((pre, current) => {
      return pre.concat(
        getBrandVars(themeRefs[current.var], calcColors[current.index])
      );
    }, []);
  },

  getBrandColor(name) {
    return themeRefs?.[name] || [];
  },

  generateBrands(hex) {
    const calcColors = generate(hex);
    return brandVars.reduce((pre, current) => {
      return pre.concat({ ...current, color: calcColors[current.index] });
    }, []);
  },
};
