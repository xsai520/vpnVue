<template>
  <div class="tableForm" id="organization">
    <div class="leftTree">
      <el-tree :data="treeData" class="filter-tree" node-key="id" ref="tree"
               default-expand-all highlight-current></el-tree>
    </div>
    <div class="rightTable">
      <el-form  :inline="true" class="demo-form-inline" id="orgForm" :model="formData" ref="formData">
        <el-form-item label="机构名称" prop="deptName">
          <el-input v-model="formData.deptName" name="deptName"></el-input>
        </el-form-item>
        <el-form-item label="机构编码" prop="deptCode">
          <el-input v-model="formData.deptCode" name="deptCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="handleSelect">查询</el-button>
          <el-button @click="reset('formData')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="tableBox">
        <el-button type="primary" @click="openOperateModal(1)">新增</el-button>
        <el-button type="primary" :disabled="editDisabled" @click="openOperateModal(2)">修改</el-button>
        <el-button type="primary" :disabled="delDisabled" @click="cancel">删除</el-button>
        <el-button type="primary" @click="importFile">导入</el-button>
        <el-button type="primary" @click="exportFile">导出</el-button>
        <el-table :data="tableData" border @selection-change="handleSelectionChange">
          <el-table-column prop="id" type="selection"></el-table-column>
          <el-table-column prop="deptName" label="机构名称"></el-table-column>
          <el-table-column prop="deptCode" label="机构编码"></el-table-column>
          <el-table-column prop="deptAlias" label="机构别名 "></el-table-column>
          <el-table-column prop="parentId" label="上级机构"></el-table-column>
          <el-table-column prop="describe" label="描述"></el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog :title="orgTitle" :visible.sync="operateStatus" width="30%" @close="clearAll('operateData')">
      <el-form class="demo-form-inline operateForm" :model="operateData" :rules="rules" ref="operateData">
        <el-form-item label="机构名称：" prop="deptName">
          <el-input v-model="operateData.deptName" name="deptName"></el-input>
        </el-form-item>
        <el-form-item label="机构别名：" prop="deptAlias">
          <el-input v-model="operateData.deptAlias"></el-input>
        </el-form-item>
        <el-form-item label="机构代码：" prop="deptCode">
          <el-input v-model="operateData.deptCode"></el-input>
        </el-form-item>
        <el-form-item label="上级机构：" prop="parentName">
          <el-input v-model="operateData.parentName"></el-input>
          <input type="hidden" v-model="operateData.parentId"/>
        </el-form-item>
        <el-form-item label="描述：" prop="describe">
          <el-input type="textarea" v-model="operateData.describe"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="saveOperateModal('operateData')" type="primary">确定</el-button>
        <el-button @click="closeDialog('operateData')">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";
  import Base from  '../../assets/js/base';
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  export default{
    components: {ElInput, ElDialog, ElTable, ElFormItem, ElForm},
    name:"Organization",
    data(){
        return {
          treeData: [],
            formData:{
              deptName:"",
              deptCode:""
            },
            tableData:[],
            selectData:[],
            selectIds:[],
            total:0,
            delDisabled:true,
            editDisabled:true,
            orgTitle:'新增组织机构',
            operateStatus:false,//标志弹框是否展示
            operateData:{ //新增或者修改的弹框数据
              deptName:"",
              deptAlias:"",
              deptCode:"",
              parentId:"",
              parentName:"",
              describe:""
            },
          rules:{
            deptName:[
              {required:true,message:"请输入机构名称",trigger:"blur"},
              {min:1,max:40,message:"输入的长度不能超过40",trigger:'blur'},//需要加个中英文数字下划线的判断
              {validator:Base.validateForm,trigger:'blur',
                message:'只允许中英文、数字、下划线',reg: /^[\u4E00-\u9FA5a-zA-Z0-9_]+$/}
            ],
            deptAlias:[
              {min:1,max:40,message:"输入的长度不能超过40",trigger:'blur'},
              {validator:Base.validateForm,trigger:'blur',message:'只允许字母、数字、下划线',reg: /^\w+$/}
            ],
            deptCode:[
              {required:true,message:"请输入机构代码",trigger:"blur"},
              {min:1,max:40,message:"输入的长度不能超过20",trigger:'blur'},//需要加个中英文数字下划线的判断
              {validator:Base.validateForm,trigger:'blur',message:'只允许字母、数字、下划线',reg: /^\w+$/}
            ],
            describe:[
              {min:1,max:128,trigger:'blur',message:'输入的长度最多不能超过128'}
            ]
          }
        }
    },
    mounted:function () {
      this.renderTree()
    },
    methods:{
      renderTree(){
          this.$http.get("../../static/json/menu.json").then((res)=>{
            let data = res.body.data;
            let obj = Base.arrayToMap(data);
            this.treeData = Base.mapToArray(obj,0);
        }).then(()=>{
            this.$refs.tree.setCurrentKey(this.treeData[0].id);
            this.renderTable();
          })
      },
      renderTable(page){ //获取表格
        let params = {
          pageSize:page?page:0,
          pageNumber:10,
          param :this.formData
        };
        this.$http.get("../../static/json/orgTable.json",params).then((res)=>{
          this.tableData = res.body.data;
          this.total = res.body.total;
        })
       },
      handleSelect(){ //查询
          this.formData = Base.getParams($("#orgForm"));
          this.renderTable()
      },
      reset(formData){ //重置
          this.$refs[formData].resetFields();
      },
      handleCurrentChange(currentPage){//分页改变
        this.renderTable(currentPage-1)
      },
      handleSelectionChange(arr){
         //切换checkbox的选择
        this.selectData=[];
        this.selectIds=[];
        arr.forEach((val)=>{
          this.selectIds.push(val.id)
        });
        //根据数组长度来判断选择
        if(arr.length==0){
          this.delDisabled =  true;
          this.editDisabled = true;
        }else if(arr.length==1){
          this.delDisabled =  false;
          this.editDisabled = false;
          this.selectData=arr;
        }else{
          this.delDisabled =  false;
          this.editDisabled = true;
        }
      },
      //打开新增或修改
      openOperateModal(type){
        if(type==2){//修改
          this.orgTitle="修改组织机构";
          let obj = this.selectData[0];
          for(let key in this.operateData){
            this.operateData[key]=obj[key];
          }
        }else{
          Base.clearObj(this.operateData);
          //this.reset('operateData');
          this.orgTitle="新增组织机构";
        }
        this.operateStatus=true;
      },
      closeDialog(){
        this.operateStatus=false;
      },
      //保存新增或修改
      saveOperateModal(formName){
        this.$refs[formName].validate((valid)=>{
            if(valid){
              if(this.orgTitle=="新增组织机构"){
                //调用新增的保存接口
              }else {
                //调用修改的保存接口
              }
            }
        })
      },
      //删除
      cancel(){
          this.$confirm('确认删除？','提示',{
            cancelButtonText:'取消',
            confirmButtonText:'确定',
            type:'warning'
          }).then(()=>{
            //调用接口
              this.$message({
                type:'success',
                message:"删除成功！"
              })
          }).catch(()=>{
              this.$message({
                type:'info',
                message:'已取消删除'
              })
          })
      },
      //导入
      importFile(){

      },
      //导出
      exportFile(){
          debugger
          let ids = this.selectIds.join(",");//checkbox选中的id this.selectIds
          let fieldId = this.$refs.tree.getCurrentKey();//树选中的id
          let params = Base.getParams($("#orgForm"));//模糊查询表单值
        window.location.href = encodeURI(encodeURI(path+"/departController/exporyDepart?deptIds="+ids+"&fieldId="+fieldId+"&deptName="+(params.deptName?params.deptName:'')+"&deptCode="+(params.deptCode?params.deptCode:'')));
      },
      clearAll(formData){
        this.$refs[formData].clearValidate();
        Base.clearObj(this.operateData);
      }
    }
  }
</script>
<style>
  #organization{
    background:#fff
  }
  #organization .leftTree{
    position: absolute;
    width: 200px;
    top: 0;
    bottom: 0;
    border-right: 1px solid #dcdcdc;
  }
  #organization .rightTable{
    margin-left: 200px;
  }
  .el-table{
    margin-top: 5px;
  }
  .el-pagination{
    float: right;
    margin-top:10px ;
  }
  /*设置表单框长度*/
  .el-dialog .el-input,
  .el-dialog .el-textarea{
    width:250px;
  }
  /*表单label长度*/
  .el-dialog .el-form-item__label{
    width: 100px;
  }
  .operateForm .el-form-item__content{
    margin-left: 100px;
  }
</style>
