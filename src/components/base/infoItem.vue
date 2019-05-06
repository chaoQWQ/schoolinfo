<template>
<div class="compinfo">
  <ul>
    <li v-for="(item,index) in infoItemData" :key="index" class="article-item">
      <h2 class="article-title">
        <a :href="gotoUrl+item.id" >{{item.title}}</a>
      </h2>
      <div class="article-review">
        <!-- <img :src="item.coverImage" style="width: 200px;height: 150px;"> -->
				<img style="width: 200px;height: 150px;" :src="item.coverImage!=null&&item.coverImage!=''?item.coverImage:'../../../static/images/moren.png'" alt="图片不存在" onerror="this.src='../../../static/images/moren.gif';this.onerror=null'">
        <div class="article-abstract">
          <h4>{{ item.summary }}</h4>
        </div>
      </div>
      <div class="view-msg">
        <span>{{item.createTime.slice(0,-3)}}</span>&nbsp;&nbsp;
        <span class="icon-eye"></span>
        <span class="pv">{{ item.viewNumbers }}</span>
        <span class="icon-commenting-o"></span>
        <span class="comments-num">{{ item.commentNumbers }}</span>
      </div>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  name: "infoItem",
  props: ["infoItemData",'gotoUrl']
};
</script>

<style lang="less" scoped>
	.fade-enter-active, .fade-leave-active{
 		transition: opacity .5s
	}
	.fade-enter, .fade-leave-to{
 		opacity: 0
	}
	.articleList{
		font-size: 14px;
		line-height: 20px;
		color: #404040;
		img{
			max-width: 100%;
		}
	}
	.article-item{
		padding: 10px 10px 10px 30px;
		margin-top: 15px;
		border-radius: 3px;
		// background: #F7EDED;
		background: #FAF7F7;
		list-style: none;
		h2{
			// padding: 10px 0;
			a{
                color: #16a085;
                text-decoration: none;
			}
		}
	}
	.article-review{
		color: #646464;
		display: flex;
		align-items: center;
		p img{
			max-width: 100%!important;
			max-height: 100%;
		}
	}
	.article-title,.article-title a{
		display: inline-block;
		transition: all ease .3s;
	}
	.article-title:hover{
		transform: translateX(10px);
	}
	.article-title:hover a{
		color: #D9A800;
		// text-decoration: underline
	}
	.article-abstract{
        margin-left: 15px;
        h4{
            font-size: 20px;
        }
	}
	.article-review{
		margin-top: 8px;
	}
	.article-msg{
		display: flex;
		justify-content: flex-start;
		align-items: center;
		// color: #404040
		color: #646464;
	}
	.article-msg-tag span{
		margin: 0 2px
	}
	.article-msg-time{
		margin-left: 5px
	}
	.view-msg{
		display: flex;
		justify-content: flex-end;
		align-items: center;
		margin-top: 5px;
		color: #404040
	}
	.icon-like,.icon-commenting-o,.icon-eye{
	  	margin-right: 5px;
	}
	.icon-tag-stroke{
		margin-left: 3px;
		margin-top: 2px;
	}
	.icon-clock{
		margin-left: 16px
	}
	.comments-num,.pv{
		margin-right: 14px;
	}
	.like-num{
		margin-right: 3px
	}
	.no1{
		margin-right: -4px
    }
    
    ul{
        padding: 0
    }
	@media screen and(max-width: 767px){
		.article-item{
			border-radius: 0;
			margin-top: 0;
			border-top: 1px solid #ccc;
		}
	}
</style>