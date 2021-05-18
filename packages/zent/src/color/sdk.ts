import { generate } from './generator';
import { themeRefs } from './theme-ref';

const brandVars = [
  {
    name: 'default',
    var: '$brand-primary-color',
  },
  {
    name: 'hover',
    var: '$brand-primary-hover-color',
  },
  {
    name: 'active',
    var: '$brand-primary-active-color',
  },
];

// todo move size out
const getBrandVars = (Vars, color) => {
  return Vars.map(nameVar => ({
    name: `--${nameVar}`,
    color,
  }));
};

export const BrandSdk = {
  getAllBrandColor(hex) {
    const calcColors = generate(hex);
    return brandVars.reduce((pre, current) => {
      return pre.concat(
        getBrandVars(themeRefs[current.var], calcColors[current.name])
      );
    }, []);
  },

  getBrandColor(name) {
    return themeRefs?.[name] || [];
  },
};
