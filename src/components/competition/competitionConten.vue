<template>
<div>
  <!-- <breadcrumb></breadcrumb> -->
  <div class="content-area">
    <div class="top_tit">
      <h1>比赛信息</h1>
    </div>
    <div class="filter">
      <el-form ref="form" :model="form">
        <div class="f_condition">
          <span>竞赛类型：</span>
          <el-select v-model="form.type" multiple collapse-tags placeholder="不限">
            <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
          </el-select>
        </div>
        <div class="f_condition">
          <span>竞赛阶段：</span>
          <el-radio-group v-model="form.state">
            <el-radio label="不限"></el-radio>
            <el-radio label="正在报名"></el-radio>
            <el-radio label="报名结束"></el-radio>
          </el-radio-group>
        </div>
        <div class="f_condition">
          <span>竟赛范围：</span>
          <el-radio-group v-model="form.scope">
            <el-radio label="不限"></el-radio>
            <el-radio label="校级"></el-radio>
            <el-radio label="市级"></el-radio>
            <el-radio label="国级"></el-radio>
          </el-radio-group>
        </div>
        <div class="f_condition">
          <span>竞赛排序：</span>
          <el-radio-group v-model="form.sort">
            <el-radio :label="1">最新</el-radio>
            <el-radio :label="2">热门</el-radio>
            <!-- <el-radio :label="3">推荐</el-radio> -->
          </el-radio-group>
        </div>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form>
    </div>
    <p v-if="totalNumbers==0" style="    text-align: center;font-size: x-large;font-style: italic;color: darkgrey;">查询结果为空</p>
    <infoItem :infoItemData="infoitemData" gotoUrl="/#/compDetail/"></infoItem>
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
      <router-link :to="{name:'addComp'}"></router-link>
    </div>
  </div>
  <el-tooltip placement="top" content="回到顶部">
    <back-to-top/>
  </el-tooltip>
  
</div>
</template>
<script>
import infoItem from "../base/infoItem";
import breadcrumb from "../base/breadcrumb";
import backToTop from "../base/backToTop"
export default {
  name: "competition",
  data() {
    return {
      form: {
        state: "不限",
        scope: "不限",
        sort: 1,
        type: [],
        pageNum:1,
        pageSize:10
      },
      totalNumbers:1000,
      options: this.$store.state.compTypeList,
      infoitemData: []

    };
  },
  components: {
    infoItem,
    breadcrumb,
    backToTop
  },
  methods: {
    onSubmit() {
      this.form.pageNum=1;
      this.$http.post("/api/compinfo/competition", this.form).then(resp => {
        this.infoitemData = resp.data.data.pageList;
        this.totalNumbers=resp.data.data.total;
      }).catch(err=>{
        
      })
    },
    handleCurrentChange(val) {
        this.form.pageNum=val;
        this.$http.post("/api/compinfo/competition", this.form).then(resp => {
          this.infoitemData = resp.data.data.pageList;
          this.totalNumbers=resp.data.data.total;
        });
    }
  },
  created() {
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
.fabu {
    background-image: url("/static/images/fb1.png");
    background-position: center;
    background-repeat: no-repeat;
    height: 104px;
}
.fabu:hover {
    background-image: url("/static/images/fb2.png");
    cursor: pointer;
}
.fabu a {
    display: block;
    height: 104px;
}
.side{
  width: 300px;
  float: right;
}
</style>
