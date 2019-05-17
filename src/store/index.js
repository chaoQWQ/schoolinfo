import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
        compTypeList:[
        {
            "name": "创业大赛",
            "id": 1
        },
        {
            "name": "营销策划",
            "id": 2
        },
        {
            "name": "金融比赛",
            "id": 3
        },
        {
            "name": "广告创意",
            "id": 4
        },
        {
            "name": "设计比赛",
            "id": 5
        },
        {
            "name": "IT应用开发",
            "id": 6
        },
        {
            "name": "文学演讲",
            "id": 7
        },
        {
            "name": "播音主持",
            "id": 8
        },
        {
            "name": "动漫书画",
            "id": 9
        },
        {
            "name": "影视摄影",
            "id": 10
        },
        {
            "name": "学科学术",
            "id": 11
        },
        {
            "name": "科技大赛",
            "id": 12
        },
        {
            "name": "公益大赛",
            "id": 13
        },
        {
            "name": "舞蹈武术",
            "id": 14
        },
        {
            "name": "模特大赛",
            "id": 15
        },
        {
            "name": "体育竞技",
            "id": 16
        },
        {
            "name": "选秀歌唱",
            "id": 17
        },
        {
            "name": "游戏竞技",
            "id": 18
        },
        {
            "name": "其他比赛",
            "id": 19
        }],
        isLogin:false,
        breadcumb: [],
        currentUser:{}

  },
  getters: {
    //获取登录状态
    isLogin: state => state.isLogin,
    currentUser: state => state.currentUser,
    breadcumb: state => state.breadcumb
  },

  // 设置属性状态
  mutations: {
    //保存登录状态
    userStatus(state, flag) {
      state.isLogin = flag
    },
    setCurrentUser(state,user){
      state.currentUser = user
    },
    changeBreadcumb (state, value) {
      state.breadcumb = value
    },
    changeUserEmail(state,email){
      state.currentUser.email=email
    }
  },

  // 应用mutations
  actions: {
    //获取登录状态
    setLoginFlag({commit}, flag) {
      commit("userStatus", flag)
    },
    setUser({commit},user){
      commit("setCurrentUser",user)
    }
  }
  
});
