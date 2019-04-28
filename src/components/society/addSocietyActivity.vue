<template>
  <div class="content-area">
    <div>
      <breadcrumb></breadcrumb>
      <div style="width: 800px;margin-left: 200px;">
        <h1 style="text-align:center">社团活动发布</h1>
        <el-form label-position="right" :model="actForm" :rules="rules" ref="actForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="活动名称" prop="title">
            <el-input v-model="actForm.title"></el-input>
          </el-form-item>
          <el-form-item label="活动简介" prop="summary">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="actForm.summary"></el-input>
          </el-form-item>
          <el-form-item label="活动地点" prop="address">
            <el-input v-model="actForm.address"></el-input>
          </el-form-item>
          <el-form-item label="活动举行时间" prop="validTime">
             <el-date-picker
                v-model="actForm.validTime"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
          </el-form-item>
          <el-form-item label="主办方" prop="organizer">
            <el-input v-model="actForm.organizer"></el-input>
          </el-form-item>
          <el-form-item label="活动封面图片">
            <el-upload
              class="avatar-uploader"
              ref="avatar"
              name="file"
              action="/api/common/singleUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="handleAvatarChange"
              :auto-upload="false">
              <img v-if="actForm.coverImage" :src="actForm.coverImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>    
          <el-form-item label="活动详情" prop="content" >
              <richEditor 
                v-model="actForm.content"
                :disabled="disabled">
              </richEditor>
          </el-form-item>
          
    
          <el-form-item>
            <el-button type="danger" @click="submitForm('actForm')">立即发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
  
</template>
<script>
import breadcrumb from '../base/breadcrumb';
import richEditor from '../base/richTxtEdit'
export default {
  name:"addSocietyActivity",
  components:{
    breadcrumb,
    richEditor
  },
   data() {
      return {
        disabled: false,
        
        avatarfileList:[],
        actForm: {
          title: '',
          summary:'',
          startTime:'',
          endTime:'',
          coverImage:'',
          address: '',
          organizer: '',
          content:'',
          validTime:''
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 30, message: '不超过30 个字符', trigger: 'blur' }
          ],
          summary: [
            { required: true, message: '请输入活动简介', trigger: 'blur' },
            { min:10, max: 100, message: '请输入至少10个字符，不超过100 个字符', trigger: 'blur' }
          ],
          address:[
            {required:true,message:'请输入活动地点',trigger:'blur'}
          ],
          validTime:[
            {required:true,message:'请选择活动时间',trigger:'blur'}
          ],
          organizer:[
            {required:true,message:'请输入主办单位',trigger:'blur'}
          ],
          content:[
            {required:true,message:'请输入活动详情',trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.actForm.startTime=this.actForm.validTime[0];
            this.actForm.endTime=this.actForm.validTime[1];
            this.submitAct().then(res=>{
              this.$http.post("/api/society/submit",this.actForm).then(resp=>{
                console.log("resp");
                console.log(resp);
                if(resp.data.code=="000000"){
                  this.$message.success("发布成功");
                }else{
                  this.$message.error(resp.data.message);
                }
            }).catch(reason=>{
              this.$message.error("发布失败")
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
      submitAct(){
        const _this=this
        if(this.avatarfileList.length!=0){
            return new Promise(function(resolve,reject){
            _this.uploadAvatar().then(res=>{
              _this.actForm.coverImage=res;
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
                            console.log("封面上传成功")
                            resolve(resp.data.data)
                          }else{
                            reject("封面上传失败")
                          }
                      })
                      .catch(function(error) {
                          reject(error);
                      })
                })
      },
     
      handleAvatarSuccess(res, file) {
        console.log("上传成功")
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
              this.actForm.coverImage = URL.createObjectURL(file.raw);
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
<style  scoped>
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
    background-color: ghostwhite;
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>
