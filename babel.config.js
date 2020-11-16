const devPresets = [
  '@vue/babel-preset-app',
  // [
  //   '@vue/babel-preset-jsx',
  //   {
  //     vModel: false,
  //     compositionAPI: true,
  //   },
  // ],
];

const buildPresets = [
  '@babel/preset-env',
  '@babel/preset-typescript',
  // [
  //   '@vue/babel-preset-jsx',
  //   {
  //     vModel: false,
  //     compositionAPI: true,
  //   },
  // ],
];

module.exports = {
  presets: (process.env.NODE_ENV === 'development' ? devPresets : buildPresets),
  plugins: [
    '@babel/plugin-syntax-jsx',
    '@vue/babel-plugin-jsx',
  ],
};
