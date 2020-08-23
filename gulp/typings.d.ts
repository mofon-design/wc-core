declare module 'rollup-plugin-babel';
declare module 'rollup-plugin-node-resolve';
declare module 'gulp-babel' {
  declare function compile(...args: any[]): NodeJS.ReadWriteStream;
  export = compile;
  export { compile };
}
