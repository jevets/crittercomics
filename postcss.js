const autoprefixer = require('autoprefixer')
const tailwind = require('tailwindcss')
const postcss = require('postcss')
const atImport = require('postcss-import')
const precss = require('precss')
const purgeCss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')

module.exports = async (raw) => {
  return await postcss([
    atImport({
      path: ['src/_includes/css'],
    }),
    precss,
    tailwind,
    purgeCss({
      content: [
        './dist/**/*.html',
        './src/**/*.njk',
      ],
      css: [{ raw }],
      extractors: [
        {
          extractor: class {
            static extract(content) {
              return content.match(/[A-Za-z0-9-_:/]+/g) || []
            }
          },
          extensions: ['html', 'njk'],
        },
      ],
    }),
    autoprefixer,
    cssnano,
  ])
    .process(raw, {
      from: './src/stylesheet.njk',
      to: './dist/stylesheet.css',
    })
    .then(result => result.css)
}
