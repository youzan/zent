/* eslint-disable */

var gh = require('gh-pages');

var gitRepo = process.env.ZENT_DEPLOY_DEMO_GIT_REPO;

if (!gitRepo) {
  console.error('Environment variable ZENT_DEPLOY_DEMO_GIT_REPO not set.');
  process.exit(-1);
}

gh.publish('.', {
  src: [
    'dist/index.html',
    'server/**/*',
    'package.json',
    'index.js',
    '.gitignore'
  ],
  repo: gitRepo,
  branch: 'master',
  dotfiles: true
});
