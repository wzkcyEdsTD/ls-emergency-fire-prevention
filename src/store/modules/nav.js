const state = {
  navList: [
    {
      text: '森林火情预警一张图',
      link: '/lqfb',
      avatar: 'assets/images/nav/menu-slfh-icon.png',
      icon: '林区一张图',
      color: '#ffffff',
      active: true
    },
    // {
    //   text: '救援分析与预案调取',
    //   link: '/jjya'
    // },
    // {
    //   text: '历史事故查询',
    //   link: '/lssg',
    //   avatar: 'assets/images/nav/menu-lssg-icon.png',
    //   icon: '历史事故',
    //   color: '#2F91BC',
    //   active: false
    // }
  ]
}

const mutations = {
  SET_NAV_LIST(state, list) {
    state.navList = list
  }
}

const actions = {
  changeNavList({ commit }, list) {
    commit('SET_NAV_LIST', list)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
