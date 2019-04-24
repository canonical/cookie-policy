import pkg from './package.json';
import babel from 'rollup-plugin-babel';
import { uglify } from 'rollup-plugin-uglify';

export default [
  {
    input: 'src/js/index.js',
    output: {
      file: pkg.iife,
      format: 'iife',
      name: 'canonicalCookiePolicy',
      sourcemap: true,
      plugins: [
        babel({
          exclude: 'node_modules/**',
        }),
        uglify(),
      ],
    },
  },
  {
    input: 'src/js/index.js',
    output: {
      file: pkg.main,
      format: 'esm',
      name: 'canonicalCookiePolicy',
      sourcemap: true,
      plugins: [
        babel({
          exclude: 'node_modules/**',
        }),
      ],
    },
  },
];
