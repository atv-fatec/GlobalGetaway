module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ...
    [
      'module-resolver',
      {
        alias: {
          '@styles': './src/app/styles',
          '@components': './src/app/components',
          '@pages': './src/app/pages',
          '@routes': './src/app/routes',
        },
      },
    ],
  ]
};
