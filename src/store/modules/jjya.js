import { getFhryCurPositionByPhone } from '@/api/lqfb'
import * as turf from '@turf/turf'
import GeoJSON from 'ol/format/GeoJSON'
import vue from '@/main'
import { getMonitorList } from '@/api/lqfb'

const state = {
  firePtLayer: null, // 火灾点层包括火灾点和缓冲区feature
  firePt: null, // 火灾点
  buffer: null,
  jydwList: [], // 救援队伍
  activeMenu: '',
  activeSubMenu: '',
  ssxyPersonList: [], // 周边分析实时响应人员
  monitorList: [] // 周边监控点
}

const mutations = {
  SET_FIRE_PT_LAYER(state, layer) {
    state.firePtLayer = layer
  },

  SET_FIRE_PT(state, feature) {
    state.firePt = feature
  },

  SET_BUFFER(state, buffer) {
    state.buffer = buffer
  },

  SET_ACTIVE_MENU(state, menu) {
    state.activeMenu = menu
  },

  SET_ACTIVE_SUB_MENU(state, menu) {
    state.activeSubMenu = menu
  },

  SET_JYDW_LIST(state, list) {
    state.jydwList = list
  },

  SET_SSXY_PERSON_LIST(state, list) {
    state.ssxyPersonList = list
  },

  SET_MONITOR_LIST(state, list) {
    state.monitorList = list
  }
}

const actions = {
  changeFirePtLayer({ commit }, layer) {
    commit('SET_FIRE_PT_LAYER', layer)
  },

  changeFirePt({ commit }, feature) {
    commit('SET_FIRE_PT', feature)
  },

  changeBuffer({ commit }, buffer) {
    commit('SET_BUFFER', buffer)
  },

  changeActiveMenu({ commit }, menu) {
    commit('SET_ACTIVE_MENU', menu)
  },

  changeActiveSubMenu({ commit }, menu) {
    commit('SET_ACTIVE_SUB_MENU', menu)
  },

  changeJydwList({ commit }, list) {
    commit('SET_JYDW_LIST', list)
  },

  getSsxyPersonList({ commit, state }, list) {
    // 用缓冲区范围面查询实时人员
    // getFhryCurPositionByPhone().then(res => {
    //   const list = res.data.result
    //   const features = list.map(v => {
    //     const feature = window.$map.createFeature(
    //       [v.longitude, v.latitude],
    //       v.smid,
    //       { ...v, NAME: v.smid }
    //     )
    //     return feature
    //   })
    //   const format = new GeoJSON()
    //   const ssxyPtsGeojson = format.writeFeaturesObject(features)
    //   const bufferGeojson = format.writeFeatureObject(state.buffer)
    //   const ptsWithin = turf.pointsWithinPolygon(ssxyPtsGeojson, bufferGeojson)
    //   commit('SET_SSXY_PERSON_LIST', format.readFeatures(ptsWithin))
    // })
  },

  getMonitorList({ commit }, list) {
    // getMonitorList().then(res => {
    //   let list = []
    //   if (res.code === 20000) {
    //     res.data.forEach(item => {
    //       list = [...list, ...item.data]
    //     })
    //   }
    //   const features = list.map(v => {
    //     const feature = window.$map.createFeature(
    //       [v.longitude, v.latitude],
    //       '监控点',
    //       v
    //     )
    //     return feature
    //   })
    //   const format = new GeoJSON()
    //   const jkPtsGeojson = format.writeFeaturesObject(features)
    //   const bufferGeojson = format.writeFeatureObject(state.buffer)
    //   const ptsWithin = turf.pointsWithinPolygon(jkPtsGeojson, bufferGeojson)
    //   commit('SET_MONITOR_LIST', format.readFeatures(ptsWithin))
    // })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
