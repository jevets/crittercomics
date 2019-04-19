module.exports = config => {
  config.dir = {
    input: `src`,
    output: `dist`,
  }

  config.markdownTemplateEngine = `njk`

  return config
}
