module.exports = function(api) {
  api.cache(true);

  const envSpecificPlugins =
    process.env.NODE_ENV === 'development'
      ? ['react-loadable/babel', 'react-hot-loader/babel']
      : [];

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: 'entry',
          corejs: 3,
        },
      ],
      '@babel/preset-react',
    ],

    plugins: [
      'transform-property-literals',
      'transform-member-expression-literals',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-syntax-dynamic-import',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
      ...envSpecificPlugins,
    ],
  };
};
