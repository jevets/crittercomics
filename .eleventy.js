const { DateTime } = require('luxon')
const debug = require('debug')('app')
const htmlmin = require('html-minifier')
const processStyles = require('./postcss')

module.exports = config => {
  config.dir = {
    input: `src`,
    output: `dist`,
  }

  config.markdownTemplateEngine = 'njk'

  config.addPassthroughCopy('src/icon')
  config.addPassthroughCopy('src/img')

  config.addFilter('readableDate', dt => {
    return DateTime.fromISO(dt, {zone: 'utc'}).toFormat('DDD')
  })
  config.addFilter('machineDate', dt => {
    return DateTime.fromISO(dt, {zone: 'utc'}).toISODate()
  })

  config.addTransform('styles', async (output, outputPath) => {
    debug(outputPath)
    if (outputPath.endsWith('stylesheet.css')) {
      return await processStyles(output)
    }
    return output
  })

  // Transforms
  config.addTransform('htmlmin', (content, outputPath) => {
    if (outputPath.endsWith('.html')) {
      let minified = htmlmin.minify(content, {
        useShortDoctype: true,
        removeComments: true,
        collapseWhitespace: true,
      })
      return minified
    }
    return content
  })

  return config
}
