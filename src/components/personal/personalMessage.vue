<template>
  <div id="msgBox" class="messageBox">
    <div v-for="(item,index) in messageList" :key="index">
      <myMessage :messageData="item"></myMessage>
    </div>
    <p v-if="messageList.length==0" style="text-align: center;font-size: x-large;font-style: italic;color: darkgrey;">暂无消息</p>
    <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="30">
        <!-- 加载中... -->
    </div>
  </div>
</template>
<script>
import myMessage from '../base/myMessage'
export default {
  name:"personalMessage",
  data(){
    return{
      busy: true,
      messageList:[],
      pageNum:1,
      pageSize:7
    }
  },
  components: {
    myMessage
  },
  methods:{
    getMessageList(flag){
      this.$http.get('/api/back/myMessage',{
        params:{
          id:this.$store.getters.currentUser.id,
          pageNum:this.pageNum,
          pageSize:this.pageSize
        }
      }).then(resp=>{
        if(resp.data.code="000000"){
          if(flag){
            this.messageList.push.apply(this.messageList,resp.data.data.pageList);
            this.busy = false
            if(resp.data.data.pageList.length===0){
              this.busy = true
            }else{
              this.busy=false
            }
          }else{
            this.messageList=resp.data.data.pageList
            this.busy=false
          }
        }else{
          this.$message.error("数据加载异常")
        }
      })
    },
    loadMore(){
      this.busy = true;
     //官方示例中延迟了1秒，防止滚动条滚动时的频繁请求数据
      setTimeout(() => {
        this.pageNum++
        this.getMessageList(true)
        //这里请求接口去拿数据，实际应该是调用一个请求数据的方法
        this.busy = false;
      }, 500);
    }

  },
  mounted() {
    this.getMessageList(false)
  },
  
}
</script>
<style scoped>
body{
  overflow-y: hidden
}
.messageBox{
  height: 700px;
  margin-left: 20px;
  overflow-x: hidden;
  /* overflow: scroll; */
}
.messageBox ::-webkit-scrollbar{
  width: 0px;
}
</style>
