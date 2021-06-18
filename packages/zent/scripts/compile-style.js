const path = require('path');
const ch = require('child_process');

function compile() {
  const iconPath = path.dirname(require.resolve('zenticons'));
  const colorHelpersPath = path.dirname(require.resolve('sass-color-helpers'));

  ch.execFile(
    'sass',
    [
      '--load-path',
      iconPath,
      '--load-path',
      colorHelpersPath,
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
