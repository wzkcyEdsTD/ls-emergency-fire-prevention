import request from '@/utils/request'

export function getRadarList() {
  return request({
    baseURL: 'https://api.caiyunapp.com',
    url: '/v1/radar/fine_images?lon=120.690905&lat=28.004836&level=1&token=Y2FpeXVuIGFuZHJpb2QgYXBp&callback=jQuery111306318049300922846_1592902703251&_=1592902703270',
    method: 'get'
  })
}
