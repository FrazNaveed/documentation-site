export type CollectionPathContentTypes =
  | 'events'
  | 'news'
  | 'news-types'

function getCollectionPath(contentType: CollectionPathContentTypes) {
  const newsPath = '/news/'
  const contentUrlPathPrefixes = {
    events: '/events/',
    news: newsPath,
    'news-types': `${newsPath}category/`,
  }
  return contentUrlPathPrefixes[contentType] || '/'
}

export default getCollectionPath
