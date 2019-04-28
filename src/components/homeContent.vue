<template>
    <div class="block">
      <div class="maincontent">
        <div class="carousel">
          <carousel></carousel>
        </div>
        <div>
          <h2><span>热门比赛</span></h2>
          <div class="competition_country">
            <infobox 
            topname='校内比赛'
            tourl='/#/competition'
            :infolist="infodata[0]"
            >
            </infobox>
          </div>
          <div class="competition_school">
            <infobox
            topname='全国比赛'
            tourl='/#/competition'
            :infolist="infodata[1]">
            </infobox>
          </div>
        </div>
        <div>
          <h2><span>最新活动</span></h2>
          <div class="competition_country">
            <infobox
            topname='志愿服务'
            tourl='localhost:9090/detail'
            :infolist="infodata">
            </infobox>
          </div>
          <div class="competition_school">
            <infobox
            topname='社团活动'
            tourl='localhost:9090/detail'
            :infolist="infodata">
            </infobox>
          </div>
        </div>
        
      </div>
      <aside class="sidebar">
        <dynamicInfo></dynamicInfo>
      </aside>
      <!-- <el-row>
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" style="border:4px solid #01010112;">
          <carousel></carousel>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" :offset="1">
          <baseinfo-module></baseinfo-module>
        </el-col>
      </el-row> -->
      
    </div>
</template>
<script>
import carousel from "./base/carousel.vue";
import dynamicInfo from "./base/dynamicInfo";
import infobox from"./base/infobox";
export default {
    name:'home',
        data(){
        return {
            infodata:[]
        }
    },
    components:{
        carousel,
        dynamicInfo,
        infobox
    },
    methods:{
      getSchoolCompetition(){
        this.$http.get('/api/compinfo/getTitle')
          .then(resp=>{
            this.infodata=resp.data.data
            console.log("islogin:"+this.$store.getters.isLogin)
          })
      }
    },
    created:function(){
      this.getSchoolCompetition()
    }
}
</script>
<style scoped>
.maincontent{
    width: 950px;
    float: left;
    transition: all .3s ease-out 0s;

}
.sidebar{
  width: 408px;
  float: right;

}
.carousel{
  margin-bottom: 15px;
  border:4px solid #01010112;
}
.competition_country{
  float: left;
  width: 49%;
  margin-right: 2%;
  margin-bottom: 15px;
  position: relative;
}
.competition_school{
  float: left;
  width: 49%;
  margin-bottom: 15px;
  margin-right: 0px;
  position: relative;
}
h2 span{
    border-left: 3px solid #393;
    padding: 0 20px;
}
</style>

