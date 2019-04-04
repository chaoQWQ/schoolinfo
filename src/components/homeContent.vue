<template>
    <div class="block">
      <div class="maincontent">
        <div class="carousel">
          <carousel></carousel>
        </div>
        <div>
          <div class="competition_country">
            <infobox 
            topname='校内比赛'
            tourl='http://localhost:9090/#/detail'
            :infolist="infodata"
            >
            </infobox>
          </div>
          <div class="competition_school">
            <infobox
            topname='全国比赛'
            tourl='localhost:9090/detail'
            :infolist="infodata">
            </infobox>
          </div>
        </div>
        <div>
          <div class="competition_country">
            <infobox
            topname='考证考试信息'
            tourl='localhost:9090/detail'
            :infolist="infodata">
            </infobox>
          </div>
          <div class="competition_school">
            <infobox
            topname='招聘信息'
            tourl='localhost:9090/detail'
            :infolist="infodata">
            </infobox>
          </div>
        </div>
        
      </div>
      <aside class="sidebar">
        <baseinfo-module></baseinfo-module>
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
import baseinfoModule from "./base/dynamicInfo";
import infobox from"./base/infobox";
export default {
    name:'home',
        data(){
        return {
            infodata:[
                {
                title:'长春市委书记王君正赴新疆任职'
            },
            {
                title:'中国GDP万亿俱乐部城市扩容 这地出乎意料'
            },
            {
                title:'4家中企入列全球芯片10强买家榜 华为成“探花”'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里'
            },
            {
                title:'成都20亿造江南水乡成空城：游客稀少 商铺关门(图)'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            }
            ]
        }
    },
    components:{
        carousel,
        baseinfoModule,
        infobox
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
</style>

