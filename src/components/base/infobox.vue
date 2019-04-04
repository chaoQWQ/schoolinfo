<template>
    <div class="infobox">
        <h2>{{topname}}</h2>
        <a :href="tourl" class="more">更多</a>
        <ul>
            <li v-for="(item,index) in infolist" :key="index">
                <a href=""><h3>{{item.title}}</h3></a>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:'infobox',
    props:['topname','tourl','infolist']
}
</script>
<style scoped>
.infobox{
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
.infobox h2{
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
.infobox a{
    text-decoration: none;
    display: block;
    color: steelblue;
    padding: 0px 10px 0px 2px;
}
.infobox ul{
    list-style: none;
    padding-inline-start: 15px;
}
.infobox li h3{
    font-size: 16px;
    margin: 17px 0px;
}
.infobox .more {
    position: absolute;
    right: 15px;
    top: 9px;
    color: #666;
}
</style>

