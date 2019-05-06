<template>
<div style="border: #d9d4d461 1px solid;margin-top: 5px;">
  <ul  class="list1 clearfix ptitle2">
      <li v-for="(item,index) in infoItemData" :key="index" class="clearfix">
        <div class="listimg listimg_opp">
          <div style="background:#BEBEBE;color:#fff;;">{{item.createTime}}</div>
          <a
            :href="gotoUrl+item.id"
            :title="item.title" 
            style="display:inline-block;position: relative;width:250px;height:210px;background:none;"
          >
          <img :src="item.coverImage!=null&&item.coverImage!=''?item.coverImage:'../../../static/images/volunteer_noimg.jpg'" alt="图片不存在" onerror="this.src='../../../static/images/volunteer_noimg.jpg';this.onerror=null'">
          <span class="baoming">立即<br>报名</span>
          </a>
        </div>
        <div class="listtxt">
          <p class="ptitle">
            <a
              :href="gotoUrl+item.id"
              :title="item.title"
            >{{item.title}}</a>
          </p>
          <p class="popp clearfix">
            <span class="l">招募人数：{{item.recruitNumbers}}</span>
            <span class="r opp_time_state" style="background:green">{{item.state}}</span>
          </p>
        </div>
        <div class="percent1">
          <div class="percent2" style="width:207px;"></div>
        </div>
        <div v-if="item.state=='招募中'">
          <p class="prank clearfix" style="margin-top:0;border-top:0;">
            <span class="l">
              项目进度
              <br>20%
            </span>
            <span class="l">
              报名人数
              <br>{{item.joinNumbers}}
            </span>
            <span class="l">
              <font color="#c30">离招募结束</font>
              <br>{{getRemainTime(new Date(),item.recruitEndTime)}}
            </span>
          </p>
        </div>
        <div v-if="item.state=='招募待启动'">
          <p class="prank clearfix" style="margin-top:0;border-top:0;">
            <span class="l">
              项目进度
              <br>0%
            </span>
            <span class="l">
              报名人数
              <br>{{item.joinNumbers}}
            </span>
            <span class="l">
              <font color="#c30">离招募开始</font>
              <br>{{getRemainTime(new Date(),item.recruitStartTime)}}
            </span>
          </p>
        </div>
        <div v-if="item.state=='招募已结束'">
          <p class="prank clearfix" style="margin-top:0;border-top:0;">
            <span class="l">
              项目进度
              <br>80%
            </span>
            <span class="l">
              报名人数
              <br>{{item.joinNumbers}}
            </span>
            <span class="l">
              <font color="#c30">离项目结束</font>
              <br>{{getRemainTime(new Date(),item.endTime)}}
            </span>
          </p>
        </div>
        <div v-if="item.state=='已结项'">
          <p class="prank clearfix" style="margin-top:0;border-top:0;">
            <span class="l">
              项目进度
              <br>100%
            </span>
            <span class="l">
              报名人数
              <br>{{item.joinNumbers}}
            </span>
            <span class="l">
              <font color="#c30">已结项</font>
              <br>{{getRemainTime(item.startTime,new Date())}}
            </span>
          </p>
        </div>

      </li>
    </ul>
</div>
       
</template>
<script>
import { constants } from 'fs';
export default {
  name:"volBox",
  data(){
    return{

    }
  },
  props:['infoItemData','gotoUrl'],
  methods:{
    getProjectProcess(state){
      switch(state){
        case "招募待启动": return 0;break;
        case "招募中": return 20;break;
        case "招募已结束":return 60;break;
        case "已结项":return 100;break;
      }
    },
    getRemainTime(l,g){
  　　var l = new Date(l); 
  　　var g = new Date(g); 
  　　var days = g.getTime() - l.getTime(); 
  　　var day = parseInt(days / (1000 * 60 * 60 * 24));
      if(day==0){
        return parseInt(days/(1000*60*60))+'小时'
      }else{
        return day+'天'
      }
  　　 
  }
  }
}
</script>


<style scoped>
ul,
li {
  margin: 0;
  padding: 0;
  list-style: none;
  overflow: hidden;
}
.clearfix {
  zoom: 1;
}
.clearfix:after {
  content: ".";
  display: block;
  clear: both;
  height: 0;
  overflow: hidden;
  visibility: hidden;
}
.list1{
  margin-top: 5px;
  margin-left: 89px;
}
.list1 li {
  float: left;
  width: 250px;
  height: 370px;
  overflow: hidden;
  border: 1px solid #ddd;
  margin: 0 0 10px 30px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  border-radius: 3px;
}
.listimg {
  width: 250px;
  height: 230px;
  /* background: url("/static/images/volunteer_noimg.jpg") center center no-repeat; */
  overflow: hidden;
  text-align: center;
}
.listimg img{
  width: 250px;
  height: 230px;
}
.listtxt {
  margin-left: 10px;
  font-size: 12px;
  line-height: 180%;
}
.percent1 {
  height: 3px;
  width: 100%;
  background: #eee;
  margin-top: 7px;
}
.list1 p {
  color: #888;
}
.prank {
  border-top: 1px solid #eee;
  margin-top: 10px;
  padding: 8px 0;
  background: #f7f7f7;
  font-size: 12px;
}
.opp_time_state {
  background: #c70b31;
  color: #fff;
  padding: 0px 6px;
  -moz-border-radius: 5px;
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
.popp{
    margin-top: 20px;
}
.popp span.r {
  margin-right: 8px;

}
.prank span.l {
  float: left;
  width: 80px;
  text-align: center;
}
.l {
  float: left;
}
.r {
  float: right;
}
.ptitle2 .ptitle {
  height: 24px;
  font-size: 17px;
  margin: 10px 0;
}
.ptitle a{
  color: #333;
}
.ptitle a:hover {
    color: #c30;
}
.baoming{
    position: absolute;
    bottom: 0;
    left: 50%;
    background: #fff;
    background: rgba(0,0,0,.5);
    border-radius: 50%;
    margin-left: -33px;
    width: 66px;
    height: 52px;
    text-align: center;
    padding: 14px 0 0 0;
    color: #fff;
    font-size: 14px;
    transition: all .3s ease-out;

}
.baoming:hover{
  transform: rotate(360deg)
}
</style>
