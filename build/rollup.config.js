// rollup.config.js
import fs from 'fs'
import path from 'path'
import vue from 'rollup-plugin-vue'
import alias from '@rollup/plugin-alias'
import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import babel from '@rollup/plugin-babel'
import PostCSS from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import { terser } from 'rollup-plugin-terser'
import json from '@rollup/plugin-json'
import banner2 from 'rollup-plugin-banner2'
import minimist from 'minimist'
import pkg from '../package.json'

// 版权信息配置
const ResolveBanner = () => {
  return `/** 
 * name: ${pkg.name}
 * version: v${pkg.version}
 * author: ${pkg.author}
 */
 `;
}

// Get browserslist config and remove ie from es build targets
const esbrowserslist = fs.readFileSync('./.browserslistrc')
  .toString()
  .split('\n')
  .filter((entry) => entry && entry.substring(0, 2) !== 'ie');

const argv = minimist(process.argv.slice(2));

const projectRoot = path.resolve(__dirname, '..');

const baseConfig = {
  input: 'src/entry.ts',
  plugins: {
    preVue: [
      alias({
        entries: [
          {
            find: '@',
            replacement: `${path.resolve(projectRoot, 'src')}`,
          },
        ],
        customResolver: resolve({
          extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
        }),
      }),
    ],
    replace: {
      'process.env.NODE_ENV': JSON.stringify('production'),
    },
    vue: {
    },
    postVue: [
      // Process only `<style module>` blocks.
      PostCSS({
        modules: {
          generateScopedName: '[local]___[hash:base64:5]',
        },
        include: /&module=.*\.css$/,
        extensions: [ '.css' ],
        plugins: [ postcssImport() ],
      }),
      // Process all `<style>` blocks except `<style module>`.
      PostCSS({
        include: /(?<!&module=.*)\.css$/,
        extensions: [ '.css' ],
        plugins: [ postcssImport() ], 
      }),
    ],
    babel: {
      exclude: 'node_modules/**',
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      babelHelpers: 'bundled',
    },
  },
};

// ESM/UMD/IIFE shared settings: externals
// Refer to https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
const external = [
  // list external dependencies, exactly the way it is written in the import statement.
  // eg. 'jquery'
  'vue',
  // 'cropperjs',
  // '@vue/composition-api',
  // 'cropperjs',
];

// UMD/IIFE shared settings: output.globals
// Refer to https://rollupjs.org/guide/en#output-globals for details
const globals = {
  // Provide global variable names to replace your external imports
  // eg. jquery: '$'
  vue: 'Vue',
  cropperjs: 'Cropper',
  '@vue/composition-api': 'compositionApi',
};

// Customize configs for individual targets
const buildFormats = [];
if (!argv.format || argv.format === 'es') {
  const esConfig = {
    ...baseConfig,
    input: 'src/entry.esm.ts',
    external,
    output: {
      file: 'dist/vue-picture-cropper.esm.js',
      format: 'esm',
      exports: 'named',
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel({
        ...baseConfig.plugins.babel,
        presets: [
          [
            '@babel/preset-env',
            {
              targets: esbrowserslist,
            },
          ],
        ],
      }),
      commonjs(),
      json(),
      resolve({
        browser: true
      }),
      banner2( ResolveBanner, {
        sourcemap: true
      }),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  buildFormats.push(esConfig);
}

if (!argv.format || argv.format === 'cjs') {
  const umdConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-picture-cropper.ssr.js',
      format: 'cjs',
      name: 'VuePictureCropper',
      exports: 'auto',
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      commonjs(),
      json(),
      resolve({
        browser: true
      }),
      banner2( ResolveBanner, {
        sourcemap: true
      }),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  buildFormats.push(umdConfig);
}

if (!argv.format || argv.format === 'iife') {
  const unpkgConfig = {
    ...baseConfig,
    external,
    output: {
      compact: true,
      file: 'dist/vue-picture-cropper.min.js',
      format: 'iife',
      name: 'VuePictureCropper',
      exports: 'auto',
      globals,
    },
    plugins: [
      replace(baseConfig.plugins.replace),
      ...baseConfig.plugins.preVue,
      vue(baseConfig.plugins.vue),
      ...baseConfig.plugins.postVue,
      babel(baseConfig.plugins.babel),
      commonjs(),
      json(),
      resolve({
        browser: true
      }),
      banner2( ResolveBanner, {
        sourcemap: true
      }),
      terser({
        output: {
          ecma: 5,
        },
      }),
    ],
  };
  buildFormats.push(unpkgConfig);
}

// Export config
export default buildFormats;
