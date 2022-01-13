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

// cat -> category 种类
export function getSongMenu(cat = '全部', limit = 6, offset = 0) {
  return jjRequest.get('/top/playlist', {
    cat,
    limit,
    offset
  })
}

export function getSongMenuDetail(id) {
  return jjRequest.get('/playlist/detail/dynamic', {
    id
  })
}