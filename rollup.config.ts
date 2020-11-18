import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import { terser } from 'rollup-plugin-terser'
import banner2 from 'rollup-plugin-banner2'
import typescript from 'rollup-plugin-typescript2'
import vue from 'rollup-plugin-vue'
import postcss from 'rollup-plugin-postcss'
import postcssImport from 'postcss-import'
import pkg from './package.json'

// 版权信息配置
const ResolveBanner = () => {
  return `/** 
 * name: ${pkg.name}
 * version: v${pkg.version}
 * author: ${pkg.author}
 */
 `;
}

export default {
  input: 'src/vue-picture-cropper.vue',
  output: [
    {
      file: `dist/vue-picture-cropper.js`,
      format: 'umd',
      name: 'vuePictureCropper',
      exports: 'named',
      sourcemap: true,
      globals: {
        vue: 'Vue'
      }
    },
    {
      file: `dist/vue-picture-cropper.min.js`,
      format: 'umd',
      name: 'vuePictureCropper',
      exports: 'named',
      plugins: [
        terser()
      ],
      sourcemap: true,
      globals: {
        vue: 'Vue'
      }
    }
  ],
  external: [
    'vue'
  ],
  plugins: [
    resolve({
      browser: true
    }),
    babel({
      babelHelpers: 'bundled'
    }),
    commonjs(),
    vue(),
    // Process only `<style module>` blocks.
    postcss({
      modules: {
        generateScopedName: '[local]___[hash:base64:5]',
      },
      include: /&module=.*\.css$/,
      extensions: [ '.css' ],
      plugins: [ postcssImport() ],
    }),
    // Process all `<style>` blocks except `<style module>`.
    postcss({
      include: /(?<!&module=.*)\.css$/,
      extensions: [ '.css' ],
      plugins: [ postcssImport() ], 
    }),
    json(),
    typescript(),
    banner2( ResolveBanner, {
      sourcemap: true
    })
  ]
};
