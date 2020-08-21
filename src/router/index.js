import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Início',
      component: () => import('../pages/Mars/mars.vue')
    },
    {
      path: '/mars',
      name: 'Marte Imagens',
      component: () => import('../pages/Mars/mars.vue')
    }
  ]
})
