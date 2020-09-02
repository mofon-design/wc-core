/* eslint-disable import/no-extraneous-dependencies */
import { Options as BabelPresetEnvOptions } from '@babel/preset-env';
import * as del from 'del';
import * as fs from 'fs';
import * as gulp from 'gulp';
import * as babel from 'gulp-babel';
import * as ts from 'gulp-typescript';
import * as uglify from 'gulp-uglify';
import * as path from 'path';
import * as rollup from 'rollup';
import * as rollupBabel from 'rollup-plugin-babel';
import * as rollupNodeResolve from 'rollup-plugin-node-resolve';
import * as exampleTsConfig from '../example/tsconfig.json';

function getAbsolutePath(p: string) {
  return path.resolve(process.cwd(), p);
}

gulp.task('gulp-example-typescript', () => {
  const tsCompileTask = ts({
    ...exampleTsConfig.compilerOptions,
    module: 'ESNext',
    target: 'ES2018',
    declaration: false,
    outDir: getAbsolutePath('dist'),
    rootDir: getAbsolutePath('.'),
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
    .src('{example,src}/**/*.{ts,tsx}', { base: '.' })
    .pipe(tsCompileTask)
    .js.pipe(babelCompileTask)
    .pipe(gulp.dest('dist'));
});

gulp.task('rollup-example-umd', async () => {
  const bundle = await rollup.rollup({
    input: getAbsolutePath('dist/example/index.js'),
    plugins: [rollupBabel(), rollupNodeResolve()],
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
          <a href="${item.name}/index.html">${item.name}</a>
        </li>`,
    );

  const content = fs
    .readFileSync(getAbsolutePath('example/index.template.html'), 'utf8')
    .replace('<!--INSTER-LIST-->', list.join(''));

  fs.writeFileSync(getAbsolutePath('example/index.html'), content, 'utf8');

  return Promise.resolve();
});

gulp.task('clean-example', () => del(['dist', 'example/index.html', 'example/**/*.js']));

gulp.task(
  'example',
  gulp.series(
    'clean-example',
    'build-example-index-page',
    'gulp-example-typescript',
    'rollup-example-umd',
    'clean-dist',
  ),
);
