<template>
    <div class="infoBar">
        <h2>最新动态</h2>
        <ul>
            <li v-for="(item,index) in infolist" :key="index">
                <a href=""><h3>{{item.title}}</h3></a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'baseinfoModule',
    data(){
        return {
            infolist:[
                {
                title:'长春市委书记王君正赴新疆任职'
            },
            {
                title:'中国GDP万亿俱乐部城市扩容 这地出乎意料'
            },
            {
                title:'4家中企入列全球芯片10强买家榜 华为成“探花”'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里'
            },
            {
                title:'成都20亿造江南水乡成空城：游客稀少 商铺关门(图)'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
            {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
              {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
              {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
              {
                title:'美国两艘军舰今日再闯中国南沙美济礁12海里123'
            },
            ]
        }
    }
}
</script>
<style scoped>
.infoBar{
    box-sizing:border-box;
    -moz-box-sizing:border-box;
    height: 454px;
    width: -webkit-fill-available;
    overflow: hidden;
    font-size: 14px;
    line-height: 20px;
    color: #555;
    margin-bottom: 15px;
    float: left;
    padding-bottom: 10px;
    background-color: #fff;
}
.infoBar h2{
    color: #f44336bf;
    position: relative;
    margin: 0 15px;
    padding: 10px 0;
    font-size: 18px;
    font-weight: 500;
    background-color: #ffffff;
    border-bottom: 1px solid #efefef;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
}
.infoBar a{
    text-decoration: none;
    display: block;
    color: steelblue;
    padding: 0px 10px 0px 2px;
}
.infoBar ul{
    list-style: none;
    padding-inline-start: 15px;
}
.infoBar li h3{
    font-size: 16px;
    margin: 17px 0px;
}
</style>

