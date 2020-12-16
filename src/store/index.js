import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    hasLogin: '未登录',
    footerFlag: true
    // searchflag: false
  },
  mutations: {
    login(state) {
      state.hasLogin = '我的'
    },
    edit(state) {
      state.hasLogin = '未登录'
    },
    footerFlagOut(state) {
      state.footerFlag = false
    },
    footerFlagGo(state) {
      state.footerFlag = true
    }
    // searchflag(state) {
    //   if (state.searchflag === false) {
    //     state.searchflag = true
    //   } else if (state.searchflag === true) {
    //     state.searchflag = false
    //   }
    // }
  },
  actions: {},
  modules: {}
})
