class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-z0-9-:\/]+/g);
  }
}

module.exports = {
  plugins: [
    require('postcss-import')({
      path: ['assets/css']
    }),
    require('tailwindcss')('./assets/css/tailwind.js'),
    require('@fullhuman/postcss-purgecss')({
      content: ['layouts/**/*.html'],
      extractors: [
        {
          extractor: TailwindExtractor,
          extensions: ['html']
        },
      ],
      fontFace: true,
      whitelist: ['class1', 'class2']
    }),
    require('autoprefixer')({
      grid: true,
      browsers: [
        'Android 2.3',
        'Android >= 4',
        'Chrome >= 20',
        'Firefox >= 24',
        'Explorer >= 8',
        'iOS >= 6',
        'Opera >= 12',
        'Safari >= 6',
      ],
    }),
  ],
};
