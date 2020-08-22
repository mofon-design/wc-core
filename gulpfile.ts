/* eslint-disable import/no-extraneous-dependencies */
import { Options as BabelPresetEnvOptions } from '@babel/preset-env';
import * as del from 'del';
import * as fs from 'fs';
import * as gulp from 'gulp';
// @ts-ignore
import * as babel from 'gulp-babel';
import * as ts from 'gulp-typescript';
import * as uglify from 'gulp-uglify';
import * as merge from 'merge2';
import * as path from 'path';
import * as rollup from 'rollup';
import * as rollupBabel from 'rollup-plugin-babel';
import * as rollupNodeResolve from 'rollup-plugin-node-resolve';
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

gulp.task('rollup-umd', () => {
  return rollup
    .rollup({
      input: getAbsolutePath('es/index.js'),
      // @ts-ignore
      plugins: [rollupBabel(), rollupNodeResolve()],
    })
    .then(bundle =>
      bundle.write({
        name: 'MDWC',
        format: 'umd',
        exports: 'named',
        file: getAbsolutePath('index.umd.js'),
      }),
    )
    .then(() =>
      gulp
        .src('index.umd.js')
        .pipe(uglify())
        .pipe(gulp.dest('.')),
    );
});

gulp.task('clean-dist', () => del(['dist']));

gulp.task('clean', () => del(['lib', 'es', 'dist']));

gulp.task(
  'default',
  gulp.series(
    'clean',
    'gulp-typescript',
    'gulp-babel-es',
    'gulp-babel-lib',
    'rollup-umd',
    'clean-dist',
  ),
);

gulp.task('gulp-example-typescript', () => {
  const tsCompileTask = ts({
    ...config.compilerOptions,
    module: 'ESNext',
    target: 'ES2018',
    declaration: false,
    rootDir: getAbsolutePath('example'),
    outDir: getAbsolutePath('example'),
  });

  const babelPresetEnvOptions: BabelPresetEnvOptions = {
    modules: false,
    targets: {
      browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
    },
  };

  const babelCompileTask = babel({
    comments: false,
    presets: [['@babel/preset-env', babelPresetEnvOptions]],
    plugins: [['@babel/plugin-proposal-class-properties', { loose: false }]],
  });

  return gulp
    .src('example/**/*.{ts,tsx}')
    .pipe(tsCompileTask)
    .js.pipe(babelCompileTask)
    .pipe(gulp.dest('example'));
});

gulp.task('build-example-index-page', () => {
  const HomePageFile = getAbsolutePath('example/index.html');
  const HomePageHTML = fs.readFileSync(HomePageFile, 'utf8');

  const Examples = fs
    .readdirSync(__dirname, { withFileTypes: true })
    .filter(item => item.isDirectory())
    .map(
      item => `
        <li>
          <a href="${item.name}/index.html">${item.name}</a>
        </li>`,
    )
    .join('');

  fs.writeFileSync(HomePageFile, HomePageHTML.split('<!--INSTER-LIST-->').join(Examples), 'utf8');

  return Promise.resolve();
});

gulp.task('clean-example', () => del(['example/**/*.js']));

gulp.task(
  'example',
  gulp.series('default', 'clean-example', 'build-example-index-page', 'gulp-example-typescript'),
);
