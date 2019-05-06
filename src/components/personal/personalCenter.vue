<template>
  <div >
    <div class="top_tit">
      <h1>个人中心</h1>
    </div>
    <div style="margin-top:10px">

    <el-row >
      <el-col :span="3">
        <el-menu
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        >
          <el-menu-item style="padding:0 10px" index="1"><i class="el-icon-user"></i>个人资料</el-menu-item>
          <el-menu-item style="padding:0 10px" index="2"><i class="el-icon-position"></i>我的发布</el-menu-item>
          <el-menu-item style="padding:0 10px" index="3"><i class="el-icon-star-off"></i>我的收藏</el-menu-item>
          <el-menu-item style="padding:0 10px" index="4"><i class="el-icon-s-tools"></i>账户安全</el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="21">
        <div>
          <router-view></router-view>
        </div>
      </el-col>
    </el-row>
      

    </div>
    
  </div>
</template>
<script>
export default {
  name:"personalCenter",
  methods:{
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push("/personalCenter/personalInfo");
          break;
        case "2":
          this.$router.push("/personalCenter");
          break;
        case "3":
          this.$router.push("/personalCenter");
          break;
        case "4":
          this.$router.push("/personalCenter/personalSafe");
          break;
      }
    }
    
  }
}
</script>
<style  scoped>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    background-color: #c4cfd745;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
  }
  .top_tit {
  padding: 0 10px;
  border-top: 1px solid #fff;
  border-bottom: 1px solid #f2f2f2;
  background: #f2f2f2;
  white-space: nowrap;
  overflow: hidden;
  color: #00bcd4;
  text-align: center;
}
</style>