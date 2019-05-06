<template>
<div>
  <div class="content-area">
    <div class="top_tit">
      <h1>志愿服务</h1>
    </div>
    <div class="filter">
      <el-form ref="form" :model="form">
        <div class="f_condition">
          <span>服务类型：</span>
          <el-select v-model="form.type" multiple collapse-tags placeholder="不限">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
        <div class="f_condition">
          <span>项目状态：</span>
          <el-radio-group v-model="form.state">
            <el-radio label="不限"></el-radio>
            <el-radio label="招募待启动"></el-radio>
            <el-radio label="招募中"></el-radio>
            <el-radio label="招募已结束"></el-radio>
            <el-radio label="已结项"></el-radio>
          </el-radio-group>
        </div>
        <div class="f_condition">
          <span>项目人数：</span>
          <el-radio-group v-model="form.numbers">
            <el-radio label="不限"></el-radio>
            <el-radio label="1-10"></el-radio>
            <el-radio label="11-100"></el-radio>
            <el-radio label="101-200"></el-radio>
            <el-radio label="200以上"></el-radio>
          </el-radio-group>
        </div>
        <div class="f_condition">
          <span>项目排序：</span>
          <el-radio-group v-model="form.sort">
            <el-radio :label="1">最新</el-radio>
            <el-radio :label="2">热门</el-radio>
            <!-- <el-radio :label="3">推荐</el-radio> -->
          </el-radio-group>
        </div>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
    </div>
    <p v-if="totalNumbers==0" style="text-align: center;font-size: x-large;font-style: italic;color: darkgrey;">查询结果为空</p>
    <volBox :infoItemData="infoitemData" gotoUrl="/#/volunteerDetail/"></volBox>
    <div style="text-align: center">
      <el-pagination background 
        @current-change="handleCurrentChange"
        layout="prev, pager, next" 
        :total="totalNumbers"
        :current-page="form.pageNum"
        :page-size="form.pageSize"
        >
      </el-pagination>
    </div>
  </div>

  <div class="side">
    <div class="fabu">
      <router-link :to="{name:'addVolunteer'}"><img class="vImg" src="/static/images/vfb.png"><span style="letter-spacing: 2px;">项目发起</span></router-link>
    </div>
  </div>
</div>
</template>
<script>
import volBox from "../base/volBox";
import breadcrumb from "../base/breadcrumb";
import localData from '../../utils/local-data.js'
export default {
  name: "volunteer",
  data() {
    return {
      form: {
        state: "不限",
        type: [],
        sort: 1,
        numbers:'不限',
        pageNum:1,
        pageSize:9
      },
      totalNumbers:10,
      options: localData.volunteerServiceTypeList,
      infoitemData: []
    };
  },
  components:{
    volBox,
    breadcrumb
  },
  methods:{
    onSubmit() {
      this.form.pageNum=1;
      this.$http.post("/api/volunteer/query", this.form).then(resp => {
        this.infoitemData = resp.data.data.pageList;
        this.totalNumbers=resp.data.data.total;
      }).catch(err=>{
        
      })
    },
    handleCurrentChange(val) {
        this.form.pageNum=val;
        this.$http.post("/api/volunteer/query", this.form).then(resp => {
          this.infoitemData = resp.data.data.pageList;
          this.totalNumbers=resp.data.data.total;
        });
    }
  },
  created(){
    this.onSubmit();
  }
};
</script>
<style scoped>
.top_tit {
  padding: 0 10px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #f2f2f2;
  background: #f2f2f2;
  white-space: nowrap;
  overflow: hidden;
  
}
.filter {
  border: #d9d4d461 1px solid;
  padding: 12px;
  margin-top: 5px;
}
.f_condition {
  margin: 10px 0;
}
.f_condition span {
  font-size: 16px;
  font-weight: bold;
  color: #898989;
  padding: 2px 4px 2px 4px;
}
.side{
  width: 250px;
  float: right;
  margin-top: 20px;
}
.fabu{
  color: red;
    font-size: 20px;
    background-color: blanchedalmond;
    width: 150px;
    font-family: cursive;
    padding: 10px 20px;
    border-radius: 10px;
    border: 2px solid #a1a1a130;
}
.fabu:hover{
   box-shadow:0px 0px 5px #4c1d1d75;
}
.fabu a{
    display: flex;
    align-items: center;
    color: red;
}


.vImg{
  width: 50px;
  margin-right: 10px;
}
</style>

