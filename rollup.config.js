import pkg from './package.json';

export default [
  {
    input: 'src/js/index.js',
    output: {
      file: pkg.iife,
      format: 'iife',
      name: 'canonicalCookiePolicy',
      sourcemap: true,
    },
  },
  {
    input: 'src/js/index.js',
    output: {
      file: pkg.main,
      format: 'esm',
      name: 'canonicalCookiePolicy',
      sourcemap: true,
    },
  },
];
