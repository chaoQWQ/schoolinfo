<template>
    <div class="block">
      <el-row>
        <el-col :xs="16" :sm="16" :md="16" :lg="16" :xl="16" style="border:4px solid #01010112;">
          <carousel></carousel>
        </el-col>
        <el-col :xs="7" :sm="7" :md="7" :lg="7" :xl="7" :offset="1">
          <baseinfo-module></baseinfo-module>
        </el-col>
      </el-row>
      
    </div>
</template>
<script>
import carousel from "./base/carousel.vue";
import baseinfoModule from "./base/dynamicInfo";
export default {
    name:'home',
    components:{
        carousel,
        baseinfoModule
    }
}
</script>
