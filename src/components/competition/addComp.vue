<template>
  <div class="content-area">
    <div>
      <breadcrumb></breadcrumb>
      <div style="width: 800px;margin-left: 200px;">
        <h1 style="text-align:center">发布比赛</h1>
        <el-form label-position="right" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="比赛名称" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <el-form-item label="比赛简介" prop="summary">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="ruleForm.summary"></el-input>
          </el-form-item>
          <el-form-item label="比赛等级">
            <el-radio-group v-model="ruleForm.scope">
              <el-radio label="校级"></el-radio>
              <el-radio label="市级"></el-radio>
              <el-radio label="国级"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="比赛类型" prop="type">
            <el-select v-model="ruleForm.type"  collapse-tags placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="contactName">
            <el-input v-model="ruleForm.contactName"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="contactTelNumber">
            <el-input v-model="ruleForm.contactTelNumber"></el-input>
          </el-form-item>
          <el-form-item label="比赛官网" prop="webUrl">
            <el-input v-model="ruleForm.webUrl"></el-input>
          </el-form-item>
          <el-form-item label="主办单位" prop="organizer">
            <el-input v-model="ruleForm.organizer"></el-input>
          </el-form-item>
          <el-form-item label="相关附件上传">
            <el-upload
              class="upload-demo"
              ref="attach"
              name="files"
              action="/api/common/multiUpload"
              :on-change="handleChange"
              :on-remove="handleRemove"
              :before-remove="beforeRemove"
              :limit="3"
              :on-exceed="handleExceed"
              :file-list="attachFileList"
              :auto-upload="false">
              <el-button size="small" type="primary">附件上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传zip/doc/xls/pdf文件，且不超过10M</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="比赛封面图片">
            <el-upload
              class="avatar-uploader"
              ref="avatar"
              name="file"
              action="/api/common/singleUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :on-change="handleAvatarChange"
              :auto-upload="false">
              <img v-if="ruleForm.coverImage" :src="ruleForm.coverImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>    
          <el-form-item label="比赛详情" prop="content" >
              <richEditor 
                v-model="ruleForm.content"
                :disabled="disabled">
              </richEditor>
          </el-form-item>
          
    
          <el-form-item>
            <el-button type="danger" @click="submitForm('ruleForm')">申请发布</el-button>
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
  name:"addComp",
  components:{
    breadcrumb,
    richEditor
  },
   data() {
      return {
        disabled: false,
        options: this.$store.state.compTypeList,
        avatarfileList:[],
        attachFileList:[],
        ruleForm: {
          title: '',
          summary:'',
          scope:'校级',
          type:'',
          coverImage:'',
          contactName: '',
          contactTelNumber: '',
          webUrl: '',
          organizer: '',
          attachUrl:'',
          content:''
        },
        rules: {
          title: [
            { required: true, message: '请输入比赛名称', trigger: 'blur' },
            { max: 30, message: '不超过30 个字符', trigger: 'blur' }
          ],
          summary: [
            { required: true, message: '请输入比赛简介', trigger: 'blur' },
            { min:10, max: 100, message: '请输入至少10个字符，不超过100 个字符', trigger: 'blur' }
          ],
          type:[
            {required:true,message:'请选择比赛类型',trigger:'blur'}
          ],
          contactName:[
            {required:true,message:'请输入相关联系人姓名',trigger:'blur'}
          ],
          organizer:[
            {required:true,message:'请输入主办单位',trigger:'blur'}
          ],
          content:[
            {required:true,message:'请输入比赛详情',trigger:'blur'}
          ],
          contactTelNumber:[{ 
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
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitComp().then(res=>{

              this.$http.post("/api/compinfo/submit",this.ruleForm).then(resp=>{
                console.log("resp");
                console.log(resp);
                if(resp.data.code=="000000"){
                  this.cleanform("ruleForm");
                  this.ruleForm.coverImage='';
                  this.attachFileList=[];
                  this.$message.success("提交成功，等待审核");
                }else{
                  this.$message.error(resp.data.message);
                }
            }).catch(reason=>{console.log(reason)})
            },err=>{
              console.log("头像与附件上传环节失败")
              console.log(err)
            })
          } else {
            this.$message.error("请正确填写完信息")
            return false;
          }
        });
      },
      submitComp(){
        const _this=this
        if(this.avatarfileList.length==0&&this.attachFileList.length!=0){
          return new Promise(function(resolve,reject){
            _this.uploadAttach().then(res=>{
              _this.ruleForm.attachUrl=JSON.stringify(res);
              resolve(res);
            }).catch(err=>{
              reject(err);
            })
          })
        }
        else if(this.attachFileList.length==0&&this.avatarfileList.length!=0){
            return new Promise(function(resolve,reject){
            _this.uploadAvatar().then(res=>{
              _this.ruleForm.coverImage=res;
              resolve(res);
            }).catch(err=>{
              reject(err);
            })
          })
        }
        else if(this.attachFileList.length!=0&&this.avatarfileList.length!=0){
          return new Promise(function(resolve,reject){
            Promise.all([_this.uploadAvatar(),_this.uploadAttach()]).then(res=>{
                _this.ruleForm.coverImage=res[0];
                _this.ruleForm.attachUrl=JSON.stringify(res[1]);
                resolve(res);
              }).catch(err=>{
                reject(err);
              })
          })  
        } 
        else{
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
      uploadAttach(){
        let formData = new FormData;
        let files =this.attachFileList;
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
                    console.log("附件上传成功")
                    resolve(resp.data.data)
                  }else{
                    reject("附件上传失败")
                  }
              })
              .catch(function(error) {
                  reject(error);
              })
        })
      },
      handleRemove(file, fileList) {
        console.log(fileList);
      },
      handleChange(file,fileList) {
        if(file.status=="ready"){
          let fileName = file.name;
          const isLt10M = file.size / 1024 / 1024 < 10;
          let regex = /(.zip|.docx|.doc|.xls|.xlsx|.pdf)$/;
          if (!regex.test(fileName.toLowerCase())) {
              fileList.pop();
              this.$message.error('请上传正确格式的文件');
          }else{
            if (!isLt10M) {
              fileList.pop();
              this.$message.error('文件大小不能超过 10MB!');
            }else{
              this.attachFileList=fileList;
            }
          }


        }


      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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
              this.ruleForm.coverImage = URL.createObjectURL(file.raw);
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
