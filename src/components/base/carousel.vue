<template>

    <el-carousel trigger="click" height="450px" interval=10000>
      <el-carousel-item class="el-carousel__item" v-for="(item,index) in dataimg" :key="index">
        <img class="carousel-image" :src="item.src">
      </el-carousel-item>
    </el-carousel>
   

</template>

<script>
  export default {
    name: 'AboutUs',
    data() {
      return {

        dataimg: [{
            src: require('../../../static/images/pic_business_4.jpg'),
            txt: '"Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis, mi neque euismod dui, eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna."',
            txt2: '一站式服务',
            txt3: 'Miami, FL'
          },
          {
            src: require('../../../static/images/pic_business_3.jpg'),
            txt: '"Sed egestas, ante et vulputate volutpat, eros pede semper est, vitae luctus metus libero eu augue. Morbi purus libero, faucibus adipiscing, commodo quis, gravida id, est. Sed lectus. Praesent elementum hendrerit tortor."',
            txt2: '国际服务',
            txt3: 'Greensboro, NC'
          },
          {
            src: require('../../../static/images/pic_blog_post_1.jpg'),
            txt: '"Praesent elementum hendrerit tortor. Sed semper lorem at felis. Vestibulum volutpat, lacus a ultrices sagittis eu pulvinar nunc sapien ornare nisl. Phasellus pede arcu, dapibus eu, fermentum et, dapibus sed, urna."',
            txt2: '全网渠道',
            txt3: 'Charlotte, NC'
          }
        ]
      }
    }
  }

</script>
<style>
  .el-carousel__item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .carousel-image {
    width: 100%;
    height: 100%;
  }

</style>
