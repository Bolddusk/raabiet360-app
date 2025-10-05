module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@constant': './src/constant/constant.ts',
          '@languages': './src/languages',
          '@modules': './src/modules/modules.ts',
          '@navigation': './src/navigation/',
          '@providers': './src/providers/providers.ts',
          '@screens': './src/screens/screens.ts',
          '@shared': './src/shared',
          '@styles': './src/styles/',
          '@translations': './src/translations/',
          '@types': './src/types/types.ts',
          '@api': './src/api/api.ts',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
