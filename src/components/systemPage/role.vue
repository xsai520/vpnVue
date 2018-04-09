<template>
  <div class="tableForm" id="role">
    <el-form :inline="true" class="data-form-inline">
      <el-form-item label="角色名称">
        <el-input v-model="formData.roleName"></el-input>
      </el-form-item>
      <el-form-item label="上级角色">
        <el-input v-model="formData.parentRole"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tableBox">
      <div class="btns">
        <el-button type="primary">新增</el-button>
        <el-button type="primary">批量删除</el-button>
      </div>
      <el-table border>
        <el-table-column></el-table-column>
        <el-table-column label="角色名称"></el-table-column>
        <el-table-column label="上级角色"></el-table-column>
        <el-table-column label="权限内容"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";
  export default{
    components: {ElTable, ElInput, ElFormItem, ElForm},
    name:"Role",
    data(){
        return {
            formData:{
                roleName:"",
               parentRole:""
            }
        }
    }
  }
</script>
