<template>
  <div style="margin-top:10px;">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <div>
      <el-button style="float:right;" size="small" type="primary" icon="el-icon-plus" @click="handleEdit()">添加</el-button>
    </div>
    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row v-loading="loading" border element-loading-text="拼命加载中" style="width: 100%;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="id" label="ID" width="300">
      </el-table-column>
      <el-table-column sortable prop="name" label="角色名" width="300">
      </el-table-column>
      <el-table-column sortable prop="description" label="描述" width="300">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="300">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index, scope.row)">删除</el-button>
          <el-button size="mini" type="success" @click="menuAccess(scope.$index, scope.row)">菜单权限</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页组件 -->
    <el-pagination
      @current-change="getdata"
      :current-page="pageparm.currentPage"
      :page-size="pageparm.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pageparm.total">
    </el-pagination>
    <!-- 编辑界面 -->
    <el-dialog :title="title" :visible.sync="editFormVisible" width="30%" @click='closeDialog("edit")'>
      <el-form label-width="120px" :model="editForm" ref="editForm" :rules="rules">

        <el-form-item label="角色名" prop="name">
          <el-input size="small" v-model="editForm.name" auto-complete="off" placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="description">
          <el-input size="small" v-model="editForm.description" auto-complete="off" placeholder="请输入角色描述"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("edit")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="submitForm('editForm')">保存</el-button>
      </div>
    </el-dialog>
    <!-- 菜单权限 -->
    <el-dialog title="菜单权限" :visible.sync="menuAccessshow" width="30%" @click='closeDialog("perm")'>
      <div style="height:300px;overflow-x: hidden;">
        <el-table size="small" ref="permissionSelect" :data="permissionList" element-loading-text="拼命加载中" style="width: 100%;">
          <el-table-column align="center" type="selection" width="60">
          </el-table-column>
          <el-table-column sortable prop="name" label="权限名" width="200">
        </el-table-column>
      </el-table>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click='closeDialog("perm")'>取消</el-button>
        <el-button size="small" type="primary" :loading="loading" class="title" @click="menuPermSave">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  data() {
    return {
      permissionList:[],
      nshow: true, //switch开启
      fshow: false, //switch关闭
      loading: false, //是显示加载
      editFormVisible: false, //控制编辑页面显示与隐藏
      menuAccessshow: false, //控制数据权限显示与隐藏
      title: '添加',
      editForm: {
        id:0,
        name: '',
        description:''
      
      },
      // rules 表单验证
      rules: {
        description: [
          { required: true, message: '输入角色描述', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入角色名称', trigger: 'blur' }
        ]
      },
      formInline: {
        page: 1,
        limit: 10,
        varLable: '',
        varName: '',
        token: localStorage.getItem('logintoken')
      },
      // 删除
      seletedata: {
        ids: '',
        token: localStorage.getItem('logintoken')
      },
      userparm: [], //搜索权限
      listData: [], //用户数据
      // 数据权限
      RoleRight: [],
      RoleRightProps: {
        children: 'children',
        label: 'name'
      },
      // 选中
      checkmenu: [],
      //参数role
      saveroleId: '',
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
  
  /**
   * 数据发生改变
   */

  watch: {},

  /**
   * 创建完毕
   */

  created() {
    this.getdata()
  },

  /**
   * 里面的方法只有被调用才会执行
   */

  methods: {
    // 获取角色列表
    getdata() {
      this.$http.get('/api/back/getRoleList',{params:{
          pageNum:this.pageparm.currentPage,
          pageSize:this.pageparm.pageSize
        }}).then(resp=>{
          if(resp.data.code="000000"){
            this.loading = false
            this.listData=resp.data.data.pageList;
            this.pageparm.total=resp.data.data.total
          }
        })


      
    },

    // 搜索事件
    search() {
      this.getdata()
    },
    //显示编辑界面
    handleEdit: function(index, row) {
      this.editFormVisible = true
      if (row != undefined && row != 'undefined') {
        this.title = '修改'
        this.editForm.id = row.id
        this.editForm.name = row.name
        this.editForm.description = row.description
      } else {
        this.title = '添加'
        this.editForm.id=0
        this.editForm.name = ''
        this.editForm.description = ''
      }
    },
    // 编辑、增加页面保存方法
    submitForm(editData) {
      this.$refs[editData].validate(valid => {
        if (valid) {
          this.$http.post('/api/back/addOrUpdateRole',this.editForm).then(resp=>{
            if(resp.data.code=='000000'){
              this.$message.success("保存成功")
              this.getdata()
              this.editFormVisible=false
            }
          })
        } else {
          this.$message.error("请先正确填写信息")
        }
      })
    },
    // 删除角色
    deleteUser(index, row) {
      this.$confirm('确定要删除吗?', '信息', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$http.delete('/api/back/deleteRole',{
            params:{
              id:row.id
            }
          })
            .then(res => {
              if (res.data.code=='000000') {
                this.$message({
                  type: 'success',
                  message: '角色已删除！'
                })
                this.getdata()
              } else {
                this.$message({
                  type: 'info',
                  message: res.data.message
                })
              }
            })
            .catch(err => {
              this.loading = false
              this.$message.error('角色删除失败，请稍后再试！')
            })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 获取权限列表
    menuAccess: function(index, row) {
      this.menuAccessshow = true
      this.saveroleId = row.id
      this.$http.get('/api/back/getPermissionList').then(resp=>{
        this.permissionList=resp.data.data
      })
    },

    // 菜单权限-保存
    menuPermSave() {
      this.$http.post('/api/back/menuPermSave',{
        roleId:this.saveroleId,
        permissions:this.$refs.permissionSelect.selection
      }).then(resp=>{
        if(resp.data.code=='000000'){
          this.$message.success("保存成功")
          this.menuAccessshow = false
        }
      })
    },
    // 关闭编辑、增加弹出框
    closeDialog(dialog) {
      if (dialog == 'edit') {
        this.editFormVisible = false
      } else if (dialog == 'perm') {
        this.menuAccessshow = false
      }
    }
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

 