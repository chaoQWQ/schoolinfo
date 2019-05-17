<template>
  <div>
    <div class="itemBox">
      <div class="left">
        <img src="/static/images/emailIcon.png">
      </div>
      <div class="center">
        <p>
          <span class="font1">邮箱</span>
          <span class="font3"></span>
          <span v-if="email" class="font4">{{email}}</span>
          <span v-else class="font4">未绑定</span>
        </p>
        <p class="font2">可用邮箱加密码登录，可用邮箱找回密码</p>
      </div>
      <div class="right">
        <a v-if="!email" @click="emailFormVisible=true" href="javascript:void(0);" class="binding js-bindemail moco-btn moco-btn-normal">立即绑定</a>
        <a v-else @click="emailFormVisible=true" href="javascript:void(0);" class="binding js-bindemail moco-btn moco-btn-normal">更改</a>
      </div>
    </div>
    <div class="itemBox">
      <div class="left">
        <img src="/static/images/safe.png">
      </div>
      <div class="center">
        <p>
          <span class="font1">密码</span>
          <span class="font3"></span>
        </p>
        <p class="font2">用于保护账号信息和登录安全</p>
      </div>
      <div class="right">
        <a @click="pwdFormVisible=true" href="javascript:void(0);" class="binding js-bindemail moco-btn moco-btn-normal">修改</a>
      </div>
    </div>
    <el-dialog
      title="邮箱绑定"
      :show-close="false"
      :visible.sync="emailFormVisible"
      :close-on-click-modal="false"
      width="20%"
    >
      <div>
        <el-form label-position="right" :model="emailForm" :rules="rules" ref="emailForm" >
          <el-form-item  label="邮 箱:" label-width="80px" prop="bemail">
            <el-row>
              <el-col :span="18">
                <el-input placeholder="请输入邮箱" v-model="emailForm.bemail" autocomplete="off"></el-input>
              </el-col>
              <el-col :span="6">
                <el-button type="warning" @click="sendEmail"  class="yanzheng"  :disabled="!show">
                  <span v-show="show">验证</span>
                  <span v-show="!show" class="count">{{count}} s</span>
                </el-button>
              </el-col>
            </el-row>

          </el-form-item>
          <el-form-item label="验证码:" label-width="80px" prop="authCode">
            <el-col :span="8">
              <el-input v-model="emailForm.authCode"></el-input>
            </el-col>
          </el-form-item>
        <div align="center" style="margin-top:10px;">
          <el-button @click="emailFormVisible = false;cleanform('emailForm')">取 消</el-button>
          <el-button type="primary" @click="bindEmail">绑 定</el-button>
        </div>
        </el-form>
      </div>
    </el-dialog>

    <el-dialog
      title="修改密码"
      :show-close="false"
      :visible.sync="pwdFormVisible"
      :close-on-click-modal="false"
      width="20%"
    >
      <div>
        <el-form label-position="right" :model="pwdForm" :rules="rules2" ref="pwdForm" >
          <el-form-item label="原密码:" label-width="100px" prop="oldPassword">
            <el-col :span="22">
              <el-input v-model="pwdForm.oldPassword" show-password></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="新密码:" label-width="100px" prop="newPassword">
            <el-col :span="22">
              <el-input v-model="pwdForm.newPassword" show-password></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="确认密码:" label-width="100px" prop="newPassword2">
            <el-col :span="22">
              <el-input v-model="pwdForm.newPassword2" show-password></el-input>
            </el-col>
          </el-form-item>
        <div align="center" style="margin-top:10px;">
          <el-button @click="pwdFormVisible = false;cleanform('pwdForm')">取 消</el-button>
          <el-button type="primary" @click="updatePassword">修 改</el-button>
        </div>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { valid } from 'semver';
import md5 from 'js-md5';
const TIME_COUNT = 120;
export default {
  name: "personalSafe",
  
  data() {
    var checkEmail = (rule, value, callback) => {
    const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/
    if (!value) {
      return callback(new Error('邮箱不能为空'))
    }
    setTimeout(() => {
      if (mailReg.test(value)) {
        callback()
      } else {
        callback(new Error('请输入正确的邮箱格式'))
      }
    }, 100)
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value !== this.pwdForm.newPassword2) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      show: true,
      count: '',
      timer: null,
      pwdFormVisible:false,
      emailFormVisible:false,
      emailForm:{
        id:this.$store.getters.currentUser.id,
        bemail:'',
        authCode:''
      },
      pwdForm:{
        oldPassword:'',
        newPassword:'',
        newPassword2:''
      },
      rules: {
        bemail: [
          {validator:checkEmail,trigger: 'blur'}
        ],
        authCode: [
          {
            required: true,
            message: "请输入验证码",
            trigger: "blur"
          }
        ]
      },
      rules2:{
        oldPassword: [
          {
            required: true,
            message: "请输入原密码",
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
        newPassword: [
          {
            required: true,
            message: "请输入新密码",
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
        newPassword2: [
          {
            required: true,
            validator: validatePass,
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed:{
    email(){
      return this.$store.getters.currentUser.email
    }
  },
  methods:{
    cleanform(ref) {
      this.$refs[ref].clearValidate();
      this.$refs[ref].resetFields();
    },
    sendEmail(){
      this.$refs["emailForm"].validateField('bemail',(error)=>{
        if(!error){
          if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                  if (this.count > 0 && this.count <= TIME_COUNT) {
                    this.count--;
                  } else {
                    this.show = true;
                    clearInterval(this.timer);
                    this.timer = null;
                  }
                }, 1000)
          }
          this.$http.get('/api/sys/sendEmail',{
            params:{
              id:this.$store.getters.currentUser.id,
              emailurl:this.emailForm.bemail
            }
          }).then(resp=>{
            if(resp.data.code='000000'){
              this.$message.success("邮箱已发送")
            }
          })
        }else{
          console.log(error)
        }
      })

    },
    bindEmail(){
      this.$refs["emailForm"].validate((valid)=>{
        if(valid){
          this.$http.post('/api/sys/bindEmail',this.emailForm).then(resp=>{
            if(resp.data.code='000000'){
              let user =this.$store.getters.currentUser
              user.email=this.emailForm.bemail
              this.$localstorage.put("User",user)
              this.$store.commit("changeUserEmail",this.emailForm.bemail );
              this.cleanform('emailForm')
              this.$message.success("绑定成功");
              this.emailFormVisible=false;
            }else{
              this.$message.error(resp.data.message)
            }
          })
        }
      })
    },
    updatePassword(){
      this.$refs["pwdForm"].validate((valid)=>{
        if(valid){
          
          this.$http.post('/api/sys/updatePassword',{
            oldPassword:md5(this.pwdForm.oldPassword),
            newPassword:md5(this.pwdForm.newPassword)
            }).then(resp=>{
            if(resp.data.code='000000'){
              this.cleanform('pwdForm')
              this.$message.success("修改成功");
              this.pwdFormVisible=false;
            }else{
              this.$message.error(resp.data.message)
            }
          })
        }
      })
    }
  }
};
</script>
<style scoped>
.itemBox{
    height: 98px;
    overflow: hidden;
    margin: auto;
    border-bottom: 1px solid #d9dde1;
}
.left{
    width: 60px;
    float: left;
    font-size: 36px;
    color: #d9dde1;
    line-height: 98px;
    padding-left: 24px;
}
.center {
    padding-top: 17px;
    width: 510px;
    float: left;
}
.right {
    float: right;
    padding-right: 12px;
    margin-top: 28px;
}
.itemBox .font2 {
    color: #93999f;
    font-size: 14px;
}
.itemBox .font1 {
    color: #2b333b;
    font-size: 16px;
    font-weight: 700;
}
.itemBox .font3 {
    color: #2b333b;
    font-size: 14px;
}
.itemBox .font4 {
    color: #f01414;
    font-size: 14px;
}
.yanzheng{
  cursor: pointer;
  margin-left: 10px;
}
</style>
