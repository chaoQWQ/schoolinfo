<template>
  <div>
    <breadcrumb></breadcrumb>
    <div class="content-area">
      <mainContent :mainContentData="mainContentData" dtype=2></mainContent>
      <comment :comments="commentdata"></comment>
    </div>
    <el-tooltip placement="top" content="回到顶部">
      <back-to-top/>
    </el-tooltip>
  </div>

</template>
<script>
import comment from '../base/comment'
import breadcrumb from '../base/breadcrumb'
import mainContent from '../base/mainContent'
import backToTop from "../base/backToTop"
import * as CommentData from '../mockdata.js'
export default {
    name:"actDetail",
    components:{
        comment,
        mainContent,
        breadcrumb,
        backToTop
        },
    data(){
        return{
            commentdata:[],
            mainContentData:{}
        }
    },
    methods:{
      getactDetailContent(id){
        this.$http.get('/api/society/getDetail',{
          params:{
            id:id
          }
        }).then(resp=>{
          this.mainContentData= resp.data.data
        })
      }
    },
    created(){
        this.commentdata=CommentData.comment.data;
        this.getactDetailContent(this.$route.params.id);
    }
}
</script>
<style scoped>

</style>
