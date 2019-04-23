// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import elementUI from 'element-ui'
import { Message } from 'element-ui';
import axios from 'axios'
import '../theme/index.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import global from './api/common/global'
import localstorageUtil from './api/common/localstorageUtil'
import http from './api/common/http'

library.add(faCoffee)
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$http= http.instance
Vue.prototype.$message=Message
Vue.prototype.$localstorage=localstorageUtil
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false
Vue.use(elementUI)

Vue.prototype.$global=global
//路由跳转后，页面回到顶部
router.afterEach((to,from)=>{
   document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0; 
})
router.beforeEach((to,from,next) => {
  //获取用户登录成功后储存的登录标志
  let getFlag = localstorageUtil.get("Flag");

  //如果登录标志存在且为isLogin，即用户已登录
  if(getFlag === "isLogin"){

    //设置vuex登录状态为已登录
    // store.state.isLogin = true
    store.dispatch("setLoginFlag", true);
    store.dispatch("setUser", localstorageUtil.get("User"));
    if(to.meta.permission){
      console.log("访问页面需要权限："+to.meta.permission);
      let permissions=store.state.currentUser.permissions;
      console.log("当前用户拥有权限："+permissions)
        if(Array.isArray(permissions) && permissions.length != 0){
          if(permissions.indexOf(to.meta.permission)==-1){
            next(false)
            Message.error('用户不具备该权限')
            console.log('用户不具备该权限')
          }else{
            next()
          }
        }else{
          next(false)
          Message.error('用户不具备该权限')
          console.log('用户不具备该权限')
        }
    }else{
      next()
    }
  
  //如果登录标志不存在，即未登录
  }else{
    store.dispatch("setLoginFlag", false);
    //用户想进入需要登录的页面，则定向回登录界面
    if(to.meta.requireLogin){
      next(false)
      Message.error('请先登录')

    //用户进入无需登录的界面，则跳转继续
    }else{
      next()
    }

  }
})
/* eslint-disable no-new */
var vue =new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
export default vue
