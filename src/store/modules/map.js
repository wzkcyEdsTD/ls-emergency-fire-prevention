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
  lqzyLayer: false, // 林区资源图层
  videoData:[],
  netWorkData:[],
  qiXiangData:[],
  rightMenuList:[{name:"火灾点列表"}],
  detailOrAround:{},
}

const mutations = {
  APPEND_RIGHTMENULIST(state, rightMenu){
    
    if (state.rightMenuList.length == 0) {
      state.rightMenuList.push(rightMenu)
    } else {
      const obj = {};
      const list = state.rightMenuList
      list.push(rightMenu)
      list.map(v => {
        if (!obj[v.name]) { obj[v.name] = v }
      })

      const setNameArr = [...new Set(list.map(v => v.name))];
      state.rightMenuList = setNameArr.map(v => obj[v])
    }
  },
  REMOVE_RIGHTMENULIST(state, rightMenu){

    if (state.rightMenuList.length > 0) {
      const list = state.rightMenuList
      const resoult = list.filter(v=>{
        if (v.name!=rightMenu.name) {
          return v
        }
      })
      state.rightMenuList = resoult;
    }
  },

  APPEND_DETAILORAROUND(state, item){

    state.detailOrAround = item
  },

  SET_DETAILORAROUND(state, list){
    state.detailOrAround = list
  },
  REMOVE_DETAILORAROUND(state, item){

    if (state.detailOrAround.length > 0) {
      const list = state.detailOrAround
      const resoult = list.filter(v=>{
        if (v.name!=item.name) {
          return v
        }
      })
      state.detailOrAround = resoult;
    }
  },

  SET_VIDEO(state, video){
    state.videoData = video
  },
  SET_NETWORK(state, list){
    state.netWorkData = list
  },
  SET_QIXIANG(state, list){
    state.qiXiangData = list
  },
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
    // debugger
    state.layerList = list
    // debugger
  },
  APPEND_LAYER_LIST(state, list) {
    const name = null;
    // debugger
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
    // debugger
    state.featuresData = layer
  },
  SET_CLEAR_FLAG(state, payload) {
    state.clearFlag = !state.clearFlag
  }
}

const actions = {
  appendRightMenuList({ commit },list){
    commit('APPEND_RIGHTMENULIST', list)
  },
  removeRightMenuListItem({ commit },list){
    commit('REMOVE_RIGHTMENULIST', list)
  },

  appendDetailOrAround({ commit },list){
    commit('APPEND_DETAILORAROUND', list)
  },
  removeDetailOrAround({ commit },list){
    commit('REMOVE_DETAILORAROUND', list)
  },
  setDetailOrAround({ commit },list){
    commit('SET_DETAILORAROUND', list)
  },
  
  changeVideo({ commit },video){
    commit('SET_VIDEO', video)
  },
  changeNetWork({ commit },list){
    commit('SET_NETWORK',list)
  },
  changeQiXiang({ commit },list){
    commit('SET_QIXIANG',list)
  },
  addLayerList({ commit },list){
    commit('APPEND_LAYER_LIST', list)
  },
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
    // debugger
    removeLayerUrlList.map(v => {
      state.layerList.map(item => {
        if (item.name === v.label) {
          vue.$map.removeLayer(item.layer)
          commit('REMOVE_FROM_LAYER_LIST', item)
        }
      })
    })
    // appendLayerUrlList = appendLayerUrlList.filter(v=>{
    //   if(v.label=="专业救援队伍"){
    //     return v
    //   }
    //   else if(v.label=="综合救援队伍"){
    //     return v
    //   }
    //   else if(v.label=="森林消防救援队伍"){
    //     return v
    //   }
    //   else if(v.label=="志愿者救援队伍"){
    //     return v
    //   }}
    //   )
      // debugger
    let list = await Promise.all(
      appendLayerUrlList.map(async v => {
        let layer = null
        // debugger
          if (v.type === 'map') {
            if (v.url) {
              layer = vue.$map.createTileSuperMapRestLayer(v.url)
            }
          } else if (v.type === 'wms') {
            layer = vue.$map.createWMSLayer(v)
          } else {
            // console.log("显示节点的图层",v);
            // debugger

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
    // commit('SET_CLEAR_FLAG', payload)

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
