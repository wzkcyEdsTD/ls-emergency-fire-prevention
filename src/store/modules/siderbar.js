const state = {
  checkedLeafNodes: [] // 目录树中选中的叶子节点图层

}

const mutations = {
  SET_CHECKED_LEAF_NODES(state, nodes) {
    state.checkedLeafNodes = nodes
  }
}

const actions = {
  changeCheckedLeafNodes({ commit, dispatch, state }, nodes) {
    // 判断取消勾选的和新勾选的node
    const newNodes = nodes
    const oldeNodes = state.checkedLeafNodes
    const oldNodesIds = oldeNodes.map(v => v.id)
    const newNodesIds = newNodes.map(v => v.id)
    const appendNodes = newNodes.filter(v => oldNodesIds.indexOf(v.id) === -1)
    const removeNodes = oldeNodes.filter(v => newNodesIds.indexOf(v.id) === -1)
    const appendLayerUrlList = appendNodes.filter(v => v.value).map(v => v.value)
    const removeLayerUrlList = removeNodes.filter(v => v.value).map(v => v.value)

    commit('SET_CHECKED_LEAF_NODES', nodes)
    dispatch('map/changeLayerListByUrl', { appendLayerUrlList, removeLayerUrlList }, { root: true })
  },
  changeCheckedLeafNodesWithBuffer({ commit, dispatch, rootGetters }, nodes) {
    // 判断取消勾选的和新勾选的node
    const newNodes = nodes
    const oldeNodes = state.checkedLeafNodes
    const oldNodesIds = oldeNodes.map(v => v.id)
    const newNodesIds = newNodes.map(v => v.id)
    const appendNodes = newNodes.filter(v => oldNodesIds.indexOf(v.id) === -1)
    const removeNodes = oldeNodes.filter(v => newNodesIds.indexOf(v.id) === -1)
    const appendLayerUrlList = appendNodes.filter(v => v.value).map(v => ({ ...v.value, cropFeature: rootGetters.buffer, geomFilter: rootGetters.buffer }))
    const removeLayerUrlList = removeNodes.filter(v => v.value).map(v => ({ ...v.value, cropFeature: rootGetters.buffer, geomFilter: rootGetters.buffer }))
    commit('SET_CHECKED_LEAF_NODES', [])
    dispatch('map/changeLayerListByUrl', { appendLayerUrlList, removeLayerUrlList }, { root: true })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
