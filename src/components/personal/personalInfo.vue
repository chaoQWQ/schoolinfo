<template>
  <div style="margin-left:100px;">
    <el-form label-position="right" :model="userForm" :rules="rules" ref="userForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              name="file"
              action="/api/common/singleUpload"
              :show-file-list="false"
              :on-change="handleAvatarChange"
              :auto-upload="false">
              <img v-if="userForm.avatar" :src="userForm.avatar" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>    
          <el-form-item label="真实姓名:" prop="realname" >
            <el-col :span="8">
              <el-input v-model="userForm.realname"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="生日:">
            <el-date-picker
              v-model="userForm.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio-group v-model="userForm.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="0">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号:" prop="mobile" >
            <el-col :span="8">
              <el-input v-model="userForm.mobile"></el-input>
            </el-col>
          </el-form-item>
          <!-- <el-form-item label="邮箱:" prop="email" >
            <el-col :span="8">
              <el-input v-model="userForm.email"></el-input>
            </el-col>
          </el-form-item> -->
          <el-form-item label="QQ:" >
            <el-col :span="8">
              <el-input v-model="userForm.qq"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="信息是否公开:" prop="privacy" >
            <el-switch
              v-model="userForm.privacy"
              active-value=1
              inactive-value=0
              active-color="#13ce66"
              inactive-color="#ff4949">
            </el-switch>
          </el-form-item>
          
    
          <el-form-item>
            <el-button type="danger" @click="submitForm('userForm')">保存</el-button>
          </el-form-item>
        </el-form>
  </div>
</template>
<script>
export default {
  name:"personalInfo",
  data(){


    return{
      avatarfileList:[],
      userForm:{
        id:this.$store.getters.currentUser.id,
        avatar:this.$store.getters.currentUser.avatar,
        realname:this.$store.getters.currentUser.realname,
        birthday:this.$store.getters.currentUser.birthday,
        gender:this.$store.getters.currentUser.gender,
        mobile:this.$store.getters.currentUser.mobile,
        // email:this.$store.getters.currentUser.email,
        qq:this.$store.getters.currentUser.qq,
        privacy:this.$store.getters.currentUser.privacy
      },
      rules: {
          realname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],

          privacy:[
            {required:true,message:'请选择是否公开',trigger:'blur'}
          ],

          mobile:[{ 
              required: true,
              message: '请输入手机号码',
              trigger: 'blur'
          },
          {validator:function(rule,value,callback){
                  if(/^1[34578]\d{9}$/.test(value) == false){
                      callback(new Error("请输入正确的手机号"));
                  }else{
                      callback();
                  }
              }, trigger: 'blur'}
          ]
        }
    }
  },
  created(){

  },
  methods:{
    updataCurrentUser(user){
      this.$store.state.currentUser.avatar=user.avatar;
      this.$store.state.currentUser.realname=user.realname;
      this.$store.state.currentUser.birthday=user.birthday;
      this.$store.state.currentUser.gender=user.gender;
      this.$store.state.currentUser.mobile=user.mobile;
      this.$store.state.currentUser.qq=user.qq;
      this.$store.state.currentUser.privacy=user.privacy;
    },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.updatePersonal().then(res=>{
              this.$http.post("/api/sys/updateUser",this.userForm).then(resp=>{
                if(resp.data.code=="000000"){
                  this.$message.success("保存成功");
                  this.updataCurrentUser(this.userForm);
                  this.$router.push("/personalCenter/personalInfo");
                  
                }else{
                  this.$message.error(resp.data.message);
                }
            }).catch(reason=>{
              this.$message.error("保存失败")
              console.log(reason)
              })
            },err=>{
              console.log("头像环节失败")
              console.log(err)
            })
          } else {
            this.$message.error("请正确填写完信息")
            return false;
          }
        });
      },
     updatePersonal(){
        const _this=this
        if(this.avatarfileList.length!=0){
            return new Promise(function(resolve,reject){
            _this.uploadAvatar().then(res=>{
              _this.userForm.avatar=res;
              resolve(res);
            }).catch(err=>{
              reject(err);
            })
          })
        }else{
          return Promise.resolve("xox")
        }                          
      },
     uploadAvatar: function() {//自定义的上传图片的方法
                //1. 创建formData 利用AXIOS传递
                let formData = new FormData;
                let files =this.avatarfileList;
                for(let i = 0; i < files.length; i++) {
                  formData.append('files', files[i].raw);
                }
                let config = {
                    'Content-Type': 'multipart/form-data'
                }
                const _this=this
                return new Promise(function(resolve,reject){
                  _this.$http.post('/api/common/multiUpload', formData, config)
                      .then(resp=> {
                          if(resp.data.code=="000000"){
                            console.log("头像上传成功")
                            resolve(resp.data.data)
                          }else{
                            reject("头像上传失败")
                          }
                      })
                      .catch(function(error) {
                          reject(error);
                      })
                })
      },

     handleAvatarChange(file,fileList){
        console.log(file);
        console.log("文件状态"+file.status);
        if(file.status=="ready"){
        let fileName = file.name;
        const isLt5M = file.size / 1024 / 1024 < 5;
        let regex = /(.jpg|.jpeg|.gif|.png|.bmp)$/;
          if (regex.test(fileName.toLowerCase())) {
            if (!isLt5M) {
              fileList.pop();
              this.$message.error('上传头像图片大小不能超过 5MB!');
            }else{
              fileList=fileList.slice(-1);
              this.avatarfileList=fileList;
              this.userForm.avatar = URL.createObjectURL(file.raw);
            }
            
          } else {
              fileList.pop();
              this.$message.error('请选择图片文件');
          }   
        }

      }
  }
}
</script>
<style scoped>
 .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    background-color: #c4cfd745;
    font-size: 28px;
    color: #8c939d;
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    width: 100px;
    height: 100px;
    display: block;
    border-radius: 50%;
  }
</style>
