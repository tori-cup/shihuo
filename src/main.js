import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import Vant from 'vant'
import 'vant/lib/index.css'

import '../public/css/iconfont/iconfont.css'
import '../public/css/common.css'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

// import VideoPlayer from 'vue-video-player'
// Vue.use(VideoPlayer)
// import 'videojs-contrib-hls';
// import 'video.js/dist/video-js.css'
// import $ from 'jquery'

// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);

import { List } from 'vant';
Vue.use(List);

// import Video from 'video.js'
// import 'video.js/dist/video-js.css'
// Vue.prototype.$video = Video

import axios from 'axios'
Vue.prototype.$http = axios

Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
