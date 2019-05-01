import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

export default [
  {
    input: 'src/js/cookie-policy.js',
    output: {
      file: pkg.iife,
      format: 'iife',
      name: 'cpNs',
      sourcemap: false,
    },
    plugins: [babel(), terser()],
  },
  {
    input: 'src/js/cookie-policy.js',
    output: {
      file: pkg.main,
      format: 'esm',
      name: 'cpNs',
      sourcemap: false,
    },
    plugins: [babel()],
  },
];
