/* eslint-disable import/no-extraneous-dependencies */
import { Options as BabelPresetEnvOptions } from '@babel/preset-env';
import * as path from 'path';
import * as del from 'del';
import * as gulp from 'gulp';
// @ts-ignore
import * as babel from 'gulp-babel';
import * as ts from 'gulp-typescript';
import * as merge from 'merge2';
import * as config from './tsconfig.json';

function getAbsolutePath(p: string) {
  return path.resolve(process.cwd(), p);
}

gulp.task('gulp-typescript', () => {
  const compileTask = ts({
    ...config.compilerOptions,
    module: 'ESNext',
    target: 'ES2018',
    rootDir: getAbsolutePath('.'),
    outDir: getAbsolutePath('dist/ts'),
    declarationDir: getAbsolutePath('dist/ts'),
  });

  const streams = gulp.src('src/**/*.ts').pipe(compileTask);
  const jsDestStream = streams.js.pipe(gulp.dest('dist/ts'));
  const dtsDestStream = streams.dts.pipe(gulp.dest('lib')).pipe(gulp.dest('es'));

  return merge([jsDestStream, dtsDestStream]);
});

gulp.task('gulp-babel-es', () => {
  const babelPresetEnvOptions: BabelPresetEnvOptions = {
    modules: false,
    targets: {
      browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
    },
  };

  const compileTask = babel({
    comments: false,
    presets: [['@babel/preset-env', babelPresetEnvOptions]],
    plugins: [['@babel/plugin-proposal-class-properties', { loose: false }]],
  });

  return gulp
    .src('dist/ts/**', { base: 'dist/ts' })
    .pipe(compileTask)
    .pipe(gulp.dest('es'));
});

gulp.task('gulp-babel-lib', () => {
  const babelPresetEnvOptions: BabelPresetEnvOptions = {
    modules: 'commonjs',
    loose: true,
    targets: {
      browsers: ['> 1%', 'last 2 versions', 'not ie <= 10'],
    },
  };

  const compileTask = babel({
    comments: false,
    presets: [['@babel/preset-env', babelPresetEnvOptions]],
    plugins: [['@babel/plugin-proposal-class-properties', { loose: false }]],
  });

  return gulp
    .src('dist/ts/**', { base: 'dist/ts' })
    .pipe(compileTask)
    .pipe(gulp.dest('lib'));
});

gulp.task('clean-dist', () => del(['dist']));

gulp.task('clean', () => del(['lib', 'es', 'dist']));

gulp.task(
  'default',
  gulp.series('clean', 'gulp-typescript', 'gulp-babel-es', 'gulp-babel-lib', 'clean-dist'),
);
