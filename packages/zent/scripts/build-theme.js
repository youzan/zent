/* eslint-disable global-require, import/no-dynamic-require */

const gulp = require('gulp');
const postcss = require('gulp-postcss');
const rename = require('gulp-rename');
const path = require('path');
const themeVariables = require('postcss-theme-variables');
const plugins = require('../../../postcss.config').plugins;

const themeFile = process.argv[2];
const theme = themeFile
  ? require(path.resolve(__dirname, '../', themeFile))
  : {};
plugins.splice(1, 0, themeVariables({ vars: theme, prefix: '$' }));

gulp
  .src('**/*.pcss', { base: path.resolve(__dirname, '../assets') })
  .pipe(postcss(plugins))
  .pipe(
    rename({
      extname: '.css'
    })
  )
  .pipe(gulp.dest('./css'));
