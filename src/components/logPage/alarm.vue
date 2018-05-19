<template>
  <div class="tableForm" id="alarm">
    <el-form :inline="true" class="demo-form-inline" id="alarmForm" ref="validateForm">
      <el-form-item label="操作人：">
        <el-input v-model="formData.operator" name="operation"></el-input>
      </el-form-item>
      <el-form-item label="模块名称：">
        <el-input v-model="formData.moduleName" name="module"></el-input>
      </el-form-item>
      <el-form-item label="发生时间：">
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date" v-model="formData.start" name="startTime"></el-date-picker>
          </el-form-item>
        </el-col>
        <el-col class="line" :span="2"> --</el-col>
        <el-col :span="11">
          <el-form-item>
            <el-date-picker type="date"  v-model="formData.end" name="endTime"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button  type="primary" @click="handleSelect">查询</el-button>
        <el-button @click="reset('validateForm')">重置</el-button>
      </el-form-item>
    </el-form>
    <div class="tableBox">
      <el-button type="primary" @click="exportLog()">日志导出</el-button>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="username" label="操作人"></el-table-column>
        <el-table-column prop="createTime" label="发生时间"></el-table-column>
        <el-table-column prop="module" label="模块名称"></el-table-column>
        <el-table-column prop="alarmContent" label="告警内容"></el-table-column>
      </el-table>
      <el-pagination @current-change="handleCurrentChange"
                     background
                     layout="prev, pager, next"
                     :total= total>
      </el-pagination>
    </div>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElInput from "../../../node_modules/element-ui/packages/input/src/input";
  import ElButton from "../../../node_modules/element-ui/packages/button/src/button";
  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";
  import Base from  "@/assets/js/base.js"

  export default{
    components: { ElTable, ElButton,ElInput,ElFormItem, ElForm},
    name:"Alarm",
    data(){
        return {
            formData:{
              operator:"",
              moduleName:"",
              start:'',
              end:''
            },
          tableData:[],
          total:0
        }
    },
    created(){
      this.renderTable()
    },
    methods:{
      renderTable(page){
        let params = {
          pageSize:page?page:0,
          pageNumber:10,
          param :this.formData
        };
        this.$http.get("../../static/json/alarm.json",params).then((res)=>{
          this.tableData = res.body;
          this.total = this.tableData.length;
        })
      },
      handleSelect(){
        this.formData=Base.getParams($("#alarmForm"));
        this.renderTable();
      },
      reset(validateForm){
         //this.$refs 获取dom节点
         this.$refs[validateForm].resetFields();
      },
      exportLog(){
        let param = Base.getParams($("#alarmForm"));
        let operation = param.operation?param.operation:"";
        let module = param.module?param.module:"";
        let startTime = param.startTime?param.startTime:"";
        let endTime = param.endTime?param.endTime:"";
        window.location.href ="../../alarmController/exportAlarm?userName="+operation+"&module="+module+"&createTimeStart="+startTime+"&createTimeEnd="+endTime;
      },
      handleCurrentChange(currentPage){
        this.renderTable(currentPage-1)
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
  .tableBox .el-table{
    top:5px;
  }
  .el-pagination {
    margin-top: 10px;
    float: right;
  }
</style>
