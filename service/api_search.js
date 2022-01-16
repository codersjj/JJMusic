import jjRequest from './index'

export function getSearchHot() {
  return jjRequest.get('/search/hot')
}

export function getSearchSuggest(keywords) {
  return jjRequest.get('/search/suggest', {
    keywords,
    type: 'mobile'
  })
}