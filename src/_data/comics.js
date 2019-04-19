const client = require('../../sanity/client')
const image = require('../../sanity/image')

module.exports = async () => {
  return await client.fetch(`*[_type == "comic" && publishDate != null] | order(publishDate desc)`)
}
