<template>
  <div>
    <breadcrumb></breadcrumb>
    <div class="content-area">
      <mainContent :mainContentData="mainContentData"></mainContent>
      <comment :comments="commentdata"></comment>
    </div>
  </div>

</template>
<script>
import comment from '../base/comment'
import breadcrumb from '../base/breadcrumb'
import mainContent from '../base/mainContent'
import * as CommentData from '../mockdata.js'
export default {
    name:"detailPage",
    components:{
        comment,
        mainContent,
        breadcrumb
        },
    data(){
        return{
            commentdata:[],
            mainContentData:{}
        }
    },
    methods:{
      getCompetitionDetailContent(id){
        this.$http.get('/api/compinfo/getDetail',{
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
        this.getCompetitionDetailContent(this.$route.params.id);
    }
}
</script>
<style scoped>

</style>
