const imageUrl = require('../../sanity/image')

module.exports = () => ({

  comic: comic => {
    const slug = comic._id ? comic.slug.current : comic
    return `/${ slug }/`
  },

  sanityImage: source => {
    return imageUrl(source)
  },

})
