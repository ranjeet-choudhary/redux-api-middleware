import resolve from 'rollup-plugin-node-resolve';
import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

export default [
  // CJS build for Node and bundlers
  {
    input: 'es/index.js',
    output: {
      file: pkg.main,
      format: 'cjs',
      sourcemap: true
    },
    external: [
      'lodash.isplainobject'
    ],
    plugins: [
    ]
  },

  // Browser-friendly UMD build
  {
    input: 'es/index.js',
    output: {
      name: 'ReduxApiMiddleware',
      file: pkg.browser,
      format: 'umd',
      sourcemap: true
    },
    plugins: [
      resolve(),
      commonjs(),
      babel({
        // This config is very similar to the root .babelrc, but
        // configured for a minified browser build instead of node targets
        babelrc: false,
        exclude: 'node_modules/**',
        presets: [
          [
            "env", {
              "modules": false,
              "targets": {
                "uglify": true
              }
            }
          ]
        ],
        plugins: [
          "external-helpers",
          "transform-object-rest-spread"
        ]
      })
    ]
  }
]