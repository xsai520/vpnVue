<template>
  <div class="tableForm" id="operate">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="登录用户：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="客户端IP：">
        <el-input></el-input>
      </el-form-item>
      <el-form-item label="结果：">
        <el-select v-model="formData.result" placeholder="">
          <el-option label="全部" value=""></el-option>
          <el-option label="成功" value="1"></el-option>
          <el-option label="失败" value="0"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="发生时间：">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" v-model="formData.start"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"> --</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date"  v-model="formData.end"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  export default{
    components: {ElInput, ElFormItem, ElForm},
    name:"Operate",
    data(){
        return {
            formData:{
              username:"",
              ip:"",
              result:"",
              startTime:"",
              endTime:""
            }
        }
    }
  }
</script>
