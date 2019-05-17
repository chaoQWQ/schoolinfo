
<template>
  <div style="margin-top:10px;">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item >后台管理</el-breadcrumb-item>
      <el-breadcrumb-item>比赛信息审核</el-breadcrumb-item>
    </el-breadcrumb>

    <!--列表-->
    <el-table size="small" :data="listData" highlight-current-row :border="true" v-loading="loading"  element-loading-text="拼命加载中" style="width: 100%;margin-top:20px;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="title" label="标题" width="200">
      </el-table-column>
      <el-table-column sortable prop="author" label="发布者" width="80">
      </el-table-column>
      <el-table-column sortable prop="scope" label="范围" width="80">
      </el-table-column>
      <el-table-column sortable prop="summary" label="简介" width="400">
      </el-table-column>
      <el-table-column sortable prop="updateTime" label="修改时间" width="150">

      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="getDetail(scope.$index, scope.row)">查看详情</el-button>
          <el-button size="mini" type="danger" @click="openAuditDialog(scope.row.id)">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
        <el-pagination
          @current-change="getDataList"
          :current-page="pageparm.currentPage"
          :page-size="pageparm.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="pageparm.total">
        </el-pagination>
    <!-- 详情界面 -->
    <el-dialog title="详情" :visible.sync="detailVisible" width="40%" @click="closeDialog">
      <div style="margin-left: 20px;" class=" desc_txt">
              <table>
                <tbody>
                  <tr>
                    <th>活动封面图片：</th>
                    <td><img style="width:150px;" :src="detailForm.coverImage"></td>
                  </tr>
                  <tr>
                    <th>比赛名称：</th>
                    <td>{{detailForm.title}}</td>
                  </tr>
                  <tr>
                    <th>比赛简介：</th>
                    <td>
                      {{detailForm.summary}}
                    </td>
                  </tr>

                  <tr>
                    <th>比赛等级：</th>
                    <td>
                      {{detailForm.scope}}
                    </td>
                  </tr>

                  <tr>
                    <th>比赛类型：</th>
                    <td>
                      {{detailForm.type}}
                    </td>
                  </tr>
                  <tr>
                    <th valign="top">联系人：</th>
                    <td>{{detailForm.contactName}}</td>
                  </tr>
                  <tr>
                    <th>手机号：</th>
                    <td>{{detailForm.contactTelNumber}}</td>
                  </tr>
                  <tr>
                    <th>比赛官网：</th>
                    <td>{{detailForm.webUrl}}</td>
                  </tr>
                  <tr>
                    <th>主办单位：</th>
                    <td>{{detailForm.organizer}}</td>
                  </tr>
                  <h3>活动详情:</h3>
                  <div id="art_content" v-html="detailForm.content"></div> 
                </tbody>
              </table>
            </div>
    </el-dialog>
    <el-dialog title="审核操作" :visible.sync="auditVisible" width="20%">
        <el-radio-group v-model="auditParam.auditOption">
          <el-radio style="margin-left:30px" :label="1">通过</el-radio>
          <el-radio :label="2">退回修改</el-radio>
          <!-- <el-radio :label="3">删除</el-radio> -->
        </el-radio-group>
        <el-input style="margin-top:20px;" type="textarea" :rows="2" placeholder="原因" v-model="auditParam.reason"></el-input>
        <div style="margin-top:20px;">
          <el-button @click="auditVisible=false;auditParam.auditOption=0;this.auditParam.reason='';" >取 消</el-button>
          <el-button type="primary" @click="submitAudit">确认</el-button>
        </div>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name:"infoAudit",
  data() {
    return {

      loading: false, 
      detailVisible: false, 
      auditVisible:false,
      title: '添加',
      listData: [], 
      auditParam:{
        auditOption:'',
        reason:'',
        id:0
      },
      
      // 详情页参数
      detailForm:{
          title: '',
          summary:'',
          scope:'',
          type:'',
          coverImage:'',
          contactName: '',
          contactTelNumber: '',
          webUrl: '',
          organizer: '',
          attachUrl:'',
          content:''
      },
      // 分页参数
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      }
    }
  },
    created(){
      this.getDataList(1);
    },
    methods: {
      getDataList(val){
        if(val){
          this.pageparm.currentPage=val;
        }
        this.$http.get("/api/back/getPendingAudit",{params:{
          pageNum:this.pageparm.currentPage,
          pageSize:this.pageparm.pageSize
        }}).then(resp=>{
          if(resp.data.code="000000"){
            this.listData=resp.data.data.pageList;
            this.pageparm.total=resp.data.data.total
          }
        })
      },
      openAuditDialog(id){
        this.auditVisible=true;
        this.auditParam.id=id;
      },
    
    getDetail: function(index, row) {
      this.detailForm.title=row.title;
      this.detailForm.summary=row.summary;
      this.detailForm.content=row.content;
      this.detailForm.scope=row.scope;
      this.detailForm.type=row.type;
      this.detailForm.coverImage=row.coverImage;
      this.detailForm.contactName=row.contactName;
      this.detailForm.contactTelNumber=row.contactTelNumber;
      this.detailForm.webUrl=row.webUrl;
      this.detailForm.organizer=row.organizer;
      this.detailVisible = true;
    },

    submitAudit(){
      this.$http.post("/api/back/audit",this.auditParam).then(resp=>{
        this.auditVisible=false;
        this.auditParam.auditOption=0;
        this.auditParam.reason=''
        if(resp.data.code=="000000"){
          this.$message.success("审核成功");
          this.getDataList(this.pageparm.currentPage);
        }else{
          this.$message.error(resp.data.message);
        }
      })
    },
    
    // 关闭编辑、增加弹出框
    closeDialog() {
      this.detailVisible = false
    }
  }
}
</script>
<style scoped >
.desc_txt table[data-v-197fdf96] {
    width: 440px;
    margin-top: 6px;
}
table[data-v-197fdf96] {
    border-spacing: 0;
    width: 100%;
    border-collapse: collapse;
}
.desc_txt table tbody tr[data-v-197fdf96] {
    margin-top: 20px;
}
.desc_txt th{
      height: 35px;
    line-height: 35px;
    font-size: 16px;
    width: 150px;
    vertical-align: top;
}
.desc_txt td[data-v-197fdf96] {
    height: 35px;
    line-height: 35px;
    font-size: 16px;
    color: #888;
    vertical-align: top;
}
</style>

 
 