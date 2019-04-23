import Vue from 'vue'
import Router from 'vue-router'
import competition from '../components/competition/competitionConten.vue'
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
      component:competition,
      meta:{
        requireLogin:true,
        permission:"competition"
      }
    },
    {
      path:'/detail/:id',
      name:'detail',
      component:detail
    }
  ]
})
