export type CollectionPathContentTypes =
  | 'news'
  | 'news-types'

function getCollectionPath(contentType: CollectionPathContentTypes) {
  const newsPath = '/news/'
  const contentUrlPathPrefixes = {
    news: newsPath,
    'news-types': `${newsPath}category/`,
  }
  return contentUrlPathPrefixes[contentType] || '/'
}

export default getCollectionPath
