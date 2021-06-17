const path = require('path');
const ch = require('child_process');

function compile() {
  const zentIconsPath = require.resolve('zenticons');
  const iconPath = path.dirname(zentIconsPath);
  const nodeModulesPath = path.resolve(__dirname, '../../../node_modules');

  ch.execFile(
    'sass',
    [
      '--load-path',
      iconPath,
      '--load-path',
      nodeModulesPath,
      '--no-source-map',
      '--stop-on-error',
      '--no-error-css',
      '--color',
      '--unicode',
      'assets:css',
    ],
    {
      stdio: 'inherit',
    },
    (err, stdout, stderr) => {
      if (stdout) {
        console.log(stdout);
      }

      if (stderr) {
        console.error(stderr);
      }

      if (err) {
        process.exit(1);
      }
    }
  );
}

compile();
