import { generate } from './generator';
import { themeRefs } from './theme-ref';

const brandVars = [
  {
    index: '1',
    var: '$primary-100',
  },
  {
    index: '2',
    var: '$primary-200',
  },
  {
    index: '3',
    var: '$primary-300',
  },
  {
    index: '4',
    var: '$primary-400',
  },
  {
    index: '5',
    var: '$primary-500',
  },
];

// todo move size out
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
    return generate(hex);
  },
};
