<template>
  <div class="tableForm" id="alarm">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="操作人：">
        <el-input v-model="formData.operator"></el-input>
      </el-form-item>
      <el-form-item label="模块名称：">
        <el-input v-model="formData.mouduleName"></el-input>
      </el-form-item>
      <el-form-item label="发生时间：">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" v-model="formData.start"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2">-</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date"  v-model="formData.end"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="handleSelect">查询</el-button>
        <el-button @click="reset(formData)">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  export default{
    components: {ElButton, ElFormItem, ElInput, ElForm},
    name:"Alarm",
    data(){
        return {
            formData:{
              operator:"",
              mouduleName:"",
              start:'',
              end:''
            }
        }
    },
    methods:{
      handleSelect(){

      },
      reset(formData){
        this.$refs[formData].resetFields();
      }
    }
  }
</script>
<style>
  .el-form-item .el-date-picker{
    width: 100%;
  }
  .el-form-item__label{
    width:100px;
    text-align: right;
  }
  .el-form-item  .line{
    text-align: center;
  }
</style>
