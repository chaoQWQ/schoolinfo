import Vue from 'vue'
import Router from 'vue-router'
import competition from '../components/competitionConten.vue'
import home from '../components/homeContent.vue'
import detail from '../components/detail.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path:'/',
      redirect:'/home'
    },
    {
      path: '/home',
      name: 'home',
      component: home
    },
    {
      path:'/competition',
      name:'competition',
      component:competition
    },
    {
      path:'/detail',
      name:'detail',
      component:detail
    }
  ]
})
