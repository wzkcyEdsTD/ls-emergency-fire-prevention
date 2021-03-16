const state = {
  mode: 'map-mode',
  activeMenu: '基础要素',
  infoPanelOffsetRight: -30, // 详情表右偏移
  yadqPannel: false,
  rydwPannelOffsetRight: -30,
  zhfxOffsetRight: -30, // 智慧分析列表右偏移
  zlOffsetRight: 0, // 总览表右偏移
  yadqOffsetRight: -30, // 预案调取右偏移
  yzhxdjOffsetRight: -30, // 一周森林火险等级右偏移
  videoListOffsetRight: -30,
  videoUrl: '',
  yadj: '', // 预案等级
  isXFDW: '基本信息', // 资源详情是否显示森林消防队伍
  zlActiveTab: null,
  rydwActiveTab: ''
}

const mutations = {
  SET_VIDEO_LIST_OFFSET_RIGHT(state, payload) {
    state.videoListOffsetRight = payload
  },

  SET_RYDW_ACTIVE_TAB(state, payload) {
    state.rydwActiveTab = payload
  },

  SET_MODE(state, mode) {
    state.mode = mode
  },

  SET_ACTIVE_MENU(state, payload) {
    state.activeMenu = payload
  },

  SET_INFO_PANEL_OFFSET_RIGHT(state, payload) {
    state.infoPanelOffsetRight = payload
  },

  SET_IS_QDCX(state, payload) {
    state.yadqPannel = payload
  },

  SET_RYDW_PANNEL_OFFSET_RIGHT(state, payload) {
    state.rydwPannelOffsetRight = payload
  },

  SET_ZHFX_OFF_SET_RIGHT(state, payload) {
    state.zhfxOffsetRight = payload
  },

  SET_ZL_OFF_SET_RIGHT(state, payload) {
    state.zlOffsetRight = payload
  },

  SET_YADQ_OFF_SET_RIGHT(state, payload) {
    state.yadqOffsetRight = payload
  },

  SET_YZHXDJ_OFF_SET_RIGHT(state, payload) {
    state.yzhxdjOffsetRight = payload
  },

  SET_VIDEO_URL(state, url) {
    state.videoUrl = url
  },
  SET_JKSP_URL(state, payload) {
    state.jkspUrl = payload
  },

  SET_YADJ(state, payload) {
    state.yadj = payload
  },

  SET_IS_XFDW(state, payload) {
    state.isXFDW = payload
  },

  SET_ZL_ACTIVE_TAB(state, payload) {
    state.zlActiveTab = payload
  }

}

const actions = {
  changeVideoListOffsetRight({ commit }, mode) {
    commit('SET_VIDEO_LIST_OFFSET_RIGHT', mode)
  },

  changeRydwActiveTab({ commit }, mode) {
    commit('SET_RYDW_ACTIVE_TAB', mode)
  },

  changeMode({ commit }, mode) {
    commit('SET_MODE', mode)
  },

  changeActiveMenu({ commit }, payload) {
    commit('SET_ACTIVE_MENU', payload)
  },

  changeInfoPanelOffsetRight({ commit }, payload) {
    commit('SET_INFO_PANEL_OFFSET_RIGHT', payload)
  },

  changeyadqPannel({ commit }, payload) {
    commit('SET_IS_QDCX', payload)
  },

  changerydwPannelOffsetRight({ commit }, payload) {
    commit('SET_RYDW_PANNEL_OFFSET_RIGHT', payload)
  },

  changezhfxOffsetRight({ commit }, payload) {
    commit('SET_ZHFX_OFF_SET_RIGHT', payload)
  },

  changezlOffsetRight({ commit }, payload) {
    commit('SET_ZL_OFF_SET_RIGHT', payload)
  },

  changeyadqOffsetRight({ commit }, payload) {
    commit('SET_YADQ_OFF_SET_RIGHT', payload)
  },

  changeyzhxdjOffsetRight({ commit }, payload) {
    commit('SET_YZHXDJ_OFF_SET_RIGHT', payload)
  },

  changeVideoUrl({ commit }, payload) {
    commit('SET_VIDEO_URL', payload)
  },
  changejkspURL({ commit }, payload) {
    commit('SET_JKSP_URL', payload)
  },

  changeYADJ({ commit }, payload) {
    commit('SET_YADJ', payload)
  },

  changeIsXFDW({ commit }, payload) {
    commit('SET_IS_XFDW', payload)
  },

  changezlActiveTab({ commit }, payload) {
    commit('SET_ZL_ACTIVE_TAB', payload)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
