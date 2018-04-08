<template>
  <div class="tableForm" id="operate">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="登录用户：">
        <el-input v-model="formData.username"></el-input>
      </el-form-item>
      <el-form-item label="客户端IP：">
        <el-input v-model="formData.ip"></el-input>
      </el-form-item>
      <el-form-item label="结果：">
        <el-select v-model="formData.result" placeholder="">
          <el-option label="全部" value=""></el-option>
          <el-option label="成功" value="1"></el-option>
          <el-option label="失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发生时间：">
        <el-date-picker type="date" v-model="formData.startTime"></el-date-picker>
      </el-form-item>
      <el-form-item label="结束时间：">
        <el-date-picker type="date"  v-model="formData.endTime"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary">查询</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tableBox">
      <el-button type="primary">导出Excel</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="登录名"></el-table-column>
        <el-table-column prop="ip" label="客户端IP"></el-table-column>
        <el-table-column prop="moduleId" label="模块名"></el-table-column>
        <el-table-column prop="accessTime" label="访问时间"></el-table-column>
        <el-table-column prop="accessResult" label="操作结果"></el-table-column>
      </el-table>
      <el-pagination
        background
        layout="prev, pager, next"
        :total="100">
      </el-pagination>
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
    name:"Operate",
    data(){
        return {
            formData:{
              username:"",
              ip:"",
              result:"",
              startTime:"",
              endTime:""
            },
            tableData:[]
        }
    },
    created(){
        this.$http.get("../../static/json/operate.json").then((res)=>{
          this.tableData = res.body;
        })
    }
  }
</script>
<style>
  .tableBox .el-table{
    top:5px;
  }
  .el-pagination {
    margin-top: 10px;
    float: right;
  }
</style>
