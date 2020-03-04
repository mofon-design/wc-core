const fs = require('fs');
const path = require('path');
const ChildProcess = require('child_process');
const dependencies = require('./dependencies');

const RootPath = path.join(__dirname, '../');
const ExamplePath = path.join(__dirname, '../example');
const HomePageFile = path.join(ExamplePath, 'index.html');
const HomePageHTML = fs.readFileSync(HomePageFile, 'utf8');

ChildProcess.spawnSync('npm', ['run', 'build:es']);
ChildProcess.spawnSync('rm', ['-rf', path.join(ExamplePath, 'es')]);

const Examples = fs
  .readdirSync(ExamplePath, { withFileTypes: true })
  .filter(item => item.isDirectory())
  .map(
    item => `
        <li>
          <a href="${item.name}/index.html">${item.name}</a>
        </li>`,
  )
  .join('');

fs.writeFileSync(HomePageFile, HomePageHTML.split('<!--INSTER-LIST-->').join(Examples), 'utf8');
rewriteImportPath('example', 'example');
rewriteImportPath('es', 'example/es');

/**
 * @param {string} entry
 * @param {string} target
 */
function rewriteImportPath(entry, target) {
  const absEntryDir = path.join(RootPath, entry);
  const absTargetDir = path.join(RootPath, target);

  if (!fs.existsSync(absTargetDir)) {
    fs.mkdirSync(absTargetDir, { recursive: true });
  }

  fs.readdirSync(absEntryDir, { withFileTypes: true }).forEach(item => {
    if (item.isDirectory()) {
      return rewriteImportPath(path.join(entry, item.name), path.join(target, item.name));
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
      const prefix = code.slice(0, index - match[1].length);
      const formatter = dependencies.find(dep => dep[0].startsWith(match[1]));
      const importpath = formatter ? formatter[1](match[1]) : match[1];
      code = `${prefix}${importpath}.js${code.slice(index)}`;
    }

    fs.writeFileSync(path.join(absTargetDir, item.name), code, 'utf8');
  });
}
