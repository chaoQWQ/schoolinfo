<template>
<div>
  <div v-if="userType=='cadmin'">
    <el-table size="small" :data="cListData" highlight-current-row :border="true" v-loading="loading"  element-loading-text="拼命加载中" style="width: 100%;margin-top:20px;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="title" label="标题" width="200">
      </el-table-column>
      <el-table-column sortable prop="scope" label="范围" width="80">
      </el-table-column>
      <el-table-column sortable prop="summary" label="简介" width="400">
      </el-table-column>
      <el-table-column sortable prop="updateTime" label="修改时间" width="150">
      </el-table-column>
      <el-table-column sortable prop="status" label="状态" width="80">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button v-if="scope.row.status=='DRAFT'" size="mini" @click="editCompInfo(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteCompInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="getDataList"
      :current-page="pageparm.currentPage"
      :page-size="pageparm.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pageparm.total">
    </el-pagination>
    <!-- 比赛信息编辑 -->
    <el-dialog title="信息修改" :close-on-click-modal="false" :show-close="false" :visible.sync="compEditVisible" width="40%">
      <el-form label-position="right" :model="compForm" :rules="crules" ref="compForm" label-width="120px" class="demo-compForm">
          <el-form-item label="比赛名称" prop="title">
            <el-input v-model="compForm.title"></el-input>
          </el-form-item>
          <el-form-item label="比赛简介" prop="summary">
            <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="compForm.summary"></el-input>
          </el-form-item>
          <el-form-item label="比赛等级">
            <el-radio-group v-model="compForm.scope">
              <el-radio label="校级"></el-radio>
              <el-radio label="市级"></el-radio>
              <el-radio label="国级"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="比赛类型" prop="type">
            <el-select v-model="compForm.type"  collapse-tags placeholder="请选择">
              <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.name"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="联系人" prop="contactName">
            <el-input v-model="compForm.contactName"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="contactTelNumber">
            <el-input v-model="compForm.contactTelNumber"></el-input>
          </el-form-item>
          <el-form-item label="比赛官网" prop="webUrl">
            <el-input v-model="compForm.webUrl"></el-input>
          </el-form-item>
          <el-form-item label="主办单位" prop="organizer">
            <el-input v-model="compForm.organizer"></el-input>
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
              <img v-if="compForm.coverImage" :src="compForm.coverImage" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>    
          <el-form-item label="比赛详情" prop="content" >
              <richEditor 
                v-model="compForm.content"
                :disabled="disabled">
              </richEditor>
          </el-form-item>
          
          <el-form-item>
            <el-button @click="compEditVisible=false;cleanform('compForm');" >取 消</el-button>
            <el-button type="danger" @click="submitCompForm('compForm')">提交修改</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
  <div v-if="userType=='sadmin'">
    <el-table size="small" :data="sListData" highlight-current-row :border="true" v-loading="loading"  element-loading-text="拼命加载中" style="width: 100%;margin-top:20px;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="title" label="标题" width="200">
      </el-table-column>
      <el-table-column sortable prop="summary" label="简介" width="400">
      </el-table-column>
      <el-table-column sortable prop="startTime" label="开始时间" width="150">
      </el-table-column>
      <el-table-column sortable prop="endTime" label="结束时间" width="150">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editSocietyInfo(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteSocietyInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="getSDataList"
      :current-page="pageparm.currentPage"
      :page-size="pageparm.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pageparm.total">
    </el-pagination>
    <el-dialog title="信息修改" :close-on-click-modal="false" :show-close="false" :visible.sync="societyEditVisible" width="40%">
      <el-form label-position="right" :model="actForm" :rules="srules" ref="actForm" label-width="120px" class="demo-ruleForm">
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
                value-format="yyyy-MM-dd HH:mm:ss"
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
            <el-button @click="societyEditVisible=false;cleanform('actForm');" >取 消</el-button>
            <el-button type="danger" @click="submitActForm('actForm')">修改</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>

  <div v-if="userType=='vadmin'">
    <el-table size="small" :data="vListData" highlight-current-row :border="true" v-loading="loading"  element-loading-text="拼命加载中" style="width: 100%;margin-top:20px;">
      <el-table-column align="center" type="selection" width="60">
      </el-table-column>
      <el-table-column sortable prop="title" label="标题" width="200">
      </el-table-column>
      <el-table-column sortable prop="serviceType" label="服务类型" width="80">
      </el-table-column>
      <el-table-column sortable prop="address" label="服务地点" width="150">
      </el-table-column>
      <el-table-column sortable prop="startTime" label="开始时间" width="100">
      </el-table-column>
      <el-table-column sortable prop="endTime" label="结束时间" width="100">
      </el-table-column>
      <el-table-column sortable prop="recruitNumbers" label="招募人数" width="40">
      </el-table-column>
      <el-table-column sortable prop="joinNumbers" label="已报名人数" width="40">
      </el-table-column>
      <el-table-column align="center" label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editVolunteerInfo(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteVolunteerInfo(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @current-change="getVDataList"
      :current-page="pageparm.currentPage"
      :page-size="pageparm.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="pageparm.total">
    </el-pagination>
    <el-dialog title="信息修改" :close-on-click-modal="false" :show-close="false" :visible.sync="volunteerEditVisible" width="40%">
      <el-form label-position="right" :model="vForm" :rules="vrules" ref="vForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="服务名称" prop="title">
            <el-input v-model="vForm.title"></el-input>
          </el-form-item>
          <el-form-item label="服务地点" prop="address">
            <el-input v-model="vForm.address"></el-input>
          </el-form-item>
          <el-form-item label="服务类别" prop="serviceType">
              <el-select v-model="vForm.serviceType"  placeholder="请选择">
                <el-option
                  v-for="item in vOptions"
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
            <el-button @click="volunteerEditVisible=false;cleanform('vForm');vForm.serviceTime.length=0;vForm.recruitTime.length=0;">取 消</el-button>
            <el-button type="danger" @click="submitVolunteerForm('vForm')">修改</el-button>
          </el-form-item>
        </el-form>
    </el-dialog>
  </div>
</div>

</template>

<script>
import richEditor from '../base/richTxtEdit'
import localData from '../../utils/local-data.js'
export default {
  name:'personalRealease',
  computed:{
    userType(){
      return this.$store.getters.currentUser.userType
    }
  },
  components:{richEditor},
  data(){
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
      loading: false, 
      cListData: [], 
      sListData: [], 
      vListData: [], 
      compEditVisible:false,
      societyEditVisible:false,
      volunteerEditVisible:false,
      disabled: false,
      options: this.$store.state.compTypeList,
      avatarfileList:[],
      attachFileList:[],
      compForm: {
        id:'',
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
      actForm: {
        id:'',
        title: '',
        summary:'',
        startTime:'',
        endTime:'',
        coverImage:'',
        address: '',
        organizer: '',
        content:'',
        validTime:[]
      },
      vOptions:localData.volunteerServiceTypeList,
      vForm: {
        id:'',
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
        serviceTime:[],
        recruitTime:[]
        },
      pageparm: {
        currentPage: 1,
        pageSize: 10,
        total: 10
      },
      crules: {
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
      },
      srules: {
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
      },
      vrules: {
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
            {required:true,message:'请选择服务时间',trigger:'blur'}
            // {validator:validateTime, trigger: 'blur'}
          ],
          description:[
            {required:true,message:'请输入详情描述',trigger:'blur'}
          ]
        }
    };
  },
    created(){
      let usertype= this.$store.getters.currentUser.userType
      if(usertype=='cadmin'){
        this.getDataList(1);
      }
      if(usertype=='sadmin'){
        this.getSDataList(1);
      }  
      if(usertype=='vadmin'){
        this.getVDataList(1);
      }    
    },
  methods: {
    getDataList(val){
        if(val){
          this.pageparm.currentPage=val;
        }
        this.$http.get("/api/compinfo/getMy",{params:{
          pageNum:this.pageparm.currentPage,
          pageSize:this.pageparm.pageSize,
          author:this.$store.getters.currentUser.username
        }}).then(resp=>{
          if(resp.data.code="000000"){
            this.cListData=resp.data.data.pageList;
            this.pageparm.total=resp.data.data.total
          }
        })
    },
    getSDataList(val){
        if(val){
          this.pageparm.currentPage=val;
        }
        this.$http.get("/api/society/getMy",{params:{
          pageNum:this.pageparm.currentPage,
          pageSize:this.pageparm.pageSize,
          author:this.$store.getters.currentUser.username
        }}).then(resp=>{
          if(resp.data.code="000000"){
            this.sListData=resp.data.data.pageList;
            this.pageparm.total=resp.data.data.total
          }
        })
    },
    getVDataList(val){
        if(val){
          this.pageparm.currentPage=val;
        }
        this.$http.get("/api/volunteer/getMy",{params:{
          pageNum:this.pageparm.currentPage,
          pageSize:this.pageparm.pageSize,
          author:this.$store.getters.currentUser.username
        }}).then(resp=>{
          if(resp.data.code="000000"){
            this.vListData=resp.data.data.pageList;
            this.pageparm.total=resp.data.data.total
          }
        })
    },
    editCompInfo(index,row){
      this.compForm.id=row.id
      this.compForm.content=row.content
      this.compForm.organizer=row.organizer
      this.compForm.webUrl=row.webUrl
      this.compForm.contactTelNumber=row.contactTelNumber
      this.compForm.contactName=row.contactName
      this.compForm.coverImage=row.coverImage
      this.compForm.type=row.type
      this.compForm.scope=row.scope
      this.compForm.summary=row.summary
      this.compForm.title=row.title
      this.compEditVisible=true;
    },
    editVolunteerInfo(index,row){
      console.log(row)
      this.vForm.id=row.id
      this.vForm.recruitNumbers=row.recruitNumbers
      this.vForm.serviceType=row.serviceType
      this.vForm.address=row.address
      this.vForm.recruitTime.push(row.recruitStartTime)
      this.vForm.recruitTime.push(row.recruitEndTime)
      this.vForm.serviceTime.push(row.startTime)
      this.vForm.serviceTime.push(row.endTime)
      this.vForm.coverImage=row.coverImage
      this.vForm.description=row.description
      this.vForm.title=row.title
      this.volunteerEditVisible=true;
    },
    editSocietyInfo(index,row){
      this.actForm.id=row.id
      this.actForm.summary=row.summary
      this.actForm.title=row.title
      this.actForm.address=row.address
      this.actForm.coverImage=row.coverImage
      this.actForm.organizer=row.organizer
      this.actForm.content=row.content
      this.actForm.validTime.push(row.startTime)
      this.actForm.validTime.push(row.endTime)

      this.societyEditVisible=true;
    },
    deleteCompInfo(id){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/api/compinfo/delete",{
            params:{
              id:id
            }
          }).then(resp=>{
            if(resp.data.code=="000000"){
              this.$message.success("删除成功");
              this.getDataList(this.pageparm.currentPage);
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
      
    },
    deleteSocietyInfo(id){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/api/society/delete",{
            params:{
              id:id
            }
          }).then(resp=>{
            if(resp.data.code=="000000"){
              this.$message.success("删除成功");
              this.getSDataList(this.pageparm.currentPage);
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
      
    },
    deleteVolunteerInfo(id){
      this.$confirm('此操作将永久删除该信息, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$http.delete("/api/volunteer/delete",{
            params:{
              id:id
            }
          }).then(resp=>{
            if(resp.data.code=="000000"){
              this.$message.success("删除成功");
              this.getVDataList(this.pageparm.currentPage);
            }
          })
        }).catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '已取消删除'
          // });          
        });
      
    },
      submitCompForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.submitComp().then(res=>{

              this.$http.post("/api/compinfo/update",this.compForm).then(resp=>{

                if(resp.data.code=="000000"){
                  this.cleanform("compForm");
                  this.compForm.coverImage='';
                  this.attachFileList=[];
                  this.compEditVisible=false;
                  this.$message.success("提交成功，等待审核");
                  this.getDataList(this.pageparm.currentPage);
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
              _this.compForm.attachUrl=JSON.stringify(res);
              resolve(res);
            }).catch(err=>{
              reject(err);
            })
          })
        }
        else if(this.attachFileList.length==0&&this.avatarfileList.length!=0){
            return new Promise(function(resolve,reject){
            _this.uploadAvatar().then(res=>{
              _this.compForm.coverImage=res;
              resolve(res);
            }).catch(err=>{
              reject(err);
            })
          })
        }
        else if(this.attachFileList.length!=0&&this.avatarfileList.length!=0){
          return new Promise(function(resolve,reject){
            Promise.all([_this.uploadAvatar(),_this.uploadAttach()]).then(res=>{
                _this.compForm.coverImage=res[0];
                _this.compForm.attachUrl=JSON.stringify(res[1]);
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
      submitVolunteerForm(formName) {
        console.log("提交1")
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log("提交2")
            this.vForm.startTime=this.vForm.serviceTime[0];
            this.vForm.endTime=this.vForm.serviceTime[1];
            this.vForm.recruitStartTime=this.vForm.recruitTime[0];
            this.vForm.recruitEndTime=this.vForm.recruitTime[1];
            // this.vForm.serviceType=this.vForm.serviceType.join(",")
            this.submitVolunteer().then(res=>{
              this.$http.post("/api/volunteer/update",this.vForm).then(resp=>{
                if(resp.data.code=="000000"){
                  this.cleanform("vForm");
                  this.vForm.coverImage='';
                  this.volunteerEditVisible=false;
                  this.$message.success("修改成功");
                  this.getVDataList(this.pageparm.currentPage);
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
      submitActForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.actForm.startTime=this.actForm.validTime[0];
            this.actForm.endTime=this.actForm.validTime[1];
            this.submitAct().then(res=>{
              this.$http.post("/api/society/update",this.actForm).then(resp=>{
                if(resp.data.code=="000000"){
                  this.cleanform("actForm");
                  this.actForm.coverImage='';
                  this.societyEditVisible=false;
                  this.$message.success("修改成功");
                  this.getSDataList(this.pageparm.currentPage);
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
              this.compForm.coverImage = URL.createObjectURL(file.raw);
              this.actForm.coverImage = URL.createObjectURL(file.raw);
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
