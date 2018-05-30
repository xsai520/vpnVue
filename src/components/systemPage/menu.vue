<template>
  <div class="tableForm" id="menu">
    <div class="leftTree">
      <el-scrollbar class="page-component_scroll">
        <el-tree :data="treeData" class="filter-tree" node-key="id" ref="tree"
                 default-expand-all
                 highlight-current>
        </el-tree>
      </el-scrollbar>
    </div>
    <div class="rightTable">
      <el-form :inline="true" class="demo-form-inline" id="menuForm" :model="formData" ref="formData" >
        <el-form-item label="菜单名称" prop="menuName">
          <el-input v-model="formData.menuName" name="menuName"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单名称" prop="parentMenuName">
          <el-input v-model="formData.parentMenuName" name="parentMenuName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="handleSelect">查询</el-button>
          <el-button @click="reset('formData')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="tableBox">
        <el-button type="primary" @click="openDialog(1)">新增</el-button>
        <el-button type="primary" :disabled="editDisabled" @click="openDialog(2)">修改</el-button>
        <el-button type="primary" :disabled="viewDisabled" @click="view">查看</el-button>
        <el-button type="primary" :disabled="delDisabled" @click="cancel">删除</el-button>
        <el-table :data="tableData" border  @selection-change="handleSelectionChange">
          <el-table-column type="selection"></el-table-column>
          <el-table-column prop="menuName" label="菜单名称"></el-table-column>
          <el-table-column prop="parentMenuName" label="上级菜单"></el-table-column>
          <el-table-column prop="sort" label="排序"></el-table-column>
          <el-table-column prop="address" label="请求地址"></el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"
                       background
                       layout="prev, pager, next"
                       :total=total>
        </el-pagination>

      </div>
    </div>
    <el-dialog :title="menuTitle" :visible.sync="operateStatus" width="30%">
      <el-form class="demo-form-inline addForm" :model="operateData" :rules="rules" ref="addForm">
        <el-form-item label="菜单名称：" prop="menuName">
          <el-input v-model="operateData.menuName" name="menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单级别：" prop="menuLevel">
          <el-select v-model="operateData.menuLevel"  name="menuLevel" placeholder="请选择菜单级别">
            <el-option label="一级菜单" value="0"></el-option>
            <el-option label="二级菜单" value="1"></el-option>
            <el-option label="按钮菜单" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：" prop="sort">
          <el-input v-model="operateData.sort" name="sort"></el-input>
        </el-form-item>
        <el-form-item label="URL：" prop="url">
          <el-input v-model="operateData.url" name="url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="operateAndSave('addForm')" type="primary">确定</el-button>
        <el-button @click="reset('addForm')">重置</el-button>
      </div>
    </el-dialog>
    <el-dialog title="查看菜单信息" :visible.sync="viewStatus" width="30%">
      <div class="viewMenu">
        <el-row :gutter="15">
          <el-col :offset="2" :span="6" class="text">菜单名称：</el-col>
          <el-col :span="16">{{operateData.menuName}}</el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :offset="2" :span="6" class="text">菜单级别：</el-col>
          <el-col :span="16">{{operateData.menuLevel}}</el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :offset="2" :span="6" class="text">排序：</el-col>
          <el-col :span="16">{{operateData.sort}}</el-col>
        </el-row>
        <el-row :gutter="15">
          <el-col :offset="2" :span="6" class="text">URL：</el-col>
          <el-col :span="16">{{operateData.url}}</el-col>
        </el-row>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import ElDialog from "../../../node_modules/element-ui/packages/dialog/src/component";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import Base from  '../../assets/js/base';
  export default{
    components: {ElCol, ElRow, ElDialog, ElButton, ElTable, ElInput, ElFormItem, ElForm},
    name:"Menu",
    data(){
      let validateSort = (rule,value,callback) =>{
         //Number.isInteger(value)验证是否输入的是整数
         let reg=/^(?!0)(?:[0-9]{1,3}|1000)$/;

         if(!reg.test(value)){
             return callback(new Error("请输入1-1000的正整数"));
         }else{
             return callback();
         }
      };
      let validateUrl = (rule,value,callback) =>{
        let reg=/^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/;
        if(!reg.test(value)){
            return callback(new Error("请输入正确的url地址"));
        }else{
            return callback();
        }
      };
      return {
        treeData: [],
        formData:{
          menuName:"",
          parentMenuName:""
        },
        operateData:{
          menuName:"",
          menuLevel:"",
          sort:"",
          url:""
        },
        rules:{
          menuName:[
            {required:true,message:"请输入菜单名称",trigger:'blur'},
            {min:1,max:20,message:'输入长度不能超过20',trigger:'blur'}
          ],
          menuLevel:[
            {required:true,message:"请选择菜单级别",trigger:'change'}
          ],
          sort:[
            {
                validator:validateSort,trigger:'blur'
            }//只能输入1000以内的正整数
          ],
          url:[
            {required:true,message:"请输入url地址",trigger:'blur'},
            {min:1,max:40,message:"请输入长度不超过40的url地址",trigger:'blur'},
            {validator:validateUrl,trigger:'blur'}
          ]
        },
        tableData:[],
        total:0,
        delDisabled:true,
        editDisabled:true,
        viewDisabled:true,
        operateStatus:false,
        viewStatus:false,
        cancelStatus:false,
        selectData:[],
        menuTitle:""
      }
    },
    mounted:function () {
      this.renderTree();
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
      renderTable(page){
        let params = {
          pageSize:page?page:0,
          pageNumber:10,
          param :this.formData
        };
        this.$http.get("../../static/json/menuTable.json",params).then((res)=>{
          this.tableData = res.body.data;
          this.total = res.body.total;
        })
      },
      handleCurrentChange(currentPage){
        this.renderTable(currentPage-1)
      },
      reset(formData){
        this.$refs[formData].resetFields();
      },
      handleSelectionChange(arr){
        //根据数组长度来判断选择
        this.selectData=[];
        if(arr.length==0){
          this.delDisabled =  true;
          this.editDisabled = true;
          this.viewDisabled = true;
        }else if(arr.length==1){
          this.delDisabled = false;
          this.editDisabled = false;
          this.viewDisabled = false;
          this.selectData=arr;
        }else{
          this.delDisabled = false;
          this.editDisabled = true;
          this.viewDisabled = true;
        }
      },
      handleSelect(){
        this.formData = Base.getParams($("#menuForm"));
        this.renderTable()
      },
      openDialog(type){
        if(type==2){//表示点击的是修改,将selectData中的数据循环放到operateData中
          this.menuTitle="修改菜单信息";
          this.view();
        }else{
          this.menuTitle="新增菜单信息";
        }
        this.operateStatus=true;
      },
      operateAndSave(formName){
        this.$refs[formName].validate((valid)=>{
            if(valid){
              if(this.menuTitle=="新增菜单信息"){
                //调用新增的保存接口
              }else {
                //调用修改的保存接口
              }
              this.operateStatus=false;
              this.$refs[formName].resetFields();
            }
        })
      },
      view(){
        let obj = this.selectData[0];
        let key;
        for( key in this.operateData){
          this.operateData[key]=obj[key];
        }
        this.viewStatus=true;
      },
      cancel(){
        //删除
        this.$confirm('确认删除？','提示',{
          cancelButtonText:'取消',
          confirmButtonText:'确定',
          type:'warning'
        }).then(()=>{
            this.$message({
              type:'success',
              message:'删除成功！'
            })
        }).catch(()=>{
            this.$message({
              type:'info',
              message:'已取消删除'
            })
        })
      }
    }
  }
</script>
<style>
  #menu{
    background:#fff
  }
  #menu .leftTree{
    position: absolute;
    width: 200px;
    top: 0;
    bottom: 0;
    border-right: 1px solid #dcdcdc;
  }
  #menu .rightTable{
    margin-left: 200px;
  }
  .el-table{
    margin-top: 5px;
  }
  .el-pagination{
    float: right;
    margin-top:10px ;
  }
  /*设置滚动条*/
  .leftTree .page-component_scroll{
    height: 100%;
  }
  .leftTree .el-scrollbar__wrap{
    overflow-y: scroll !important;
    overflow-x:hidden !important;
  }
  .el-dialog .el-form-item__label{
    width: 100px;
  }
  .el-dialog .el-input{
    width: 250px;
  }
  .addForm .el-form-item__content{
    margin-left: 100px;
  }
  .viewMenu .text{
    text-align: right;
  }
</style>
