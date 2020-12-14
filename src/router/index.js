import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 解决路由重复的问题 在底部导航栏，不会默认显示首页main内容，需在created方法中写上路由配置，导致路由重复
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const routes = [
  {
    path: '/',
    name: 'movie',
    component: () => import('../views/movie/index.vue')
  },
  {
    path: '/movie',
    name: 'Movie',
    redirect: '/movie/main',
    component: () => import('../views/movie/index.vue'),
    children: [
      {
        path: 'main',
        component: () => import('../views/movie/main/index.vue')
      },
      {
        path: 'round',
        component: () => import('../views/movie/round/index.vue')
      },
      {
        path: 'say',
        component: () => import('../views/movie/say/index.vue')
      },
      {
        path: 'people',
        component: () => import('../views/movie/people/index.vue')
      }
    ]
  },
  {
    path: '/cinema',
    name: 'cinema',
    component: () => import('../views/cinema/index.vue')
  },
  {
    path: '/ask',
    name: 'ask',
    component: () => import('../views/ask/index.vue')
  },
  {
    path: '/my',
    redirect: '/my/info',
    component: () => import('../views/my/index.vue'),
    children: [
      {
        path: 'register',
        component: () => import('../views/my/register/index.vue')
      },
      {
        path: 'login',
        component: () => import('../views/my/login/index.vue')
      },
      {
        path: 'info',
        component: () => import('../views/my/info/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
