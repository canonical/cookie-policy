'use strict';

const babel = require('gulp-babel');
const del = require('del');
const gulp = require('gulp');
const eslint = require('gulp-eslint');
const sass = require('gulp-sass');
const sassLint = require('gulp-sass-lint');

const { series, parallel, watch } = require('gulp');

// Remove ./build folder
const clean = () => {
  return del(['build']);
};

// Lint all *js files with jshint
const lintJs = () => {
  return gulp
    .src('./src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failOnError());
};

// Lint all *scss files with sassLint
const lintScss = () => {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(sassLint())
    .pipe(sassLint.format())
    .pipe(sassLint.failOnError());
};

// Compile Scss files to CSS
const buildScss = () => {
  return gulp
    .src('./src/sass/**/*.scss')
    .pipe(
      sass({
        outputStyle: 'compressed',
        includePaths: './node_modules',
      }).on('error', sass.logError)
    )
    .pipe(gulp.dest('./build/css'));
};

// Transpile JS with Babel
const buildJs = done => {
  gulp
    .src('./src/js/**/*.js')
    .pipe(
      babel({
        presets: [
          [
            '@babel/preset-env',
            {
              useBuiltIns: 'entry',
            },
          ],
        ],
      })
    )
    .pipe(gulp.dest('./build/js'));
  done();
};

// Run watch tasks in development on Js and Scss files to regenerate when changed
const dev = () => {
  watch('./src/sass/**/*.scss', buildScss);
  watch('./src/js/**/*.js', buildJs);
};

// Expose public tasks
exports.clean = clean;
exports.dev = dev;
exports.lint = parallel(lintJs, lintScss);
exports.build = series(clean, parallel(lintJs, lintScss, buildJs, buildScss));
