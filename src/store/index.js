import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasLogin: '未登录'
  },
  mutations: {
    login(state) {
      state.hasLogin = '我的'
    },
    edit(state) {
      state.hasLogin = '未登录'
    }
  },
  actions: {},
  modules: {}
})
