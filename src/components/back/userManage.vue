<template>
  <div style="margin-top:10px;">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索 -->
    <el-form :inline="true" :model="queryForm" class="user-search">
      <el-form-item label="搜索：">
        <el-input size="small" v-model="queryForm.userName" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-select v-model="queryForm.userType"  collapse-tags placeholder="用户类型">
          <el-option label="不限" value="bx"></el-option>
          <el-option v-for="item in userTypeOptions" :key="item.id" :label="item.description" :value="item.name"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button size="small" type="primary" icon="el-icon-search" @click="getUserList">搜索</el-button>
        <el-button size="small" type="primary" icon="el-icon-plus" @click="editVisible=true;">添加</el-button>
      </el-form-item>
    </el-form>
    <!--列表-->
    <el-table size="small" :data="userListData" highlight-current-row :border="true"  element-loading-text="拼命加载中" style="width: 100%;margin-top:20px;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="username" label="用户名" width="80">
      </el-table-column>
      <el-table-column sortable prop="realname" label="真实姓名" width="80">
      </el-table-column>
      <el-table-column sortable prop="gender" label="性别" width="80">
        <template slot-scope="scope">
          {{scope.row.gender==1?'男':scope.row.gender==0?'女':'未知'}}
        </template>
      </el-table-column>
      <el-table-column sortable prop="mobile" label="手机号" width="200">
      </el-table-column>
      <el-table-column sortable prop="email" label="邮箱" width="200">
      </el-table-column>
      <el-table-column sortable prop="userType" label="用户类型" width="200">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" type="success" @click="openAuthorizationDialog(scope.row)">授权</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @current-change="getUserList"
      :current-page="queryForm.currentPage"
      :page-size="queryForm.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="queryForm.total">
    </el-pagination>

    <el-dialog title="授权操作" :visible.sync="authorVisible" width="15%">
         <el-select v-model="authorParam.userType"  collapse-tags placeholder="用户类型">
          <el-option v-for="item in userTypeOptions" :key="item.id" :label="item.description" :value="item.name"></el-option>
        </el-select>
        <div style="margin-top:20px;">
          <el-button @click="authorVisible=false;" >取 消</el-button>
          <el-button type="primary" @click="submitAuthor">确认</el-button>
        </div>
    </el-dialog>
    <el-dialog title="用户添加" :close-on-click-modal="false" :show-close="false" :visible.sync="editVisible" width="40%" >
      <el-form label-position="right" :model="userForm" :rules="rules" ref="userForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="用户名:"  prop="username">
            <el-col :span="8">
            <el-input v-model="userForm.username" autocomplete="off"></el-input>
            </el-col>
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
          <el-form-item label="QQ:" >
            <el-col :span="8">
              <el-input v-model="userForm.qq"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="用户类型" prop="userType">
            <el-select v-model="userForm.userType"  collapse-tags placeholder="">
              <el-option v-for="item in userTypeOptions" :key="item.id" :label="item.description" :value="item.name"></el-option>
            </el-select>
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
            <el-button @click="editVisible=false;cleanform('userForm')" >取 消</el-button>
            <el-button type="danger" @click="addUser('userForm')">保存</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</template>
<script>
export default {
  name:'userManage',
  data(){
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
    return{
      authorParam:{
        id:0,
        userType:''
      },
      editVisible:false,
      authorVisible:false,
      userTypeOptions:[],
      queryForm: {
        userName:'',
        userType:'',
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      userForm:{
        // id:0,
        username:'',
        realname:'',
        birthday:'',
        gender:'',
        mobile:'',
        qq:'',
        userType:'',
        privacy:'',
      },
      userListData:[],
      rules: {
          username: [
            {
              required: true,
              validator: checkUserName,
              trigger: "blur"
            },
            {
              min: 5,
              max: 30,
              message: "长度在 5 到 16 个字符"
            },
            {
              pattern: /^[a-zA-Z]\w{1,16}$/,
              message: "以字母开头，长度在5-16之间， 只能包含字符、数字和下划线"
            }
          ],
          realname: [
            { required: true, message: '请输入真实姓名', trigger: 'blur' }
          ],

          privacy:[
            {required:true,message:'请选择是否公开',trigger:'blur'}
          ],
          userType:[
            {required:true,message:'请选择用户类型',trigger:'blur'}
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
  methods:{
    getUserTypeList(){
      this.$http.get('/api/back/getUserTypeList').then(resp=>{
        if(resp.data.code=="000000"){
          this.userTypeOptions=resp.data.data
        }
      })
    },
    getUserList(){
      console.log(this.queryForm)
      this.$http.post('/api/back/getUserList',this.queryForm).then(resp=>{
        if(resp.data.code=="000000"){
          this.userListData=resp.data.data.pageList
        }
      })
    },
    addUser(formName){
      this.$refs[formName].validate((valid) => {
          if (valid) {
              this.$http.post("/api/back/addUser",this.userForm).then(resp=>{
                      if(resp.data.code=="000000"){
                        this.$message.success('添加成功')
                        this.cleanform("userForm")
                        this.getUserTypeList()
                      }else{
                        this.$message.error(resp.data.message);
                      }
                  })
          } else {
            this.$message.error("请正确填写完信息")
            return false;
          }
        });
    },
    deleteUser(id){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/api/back/deleteUser",{
            params:{
              id:id
            }
          }).then(resp=>{
            if(resp.data.code=="000000"){
              this.$message.success("删除成功");
              this.getUserList();
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
    },
    openAuthorizationDialog(row){
      this.authorParam.id=row.id
      this.authorParam.userType=row.userType
      this.authorVisible=true
    },
    submitAuthor(){
      this.$http.get('/api/back/userAuthor',{
        params:{
          id:this.authorParam.id,
          userType:this.authorParam.userType
        }
      }).then(resp=>{
            if(resp.data.code=="000000"){
              this.$message.success("授权成功");
              this.getUserList();
            }
      })
    },
    cleanform(ref) {
      this.$refs[ref].clearValidate();
      this.$refs[ref].resetFields();
    },
  },
  created(){
    this.getUserTypeList()
    this.getUserList()
  }
}
</script>
<style scoped>
.user-search {
  margin-top: 20px;
}
.userRole {
  width: 100%;
}
</style>
