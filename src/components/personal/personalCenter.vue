<template>
  <div >
    <div class="top_tit">
      <h1>个人中心</h1>
    </div>
    <div style="margin-top:10px">

    <el-row >
      <el-col :span="3">
        <el-menu
        style="height:700px;"
        default-active="1"
        class="el-menu-vertical-demo"
        @select="handleSelect"
        >
          <el-menu-item style="padding:0 10px" index="1"><i class="el-icon-user"></i><span slot="title">个人资料</span></el-menu-item>
          <el-menu-item v-if="userType=='vadmin'||userType=='sadmin'||userType=='cadmin'" style="padding:0 10px" index="2"><i class="el-icon-position"></i><span slot="title">我的发布</span></el-menu-item>
          <el-menu-item style="padding:0 10px" index="3"><i class="el-icon-message-solid"></i><span slot="title">我的消息</span></el-menu-item>
          <el-menu-item style="padding:0 10px" index="4"><i class="el-icon-s-tools"></i><span slot="title">账户安全</span></el-menu-item>
          <el-submenu v-if="userType=='super'" index="5">
            <template slot="title">
              <i style="margin-left: 15px;" class="el-icon-menu"></i>
              <span>后台管理</span>
            </template>
            <el-menu-item-group>
              <!-- <template slot="title">分组一</template> -->
              <el-menu-item index="5-1">发布审核</el-menu-item>
              <el-menu-item index="5-2">用户管理</el-menu-item>
              <el-menu-item index="5-3">权限管理</el-menu-item>
              <el-menu-item index="5-4">角色管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
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
  computed:{
    userType(){
      return this.$store.getters.currentUser.userType
    }
  },
  methods:{
    handleSelect(key, keyPath) {
      console.log(key)
      switch (key) {
        case "1":
          this.$router.push("/personalCenter/personalInfo");
          break;
        case "2":
          this.$router.push("/personalCenter/personalRelease");
          break;
        case "3":
          this.$router.push("/personalCenter/personalMessage");
          break;
        case "4":
          this.$router.push("/personalCenter/personalSafe");
          break;
        case "5-1":
          this.$router.push("/personalCenter/infoAudit");
          break;
        case "5-2":
          this.$router.push("/personalCenter/userManage");
          break;
        case "5-3":
          this.$router.push("/personalCenter/permissionManage");
          break;
        case "5-4":
          this.$router.push("/personalCenter/roleManage");
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