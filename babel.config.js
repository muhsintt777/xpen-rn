module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@': './src',
        },
        extensions: ['.ios.ts', '.android.ts', '.ts', '.tsx', '.js', '.jsx'],
        root: ['./src'],
      },
    ],
  ],
};
