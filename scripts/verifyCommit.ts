/* eslint-disable no-console */
/* eslint-disable import/no-extraneous-dependencies */
// Invoked on the commit-msg git hook by yorkie.

import * as chalk from 'chalk';
import * as fs from 'fs';

const msgPath = process.env.GIT_PARAMS;
const msg = fs.readFileSync(msgPath, 'utf-8').trim();

const commitRE = /^(revert: )?(feat|fix|docs|style|refactor|perf|test|workflow|build|ci|chore|types|wip|release|dep)(\(.+\))?: .{1,50}/;

if (!commitRE.test(msg)) {
  console.error(`
  ${chalk.bgRed.white(` ERROR `)} ${chalk.red(`invalid commit message format.`)}

  ${chalk.red(`Proper commit message format is required for automated changelog generation.`)}

    ${chalk.green(`feat(compiler): add 'comments' option`)}
    ${chalk.green(`fix(v-model): handle events on blur (close #28)`)}

  ${chalk.red(`See .github/commit-convention.md for more details.`)}
`);
  process.exit(1);
}
