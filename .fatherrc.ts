import { IBundleOptions } from 'father';

const options: IBundleOptions = {
  cjs: 'babel',
  esm: { type: 'babel', importLibToEs: true },
  lessInBabelMode: true,
};

export default options;
