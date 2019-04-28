<template>
<div>
  <!-- <breadcrumb></breadcrumb> -->
  <div class="content-area">
    <div class="top_tit">
      <h1>社团活动</h1>
    </div>
   
    <p v-if="totalNumbers==0" style="    text-align: center;font-size: x-large;font-style: italic;color: darkgrey;">查询结果为空</p>
    <infoItem :infoItemData="infoitemData" gotoUrl="/#/actDetail/"></infoItem>
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
      <router-link :to="{name:'addSocietyActivity'}"><img class="actImg" src="/static/images/actFont.png"></router-link>
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
  name: "societyActivity",
  data() {
    return {
      form: {
        pageNum:1,
        pageSize:10
      },
      totalNumbers:1000,
      infoitemData: []

    };
  },
  components: {
    infoItem,
    breadcrumb,
    backToTop
  },
  methods: {
    querySociety() {
      this.form.pageNum=1;
      this.$http.get("/api/society/query", {
          params:{
            pageNum:this.form.pageNum,
            pageSize:this.form.pageSize
          }
        }).then(resp => {
        this.infoitemData = resp.data.data.pageList;
        this.totalNumbers=resp.data.data.total;
      }).catch(err=>{
        
      })
    },
    handleCurrentChange(val) {
        this.form.pageNum=val;
        this.$http.get("/api/society/query",{
          params:{
            pageNum:this.form.pageNum,
            pageSize:this.form.pageSize
          }
        }).then(resp => {
          this.infoitemData = resp.data.data.pageList;
          this.totalNumbers=resp.data.data.total;
        });
    }
  },
  created() {
    this.querySociety();
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
    background-image: url("/static/images/act.png");
    background-position: center;
    background-position-y: -60px;
    background-repeat: no-repeat;
    background-size: 300px 250px;
}
/* .fabu:hover {
    background-image: url("/static/images/fb2.png");
    cursor: pointer;
} */
.fabu a {
    display: block;
    height: 104px;
}
.side{
  width: 300px;
  float: right;
}
.actImg{
    height: 80px;
    margin-left: 65px;
    margin-top: 12px;
}
</style>
