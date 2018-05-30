<template>
  <div class="tableForm" id="organization">
    <div class="leftTree">
      <el-tree :data="treeData" class="filter-tree" node-key="id" ref="tree"
               default-expand-all highlight-current></el-tree>
    </div>
    <div class="rightTable">
      <el-form  :inline="true" class="demo-form-inline" id="orgForm" :model="formData" ref="formData">
        <el-form-item label="机构名称" prop="deptName">
          <el-input v-model="formData.deptName" name="deptName"></el-input>
        </el-form-item>
        <el-form-item label="机构编码" prop="deptCode">
          <el-input v-model="formData.deptCode" name="deptCode"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button  type="primary" @click="handleSelect">查询</el-button>
          <el-button @click="reset('formData')">重置</el-button>
        </el-form-item>
      </el-form>
      <div class="tableBox">
        <el-button type="primary">新增</el-button>
        <el-button type="primary" :disabled="editDisabled">修改</el-button>
        <el-button type="primary" :disabled="delDisabled">删除</el-button>
        <el-button type="primary">导入</el-button>
        <el-button type="primary">导出</el-button>
        <el-table :data="tableData" border @selection-change="handleSelectionChange">
          <el-table-column prop="id" type="selection"></el-table-column>
          <el-table-column prop="deptName" label="机构名称"></el-table-column>
          <el-table-column prop="deptCode" label="机构编码"></el-table-column>
          <el-table-column prop="deptAlias" label="机构别名 "></el-table-column>
          <el-table-column prop="parentId" label="上级机构"></el-table-column>
          <el-table-column prop="describe" label="描述"></el-table-column>
        </el-table>
        <el-pagination @current-change="handleCurrentChange"
          background
          layout="prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
  import ElForm from "../../../node_modules/element-ui/packages/form/src/form";
  import ElFormItem from "../../../node_modules/element-ui/packages/form/src/form-item";
  import ElTable from "../../../node_modules/element-ui/packages/table/src/table";
  import Base from  '../../assets/js/base';
  export default{
    components: {ElTable, ElFormItem, ElForm},
    name:"Organization",
    data(){
        return {
          treeData: [],
            formData:{
              deptName:"",
              deptCode:""
            },
            tableData:[],
            total:0,
            delDisabled:true,
            editDisabled:true
        }
    },
    mounted:function () {
      this.renderTable()
    },
    methods:{
      renderTable(page){ //获取表格
        let params = {
          pageSize:page?page:0,
          pageNumber:10,
          param :this.formData
        };
        this.$http.get("../../static/json/orgTable.json",params).then((res)=>{
          this.tableData = res.body.data;
          this.total = res.body.total;
        })
       },
      handleSelect(){ //查询
          this.formData = Base.getParams($("#orgForm"));
          this.renderTable()
      },
      reset(formData){ //重置
          this.$refs[formData].resetFields()
      },
      handleCurrentChange(currentPage){//分页改变
        this.renderTable(currentPage-1)
      },
      handleSelectionChange(arr){
         //切换checkbox的选择
        this.selectData=[];
        //根据数组长度来判断选择
        if(arr.length==0){
          this.delDisabled =  true;
          this.editDisabled = true;
        }else if(arr.length==1){
          this.delDisabled =  false;
          this.editDisabled = false;
          this.selectData=arr;
        }else{
          this.delDisabled =  false;
          this.editDisabled = true;
        }
      }
    }
  }
</script>
<style>
  #organization{
    background:#fff
  }
  #organization .leftTree{
    position: absolute;
    width: 200px;
    top: 0;
    bottom: 0;
    border-right: 1px solid #dcdcdc;
  }
  #organization .rightTable{
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
