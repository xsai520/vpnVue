<template>
  <div class="tableForm" id="user">
    <el-form :inline="true" class="data-form-inline">
      <el-form-item label="账号">
        <el-input v-model="formData.account"></el-input>
      </el-form-item>
      <el-form-item label="姓名">
        <el-input v-model="formData.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary">查询</el-button>
      </el-form-item><br/>
      <el-form-item label="所属单位">
        <el-input v-model="formData.organization"></el-input>
      </el-form-item>
      <el-form-item label="所属角色">
        <el-input v-model="formData.role"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tableBox">
      <div class="btns">
        <el-button type="primary">新增</el-button>
        <el-button type="primary">批量删除</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button>
      </div>
      <el-table border style="width: 100%">
        <el-table-column></el-table-column>
        <el-table-column label="账号"></el-table-column>
        <el-table-column label="姓名"></el-table-column>
        <el-table-column label="所属单位"></el-table-column>
        <el-table-column label="所属角色"></el-table-column>
        <el-table-column label="联系方式"></el-table-column>
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
    name:"User",
    data(){
        return {
            formData:{
              account:"",
              name:"",
              organization:"",
              role:""
            }
        }
    }
  }
</script>
