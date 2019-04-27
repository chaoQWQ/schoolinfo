<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right"  >
      <el-breadcrumb-item v-for="(item,index) in breadcumb" :key="index" style="margin-bottom:5px" :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name:'breadcrumb',
    data(){
      return{
        
      }
    },
    computed: {
        breadcumb(){
          return this.$store.getters.breadcumb.list
        }
    }
}
</script>
