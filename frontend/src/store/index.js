import Vue from 'vue';
import Vuex from 'vuex';
import { alert } from './alert.module';
import { authentication } from './authentication.module';
import { users } from './users.module';
Vue.use(Vuex)


const state = {
  sidebarShow: 'responsive',
  sidebarMinimize: false
}

const mutations = {
  toggleSidebarDesktop (state) {
    const sidebarOpened = [true, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarOpened ? false : 'responsive'
  },
  toggleSidebarMobile (state) {
    const sidebarClosed = [false, 'responsive'].includes(state.sidebarShow)
    state.sidebarShow = sidebarClosed ? true : 'responsive'
  },
  set (state, [variable, value]) {
    state[variable] = value
  }
}

export default new Vuex.Store({
  modules: {
    alert,
    authentication,
    users
  },
  state,
  mutations
})