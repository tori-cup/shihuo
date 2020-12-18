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
    name: 'homepage',
    component: () => import('../views/homepage/index.vue')
  },
  {
    path: '/homepage',
    name: 'Homepage',
    redirect: '/homepage/main',
    component: () => import('../views/homepage/index.vue'),
    children: [
      {
        path: 'main',
        component: () => import('../views/homepage/main/index.vue')
      },
      {
        path: 'search',
        component: () => import('../views/homepage/main/index.vue')
      },
      {
        path: 'detail',
        component: () => import('../views/homepage/detail/index.vue')
      }
    ]
  },
  {
    path: '/classify',
    name: 'classify/list',
    component: () => import('../views/classify/index.vue'),
    children: [
      {
        path: 'list',
        component: () => import('../views/classify/list/index.vue')
      },
    ]
  },
  {
    path: '/find',
    name: 'find',
    component: () => import('../views/find/index.vue')
  },
  {
    path: '/cart',
    name: 'cart',
    component: () => import('../views/cart/index.vue')
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
      },
      {
        path: 'edit',
        component: () => import('../views/my/edit/index.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
