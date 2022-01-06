import jjRequest from './index'

export function getBanners() {
  return jjRequest.get('/banner', {
    type: 2
  })
}