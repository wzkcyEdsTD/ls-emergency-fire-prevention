import { getLssgList } from '@/api/lssg'
import vue from '@/main'

const state = {
  lssgList: [],
  lssgLayer: null, // 历史事故图层
  lssgTempLayer: null, // 历史事故临时图层
  lssgType: '历史事故总览',
  reportType: 'CREATE', // 报告操作类型
  lssgDetailItem: null
}

const mutations = {
  SET_LSSG_DETAIL_ITEM(state, list) {
    state.lssgDetailItem = list
  },

  SET_LSSG_LIST(state, list) {
    state.lssgList = list
  },
  SET_LSSG_LAYER(state, layer) {
    state.lssgLayer = layer
  },
  SET_LSSG_TEMP_LAYER(state, layer) {
    state.lssgTempLayer = layer
  },
  SET_LSSG_TYPE(state, type) {
    state.lssgType = type
  },
  SET_REPORT_TYPE(state, type) {
    state.reportType = type
  }
}

const actions = {
  changeLssgDetailItem({ commit }, item) {
    commit('SET_LSSG_DETAIL_ITEM', item)
  },

  changeLssgList({ commit }, list) {
    commit('SET_LSSG_LIST', list)
  },

  changeLssgLayer({ commit }, layer) {
    commit('SET_LSSG_LAYER', layer)
  },

  changeLssgTempLayer({ commit }, layer) {
    commit('SET_LSSG_TEMP_LAYER', layer)
  },

  getLssgLayer({ commit, state }, payload) {
    getLssgList().then(res => {
      commit('SET_LSSG_LIST', res)
      state.lssgLayer && vue.$map.removeLayer(state.lssgLayer)
      const features = res.data.result
        .filter(v => {
          if (!v.geo_info) return false
          if (typeof v.geo_info === 'string') {
            try {
              var obj = JSON.parse(v.geo_info)
              if (typeof obj === 'object' && obj) {
                return true
              } else {
                return false
              }
            } catch (e) {
              console.log('error：' + v.geo_info + '!!!' + e)
              return false
            }
          }
        })
        .map(v => vue.$map.createFeatureByGeoJson(JSON.parse(v.geo_info), v))

      const layer = vue.$map.createVectorLayer(features)
      const mask = vue.$map.createMaskByGeoJson(
        require('@/components/Map/ruian.json')
      )
      layer.addFilter(mask)
      vue.$map.addLayer(layer)
      commit('SET_LSSG_LAYER', layer)
    })
  },

  removeLssgLayer({ commit, state }, payload) {
    state.lssgLayer && vue.$map.removeLayer(state.lssgLayer)
    commit('SET_LSSG_LAYER', null)
  },

  changeLssgType({ commit }, type) {
    commit('SET_LSSG_TYPE', type)
  },

  changeReportType({ commit }, type) {
    commit('SET_REPORT_TYPE', type)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
