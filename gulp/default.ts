/* eslint-disable import/no-extraneous-dependencies */
import { Options as BabelPresetEnvOptions } from '@babel/preset-env';
import rollupBabel from '@rollup/plugin-babel';
import rollupNodeResolve from '@rollup/plugin-node-resolve';
import * as del from 'del';
import * as gulp from 'gulp';
import * as prettier from 'gulp-prettier';
import * as ts from 'gulp-typescript';
import * as uglify from 'gulp-uglify';
import * as path from 'path';
import * as rollup from 'rollup';
import * as tsConfig from '../tsconfig.json';

function getAbsolutePath(p: string) {
  return path.resolve(process.cwd(), p);
}

gulp.task('gulp-typescript', () => {
  const compileTask = ts({
    ...tsConfig.compilerOptions,
    module: 'ESNext',
    target: 'ESNext',
    declaration: false,
    removeComments: true,
    rootDir: getAbsolutePath('.'),
    outDir: getAbsolutePath('es'),
  });

  return gulp.src('src/**/*.ts').pipe(compileTask).pipe(prettier()).pipe(gulp.dest('es'));
});

gulp.task('rollup-umd', async () => {
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
    input: getAbsolutePath('es/export.js'),
    plugins: [rollupBabelPlugin, rollupNodeResolve()],
  });

  await bundle.write({
    name: 'MDWC',
    format: 'umd',
    exports: 'named',
    file: getAbsolutePath('index.umd.js'),
  });

  return gulp.src('index.umd.js').pipe(uglify()).pipe(gulp.dest('.'));
});

gulp.task('clean', () => del(['es', 'index.umd.js']));

gulp.task('default', gulp.series('clean', 'gulp-typescript', 'rollup-umd'));
