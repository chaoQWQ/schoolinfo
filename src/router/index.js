import Vue from 'vue'
import Router from 'vue-router'
import competition from '../components/competition/competitionConten.vue'
import home from '../components/homeContent.vue'
import compDetail from '../components/competition/compDetail.vue'
import addComp from '../components/competition/addComp.vue'
import addSocietyActivity from '../components/society/addSocietyActivity.vue'
import societyActivity from '../components/society/societyActivity.vue'
import actDetail from '../components/society/actDetail.vue'
import volunteerDetail from '../components/volunteer/volunteerDetail.vue'
import addVolunteer from '../components/volunteer/addVolunteer.vue'
import volunteer from '../components/volunteer/volunteer.vue'
import personalCenter from '../components/personal/personalCenter.vue'
import personalInfo from '../components/personal/personalInfo.vue'
import personalRelease from '../components/personal/personalRelease.vue'
import personalSafe from '../components/personal/personalSafe.vue'
import personalMessage from '../components/personal/personalMessage.vue'
import infoAudit from '../components/back/infoAudit.vue'
import userManage from '../components/back/userManage.vue'
import roleManage from '../components/back/roleManage.vue'
import permissionManage from '../components/back/permissionManage.vue'
import localData from '../utils/local-data'
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
    // 比赛信息模块
    {
      path:'/competition',
      name:'competition',
      component:competition,
      meta:{
        requireLogin:true,
        navList:localData.routerBreadcrumb.competitionList.list
      }
    },
    {
      path:'/compDetail/:id',
      name:'compDetail',
      component:compDetail,
      meta:{
        navList:localData.routerBreadcrumb.competitionDetail.list
      }
    },
    {
      path:'/addComp',
      name:'addComp',
      component:addComp,
      meta:{
        requireLogin:true,
        permission:"compinfo:submit",
        navList:localData.routerBreadcrumb.competitionInsert.list
      }
    },
    // 社团活动模块
    {
      path:'/societyActivity',
      name:'societyActivity',
      component:societyActivity,
      meta:{
        requireLogin:true,
        navList:localData.routerBreadcrumb.societyActivityList.list
      }
    },
    {
      path:'/actDetail/:id',
      name:'actDetail',
      component:actDetail,
      meta:{
        navList:localData.routerBreadcrumb.societyActivityDetail.list
      }
    },
    {
      path:'/addSocietyActivity',
      name:'addSocietyActivity',
      component:addSocietyActivity,
      meta:{
        requireLogin:true,
        permission:"society:submit",
        navList:localData.routerBreadcrumb.societyActivityInsert.list
      }
    },
    // 志愿活动模块
    {
      path:'/volunteer',
      name:'volunteer',
      component:volunteer,
      meta:{
        requireLogin:true,
        navList:localData.routerBreadcrumb.volunteerList.list
      }
    },
    {
      path:'/addVolunteer',
      name:'addVolunteer',
      component:addVolunteer,
      meta:{
        requireLogin:true,
        permission:"volunteer:submit",
        navList:localData.routerBreadcrumb.volunteerInsert.list
      }
    },
    {
      path:'/volunteerDetail/:id',
      name:'volunteerDetail',
      component:volunteerDetail,
      meta:{
        requireLogin:true,
        navList:localData.routerBreadcrumb.volunteerDetail.list
      }
    },
    // 个人中心&后台管理
    {
      path:'/personalCenter',
      name:'personalCenter',
      redirect:'/personalCenter/personalInfo',
      component:personalCenter,
      meta:{                        
        requireLogin:true   
      },
      children:[
        { path: '/personalCenter/personalInfo', component: personalInfo,meta:{requireLogin:true}},
        { path: '/personalCenter/personalMessage', component: personalMessage},
        { path: '/personalCenter/personalSafe', component: personalSafe},
        { path: '/personalCenter/personalRelease', component: personalRelease},
        { path: '/personalCenter/infoAudit', component: infoAudit,meta:{permission:'back:manage'}},
        { path: '/personalCenter/userManage', component: userManage,meta:{permission:'back:manage'}},
        { path: '/personalCenter/roleManage', component: roleManage,meta:{permission:'back:manage'}},
        { path: '/personalCenter/permissionManage', component: permissionManage,meta:{permission:'back:manage'}}
      ]
    },
  ]
})
