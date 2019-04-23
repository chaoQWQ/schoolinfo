
import context from '../../main'

function getTypeList(){
    context.$http.get('/api/compinfo/getTypeList')
          .then(resp=>{
            return resp.data.data
          })
}


export default{
  getTypeList
}