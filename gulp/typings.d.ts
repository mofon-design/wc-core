declare module 'gulp-prettier' {
  declare function compile(...args: any[]): NodeJS.ReadWriteStream;
  export = compile;
  export { compile };
}
