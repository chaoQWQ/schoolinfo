<template>
  <div class="content-area">
    <div>
      <breadcrumb></breadcrumb>
      <div style="width: 800px;margin-left: 200px;">
        <h1 style="text-align:center">志愿服务发布</h1>
        <el-form label-position="right" :model="vForm" :rules="rules" ref="vForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="服务名称" prop="title">
            <el-input v-model="vForm.title"></el-input>
          </el-form-item>
          <el-form-item label="服务地点" prop="address">
            <el-input v-model="vForm.address"></el-input>
          </el-form-item>
          <el-form-item label="服务类别" prop="serviceType">
              <el-select v-model="vForm.serviceType"  placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.id"
                  :label="item.name"
                  :value="item.name">
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="招募人数" prop="recruitNumbers">
            <el-input style="width: 70px;" v-model.number="vForm.recruitNumbers"></el-input>
            <span> 人</span>
          </el-form-item>
          <el-form-item label="招募日期" prop="recruitTime">
            <el-date-picker
              v-model="vForm.recruitTime"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="服务时间" prop="serviceTime">
             <el-date-picker
                v-model="vForm.serviceTime"
                value-format="yyyy-MM-dd HH:mm:ss"
                type="datetimerange"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
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
              <img v-if="vForm.coverImage" :src="vForm.coverImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>    
          <el-form-item label="详情描述" prop="description" >
              <richEditor 
                v-model="vForm.description"
                :disabled="disabled">
              </richEditor>
          </el-form-item>
          
    
          <el-form-item>
            <el-button type="danger" @click="submitForm('vForm')">立即发布</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>

  </div>
  
</template>
<script>
import breadcrumb from '../base/breadcrumb';
import richEditor from '../base/richTxtEdit';
import localData from '../../utils/local-data.js'
export default {
  name:"addVolunteer",
  components:{
    breadcrumb,
    richEditor
  },
   data() {
     var validateTime = (rule, value, callback) => {
      if (this.vForm.recruitTime[1]) {
        if(value[1]<this.vForm.recruitTime[1]){
          callback(new Error("项目结束时间应晚于招募结束时间!"));
        }else if(value[0]==value[1]){
          callback("起止时间不能相同");
        }
      } else {
        callback();
      }
    };
      return {
        options:localData.volunteerServiceTypeList,
        disabled: false,
        avatarfileList:[],
        vForm: {
          title: '',
          serviceType:'',
          startTime:'',
          endTime:'',
          recruitEndTime:'',
          recruitStartTime:'',
          coverImage:'',
          address: '',
          description:'',
          recruitNumbers: '',
          serviceTime:'',
          recruitTime:''
        },
        rules: {
          title: [
            { required: true, message: '请输入活动名称', trigger: 'blur' },
            { max: 30, message: '不超过20 个字符', trigger: 'blur' }
          ],
          serviceType: [
            { required: true, message: '请选择服务类别', trigger: 'blur' },
          ],
          recruitNumbers:[
            { required: true, message: '招募人数不能为空'},
            { type: 'number', message: '人数必须为数字'}
          ],
          address:[
            {required:true,message:'请输入活动地点',trigger:'blur'}
          ],
          recruitTime:[
            {required:true,message:'请选择招募日期',trigger:'blur'}
          ],
          serviceTime:[
            {required:true,message:'请选择服务时间',trigger:'blur'},
            {validator:validateTime, trigger: 'blur'}
          ],
          description:[
            {required:true,message:'请输入详情描述',trigger:'blur'}
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.vForm.startTime=this.vForm.serviceTime[0];
            this.vForm.endTime=this.vForm.serviceTime[1];
            this.vForm.recruitStartTime=this.vForm.recruitTime[0];
            this.vForm.recruitEndTime=this.vForm.recruitTime[1];
            // this.vForm.serviceType=this.vForm.serviceType.join(",")
            this.submitVolunteer().then(res=>{
              this.$http.post("/api/volunteer/submit",this.vForm).then(resp=>{
                console.log("resp");
                console.log(resp);
                if(resp.data.code=="000000"){
                  this.cleanform("vForm");
                  this.vForm.coverImage='';
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
      submitVolunteer(){
        const _this=this
        if(this.avatarfileList.length!=0){
            return new Promise(function(resolve,reject){
            _this.uploadAvatar().then(res=>{
              _this.vForm.coverImage=res;
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
              this.vForm.coverImage = URL.createObjectURL(file.raw);
            }
            
          } else {
              fileList.pop();
              this.$message.error('请选择图片文件');
          }
        }

      },
    cleanform(ref) {
      this.$refs[ref].clearValidate();
      this.$refs[ref].resetFields();
    },

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
    background-color: #c4cfd745;
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
