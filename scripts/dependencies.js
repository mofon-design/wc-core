/**
 * @type {[string, (path: string) => string][]}
 */
module.exports = [
  ['../../es', value => value.slice(3)],
  ['tslib', () => '//unpkg.com/tslib@latest/tslib.es6.js'],
];
