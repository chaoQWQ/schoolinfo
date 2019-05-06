
    /**
     * @param key
     * @param data
     * @param time 失效时间（秒）,默认一周
     * @returns {boolean}
     */
    function put(key, data, time) {
        try {
            if (!localStorage) {
                return false;
            }
            if (!time || isNaN(time)) {
                time = 60*60*24; //24小时过期
            }
            var cacheExpireDate = (new Date() - 1) + time * 1000;
            var cacheVal = {val: data, exp: cacheExpireDate};
            localStorage.setItem(key, JSON.stringify(cacheVal));//存入缓存值
        } catch (e) {
        }
    }

    function get(key) {
        try {
            if (!localStorage) {
                return false;
            }else{
              var cacheVal = localStorage.getItem(key);
              var result = JSON.parse(cacheVal);
              var now = new Date() - 1;
              //缓存不存在
              if (!result) {
                  return null;
              }
              //缓存过期
              else if (now > result.exp) {
                  this.remove(key);
                  return "";
              }else{
                return result.val;
              }
            }
            
        } catch (e) {
            this.remove(key);
            return null;
        }
    }

    function remove(key) {
        if (!localStorage) {
            return false;
        }
        localStorage.removeItem(key);
    }

export default{
    put,
    get,
    remove
}