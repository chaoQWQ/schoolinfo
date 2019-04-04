<template>
  <div>
    <breadcrumb></breadcrumb>
    <div class="content-area">
      <mainContent></mainContent>
      <comment :comments="commentdata"></comment>
    </div>
  </div>

</template>
<script>
import comment from './base/comment'
import breadcrumb from './base/breadcrumb'
import mainContent from './base/mainContent'
import * as CommentData from './mockdata.js'
export default {
    name:"detailPage",
    components:{
        comment,
        mainContent,
        breadcrumb
        },
    data(){
        return{
            commentdata:[]
        }
    },
    created(){
        this.commentdata=CommentData.comment.data;
    }
}
</script>
<style scoped>

</style>
