<template>
  <div class="content-box">
    <div class="article-flag">
      <span class="article-blockquote article-blockquote-green"></span>
      <span class="article-original article-original-green">{{mainContentData.author}}</span>
    <div class="blog-info-meta pull-right">
        <ul class="list-unstyled list-inline">
        <li><i class="fa fa-clock-o fa-fw"></i>发表于 {{mainContentData.createTime}}</li>
        <li><i class="fa fa-eye fa-fw"></i><a class="pointer"  data-toggle="tooltip" data-placement="bottom">浏览 (<num>{{mainContentData.viewNumbers}}</num>)</a></li>
        <li><a href="#comment-box" style="text-decoration: none;color: currentColor;" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-comments-o fa-fw"></i>评论 (14)</a></li>
        </ul>
    </div>
    </div>
    <div id="art_content" v-html="mainContentData.content"></div> 
  </div>
</template>
<script>
  export default {
    name: 'mainContent',
    // data(){
    //   return{
    //   // ``article_content:'<div class="blog-info-body">								<span id="menu_0" class="menu-point"></span>								<span id="menu_0" class="menu-point"></span><h2 class="menu-title">前言</h2>								<blockquote>									<p>Apache Cordova是一个开源的移动开发框架。允许使用标准的web技术-HTML5,CSS3和JavaScript做跨平台开发。 应用在每个平台的具体执行被封装了起来，并依靠符合标准的API绑定去访问每个设备的功能，比如说：传感器、数据、网络状态等。&nbsp;</p>									<p>&nbsp;使用Apache Cordova的人群:&nbsp;</p>									<p>&nbsp; &nbsp; &nbsp;1.移动应用开发者，想扩展一个应用的使用平台，而不通过每个平台的语言和工具集重新实现。&nbsp;</p>									<p>&nbsp; &nbsp; &nbsp;2.web开发者，想包装部署自己的web App将其分发到各个应用商店门户。 &nbsp;</p>									<p>&nbsp; &nbsp; &nbsp;3.移动应用开发者，有兴趣混合原生应用组建和一个WebView(一个特别的浏览器窗口) 可以接触设备A级PI，或者你想开发一个原生和WebView组件之间的插件接口。</p>									<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;—— 摘自《Cordova官网》</p>								</blockquote>								<p>&nbsp; &nbsp; Cordova虽然可以用来开发APP，但cordova并不能把H5代码变成IOS或者Android的原生代码。cordova只是将我们的Html文件通过相应的API，显示在HTML Rendering Engine(即WebView)中，同时 Cordova支持丰富的插件，这些插件提供了Cordova和原生组件相互通信的接口并绑定到了标准的设备API上。这就使开发者可以通过JS去调用原生代码，比如：照相机、联系人、热更新和打开第三方APP应用等。								</p>								<p>接下来，本文会一步步的介绍如何使用Cordova开发我们的第一个APP应用（本文主要介绍Android App应用）！</p><span id="menu_1" class="menu-point"></span>								<span id="menu_1" class="menu-point"></span><h2 class="menu-title">使用Cordova的基本要求</h2>								<p>1.首先要会基本的<code>HTML + CSS + JS</code>（否则的话你开发个毛线的app）</p>								<p>2.不需要太高深的Android开发经验，但起码的开发流程要了解</p>								<p>3.需要自行搭建Android开发环境：比如SDK</p>								<p>4.需要下载安装Node（自行百度）</p>								<p>5.需要安装Cordova（<span><code>npm install -g cordova</code></span>）</p><span id="menu_2" class="menu-point"></span>								<span id="menu_2" class="menu-point"></span><h2 class="menu-title">创建APP</h2><pre><code># cordova create &lt;项目名&gt; &lt;包名&gt; &lt;app名（可选）&gt;cordova create CordovaTest com.zyd.cordova</code></pre>								<p><span>创建完成后的文件夹目录结构：</span></p><img src="http://p4c3z3uxb.bkt.clouddn.com/flyat%2Farticle%2F20180408162625.png-pw" alt="">								<p><code>hooks</code>：存放自定义cordova命令的脚本文件。每个project命令都可以定义before和after的Hook，比如：before_build、after_build。没用过，不展开了。</p>								<p><code>platforms</code>：平台目录，各自的平台代码就放在这里，可以放一下平台专属的代码，现在这个目录应该是空的，后面会介绍如何创建平台。</p>								<p><code>plugins</code>：Cordova插件目录，安装的插件会放在这里。后面会有专门的文章介绍开发插件。</p>								<p><code>www</code>：最重要的目录，存放项目主题的HTML5和JS代码的目录。app一开始打开的就是这个目录中index.html文件。</p>								<p><code>config.xml</code>：主要是cordova的一些配置，比如：项目使用了哪些插件、应用图标icon和启动页面</p><span id="menu_3" class="menu-point"></span>								<span id="menu_3" class="menu-point"></span><h2 class="menu-title"><span>添加Android开发平台</span>&nbsp;&nbsp;</h2><pre><code>xx\CordovaTest\platforms&gt;cordova platform add androidUsing cordova-fetch for cordova-android@~7.0.0Adding android project...Creating Cordova project for the Android platform:        Path: platforms\android        Package: com.zyd.cordova        Name: HelloCordova        Activity: MainActivity        Android target: android-26Subproject Path: CordovaLibSubproject Path: appAndroid project created with cordova-android@7.0.0Android Studio project detectedAndroid Studio project detectedDiscovered plugin "cordova-plugin-whitelist" in config.xml. Adding it to the projectInstalling "cordova-plugin-whitelist" for android               This plugin is only applicable for versions of cordova-android greater than 4.0. If you have a previous platform version, you do *not* need this plugin since the whitelist will be built in.Adding cordova-plugin-whitelist to package.jsonSaved plugin info for "cordova-plugin-whitelist" to config.xml--save flag or autosave detectedSaving android@~7.0.0 into config.xml file ...</code></pre><span id="menu_4" class="menu-point"></span>								<span id="menu_4" class="menu-point"></span><h2 class="menu-title"><span>导入Android Studio</span></h2>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span>File --&gt; Open --&gt; 选择platforms-android下的build.gradle，确定</span></font>								</p><img src="http://p4c3z3uxb.bkt.clouddn.com/flyat%2Farticle%2F20180408163333.png-pw" alt="">								<p><span>等待IDE自动构建...</span></p>								<p><span>构建完成后的目录结构如下：（我已切换到Android视图模式，图中箭头位置）</span></p><img src="http://p4c3z3uxb.bkt.clouddn.com/flyat%2Farticle%2F20180408163922.png-pw" alt=""><br>								<p><span>目录内容解释：</span></p>								<p><span><code>AndroidManifest.xml</code>：Android应用的入口文件，负责配置<code>applaction</code>和<code>activity</code>等</span></p>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span><code>java</code>：Cordova项目默认的启动类（一般不需要关心，除非涉及到使用原生代码开发功能）</span></font>								</p>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span><code>assets</code>：资源文件（H5应用的html、js、css等文件），需要注意的是，www中的cordova开头的文件或文件夹（如果使用到了自定义插件，会有个plugins文件目录），<b>切记不可删除！切记不可删除！切记不可删除！</b></span></font>								</p>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span><code>res</code>：app的配置：启动图标、应用图标、应用名称等。注意：xml中的config.xml是app打包用的配置文件，可配置如：启动主页面、权限、白名单等</span></font>								</p><span id="menu_5" class="menu-point"></span>								<span id="menu_5" class="menu-point"></span><h2 class="menu-title"><font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span>使用cordova打包APP</span></font></h2><pre><code>D:\cordova\CordovaTest\platforms\android&gt;cordova build androidAndroid Studio project detectedANDROID_HOME=F:\AndroidSDKJAVA_HOME=D:\server\Java\jdk1.8\jdk1.8.151studioSubproject Path: CordovaLibSubproject Path: appStarting a Gradle Daemon, 1 busy and 1 incompatible and 1 stopped Daemons could not be reused, use --status for detailspublishNonDefault is deprecated and has no effect anymore. All variants are now published.The Task.leftShift(Closure) method has been deprecated and is scheduled to be removed in Gradle 5.0. Please use Task.doLast(Action) instead.        at build_dm9mufthcbtehnxb8j3px6xr.run(D:\cordova\CordovaTest\platforms\android\app\build.gradle:143):CordovaLib:preBuild UP-TO-DATE中间省略......:app:cdvBuildDebugBUILD SUCCESSFUL in 1m 1s47 actionable tasks: 47 executedBuilt the following apk(s):        D:\cordova\CordovaTest\platforms\android\app\build\outputs\apk\debug\app-debug.apk</code></pre>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span>提示</span></font><span>BUILD SUCCESSFUL</span><span>则表示打包完成，根据指定路径，获取apk后安装即可。</span></p>								<p><span>常用的命令：</span></p><pre><code>cordova install android //将编译好的应用程序安装到模拟器上。cordova emulate android //在模拟器上运行（前提是创建好AVD）cordova serve android //在浏览器运行cordova build android //打包cordova项目到android平台。cordova run android //通过USB直接安装到真机（该语句已经包括了build命令）</code></pre><span id="menu_6" class="menu-point"></span>								<span id="menu_6" class="menu-point"></span><h2 class="menu-title"><font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span>使用AndroidStudio打包APP</span></font></h2><img src="http://p4c3z3uxb.bkt.clouddn.com/flyat%2Farticle%2F20180408165642.png-pw" alt=""><br><span id="menu_7" class="menu-point"></span>								<span id="menu_7" class="menu-point"></span><h2 class="menu-title"><span>参考资料</span></h2>								<p><span>1.</span>									<a href="https://www.cnblogs.com/lishuxue/p/6008678.html" target="_blank">Cordova入门系列（一）创建项目</a>								</p>								<p>2.									<a href="https://www.cnblogs.com/a418120186/p/5226417.html" target="_blank">Cordova之如何用命令行创建一个项目（完整示例）</a>								</p>								<p>3.									<a href="http://cordova.axuer.com/docs/zh-cn/latest/guide/cli/index.html" target="_blank">Cordova中文文档</a>								</p>								<p><br></p>							</div>'
    //   mainContentData:this.mainContenData
    //   }
    // },
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
