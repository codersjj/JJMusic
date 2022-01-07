import jjRequest from './index'

export function getBanners() {
  return jjRequest.get('/banner', {
    type: 2
  })
}

export function getRankings(idx) {
  return jjRequest.get('/top/list', {
    idx
  })
}