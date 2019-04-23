/**
 * axios封装
 * 请求拦截、响应拦截、错误统一处理
 */
import axios from 'axios';
import context from '../../main'
/** 
 * 提示函数 
 * 禁止点击蒙层、显示一秒后关闭
 */
const okTip = msg => {    
    context.$message({
        message:msg,
        type:'success'
    })
}
const errorTip = msg => {    
    context.$message.error(msg)
}



// 创建axios实例
var instance = axios.create({    timeout: 1000 * 12});
// 设置post请求头
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
/** 
 * 请求拦截器 
 * 每次请求前，如果存在token则在请求头中携带token 
 */ 
// instance.interceptors.request.use(    
//     config => {        
//         // 登录流程控制中，根据本地是否存在token判断用户的登录情况        
//         // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token        
//         // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码        
//         // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作。        
//         const token = store.state.token;        
//         token && (config.headers.Authorization = token);        
//         return config;    
//     },    
//     error => Promise.error(error))

// 响应拦截器
instance.interceptors.response.use(    
    // 请求成功(响应码为以2开头)
    // res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),    
    res => {
      const data = res.data;
      switch(data.code){
        case "000403":
          errorTip(data.message);
          context.$router.push("/home")
          break;
        default:
          return Promise.resolve(res)
      }
      return Promise.resolve(res)
    },
    // 请求失败
    error => {
        const { response } = error;
        if (response) {
            // 请求已发出，但是不在2xx的范围 
            // errorHandle(response.status, response.data.message);
            return Promise.reject(response.data.error.message);
        }
    });




    


export default {
  instance
};