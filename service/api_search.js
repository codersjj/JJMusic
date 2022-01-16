import jjRequest from './index'

export function getSearchHot() {
  return jjRequest.get('/search/hot')
}