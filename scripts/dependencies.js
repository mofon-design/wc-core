/**
 * @type {[string, (path: string) => string][]}
 */
module.exports = [
  ['../../es', value => addExtname(value.slice(3), '.js')],
  ['tslib', () => '//unpkg.com/tslib@latest/tslib.es6.js'],
  ['', value => addExtname(value, '.js')],
];

/**
 * @param {string} value
 * @param {string} extname
 *
 * @return {string}
 */
function addExtname(value, extname) {
  return value.endsWith(extname) ? value : value.concat(extname);
}
