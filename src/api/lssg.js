import request from '@/utils/request'
import qs from 'qs'

export function getLssgList(data) {
  return request({
    url: '/queryEvent',
    method: 'post',
    data
  })
}

export function createEvent(data) {
  return request({
    url: '/newEvent',
    method: 'post',
    data
  })
}

export function updateEvent({ id, param }) {
  return request({
    url: `/updateEvent?id=${id}`,
    method: 'post',
    data: param
  })
}

export function saveReport(data) {
  return request({
    url: '/newEvent',
    method: 'post',
    data: data
  })
}

export function getReport({ id }) {
  return request({
    url: '/getLindiParams',
    method: 'post',
    data: qs.stringify({
      id
    })
  }).then(res => res.data)
}

// 历史事故-受灾树种
export function getTreeCount() {
  return request({
    url: '/countByTree',
    method: 'get'
  })
}

export function countByYear() {
  return request({
    url: '/countByYear',
    method: 'get'
  })
}

export function countByMonth(year) {
  return request({
    url: `/countByMonth?year=${year}`,
    method: 'get'
  })
}

export function countByArea(year) {
  return request({
    url: `/countByArea?year=${year}`,
    method: 'get'
  })
}

export function queryEvent(params) {
  return request({
    url: `/queryEvent${params}`,
    method: 'get'
  })
}
