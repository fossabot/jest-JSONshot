const fs = require('fs-extra')
const gulp = require('gulp')
const babel = require('gulp-babel')
const path = require('path')
const ts = require('gulp-typescript')
const sourcemaps = require('gulp-sourcemaps')

const OUT_DIR = 'build'
const SRC_DIR = 'src'

/**
 * Source file uri builder
 *
 * @param rel - relative path to src
 * @param neg - set to true to negate the pattern
 * @returns {string}
 */
const srcFile = (rel, opts) => opts && opts.negate ? `!${SRC_DIR.concat('/', rel)}` : SRC_DIR.concat('/', rel)

async function clean () {
  return Promise.all(['build', 'junit.xml', 'coverage', '.tmp'].map(file => fs.remove(file)))
}

function compile () {
  /**
   * Where should we get our source files?
   * @type {string[]}
   */
  const SRC_FILES = [
    srcFile('**/*.ts'),
    srcFile('**/__tests__/**', {negate: true}),
    srcFile('**/__mocks__/**', {negate: true})
  ]

  const config = require('./babel.config')

  delete config.sourceMaps
  delete config.ignore

  return gulp
    .src(SRC_FILES)
    .pipe(sourcemaps.init())
    .pipe(babel(config))
    .pipe(sourcemaps.mapSources(
      (sourcePath) => path.basename(sourcePath)
    ))
    .pipe(sourcemaps.write(SRC_DIR, { includeContent: false }))
    .pipe(gulp.dest(OUT_DIR))
}

function tsGen () {
  const SRC_FILES = [
    srcFile('**/*.ts'),
    srcFile('**/__tests__/**', {negate: true}),
    srcFile('**/__mocks__/**', {negate: true})
  ]

  const { compilerOptions } = require('./tsconfig')
  delete compilerOptions.allowJs

  return gulp
    .src(SRC_FILES)
    .pipe(ts(compilerOptions))
    .dts.pipe(gulp.dest(OUT_DIR))
}

function copySrc () {
  const SRC_FILES = [
    srcFile('**'),
    srcFile('**/__tests__/**', {negate: true}),
    srcFile('**/__mocks__/**', {negate: true})
  ]

  return gulp.src(SRC_FILES).pipe(gulp.dest(path.join(OUT_DIR, SRC_DIR)))
}

function copyStatic () {
  const SRC_FILES = [
    'package.json',
    'license',
    'README.md',
    'yarn.lock'
  ]

  return gulp.src(SRC_FILES).pipe(gulp.dest(OUT_DIR))
}

const build = gulp.series(clean, tsGen, compile, copyStatic, copySrc)

module.exports = {
  clean,
  build,
  compile,
  copyStatic,
  tsGen
}
