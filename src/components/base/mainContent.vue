<template>
  <div class="content-box">
    <div class="article-flag">
      <span class="article-blockquote article-blockquote-green"></span>
      <span class="article-original article-original-green">{{mainContentData.author}}</span>
    <div class="blog-info-meta pull-right">
        <ul class="list-unstyled list-inline">
        <li><i class="fa fa-clock-o fa-fw"></i>发表于 {{mainContentData.createTime}}</li>
        <li><i class="fa fa-eye fa-fw"></i><a class="pointer"  data-toggle="tooltip" data-placement="bottom">浏览 ({{mainContentData.viewNumbers}})</a></li>
        <li><a href="#comment-box" style="text-decoration: none;color: currentColor;" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-comments-o fa-fw"></i>评论 (14)</a></li>
        </ul>
    </div>
    </div>
    <div id="art_content" v-html="mainContentData.content"></div> 
    <p style="color:red">联系方式：</p>
    <p>联系人：{{mainContentData.contactName}}</p>
    <p>联系人电话：{{mainContentData.contactTelNumber}}</p>
    <p v-if="mainContentData.webUrl">官网地址：{{mainContentData.webUrl}}</p>
    <p style="color:red">附件：</p>
    <div style="margin-left: 15px;margin-bottom: 5px;" v-for="(item,index) in JSON.parse(mainContentData.attachUrl)" :key="index">
      <a :href="item.url">{{item.name}}</a>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'mainContent',
    props:[
        'mainContentData'
    ]
  }

</script>
<style scoped>
.content-box{
  padding: 10px;
  background-color: #fff;
  border: 1px solid #eaeaea;
  border-radius: 4px;
  margin-bottom: 15px;
}
.article-flag {
    position: relative; 
    margin-left: -10px;
    margin-right: -10px;
    height: 30px;
}
.article-flag .article-blockquote {
    position: absolute;
    top: 0;
    left: -1px;
    width: 5px;
    height: 30px;
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
}
.article-blockquote-green {
    background: #31d229;
}
.article-flag .article-original {
    border-radius: 0;
    padding: 0 10px;
    line-height: 1.9;
    display: block;
    color: #fff;
    position: absolute;
    filter: alpha(opacity=70);
    box-shadow: 0 1px 1px rgba(0,0,0,.1);
    margin-left: 20px;
}
.article-original-green {
    background: #31d229;
}
.blog-info-meta {
    color: #999;
    position: relative;
    overflow: initial!important;
    min-height: 25px;
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
}
.pull-right {
    float: right!important;
}
.fa-fw {
    width: 1.28571429em;
    text-align: center;
}
.fa {
    display: inline-block;
    font: normal normal normal 14px/1 FontAwesome;
    font-size: inherit;
    text-rendering: auto;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
.fa-clock-o:before {
    content: "\f017";
}
.list-unstyled {
    padding-left: 0;
    list-style: none;
}
 ul {
    display:flex; 
    list-style-type: none;
    -webkit-margin-before: 0;
    -webkit-margin-after: 0;
    -webkit-margin-start: 0;
    -webkit-margin-end: 0;
    -webkit-padding-start: 0;
}
#art_content /deep/ img{
    max-width: 1028px
}
</style>
