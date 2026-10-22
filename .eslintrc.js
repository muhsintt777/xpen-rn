module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['src/shared/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': ['error', { patterns: ['@/modules/**'] }],
      },
    },
    {
      files: ['src/store/**/*.{ts,tsx}'],
      excludedFiles: ['src/store/index.ts'],
      rules: {
        'no-restricted-imports': ['error', { patterns: ['@/modules/**'] }],
      },
    },
    ...['auth', 'category', 'expense', 'home', 'settings', 'user'].map(
      (feature) => ({
        files: [`src/modules/${feature}/**/*.{ts,tsx}`],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                'auth',
                'category',
                'expense',
                'home',
                'settings',
                'user',
              ]
                .filter((otherFeature) => otherFeature !== feature)
                .flatMap((otherFeature) => [
                  `@/modules/${otherFeature}/**`,
                  `../${otherFeature}/**`,
                ]),
            },
          ],
        },
      }),
    ),
  ],
};
