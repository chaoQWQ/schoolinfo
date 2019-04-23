<template>
    <div class="infobox">
        <h2>{{topname}}</h2>
        <a :href="tourl" class="more">更多</a>
        <ul>
            <li v-for="(item,index) in infolist" :key="index">
                <div v-if="index==0" class="item first">
                    <a :href="'/#/detail/'+item.id"><img :src="item.coverImage!=null?item.coverImage:'../../../static/images/moren.gif'" alt="图片不存在" onerror="this.src='../../../static/images/moren.gif';this.onerror=null'">
                      <h3>{{item.title}}</h3>
                    </a>
                    <p id="zaiyao">{{item.summary}}</p>
                      <p style="color: #999;margin: 0;margin-right: 10px;text-align: right;">{{item.createTime}}</p>
                </div>
                <div v-else class="item">
                    <a :href="'/#/detail/'+item.id"><h3>{{item.title}}</h3></a>
                </div>
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
    margin: 10px 10px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
.infobox li a img{
    float: left;
    margin: 0 10px 0 10px;
    width: 100px;
    height: 80px;
}
.infobox .more {
    position: absolute;
    right: 0px;
    top: 9px;
    color: #666;
}
#zaiyao{
    overflow: hidden;
    height: 40px;
    color: #999;
    margin: 5px 0 2px 0;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.first a h3{
    margin: 0px 10px;
}
.infobox li div{
    margin: 16px 0;
}
</style>

