<template>
<div>
  <div class="content-area">
    <breadcrumb></breadcrumb>
    <div class="main" id="main_body">
      <div class="wrap opptop clearfix" id="ptit">
        <h1 class="l">
          <div class="l">{{mainContentData.title}}</div>
          <span class="l">{{mainContentData.state}}</span>
        </h1>
        <span class="opp_org_join_status r">&nbsp;&nbsp;</span>
      </div>
      <div class="wrap clearfix m10">
        <div class="conl">
          <div class="clearfix">
            <div class="l desc_img listimg_opp">
              <a>
                <img
                  :src="mainContentData.coverImage!=null&&mainContentData.coverImage!=''?mainContentData.coverImage:'../../../static/images/volunteer_noimg.jpg'"
                  onerror="this.src='../../../static/images/volunteer_noimg.jpg';this.onerror=null'"
                  data-bd-imgshare-binded="1"
                >
              </a>
            </div>
            <div style="margin-left: 20px;" class="l desc_txt">
              <table>
                <tbody>
                  <tr>
                    <th>项目地点：</th>
                    <td>{{mainContentData.address}}</td>
                  </tr>
                  <tr>
                    <th>服务类别：</th>
                    <td>
                      {{mainContentData.serviceType}}
                    </td>
                  </tr>

                  <tr>
                    <th>招募日期：</th>
                    <td>
                      <span>{{mainContentData.recruitStartTime}}</span> &nbsp;至&nbsp;
                      <span>{{mainContentData.recruitEndTime}}</span>
                    </td>
                  </tr>

                  <tr>
                    <th>发布日期：</th>
                    <td>
                      <span>{{mainContentData.createTime.slice(0,10)}}</span>
                    </td>
                  </tr>
                  <tr>
                    <th valign="top">服务时间：</th>
                    <td>{{mainContentData.startTime}}至{{mainContentData.endTime}}</td>
                  </tr>
                  <tr>
                    <th>招募人数：</th>
                    <td>{{mainContentData.recruitNumbers}}</td>
                  </tr>
                  <tr>
                    <el-button v-if="mainContentData.state =='招募中'&& mainContentData.joinNumbers<mainContentData.recruitNumbers" type="danger" round @click="join">立即报名</el-button>
                    <el-button v-else type="info" plain disabled>已停止招募</el-button>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div class="conr">
            <div class="tit">项目发起人</div>
            <div class="boxcon">
                <table style="width:250px;">
                    <tbody><tr>
                        <td width="90" valign="top" class="org_desc">
                          <img :src="authorInfo.avatar">
                          </td>
                        <td valign="top" class="org_desc">
                            <a href="#">{{authorInfo.realname}}</a>
                                                  </td>
                    </tr>
                </tbody></table>
            </div>
        </div>
                  
      </div>
      <div style="margin-top: 10px;" class="wrap">
        <h3 style="margin-top: 4px;"><span>项目详情</span></h3>
        <div style="min-height: 400px;" v-html="mainContentData.description">
        
        </div>
        
      </div>
    </div>
  </div>
  <div style="float:left;margin-top: 10px;">
    <joinInfoBox :tableData="joinInfoData"></joinInfoBox>
  </div>

</div>
</template>
<script>
import breadcrumb from "../base/breadcrumb";
import joinInfoBox from '../base/joinInfoBox';
export default {
  name: "volunteerDetail",
  data(){
    return{
      mainContentData:{
        createTime:''
      },
      joinInfoData:[],
      authorInfo:{}
    }
  },
  methods:{
      getVolunteerDetail(id){
        this.$http.get('/api/volunteer/getDetail',{
          params:{
            id:id
          }
        }).then(resp=>{
          this.mainContentData= resp.data.data.volunteerInfo;
          this.authorInfo= resp.data.data.authorInfo;
        })
      },
      getJoinInfo(id){
        this.$http.get('/api/volunteer/joinInfo',{params:{id:id}}).then(resp=>{
          this.joinInfoData=resp.data.data
        })
      },
      join(){
        if(this.$store.state.currentUser.realname){
          if(this.$store.state.currentUser.userType=='user'){
              this.$http.post('/api/volunteer/join',{id:this.mainContentData.id,userId:this.$store.state.currentUser.id}).then(resp=>{
              if(resp.data.code=="000000"){
                this.$message.success("报名成功")
                this.getJoinInfo(this.mainContentData.id)
              }else if(resp.data.code=="000006"){
                this.$message.error("不能重复报名")
              }else{
                this.$message.error(resp.data.message)
              }
            })  
          }else{
            this.$message.error("管理员不能参与")
          }

        }else{
          this.$message.error("请先前往【个人中心】完善个人资料")
        }

      }
  },
  components:{
        breadcrumb,
        joinInfoBox
  },
  created(){
    this.getVolunteerDetail(this.$route.params.id);
    this.getJoinInfo(this.$route.params.id);
  }
};
</script>

<style scoped src="../../../static/sty.css">



