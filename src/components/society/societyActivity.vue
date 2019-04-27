<template>
    <div class="side">
    <div class="fabu">
      <router-link :to="{name:'addSocietyActivity'}"></router-link>
    </div>
  </div>
</template>
<script>
export default {
  name:"societyActivity"
}
</script>
<style scoped>
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
