const path = require('path');
const fs = require('fs');
const trimStart = require('lodash/trimStart');

const C_GREY = '\x1b[90;40m';
const C_RESET = '\x1b[0m';

function grey(msg) {
  return `${C_GREY}${msg}${C_RESET}`;
}

module.exports = function(api) {
  api.cache(true);

  const packagesDir = path.resolve(__dirname, './src');
  const packages = fs
    .readdirSync(packagesDir)
    .filter(p => fs.statSync(path.join(packagesDir, p)).isDirectory());
  const packageLocations = packages.map(p => path.join(packagesDir, p));

  const nonDevPlugins = [
    'transform-remove-console',
    'transform-remove-debugger',
  ];
  const transpilePlugins = [
    ...nonDevPlugins,
    [
      'module-resolver',
      {
        resolvePath(sourcePath, currentFile) {
          const filedir = path.dirname(currentFile);
          const pkgIndex = packages.findIndex(
            p => p === sourcePath || sourcePath.startsWith(`${p}/`)
          );

          if (pkgIndex !== -1) {
            const pkg = packages[pkgIndex];
            const location = packageLocations[pkgIndex];
            let relativeLocation = path.relative(filedir, location);

            if (pkg !== sourcePath) {
              relativeLocation = path.join(
                relativeLocation,
                trimStart(sourcePath, pkg)
              );
            }

            // ensure the output is a relative path
            if (relativeLocation === sourcePath) {
              relativeLocation = `./${relativeLocation}`;
            }

            if (process.env.DEBUG !== undefined) {
              console.log(
                grey(`Resolved: ${sourcePath} => ${relativeLocation}`)
              );
            }

            return relativeLocation;
          }
        },
      },
    ],
  ];

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          // Don't include any polyfill
          useBuiltIns: false,
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
