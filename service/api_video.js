import jjRequest from './index'

export function getTopMV(offset, limit = 10) {
  return jjRequest.get('/top/MV', {
    offset,
    limit
  })
}

/**
 * 获取 MV 的播放地址
 * @param {number} id MV 的 id
 */
export function getMVURL(id) {
  return jjRequest.get('/mv/url', {
    id
  })
}

/**
 * 获取 MV 的详情
 * @param {number} mvid MV 的 id
 */
export function getMVDetail(mvid) {
  return jjRequest.get('/mv/detail', {
    mvid
  })
}

/**
 * 获取 MV 的相关视频
 * @param {number} id MV 的 id
 */
export function getRelatedVideos(id) {
  return jjRequest.get('/related/allvideo', {
    id
  })
}
