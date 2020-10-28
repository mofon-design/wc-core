/* eslint-disable import/no-extraneous-dependencies */
import { Options as BabelPresetEnvOptions } from '@babel/preset-env';
import rollupBabel from '@rollup/plugin-babel';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import * as del from 'del';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as ts from 'gulp-typescript';
import * as uglify from 'gulp-uglify';
import * as path from 'path';
import * as rollup from 'rollup';
import * as exampleTsConfig from '../example/tsconfig.json';

function getAbsolutePath(p: string) {
  return path.resolve(process.cwd(), p);
}

gulp.task('gulp-example-typescript', () => {
  const tsCompileTask = ts({
    ...exampleTsConfig.compilerOptions,
    module: 'ESNext',
    target: 'ESNext',
    declaration: false,
    removeComments: true,
    outDir: getAbsolutePath('dist'),
    rootDir: getAbsolutePath('.'),
  });

  return gulp
    .src('{example,src}/**/*.{ts,tsx}', { base: '.' })
    .pipe(tsCompileTask)
    .pipe(gulp.dest('dist'));
});

gulp.task('rollup-example-umd', async () => {
  const babelPresetEnvOptions: BabelPresetEnvOptions = {
    loose: false,
    modules: false,
    targets: {
      browsers: ['last 2 versions', 'not ie <= 10'],
    },
  };

  const rollupBabelPlugin = rollupBabel({
    babelHelpers: 'bundled',
    presets: [['@babel/preset-env', babelPresetEnvOptions]],
    plugins: [['@babel/plugin-proposal-class-properties', { loose: false }]],
  });

  const bundle = await rollup.rollup({
    input: getAbsolutePath('dist/example/index.js'),
    plugins: [rollupBabelPlugin, rollupNodeResolve()],
  });

  await bundle.write({
    name: 'App',
    format: 'umd',
    exports: 'named',
    file: getAbsolutePath('example/index.umd.js'),
  });

  return gulp.src('example/index.umd.js').pipe(uglify()).pipe(gulp.dest('example'));
});

gulp.task('build-example-index-page', () => {
  const list = fs
    .readdirSync(getAbsolutePath('example'), { withFileTypes: true })
    .filter((item) => item.isDirectory())
    .map(
      (item) => `
        <li>
          <a href="${item.name}/">${item.name}</a>
        </li>`,
    );

  const content = fs
    .readFileSync(getAbsolutePath('example/index.template.html'), 'utf8')
    .replace('<!--INSTER-LIST-->', list.join(''));

  fs.writeFileSync(getAbsolutePath('example/index.html'), content, 'utf8');

  return Promise.resolve();
});

gulp.task('clean-example-dist', () => del(['dist']));

gulp.task('clean-example', () => del(['dist', 'example/index.html', 'example/**/*.js']));

gulp.task(
  'example',
  gulp.series(
    'clean-example',
    'build-example-index-page',
    'gulp-example-typescript',
    'rollup-example-umd',
    'clean-example-dist',
  ),
);
