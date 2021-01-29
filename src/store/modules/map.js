import vue from '@/main'

const state = {
  baseLayer: null, // 底图
  zjLayer: null, // 影像注记层
  layerList: [], // 地图中叠加的图层 [{name:'', layer:''}]
  drawGeojson: null, // 绘制的图形信息
  drawLayer: null, // 绘制图层
  features: [], // 要素集合
  isAddFeatures: false, // 是否添加要素集合
  featuresData: {},
  clearFlag: false, // 清空按钮标识，值改变即清空图层
  jkLayer: null,
  isShowDeatil: true, // 是否显示查看详情
  lqzyLayer: false // 林区资源图层
}

const mutations = {
  SET_LQZY_LAYER(state, payload) {
    state.lqzyLayer = payload
  },

  SET_IS_SHOW_DETAIL(state, payload) {
    state.isShowDeatil = payload
  },

  SET_JK_LAYER(state, layer) {
    state.jkLayer = layer
  },

  SET_BASE_LAYER(state, layer) {
    state.baseLayer = layer
  },
  UPDATE_BASE_LAYER_SOURCE_URL_old(state, url) {
    state.baseLayer.setSource(vue.$map.createTileSuperMapRestSource(url))
  },
  UPDATE_BASE_LAYER_SOURCE_URL(state, type) {
    state.baseLayer = vue.$map.createTianDiTuLayer(type)
  },
  SET_ZJ_LAYER(state, layer) {
    state.zjLayer = layer
  },
  SET_LAYER_LIST(state, list) {
    state.layerList = list
  },
  APPEND_LAYER_LIST(state, list) {
    const name = null;

    if (state.layerList.length == 0) {
      state.layerList = [...state.layerList, ...list]
    } else {
      const obj = {};
      const arr = [...state.layerList, ...list];
      arr.map(v => {
        if (!obj[v.name]) { obj[v.name] = v }
      })
      const setNameArr = [...new Set(arr.map(v => v.name))];
      state.layerList = setNameArr.map(v => obj[v])
      // list.forEach(element => {
      //   debugger
      //   state.layerList.forEach(item=>{
      //       if(item.name==element.name){
      //         name = item.name
      //       }
      //     })
      //     if(!name){
      //       state.layerList = [...state.layerList,element]
      //     }else{
      //       name = null;
      //     }

      // })
    }






  },
  REMOVE_FROM_LAYER_LIST(state, item) {
    state.layerList = state.layerList.filter(v => v.name !== item.name)
  },
  SET_DRAW_GEOJSON(state, geojson) {
    state.drawGeojson = geojson
  },
  SET_DRAW_LAYER(state, layer) {
    state.drawLayer = layer
  },
  SET_FEATURES(state, layer) {
    state.features.push(layer)
  },
  CLEAR_FEATURES(state, layer) {
    state.features = layer
  },
  SET_IS_ADD_FEATURES(state, layer) {
    state.isAddFeatures = layer
  },
  SET_FEATURES_DATA(state, layer) {
    state.featuresData = layer
  },
  SET_CLEAR_FLAG(state, payload) {
    state.clearFlag = !state.clearFlag
  }
}

const actions = {
  changeLqzyLayer({ commit }, payload) {
    commit('SET_LQZY_LAYER', payload)
  },

  changeIsShowDetail({ commit }, payload) {
    commit('SET_IS_SHOW_DETAIL', payload)
  },

  changeJkLayer({ commit, state }, { layer, ope }) {
    if (ope === 'ADDLAYER') {
      vue.$map.addLayer(layer)
      commit('SET_JK_LAYER', layer)
    } else if (ope === 'REMOVELAYER') {
      vue.$map.removeLayer(layer)
      commit('SET_JK_LAYER', null)
    }
  },

  changeBaseLayer({ commit, state }, layer) {
    state.baseLayer && vue.$map.removeLayer(state.baseLayer)
    commit('SET_BASE_LAYER', layer)
    vue.$map.addLayer(layer)
  },
  updateBaseLayerSourceUrl({ commit }, type) {
    commit('UPDATE_BASE_LAYER_SOURCE_URL', type)
  },
  changeZjLayer({ commit }, layer) {
    state.zjLayer && vue.$map.removeLayer(state.zjLayer)
    commit('SET_ZJ_LAYER', layer)
    vue.$map.addLayer(layer)
  },
  setZjLayerVisible({ commit, state }, visible) {
    state.zjLayer.setVisible(visible)
  },
  changeLayerList({ commit }, list) {
    commit('SET_LAYER_LIST', list)
  },
  async changeLayerListByUrl({ state, commit }, { appendLayerUrlList, removeLayerUrlList }) {
    removeLayerUrlList.map(v => {
      state.layerList.map(item => {
        if (item.name === v.label) {
          vue.$map.removeLayer(item.layer)
          commit('REMOVE_FROM_LAYER_LIST', item)
        }
      })
    })
    let list = await Promise.all(
      appendLayerUrlList.map(async v => {
        let layer = null

        if (v.type === 'map') {
          layer = vue.$map.createTileSuperMapRestLayer(v.url)
        } else if (v.type === 'wms') {
          layer = vue.$map.createWMSLayer(v)
        } else {
          // console.log("显示节点的图层",v);
          layer = await vue.$map.createVectorLayerByDataRest(v)
        }
        return {
          name: v.label,
          layer,
          ...v
        }
      })
    )
    list = list.filter(v => v.layer != null)
    commit('APPEND_LAYER_LIST', list)
    list.map(v => v.layer && window.g.map.addLayer(v.layer))
  },
  appendLayerList({ commit, state }, list) {
    commit('SET_LAYER_LIST', [...state.layerList, ...list])
  },
  changeDrawGeojson({ commit }, geojson) {
    commit('SET_DRAW_GEOJSON', geojson)
  },
  changeDrawLayer({ commit }, layer) {
    commit('SET_DRAW_LAYER', layer)
  },
  changeFeatures({ commit }, layer) {
    commit('SET_FEATURES', layer)
  },
  clearFeatures({ commit }, layer) {
    commit('CLEAR_FEATURES', layer)
  },
  changeIsAddFeatures({ commit }, layer) {
    commit('SET_IS_ADD_FEATURES', layer)
  },
  changeFeaturesData({ commit }, layer) {
    commit('SET_FEATURES_DATA', layer)
  },
  changeClearFlag({ commit, state, dispatch }, payload) {
    commit('SET_CLEAR_FLAG', payload)
    state.layerList.map(item => {
      item.layer && vue.$map.removeLayer(item.layer)
    })
    if (state.jkLayer != null) {
      vue.$map.removeLayer(state.jkLayer)
      vue.$store.dispatch('lqfb/changeVideoListOffsetRight', -30)
    }
    commit('SET_LAYER_LIST', [])
    // dispatch('jjya/changeFirePtLayer', null, { root: true })
    // dispatch('jjya/changeBuffer', null, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
