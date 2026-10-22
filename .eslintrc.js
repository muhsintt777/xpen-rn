module.exports = {
  root: true,
  extends: '@react-native',
  overrides: [
    {
      files: ['src/shared/**/*.{ts,tsx}'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              '@/app/**',
              '@/modules/**',
              '@/store/**',
              '../app/**',
              '../../app/**',
              '../../../app/**',
              '../store/**',
              '../../store/**',
              '../../../store/**',
              '../modules/**',
              '../../modules/**',
              '../../../modules/**',
              '../../../../modules/**',
            ],
          },
        ],
      },
    },
    {
      files: ['src/store/**/*.{ts,tsx}'],
      excludedFiles: ['src/store/index.ts'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            patterns: [
              '@/app/**',
              '../app/**',
              '../../app/**',
              '../../../app/**',
            ],
          },
        ],
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
                  `../../${otherFeature}/**`,
                  `../../../${otherFeature}/**`,
                ])
                .concat([
                  '@/app/**',
                  '../app/**',
                  '../../app/**',
                  '../../../app/**',
                  '../../../../app/**',
                ]),
            },
          ],
        },
      }),
    ),
  ],
};
