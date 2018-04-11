<template>
<div class="tableForm" id="menu">
  <div class="leftTree">
    <el-tree :data="treeData" class="filter-tree" default-expand-all></el-tree>
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
        <el-table-column  type="selection"></el-table-column>
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
  export default{
    components: {ElButton, ElTable, ElInput, ElFormItem, ElForm},
    name:"Menu",
      data(){
        return {
          treeData: [{
            id: 1,
            label: '一级 1',
            children: [{
              id: 4,
              label: '二级 1-1',
              children: [{
                id: 9,
                label: '三级 1-1-1'
              }, {
                id: 10,
                label: '三级 1-1-2'
              }]
            }]
          }, {
            id: 2,
            label: '一级 2',
            children: [{
              id: 5,
              label: '二级 2-1'
            }, {
              id: 6,
              label: '二级 2-2'
            }]
          }, {
            id: 3,
            label: '一级 3',
            children: [{
              id: 7,
              label: '二级 3-1'
            }, {
              id: 8,
              label: '二级 3-2'
            }]
          }],
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
</style>
