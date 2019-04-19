const { DateTime } = require('luxon')
const debug = require('debug')('app')
const processStyles = require('./postcss')

module.exports = config => {
  config.dir = {
    input: `src`,
    output: `dist`,
  }

  config.markdownTemplateEngine = 'njk'

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

  return config
}
