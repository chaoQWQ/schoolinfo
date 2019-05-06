<template>
<div>
  <h3 style="text-align: center;color: cadetblue;">报名情况</h3>
    <el-table
    :data="tableData"
    size="mini"
    height="758"
    style="width: 100%">

    <el-table-column
      prop="date"
      label="时间"
      width="150">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="100">
    </el-table-column>
  </el-table>
</div>

</template>
<script>
export default {
    name:'joinInfo',
    props:['tableData']
}
</script>
<style scoped>

</style>

