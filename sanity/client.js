const createClient = require('@sanity/client')

module.exports = createClient({
  projectId: 'v0m9iuco',
  dataset: 'production',
  useCdn: true,
})
