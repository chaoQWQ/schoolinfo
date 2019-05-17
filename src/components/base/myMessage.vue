<template>
<div>
  <div  data-v-6b669e70 data-v-b97c67d6 data-v-bfb66676 class="card system-item">
      <div data-v-b97c67d6 data-v-6b669e70 class="top">
        <span data-v-b97c67d6 data-v-6b669e70 class="title">{{messageData.title}}</span>
        <span data-v-445e4ac4 data-v-b97c67d6 class="time" data-v-6b669e70>{{messageData.createTime}}</span>
      </div>
      <div data-v-b97c67d6 data-v-6b669e70 class="bottom">
        <span data-v-facdb7ac data-v-b97c67d6 class="text" data-v-6b669e70>
          <span data-v-facdb7ac="">{{messageData.content}}</span>
        </span>
      </div>
      <!-- <img
        data-v-b97c67d6
        data-v-6b669e70
        src="//i2.hdslb.com/u_user/31ce8733288c19be92d7ce9cb83462dc.png"
        alt
        title
        class="source-img"
      > -->
    </div>
</div>
    
</template>
<script>
export default {
  name:"myMessage",
  props:['messageData']
}
</script>
<style scoped src="../../../static/msg.css">

</style>
