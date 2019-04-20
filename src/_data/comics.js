const client = require('../../sanity/client')
const image = require('../../sanity/image')

module.exports = async () => {
  const query = `*[_type == "comic" && publishDate != null] | order(publishDate desc)`
  const docs = await client.fetch(query)

  return docs
}
