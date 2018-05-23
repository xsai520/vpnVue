<template>
  <div class="tableForm" id="menu">
    <div class="leftTree">
      <el-scrollbar class="page-component_scroll">
        <el-tree :data="treeData" class="filter-tree"
                 default-expand-all
                 highlight-current>

        </el-tree>
      </el-scrollbar>
    </div>
    <div class="rightTable">
      <el-form :inline="true" class="demo-form-inline" id="menuForm" ref="validateForm">
        <el-form-item label="菜单名称">
          <el-input v-model="formData.menuName"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单名称">
          <el-input v-model="formData.parentMenuName"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="handleSelect">查询</el-button>
          <el-button @click="reset('validateForm')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="tableBox">
        <el-button type="primary" @click="addStatus=true">新增</el-button>
        <el-button type="primary" :disabled="delDisabled">删除</el-button>
        <el-button type="primary" :disabled="editDisabled">修改</el-button>
        <el-button type="primary" :disabled="viewDisabled">查看</el-button>
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
    <el-dialog title="新增菜单信息" :visible.sync="addStatus" width="30%">
      <el-form class="demo-form-inline" ref="addForm">
        <el-form-item label="菜单名称：" >
          <el-input v-model="operateData.menuName" name="menuName"></el-input>
        </el-form-item>
        <el-form-item label="菜单级别：">
          <el-select v-model="operateData.menuLevel"  name="menuLevel" placeholder="请选择菜单级别">
            <el-option label="一级菜单" value="0"></el-option>
            <el-option label="二级菜单" value="1"></el-option>
            <el-option label="按钮菜单" value="2"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="排序：">
          <el-input v-model="operateData.sort" name="sort"></el-input>
        </el-form-item>
        <el-form-item label="URL：">
          <el-input v-model="operateData.url" name="url"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="add" type="primary">确定</el-button>
        <el-button @click="addStatus=false">取消</el-button>
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
  import Base from  "@/assets/js/base.js"
  export default{
    components: {ElButton, ElTable, ElInput, ElFormItem, ElForm},
    name:"Menu",
    data(){
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
        tableData:[],
        total:0,
        delDisabled:true,
        editDisabled:true,
        viewDisabled:true,
        addStatus:false,
        editStatus:false,
        viewStatus:false,
        cancelStatus:false
      }
    },
    mounted:function () {
      this.renderTree();
      this.renderTable();
    },
    methods:{
      renderTree(){
        this.$http.get("../../static/json/menu.json").then((res)=>{
          let data = res.body.data;
          let obj = Base.arrayToMap(data);
          this.treeData = Base.mapToArray(obj,0);
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
      reset(validateForm){
        this.$refs[validateForm].resetFields();
      },
      handleSelectionChange(arr){
        //根据数组长度来判断选择
        if(arr.length==0){
          this.delDisabled =  true;
          this.editDisabled = true;
          this.viewDisabled = true;
        }else if(arr.length==1){
          this.delDisabled = false;
          this.editDisabled = false;
          this.viewDisabled = false;
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
      add(){

      },
      edit(){

      },
      view(){

      },
      cancel(){

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
    width: 90px;
  }
  .el-dialog .el-input{
    width: 250px;
  }
</style>
