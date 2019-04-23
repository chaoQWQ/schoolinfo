<template>
  <div>
    <div>
      <div id="header">
        <section class="top">
          <div>
            <img src="../static/images/name3.png">
          </div>
        </section>
        <section class="navmenu">
          <el-menu
            :default-active="activeIndex"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#64e1b1"
            text-color="#fff"
            active-text-color="#ffd04b"
          >
            <el-row>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-menu-item index="1">首页</el-menu-item>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-menu-item index="2">社团活动</el-menu-item>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-menu-item index="3">志愿活动</el-menu-item>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-menu-item index="4">比赛信息</el-menu-item>
              </el-col>
              <el-col :xs="2" :sm="2" :md="2" :lg="2" :xl="2">
                <el-menu-item index="5">小道消息</el-menu-item>
              </el-col>
              <el-col :xs="3" :sm="3" :md="3" :lg="3" :xl="3" :offset="11">
                <!-- <a v-if="!islogin" href="#" @click="loginFormVisible = true; return false;"> -->
                <div v-if="loginStatus!=true">
                  <img
                    class="loginImg"
                    src="../static/images/user.png"
                    @click="loginFormVisible = true;"
                  >
                </div>
                <div v-else class="user-card-box">
                  <div>
                    <img class="headImg" :src="currentUser.avatar">
                  </div>
                  <div class="g-user-card">
                    <ul class="card-inner">
                      <li><span class="icon-user"> 个人中心</span></li>
                      <li @click="logout"><span class="icon-exit"> 退出</span></li>
                    </ul>
                  </div>
                </div>

                <!-- </a> -->
              </el-col>
            </el-row>
          </el-menu>
        </section>
      </div>
      <div class="mainContent">
        <router-view></router-view>
      </div>
    </div>
    <pagefooter></pagefooter>

    <el-dialog
      title="登录"
      :show-close="false"
      :visible.sync="loginFormVisible"
      :close-on-click-modal="false"
      width="20%"
    >
      <!-- 登录 -->
      <div v-if="signFormVisible==false">
        <el-form :model="form" :rules="rules" ref="loginform" @keyup.enter.native="login('loginform')">
          <el-form-item label="用户名:" label-width="80px" prop="username">
            <el-input placeholder="请输入用户名" v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密  码:" label-width="80px" prop="password">
            <el-input
              placeholder="请输入密码"
              v-model="form.password"
              show-password
            ></el-input>
          </el-form-item>
          <div align="center">
            <span>
              <a href="#" class="abiaoqian">忘记密码？</a>
              <a
                href="#"
                class="abiaoqian"
                @click="signFormVisible=true;cleanform('loginform')"
              >还没账号,注册一个</a>
            </span>
          </div>
        </el-form>
        <div align="center" style="margin-top:10px;">
          <el-button @click="loginFormVisible = false;cleanform('loginform')">取 消</el-button>
          <el-button type="primary" @click="login('loginform')">登 录</el-button>
        </div>
      </div>

      <!-- 注册 -->
      <div v-if="signFormVisible">
        <el-form :model="s_form" :rules="s_rules" ref="signform">
          <el-form-item label="用户名:" label-width="100px" prop="s_username">
            <el-input v-model="s_form.s_username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密  码:" label-width="100px" prop="s_password">
            <el-input v-model="s_form.s_password" show-password></el-input>
          </el-form-item>
          <el-form-item label="确认密码:" label-width="100px" prop="re_password">
            <el-input v-model="s_form.re_password" show-password></el-input>
          </el-form-item>
        </el-form>
        <div align="center">
          <el-button @click="signFormVisible = false; cleanform('signform')">取 消</el-button>
          <el-button type="primary" @click="signup('signform')">注 册</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import pagefooter from "./components/pagefooter";
export default {
  name: "App",
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.s_form.s_password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkUserName = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
      this.$http
        .get("/api/sys/checkUserName", {
          params: {
            username: value
          }
        })
        .then(resp => {
          if (resp.data.code == "000000") {
            callback();
          } else {
            callback(new Error("用户名已存在"));
          }
        });
    };
    return {
      activeIndex: "1",
      loginFormVisible: false,
      signFormVisible: false,
      form: {
        username: "",
        password: ""
      },
      s_form: {
        s_username: "",
        s_password: "",
        re_password: ""
      },
      rules: {
        username: [
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          }
        ]
      },
      s_rules: {
        s_username: [
          {
            required: true,
            validator: checkUserName,
            trigger: "blur"
          },
          {
            min: 5,
            max: 16,
            message: "长度在 5 到 16 个字符"
          },
          {
            pattern: /^[a-zA-Z]\w{1,5}$/,
            message: "以字母开头，长度在5-16之间， 只能包含字符、数字和下划线"
          }
        ],
        s_password: [
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          {
            min: 6,
            max: 30,
            message: "长度在 6 到 30 个字符"
          },
          {
            pattern: /^(\w){6,20}$/,
            message: "只能输入6-20个字母、数字、下划线"
          }
        ],
        re_password: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    loginStatus() {
      return this.$store.getters.isLogin;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  methods: {
    openLoginBox(){
      this.cleanform('loginform')
      loginFormVisible = true;
    },
    handleSelect(key, keyPath) {
      switch (key) {
        case "1":
          this.$router.push("/home");
          break;
        case "2":
          this.$router.push("/home");
          break;
        case "3":
          this.$router.push("/home");
          break;
        case "4":
          this.$router.push("/competition");
          break;
        case "5":
          this.$router.push("/home");
          break;
      }
    },
    cleanform(ref) {
      this.$refs[ref].clearValidate();
      this.$refs[ref].resetFields();
    },
    login(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post("/api/sys/login", this.form).then(resp => {
            //登录失败,先不讨论
            if (resp.data.code != "000000") {
              this.$message.error(resp.data.message);
              //登录成功
            } else {
              this.cleanform("loginform");
              //设置Vuex登录标志为true，默认userLogin为false
              this.$store.dispatch("setLoginFlag", true);
              console.log(this.$store.state.currentUser);
              this.$store.dispatch("setUser", resp.data.data);
              console.log(this.$store.state.currentUser);
              //Vuex在用户刷新的时候userLogin会回到默认值false，所以我们需要用到HTML5储存
              //我们设置一个名为Flag，值为isLogin的字段，作用是如果Flag有值且为isLogin的时候，证明用户已经登录了。
              this.$localstorage.put("Flag", "isLogin");
              this.$localstorage.put("User",resp.data.data)
              this.loginFormVisible = false;
              this.$message.success("登录成功");
              //登录成功后跳转到指定页面
              this.$router.push("/home");
            }
          });
        } else {
          this.$message.error("别着急，先把信息填了来！");
        }
      });
    },
    signup(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http.post("/api/sys/signUp", this.s_form).then(resp => {
            if (resp.data.code == "000000") {
              this.$message.success("注册成功");
            } else {
              this.$message.error("注册失败");
            }
          });
        } else {
          this.$message.error("别着急，先把信息填了来！");
        }
      });
    },

    logout(){
      this.$http.get("/api/sys/logout").then(resp=>{
        this.$localstorage.remove("Flag");
        this.$localstorage.remove("User");
        this.$store.dispatch("setLoginFlag", false);
        this.$router.push("/home");
        this.cleanform("loginform");
      })
    }
  },
  components: {
    pagefooter
  }
};
</script>

<style>
#header {
  margin-bottom: 10px;
}
#header .top {
  height: 192px;
  background: #ffffff url("/static/images/bg_top.jpg") center repeat-x;
}
.mainContent {
  display: flow-root;
  margin-bottom: 100px;
}
.abiaoqian {
  text-decoration: none;
  margin-right: 5px;
}
.loginImg {
  height: 60px;
  float: right;
  margin-top: 1px;
  margin-right: 20px;
  border-radius: 50%;
}
.headImg {
  height: 60px;
  float: right;
  margin-top: 1px;
  margin-right: 20px;
  border-radius: 50%;
}
.loginImg:hover {
  box-shadow: 0px 0px 15px #f6f2f2;
  cursor: pointer;
}
.headImg:hover {
  box-shadow: 0px 0px 15px #f6f2f2;
  cursor: pointer;
}
.user-card-box:hover .g-user-card{
  visibility:visible
}
.g-user-card {
    visibility: hidden;
    position: absolute;
    right: 0;
    top: 100%;
    z-index: 1000;
    width: auto;
    /* padding: 10px; */
    background-color: #fff;
    box-shadow: 0 8px 16px 0 rgba(7,17,27,.2);
    /* border-bottom-right-radius: 8px;
    border-bottom-left-radius: 8px; */
    border-radius: 8px;
    box-sizing: border-box;
}
.card-inner{
  padding: 0px;
}
.card-inner li{
  list-style-type: none;
  padding: 10px;
  cursor: pointer;
}
.card-inner li:hover{
  background-color: #9e9e9e8f;
}
</style>
