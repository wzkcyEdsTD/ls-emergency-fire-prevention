import Vue from 'vue'
import Vuex from 'vuex'
import getters from './getters'
import app from './modules/app'
import permission from './modules/permission'
import settings from './modules/settings'
import nav from './modules/nav'
import map from './modules/map'
import siderbar from './modules/siderbar'

import lqfb from './modules/lqfb'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    permission,
    settings,
    nav,
    map,
    siderbar,

    lqfb
  },
  getters
})

export default store
