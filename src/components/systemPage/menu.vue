<template>
<div class="tableForm" id="menu">
  <div class="leftTree">
    <el-scrollbar class="page-component_scroll">
      <el-tree :data="treeData" class="filter-tree" default-expand-all></el-tree>
    </el-scrollbar>
  </div>
  <div class="rightTable">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="菜单名称">
        <el-input v-model="formData.menuName"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单名称">
        <el-input v-model="formData.parentMenuName"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tableBox">
      <el-button type="primary">新增</el-button>
      <el-button type="primary">删除</el-button>
      <el-button type="primary">修改</el-button>
      <el-button type="primary">查看</el-button>
      <el-table :data="tableData" border >
        <el-table-column type="selection"></el-table-column>
        <el-table-column prop="menuName" label="菜单名称"></el-table-column>
        <el-table-column prop="parentMenuName" label="上级菜单"></el-table-column>
        <el-table-column prop="sort" label="排序"></el-table-column>
        <el-table-column prop="address" label="请求地址"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>

    </div>
  </div>
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
          tableData:[
            {
                id:1,
                menuName:"df",
                parentMenuName:"ddd",
                sort:1,
                address:"江苏南京"
            }
          ]
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
        renderTable(){

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
  .page-component_scroll{
    height: 100%;
  }
  .el-scrollbar__wrap{
    overflow-y: scroll !important;
    overflow-x:hidden !important;
  }
</style>
