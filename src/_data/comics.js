const client = require('../../sanity/client')
const image = require('../../sanity/image')

module.exports = async () => {
  const query = `*[_type == "comic" && publishDate != null] | order(publishDate desc)`
  return await client.fetch(query)
}
