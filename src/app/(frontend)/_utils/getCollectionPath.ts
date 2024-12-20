export type CollectionPathContentTypes =
  | 'careers'
  | 'events'
  | 'news'
  | 'news-types'

function getCollectionPath(contentType: CollectionPathContentTypes) {
  const newsPath = '/news/'
  const contentUrlPathPrefixes = {
    careers: '/careers/',
    events: '/events/',
    news: newsPath,
    'news-types': `${newsPath}category/`,
  }
  return contentUrlPathPrefixes[contentType] || '/'
}

export default getCollectionPath
