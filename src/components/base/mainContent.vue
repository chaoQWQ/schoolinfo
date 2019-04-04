<template>
  <div class="content-box">
    <div class="article-flag">
      <span class="article-blockquote article-blockquote-green"></span>
      <span class="article-original article-original-green">来源网络</span>
    <div class="blog-info-meta pull-right">
        <ul class="list-unstyled list-inline">
        <li><i class="fa fa-clock-o fa-fw"></i>发表于 2018年09月20日</li>
        <li><i class="fa fa-eye fa-fw"></i><a class="pointer"  data-toggle="tooltip" data-placement="bottom">浏览 (<num>1,799</num>)</a></li>
        <li><a href="#comment-box" style="text-decoration: none;color: currentColor;" data-toggle="tooltip" data-placement="bottom"><i class="fa fa-comments-o fa-fw"></i>评论 (14)</a></li>
        </ul>
    </div>
    </div>
    <div  v-html="article_content">{{article_content}}</div> 
  </div>
</template>
<script>
  export default {
    name: 'mainContent',
    data(){
      return{
      // article_content:'<div class="blog-info-body">								<span id="menu_0" class="menu-point"></span>								<span id="menu_0" class="menu-point"></span><h2 class="menu-title">前言</h2>								<blockquote>									<p>Apache Cordova是一个开源的移动开发框架。允许使用标准的web技术-HTML5,CSS3和JavaScript做跨平台开发。 应用在每个平台的具体执行被封装了起来，并依靠符合标准的API绑定去访问每个设备的功能，比如说：传感器、数据、网络状态等。&nbsp;</p>									<p>&nbsp;使用Apache Cordova的人群:&nbsp;</p>									<p>&nbsp; &nbsp; &nbsp;1.移动应用开发者，想扩展一个应用的使用平台，而不通过每个平台的语言和工具集重新实现。&nbsp;</p>									<p>&nbsp; &nbsp; &nbsp;2.web开发者，想包装部署自己的web App将其分发到各个应用商店门户。 &nbsp;</p>									<p>&nbsp; &nbsp; &nbsp;3.移动应用开发者，有兴趣混合原生应用组建和一个WebView(一个特别的浏览器窗口) 可以接触设备A级PI，或者你想开发一个原生和WebView组件之间的插件接口。</p>									<p>&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;—— 摘自《Cordova官网》</p>								</blockquote>								<p>&nbsp; &nbsp; Cordova虽然可以用来开发APP，但cordova并不能把H5代码变成IOS或者Android的原生代码。cordova只是将我们的Html文件通过相应的API，显示在HTML Rendering Engine(即WebView)中，同时 Cordova支持丰富的插件，这些插件提供了Cordova和原生组件相互通信的接口并绑定到了标准的设备API上。这就使开发者可以通过JS去调用原生代码，比如：照相机、联系人、热更新和打开第三方APP应用等。								</p>								<p>接下来，本文会一步步的介绍如何使用Cordova开发我们的第一个APP应用（本文主要介绍Android App应用）！</p><span id="menu_1" class="menu-point"></span>								<span id="menu_1" class="menu-point"></span><h2 class="menu-title">使用Cordova的基本要求</h2>								<p>1.首先要会基本的<code>HTML + CSS + JS</code>（否则的话你开发个毛线的app）</p>								<p>2.不需要太高深的Android开发经验，但起码的开发流程要了解</p>								<p>3.需要自行搭建Android开发环境：比如SDK</p>								<p>4.需要下载安装Node（自行百度）</p>								<p>5.需要安装Cordova（<span><code>npm install -g cordova</code></span>）</p><span id="menu_2" class="menu-point"></span>								<span id="menu_2" class="menu-point"></span><h2 class="menu-title">创建APP</h2><pre><code># cordova create &lt;项目名&gt; &lt;包名&gt; &lt;app名（可选）&gt;cordova create CordovaTest com.zyd.cordova</code></pre>								<p><span>创建完成后的文件夹目录结构：</span></p><img src="http://p4c3z3uxb.bkt.clouddn.com/flyat%2Farticle%2F20180408162625.png-pw" alt="">								<p><code>hooks</code>：存放自定义cordova命令的脚本文件。每个project命令都可以定义before和after的Hook，比如：before_build、after_build。没用过，不展开了。</p>								<p><code>platforms</code>：平台目录，各自的平台代码就放在这里，可以放一下平台专属的代码，现在这个目录应该是空的，后面会介绍如何创建平台。</p>								<p><code>plugins</code>：Cordova插件目录，安装的插件会放在这里。后面会有专门的文章介绍开发插件。</p>								<p><code>www</code>：最重要的目录，存放项目主题的HTML5和JS代码的目录。app一开始打开的就是这个目录中index.html文件。</p>								<p><code>config.xml</code>：主要是cordova的一些配置，比如：项目使用了哪些插件、应用图标icon和启动页面</p><span id="menu_3" class="menu-point"></span>								<span id="menu_3" class="menu-point"></span><h2 class="menu-title"><span>添加Android开发平台</span>&nbsp;&nbsp;</h2><pre><code>xx\CordovaTest\platforms&gt;cordova platform add androidUsing cordova-fetch for cordova-android@~7.0.0Adding android project...Creating Cordova project for the Android platform:        Path: platforms\android        Package: com.zyd.cordova        Name: HelloCordova        Activity: MainActivity        Android target: android-26Subproject Path: CordovaLibSubproject Path: appAndroid project created with cordova-android@7.0.0Android Studio project detectedAndroid Studio project detectedDiscovered plugin "cordova-plugin-whitelist" in config.xml. Adding it to the projectInstalling "cordova-plugin-whitelist" for android               This plugin is only applicable for versions of cordova-android greater than 4.0. If you have a previous platform version, you do *not* need this plugin since the whitelist will be built in.Adding cordova-plugin-whitelist to package.jsonSaved plugin info for "cordova-plugin-whitelist" to config.xml--save flag or autosave detectedSaving android@~7.0.0 into config.xml file ...</code></pre><span id="menu_4" class="menu-point"></span>								<span id="menu_4" class="menu-point"></span><h2 class="menu-title"><span>导入Android Studio</span></h2>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span>File --&gt; Open --&gt; 选择platforms-android下的build.gradle，确定</span></font>								</p><img src="http://p4c3z3uxb.bkt.clouddn.com/flyat%2Farticle%2F20180408163333.png-pw" alt="">								<p><span>等待IDE自动构建...</span></p>								<p><span>构建完成后的目录结构如下：（我已切换到Android视图模式，图中箭头位置）</span></p><img src="http://p4c3z3uxb.bkt.clouddn.com/flyat%2Farticle%2F20180408163922.png-pw" alt=""><br>								<p><span>目录内容解释：</span></p>								<p><span><code>AndroidManifest.xml</code>：Android应用的入口文件，负责配置<code>applaction</code>和<code>activity</code>等</span></p>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span><code>java</code>：Cordova项目默认的启动类（一般不需要关心，除非涉及到使用原生代码开发功能）</span></font>								</p>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span><code>assets</code>：资源文件（H5应用的html、js、css等文件），需要注意的是，www中的cordova开头的文件或文件夹（如果使用到了自定义插件，会有个plugins文件目录），<b>切记不可删除！切记不可删除！切记不可删除！</b></span></font>								</p>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span><code>res</code>：app的配置：启动图标、应用图标、应用名称等。注意：xml中的config.xml是app打包用的配置文件，可配置如：启动主页面、权限、白名单等</span></font>								</p><span id="menu_5" class="menu-point"></span>								<span id="menu_5" class="menu-point"></span><h2 class="menu-title"><font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span>使用cordova打包APP</span></font></h2><pre><code>D:\cordova\CordovaTest\platforms\android&gt;cordova build androidAndroid Studio project detectedANDROID_HOME=F:\AndroidSDKJAVA_HOME=D:\server\Java\jdk1.8\jdk1.8.151studioSubproject Path: CordovaLibSubproject Path: appStarting a Gradle Daemon, 1 busy and 1 incompatible and 1 stopped Daemons could not be reused, use --status for detailspublishNonDefault is deprecated and has no effect anymore. All variants are now published.The Task.leftShift(Closure) method has been deprecated and is scheduled to be removed in Gradle 5.0. Please use Task.doLast(Action) instead.        at build_dm9mufthcbtehnxb8j3px6xr.run(D:\cordova\CordovaTest\platforms\android\app\build.gradle:143):CordovaLib:preBuild UP-TO-DATE中间省略......:app:cdvBuildDebugBUILD SUCCESSFUL in 1m 1s47 actionable tasks: 47 executedBuilt the following apk(s):        D:\cordova\CordovaTest\platforms\android\app\build\outputs\apk\debug\app-debug.apk</code></pre>								<p>									<font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span>提示</span></font><span>BUILD SUCCESSFUL</span><span>则表示打包完成，根据指定路径，获取apk后安装即可。</span></p>								<p><span>常用的命令：</span></p><pre><code>cordova install android //将编译好的应用程序安装到模拟器上。cordova emulate android //在模拟器上运行（前提是创建好AVD）cordova serve android //在浏览器运行cordova build android //打包cordova项目到android平台。cordova run android //通过USB直接安装到真机（该语句已经包括了build命令）</code></pre><span id="menu_6" class="menu-point"></span>								<span id="menu_6" class="menu-point"></span><h2 class="menu-title"><font color="#000000" face="Helvetica Neue, Helvetica, Verdana, Arial, sans-serif"><span>使用AndroidStudio打包APP</span></font></h2><img src="http://p4c3z3uxb.bkt.clouddn.com/flyat%2Farticle%2F20180408165642.png-pw" alt=""><br><span id="menu_7" class="menu-point"></span>								<span id="menu_7" class="menu-point"></span><h2 class="menu-title"><span>参考资料</span></h2>								<p><span>1.</span>									<a href="https://www.cnblogs.com/lishuxue/p/6008678.html" target="_blank">Cordova入门系列（一）创建项目</a>								</p>								<p>2.									<a href="https://www.cnblogs.com/a418120186/p/5226417.html" target="_blank">Cordova之如何用命令行创建一个项目（完整示例）</a>								</p>								<p>3.									<a href="http://cordova.axuer.com/docs/zh-cn/latest/guide/cli/index.html" target="_blank">Cordova中文文档</a>								</p>								<p><br></p>							</div>'
      article_content:`
      <td><table width="100%" border="0" cellpadding="0" cellspacing="0" class="title_info">
<tbody><tr>
<td><h1>2019年第十六届Esri杯中国大学生GIS软件开发竞赛</h1></td>
</tr>
<tr>
<td class="info_text">时间：2019-03-28 17:30:10&nbsp;&nbsp;来源：<a href="http://" target="_blank">大赛官网</a>&nbsp;&nbsp;作者：大赛官网</td>
</tr>
</tbody></table>
<table width="100%" border="0" cellspacing="0" cellpadding="0">
<tbody><tr>
<td id="text"><p>
</p><table cellspacing="0" cellpadding="0" border="0" style="border-collapse: collapse; margin: auto auto auto 4.65pt">
    <tbody>
        <tr style="height: 42pt">
            <td colspan="5" style="border-top: windowtext 1pt solid; height: 42pt; border-right: black 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">2019</span></b><b><span style="font-size: 8pt; color: black">年第十六届Esri杯中国大学生GIS软件开发竞赛<br>
            </span></b><b><span style="font-size: 8pt; color: #a6a6a6">（“去大赛网”整理：www.godasai.com）</span></b></div>
            </td>
        </tr>
        <tr style="height: 32.25pt">
            <td style="border-top: #f0f0f0; height: 32.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">报名<br>
            （开始时间）</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 32.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">报名<br>
            （结束时间）</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 32.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">推荐专业</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 32.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">参赛对象</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 32.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">参赛方法</span></b></div>
            </td>
        </tr>
        <tr style="height: 84.75pt">
            <td style="border-top: #f0f0f0; height: 84.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">2019</span><span style="font-size: 8pt; color: black">年3月20日开始报名</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 84.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">2019</span><span style="font-size: 8pt; color: black">年4月22日截止（报名截止后仍可报名，但不提供参赛软件，个人组不受时间影响）</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 84.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">GIS</span><span style="font-size: 8pt; color: black">、RS、测绘、地理、规划等相关专业</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 84.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">GIS</span><span style="font-size: 8pt; color: black">、RS、测绘、地理、规划等相关专业在读学生（本科生、研究生均可参加）</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 84.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">官网注册报名</span></div>
            </td>
        </tr>
        <tr style="height: 14.25pt">
            <td style="border-top: #f0f0f0; height: 14.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">参赛形式</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 14.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">地区</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 14.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">报名费</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 14.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">主办单位</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 14.25pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">举办次数</span></b></div>
            </td>
        </tr>
        <tr style="height: 21.75pt">
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">个人/团队</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">中国</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">无（官方无说明）</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">中国测绘学会</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">第16届</span></div>
            </td>
        </tr>
        <tr style="height: 21.75pt">
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">初赛/预赛时间</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">决赛时间</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">获奖名单</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">获奖证书</span></b></div>
            </td>
            <td style="border-top: #f0f0f0; height: 21.75pt; border-right: windowtext 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">竞赛类别</span></b></div>
            </td>
        </tr>
        <tr style="height: 42.75pt">
            <td style="border-top: #f0f0f0; height: 42.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">2019</span><span style="font-size: 8pt; color: black">年9-11月 作品评审</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 42.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">2019</span><span style="font-size: 8pt; color: black">年10-11月 GIS应用开发组作品答辩</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 42.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">具体时间不详</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 42.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">具体时间不详</span></div>
            </td>
            <td style="border-top: #f0f0f0; height: 42.75pt; border-right: windowtext 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="center"><span style="font-size: 8pt; color: black">D</span><span style="font-size: 8pt; color: black">类（其他或不详）</span></div>
            </td>
        </tr>
        <tr style="height: 14.45pt">
            <td colspan="2" style="border-top: #f0f0f0; height: 14.45pt; border-right: black 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">大赛官方网址</span></b></div>
            </td>
            <td colspan="3" style="border-top: #f0f0f0; height: 14.45pt; border-right: black 1pt solid; background: #daeef3; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt">
            <div align="center"><b><span style="font-size: 8pt; color: black">特别激励</span></b></div>
            </td>
        </tr>
        <tr style="height: 83.45pt">
            <td colspan="2" style="border-top: #f0f0f0; height: 83.45pt; border-right: black 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: windowtext 1pt solid; padding-right: 5.4pt; background-color: transparent">
            <div align="left"><span style="font-size: 8pt; color: black">官方网站：<br>
            <a target="_blank" href="http://contest.esrichina.com.cn/">http://contest.esrichina.com.cn/</a></span></div>
            </td>
            <td colspan="3" style="border-top: #f0f0f0; height: 83.45pt; border-right: black 1pt solid; border-bottom: windowtext 1pt solid; padding-bottom: 0cm; padding-top: 0cm; padding-left: 5.4pt; border-left: #f0f0f0; padding-right: 5.4pt; background-color: transparent">
            <div align="left"><span style="font-size: 8pt">基本每组都有一二三等奖和优胜奖，详见正文</span></div>
            </td>
        </tr>
    </tbody>
</table>
<p></p>
<div style="word-break: break-all"><span style="font-size: 10pt">◎</span><span style="font-size: 10pt">初赛名单◎初赛获奖名单◎复赛名单◎复赛获奖名单◎决赛名单◎决赛获奖名单</span></div>
<div style="word-break: break-all"><span style="font-size: 10pt">去大赛网(www.godasai.com)提醒您：有更新后字体将变为蓝色，点击对应链接即可</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">一、大赛简介</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019Esri</span><span style="font-size: 10pt">杯中国大学生GIS软件开发竞赛（简称“Esri开发竞赛”）是由中国测绘学会及Esri中国信息技术有限公司联合主办的一项针对专业学生的课外实践活动，该赛事在校大学生课外活动中一项具有示范性、引导性和广泛性的竞赛活动，每年举办一届。活动目的是激发在校学生学习、应用和交流GIS技术的热情，增强学生的创造力和动手能力，大力推动GIS技术在中国的普及，并为GIS产业的发展选拔和储备大量优秀人才。</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">二、组织机构</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">主办单位：</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">中国测绘学会</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">承办单位：</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">Esri</span><span style="font-size: 10pt">中国信息技术有限公司</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">支持单位：</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">Esri</span><span style="font-size: 10pt">（北京）软件研发中心</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">Esri</span><span style="font-size: 10pt">中国（北京）培训中心</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">三、大赛日程</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年3月20日<span>&nbsp;&nbsp;&nbsp; </span>竞赛报名正式启动</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年4月22日<span>&nbsp;&nbsp;&nbsp; </span>作品报名截止（报名截止后仍可报名，但不提供参赛软件，个人组不受时间影响）</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年4月-5月<span>&nbsp;&nbsp;&nbsp; </span>作品组参赛软件发货，开始接收许可申请</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年5月-6月<span>&nbsp;&nbsp;&nbsp; </span>作品组参赛软件许可发放</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年8月8日-9日 个人挑战组比赛</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年8月22日<span>&nbsp;&nbsp;&nbsp; B</span>组（地理设计组）作品提交截止日期</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年9月16日<span>&nbsp;&nbsp;&nbsp; C</span>组（ GIS应用开发组）作品提交截止日期</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年8月22日<span>&nbsp;&nbsp;&nbsp; D</span>组（遥感应用组）作品提交截止日期</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年9月16日<span>&nbsp;&nbsp;&nbsp; E</span>组（三维应用组）作品提交截止日期</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年9-11月<span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </span>作品评审</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019</span><span style="font-size: 10pt">年10-11月<span>&nbsp;&nbsp;&nbsp;&nbsp; GIS</span>应用开发组作品答辩，日期待定</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">四、参赛对象</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">GIS</span><span style="font-size: 10pt">、RS、测绘、地理、规划等相关专业在读学生（本科生、研究生均可参加）。</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">五、大赛报名</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">、报名方式</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">2019Esri</span><span style="font-size: 10pt">杯中国大学生GIS软件开发竞赛采取网络报名及审核的方式。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">、报名流程</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">）报名组队前，小组每位成员包括指导老师均需在本系统内进行信息注册（2013-2017年间已经在本系统注册过的老师和同学无需重复注册）。为了保证团队队长能够正确填加小组成员，注册时需填写真实完整的个人信息。成员个人信息仅供组委会发送软件申请书、许可及重要紧急情况下联系用，因此请保证电话号码真实，快递信息准确，同时养成定期收取邮件的习惯；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">）创建团队的成员系统默认为团队队长，组委会发送的相关文件、许可、通知，包括邮寄的软件、资料，均以团队组长为联系人；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">3</span><span style="font-size: 10pt">）团队组长点击“立即报名”开始组队，选择需要参赛的分组（A组个人挑战赛、B组地理设计组、C组GIS应用开发组、D组遥感应用组、E组三维建应用组），并依次按照姓名搜索的方式填加小组成员及指导老师（此项后期可修改）；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">4</span><span style="font-size: 10pt">）团队人员填加完成后，浏览上传事先写好的项目计划书（请注意项目计划书文件的大小，尽量不要超过1.5m）。若组队时项目计划书尚未完全准备好，可以选择“下次再传计划书”，以完成人员组队；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">5</span><span style="font-size: 10pt">）组委会在收到组队报名后，会给予审核，审核通过后，系统通过站内短信通知您的参赛编号，如审核未通过，您会收到站内短信并获知未通过审核的原因，如状态一直为“等待审核”说明小组的审核尚未开始。</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">6</span><span style="font-size: 10pt">）报A组个人赛的同学，项目计划书模板为学生证信息翻拍页的要求说明，请仔细阅读模板说明。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">3</span><span style="font-size: 10pt">、参赛软件的获取</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">本年度竞赛参赛软件由主办单位Esri中国信息技术有限公司通过网络云盘分享方式提供，选手在获取ArcGIS Enterprise、ArcGIS Desktop、CityEngine等软件许可之前需按照组委会的要求填写许可申请文件，该文件通过邮件发送到组长的信箱。</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">六、大赛赛项</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019Esri</span><span style="font-size: 10pt">杯中国大学生GIS软件开发竞赛共分5个方向的作品比赛：</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">、个人挑战赛（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/gerentaozhansai/"><font color="#0000ff">A<span><span>组</span></span></font></a>）</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">本年度以在线试题组为主，在线答题，速战速决！</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">、地理设计组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/dilishejizu/"><font color="#0000ff">B<span><span>组</span></span></font></a>）</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">本年度仍以展示地理思维过程为主要考核方向，重点考核分析问题及解决问题的思路考核，不要求一定要开发。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">3</span><span style="font-size: 10pt">、GIS应用开发组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/Webyingyongshejizu/"><font color="#0000ff">C<span><span>组</span></span></font></a>） </span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">本年度以GIS应用开发组为主，在考核同学发现问题、分析问题、解决问题的基础上，全面锻炼GIS开发及应用能力。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">4</span><span style="font-size: 10pt">、遥感应用组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/ENVI_IDLkaifazu/"><font color="#0000ff">D<span><span>组</span></span></font></a>） </span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">本年度遥感组作品不开发，只应用。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">5</span><span style="font-size: 10pt">、三维应用组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/sanweijianmoyushejizu/"><font color="#0000ff">E<span><span>组</span></span></font></a>） </span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">本年度三维组作品，建模已经不再是重点，建模后作品的发布以及后续应用将作为重点考核方向。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">*</span><span style="font-size: 10pt">有关每个小组的要求、命题解读、作品提交要求及评审标准，请见各组说明（查看）。</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">七、作品提交</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">、作品提交方式</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">）组委会提供专用ftp及网络云盘等途径收取作品，该信息在作品提交截止日期前1-2周发布，请选手关注。</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">）将最终打包为以小组编号命名的文件夹，如：C7 上传到自己的百度云盘，然后通过分享链接的方式，将作品下载链接地址用自己的邮箱发到contest@esrichina.com.cn，邮编标题为：“C7作品提交”。（注意，不要通过百度云的方式发送邮件，这样的方式发送，组委会有可能收不到，并且你可能得不到反馈） （注意，该邮箱同时承载答疑咨询，如同学邮件标题不清，作品可能会在检索时会被错过）</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">、作品提交截止日期</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">B</span><span style="font-size: 10pt">组（地理设计组）：2019年8月22日截止</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">C</span><span style="font-size: 10pt">组（GIS应用开发组）：2019年9月16日作品提交截止</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">D</span><span style="font-size: 10pt">组（遥感应用组）：2019年8月22日截止</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">E</span><span style="font-size: 10pt">组（三维应用组）：2019年9月16日截止</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">3</span><span style="font-size: 10pt">、作品提交要求</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">根据不同竞赛组别，各组对作品提交时需提供的资料略有不同，详细请参考相关的竞赛组别中的说明：</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">B</span><span style="font-size: 10pt">组：<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/dilishejizu/"><font color="#0000ff">http://contest.esrichina.com.cn/html/jingsaifenzu/dilishejizu/</font></a></span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">C</span><span style="font-size: 10pt">组：<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/Webyingyongshejizu/"><font color="#0000ff">http://contest.esrichina.com.cn/html/jingsaifenzu/Webyingyongshejizu/</font></a></span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">D</span><span style="font-size: 10pt">组：<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/ENVI_IDLkaifazu/"><font color="#0000ff">http://contest.esrichina.com.cn/html/jingsaifenzu/ENVI_IDLkaifazu/</font></a></span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">E</span><span style="font-size: 10pt">组：<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/sanweijianmoyushejizu/"><font color="#0000ff">http://contest.esrichina.com.cn/html/jingsaifenzu/sanweijianmoyushejizu/</font></a></span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">4</span><span style="font-size: 10pt">、作品格式要求</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">）将完整作品按照作品提交要求建立作品文件夹，并最终打包成以小组名称命名的文件夹，每组的提交我们都有示意图，具体请到各组介绍页面当中寻找：</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">）文档尽量以word格式为主，技术文档为初赛时评委需要看的重要资料之一，需要方便检索；系统概述文档是复赛和决赛时候评委要看的东西，为了方便评委观看，组委会会进行二次编辑，因此请不要提交pdf版本文档，不便检索和二次编辑。</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">3</span><span style="font-size: 10pt">）当你填写完人员信息时，请仔细检查核对，同学和老师的名字有无错误，最终的获奖证书名字是以这个文件为准的。电话号码也不要写错，避免作品评审中出现问题我们无法及时联系到您。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">5</span><span style="font-size: 10pt">、提交注意事项</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">）您在提交作品过程中切勿将作品打包为邮件附件直接发送到邮箱，因为我们的邮箱空间有限，过大的附件可能会收不到。因此请大家先把自己的作品上载到自己的百度云盘，然后通过自己的邮箱将作品下载链接发送给到contest@esrichina.com.cn，切忌通过百度云直接发送作品链接，这种链接收到的时候就已经失效了，而且无法返回给你作品检查情况；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">）如果您有任何问题，可以发咨询邮件到contest@esrichina.com.cn，该邮箱每5分钟自动收取一次邮件，但是我们建议您的邮件标题足够清晰，或者您可以可以关注微博“Esri开发竞赛”，最新的消息我们都第一时间公布在那里；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">3</span><span style="font-size: 10pt">）每一封通过邮件发送的作品提交，我们都会有个回复，表示确认收到您的作品，对于每个收到的作品，我们有个初步的检查，会检查作品内容是否齐全以及解压是否正常，当发现问题我们会直接通过邮件回复的方式提醒提交者，所以大家也要认真看邮件是否有多次回复；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">4</span><span style="font-size: 10pt">）作品提交后请随时注意官方微博上公布的作品提交列表及说明，有些作品我们可能存在解压错误等情况，不排除需要大家重新提交。对于发现的问题也会一并在官方微博上公布，同学务必到论坛和官微浏览帖子；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">5</span><span style="font-size: 10pt">）为了方便大家理解，所以我们用C7作为示例向大家介绍，同学千万别人人都变成C7；</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">6</span><span style="font-size: 10pt">）最后，希望您认认真真准备，仔仔细细检查，避免在提交作品期间频繁修改、频繁提交最终导致版本错乱（顺便帮我们工作人员减轻点工作压力）</span></div>
<div style="word-break: break-all; text-indent: 20pt">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">八、作品评审</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2019Esri</span><span style="font-size: 10pt">开发竞赛分为个人挑战赛与分组作品赛，选手可同时参加个人挑战赛及多个分组作品赛以获取个人积分的累积。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">、评审标准</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">各组作品由主办单位负责召集评委按照公布的评审标准进行评议（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/"><span><span><font color="#0000ff">评审标准</font></span></span></a>可在小组说明中找到）。</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">、评审方式</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">A</span><span style="font-size: 10pt">组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/gerentaozhansai/"><span><span><font color="#0000ff">个人挑战组</font></span></span></a><span>)</span>：比赛结束后 8月9-11日出排名成绩</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">B</span><span style="font-size: 10pt">组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/dilishejizu/"><span><span><font color="#0000ff">地理设计组</font></span></span></a><span>)</span>：根据作品标准组织评审及选手互评</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">C</span><span style="font-size: 10pt">组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/Webyingyongshejizu/"><font color="#0000ff">GIS<span><span>应用开发组</span></span></font></a><span>)</span>：作品将采取三轮评审方式，进入决赛的作品将举办现场答辩活动，由选手亲自介绍并演示作品，由评委打分，最终决出名次。</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">D</span><span style="font-size: 10pt">组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/ENVI_IDLkaifazu/"><span><span><font color="#0000ff">遥感应用组</font></span></span></a><span>)</span>：根据作品标准组织评审</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">E</span><span style="font-size: 10pt">组（<a target="_blank" href="http://contest.esrichina.com.cn/html/jingsaifenzu/sanweijianmoyushejizu/"><span><span><font color="#0000ff">三维应用组</font></span></span></a><span>)</span>：根据作品标准组织评审及场外专家评委打分</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">九、奖项设置</span></b></div>
<div style="text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">、A组-个人挑战组</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">一等奖：1名、价值￥500奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">二等奖：2名、价值￥300奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">三等奖：3名、价值￥100奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优胜奖：若干、价值￥50元奖品 </span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">*</span><span style="font-size: 10pt">奖项数量如有变化，以实际结果为准</span></div>
<div style="text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">、B组-地理设计组</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">一等奖：1组、￥5000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">二等奖：2组、￥3000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">三等奖：3组、￥1000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优胜奖：若干、奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优秀指导老师：若干、奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">参与奖：若干、团队电子证书 </span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">*</span><span style="font-size: 10pt">奖项数量如有变化，以实际结果为准</span></div>
<div style="text-indent: 20pt"><span style="font-size: 10pt">3</span><span style="font-size: 10pt">、C组-GIS应用开发组</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">特等奖：1组、￥8000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">一等奖：2组、￥5000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">二等奖：3组、￥3000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">三等奖：组、￥1000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优胜奖：若干、奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优秀指导老师：若干、奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">参与奖：若干、团队电子证书 </span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">*</span><span style="font-size: 10pt">奖项数量如有变化，以实际结果为准</span></div>
<div style="text-indent: 20pt"><span style="font-size: 10pt">4</span><span style="font-size: 10pt">、D组-遥感应用组</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">一等奖：1组、￥5000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">二等奖：2组、￥3000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">三等奖：3组、￥1000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优胜奖：若干、奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优秀指导老师：若干、奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">参与奖：若干、团队电子证书 </span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">*</span><span style="font-size: 10pt">奖项数量如有变化，以实际结果为准</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">奖品补充：</span></div>
<div style="margin: 0cm 0cm 0pt 42pt; text-indent: 20pt"><span style="font-size: 10pt">获得一、二、三等奖的小组赠送2020年ENVI高级培训一次（不含食宿）。</span></div>
<div style="margin: 0cm 0cm 0pt 42pt; text-indent: 20pt"><span style="font-size: 10pt">说明：获奖者培训时间，详见赛后通知。获奖者如无法参加当期培训，可以保留名额，根据Esri中国信息技术有限公司培训计划选择参加培训时间。参加培训者食宿自理。</span></div>
<div style="text-indent: 20pt"><span style="font-size: 10pt">5</span><span style="font-size: 10pt">、E组-三维应用组</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">一等奖：1组、￥5000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">二等奖：2组、￥3000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">三等奖：3组、￥1000</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优胜奖：若干、奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">优秀指导老师：若干、奖品</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">参与奖：若干、团队电子证书 </span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">*</span><span style="font-size: 10pt">奖项数量如有变化，以实际结果为准</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">*</span><span style="font-size: 10pt">本组根据作品实际情况，或有可能增加特等奖</span></div>
<div style="text-indent: 20pt"><span style="font-size: 10pt">6</span><span style="font-size: 10pt">、其他奖项</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">奖项数量奖励说明</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">最佳指导老师：若干、￥1000、从各组指导老师中评选</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">最佳创新奖：若干、从各组作品中评选</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">最佳创意奖：若干、从各组作品中评选</span></div>
<div style="margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">2020Esri</span><span style="font-size: 10pt">青年学者奖：1名、赴美参加全球UC（从各组获奖选手中选一名优秀代表。该奖项设置于2012年，获奖同学将前往美国参加Esri全球用户大会，在会上领奖，并有机会与Esri总裁Jack先生合影）</span></div>
<div style="text-indent: 20pt"><span style="font-size: 10pt">7</span><span style="font-size: 10pt">、未获奖但提交了完整作品的小组：2019年度参赛证明一份，附有作品点评</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">十、其他说明</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">、组委会针对每组竞赛都设计了相应的“赛前辅导”视频，该辅导从作品解析、主要技术点及案例出发，建议选手关注</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">、推荐选手在ArcGIS知乎（<a target="_blank" href="http://zhihu.esrichina.com.cn/"><span><span><font color="#0000ff">进入</font></span></span></a>）进行问题检索，如无答案可直接发提问帖。或按照组委会提供的其他方式进行咨询，关于寻求技术支持的详细说明，将随“软件使用授权书”一同发放给参赛小组。</span></div>
<div style="word-break: break-all">&nbsp;</div>
<div style="word-break: break-all"><b><span style="font-size: 10pt">十一、联系方式</span></b></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">去大赛网（www.godasai.com）提醒您：</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">官方网站：<a target="_blank" href="http://contest.esrichina.com.cn/">http://contest.esrichina.com.cn/</a></span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">1</span><span style="font-size: 10pt">、赛事咨询 </span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">邮件咨询：contest@esrichina.com.cn （推荐方式）</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">电话咨询：010-57632239 </span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">官方微博：@Esri开发竞赛</span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">官方QQ群：229031805</span></div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">2</span><span style="font-size: 10pt">、技术支持 </span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">电话咨询：400-819-2881 </span></div>
<div style="word-break: break-all; margin: 0cm 0cm 0pt 21pt; text-indent: 20pt"><span style="font-size: 10pt">邮件咨询：support@esrichina.com.cn </span></div>
<div style="word-break: break-all; text-indent: 20pt">&nbsp;</div>
<div style="word-break: break-all; text-indent: 20pt"><span style="font-size: 10pt">关注我们(微号：godasai)可获得更多最新可报名大学生竞赛赛事信息：</span></div><p align="center" class="pageLink"></p></td>
</tr>
</tbody></table>
<table border="0" align="center" cellpadding="0" cellspacing="8">
<tbody><tr>
<td><table border="0" align="center" cellpadding="0" cellspacing="0" class="digg">
<tbody><tr>
<td class="diggnum" id="diggnum"><strong>< type="text/javascript" src="http://www.godasai.com/e/public/ViewClick/?classid=51&amp;id=916&amp;down=5">/script>3</strong></td>
</tr>
<tr>
<td class="diggit"><a href="JavaScript:makeRequest('http://www.godasai.com/e/public/digg/?classid=51&amp;id=916&amp;dotop=1&amp;doajax=1&amp;ajaxarea=diggnum','EchoReturnedText','GET','');">来顶一下</a></td>
</tr>
</tbody></table></td>
<td><table border="0" align="center" cellpadding="0" cellspacing="0" class="digg">
<tbody><tr>
<td valign="middle" class="diggnum"><strong><a href="http://www.godasai.com/"><img src="http://www.godasai.com/skin/default/images/back.gif" alt="返回首页" width="12" height="13" border="0" align="absmiddle"></a></strong></td>
</tr>
<tr>
<td class="diggit"><a href="http://www.godasai.com/">返回首页</a></td>
</tr>
</tbody></table></td>
</tr>
</tbody></table>
          </td>
      `
      }
    },
    // props:{
    //   article_content:''
    // }
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
</style>
