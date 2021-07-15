module.exports = function (api) {
  api.cache(true);

  const nonDevPlugins = [
    'transform-remove-console',
    'transform-remove-debugger',
  ];
  const transpilePlugins = [...nonDevPlugins];

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // Don't include any polyfill
          useBuiltIns: false,
        },
      ],
      [
        '@babel/preset-react',
        {
          runtime: 'automatic',
        },
      ],
    ],

    plugins: [
      'transform-property-literals',
      'transform-member-expression-literals',
      '@babel/plugin-proposal-export-namespace-from',
      '@babel/plugin-proposal-export-default-from',
      '@babel/plugin-proposal-class-properties',
      [
        '@babel/plugin-transform-runtime',
        {
          corejs: false,
          helpers: true,
          regenerator: true,
          useESModules: false,
        },
      ],
    ],

    env: {
      production: {
        plugins: nonDevPlugins,
      },

      // Output using commonjs module
      transpile: {
        plugins: transpilePlugins,
      },

      // Output using ES module
      es: {
        presets: [
          [
            '@babel/preset-env',
            {
              // Don't include any polyfill
              useBuiltIns: false,

              // Don't transform modules
              modules: false,
            },
          ],
        ],

        plugins: [
          ...transpilePlugins,
          [
            '@babel/plugin-transform-runtime',
            {
              corejs: false,
              helpers: true,
              regenerator: true,

              // Use ES module
              useESModules: true,
            },
          ],
        ],
      },
    },
  };
};
