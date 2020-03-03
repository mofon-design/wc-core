const fs = require('fs');
const path = require('path');
const ChildProcess = require('child_process');

const RootPath = path.join(__dirname, '../');
const ExamplePath = path.join(__dirname, '../example');
const HomePageFile = path.join(ExamplePath, 'index.html');
const HomePageHTML = fs.readFileSync(HomePageFile, 'utf8');
const TSCPath = path.join(RootPath, 'node_modules/.bin/tsc');
const TSCConfig = `-m ESNext -t ES2015 --experimentalDecorators --skipLibCheck`;
const Examples = fs
  .readdirSync(ExamplePath, { withFileTypes: true })
  .filter(item => item.isDirectory())
  .map(
    item => `
        <li>
          <a href="${item.name}/index.html">${item.name}</a>
        </li>`,
  );

ChildProcess.spawnSync('npm', ['run', 'build:es']);
ChildProcess.execSync([TSCPath, 'example/**/*.ts', TSCConfig].join(' '));
fs.writeFileSync(HomePageFile, HomePageHTML.split('<!--INSTER-LIST-->').join(Examples), 'utf8');
rewriteImportPath('example', 'example', p => (p.startsWith('../../es') ? p.slice(3) : p));
rewriteImportPath('es', 'example/es');

/**
 * @param {string} entry
 * @param {string} target
 * @param {(v: string) => string} format
 */
function rewriteImportPath(entry, target, format = v => v) {
  const absEntryDir = path.join(RootPath, entry);
  const absTargetDir = path.join(RootPath, target);

  if (!fs.existsSync(absTargetDir)) {
    fs.mkdirSync(absTargetDir, { recursive: true });
  }

  fs.readdirSync(absEntryDir, { withFileTypes: true }).forEach(item => {
    if (item.isDirectory()) {
      return rewriteImportPath(path.join(entry, item.name), path.join(target, item.name), format);
    }

    if (path.extname(item.name) !== '.js') {
      return;
    }

    let index = 0;
    let code = fs.readFileSync(path.join(absEntryDir, item.name), 'utf8');
    while (code.length > index) {
      const match = code.slice(index).match(/from ['"]([^'"]+)/);
      if (!match) break;
      index += match[0].length + match.index;
      code = `${code.slice(0, index - match[1].length)}${format(match[1])}.js${code.slice(index)}`;
    }

    fs.writeFileSync(path.join(absTargetDir, item.name), code, 'utf8');
  });
}
