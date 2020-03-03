const fs = require('fs');
const path = require('path');
const ChildProcess = require('child_process');

const ExamplePath = path.join(__dirname, '../example');
const HomePageFile = path.join(ExamplePath, 'index.html');
const HomePageHTML = fs.readFileSync(HomePageFile, 'utf8');
const Examples = fs
  .readdirSync(ExamplePath, { withFileTypes: true })
  .filter(item => item.isDirectory())
  .map(
    item => `
        <li>
          <a href="${item.name}/index.html">${item.name}</a>
        </li>`,
  );

ChildProcess.execSync('rm -f example/**/*.js');
ChildProcess.spawnSync('npm', ['run', 'build:es']);
ChildProcess.spawnSync('tsc', ['example/**/*.ts', '--experimentalDecorators']);

fs.writeFileSync(HomePageFile, HomePageHTML.split('<!--INSTER-LIST-->').join(Examples), 'utf8');
