<template>
<div>
  <div>
    <div id="header">
      <section class="top ">
        <div>
          <img src="../static/images/name3.png">
        </div>
      </section>
      <section class="">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect"
          background-color="#64e1b1" text-color="#fff" active-text-color="#ffd04b">
          <el-row>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
              <el-menu-item index="1">首页</el-menu-item>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
              <el-menu-item index="2">比赛信息</el-menu-item>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
              <el-menu-item index="3">考试信息</el-menu-item>
            </el-col>
            <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
              <el-menu-item index="4">小道消息</el-menu-item>
            </el-col>
            <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" :offset="13"><a href="#"><img style="height:52px;float: right;padding: 5px 0;margin-right: 40px"
                  src="../static/images/user.png"></a></el-col>
          </el-row>
        </el-menu>
      </section>
    </div>
    <div class='mainContent'>
      <router-view></router-view>
    </div>
  </div>
  <pagefooter></pagefooter>
</div>
</template>

<script>
import pagefooter from "./components/pagefooter"
  export default {
    name: 'App',
    data() {
      return {
        activeIndex: '1'
      };
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key);
        switch(key){
          case '1':this.$router.push('/home')
          break;
        }
      }
    },
    components:{
      pagefooter
    }
  }

</script>

<style>
  #header {
    margin-bottom: 10px;
  }
  #header .top {
    height: 192px;
    background: #ffffff url('/static/images/bg_top.jpg')center repeat-x;
  }
  .mainContent{
    display: flow-root;
    margin-bottom: 100px;
  }

</style>
