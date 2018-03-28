<template>
  <div class="box">
    <div class="title">运行状态</div>
    <div class="explain">
      系统共有16G内存，8核处理器，500G硬盘
    </div>
    <el-row class="charts">
      <el-col :span="8">
        <div class="name">内存利用率</div>
        <div class="gauge" id="memory">
        </div>
      </el-col>
      <el-col :span="8">
        <div class="name">CPU利用率</div>
        <div class="gauge" id="cpu"></div>
      </el-col>
      <el-col :span="8">
        <div class="name">磁盘利用率</div>
        <div class="gauge" id="disk"></div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
  import echarts from 'echarts'
  export default{
    components:{echarts},
    name:"Home",
    data(){
      return {
        commonOption:{},
        memoryChart:{},
        cpuChart:{},
        diskChart:{}
      }
    },
    created(){
      this.commonOption={
        tooltip : {
          formatter: "{a} <br/>{b} : {c}%"
        },
        series : [
          {
            name:'业务指标',
            type:'gauge',
            axisLine:{
              lineStyle:{
                width:13,
              }
            },
            axisTick:{
              show:false
            },
            splitLine:{
              lineStyle:{
                width:1
              }
            },
            axisLabel:{
              distance:'-15',

            },
            detail : {formatter:'{value}%'},
            data:[{value: 50, name: ''}]
          }
        ]
      }
    },
    methods:{
        getMemory(){
          let memory = echarts.init(document.getElementById("memory"));
          memory.setOption(this.commonOption);
        },
        getCpu(){
          let cpu = echarts.init(document.getElementById("cpu"));
          cpu.setOption(this.commonOption);
        },
        getDisk(){
          let disk = echarts.init(document.getElementById("disk"));
          disk.setOption(this.commonOption);
        }
    },
    mounted(){
        this.getMemory();
        this.getCpu();
        this.getDisk();
    }
  }
</script>
<style>
  .box{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .title{
    width:100%;
    height: 38px;
    line-height: 38px;
    background:#F0F2F5;
    font-size: 14px;
  }
  .explain{
    height:60px;
    line-height: 60px;
    padding:0 27px;
    color:#2074b6;;
    font-size: 15px;
  }
  .charts{
    height: calc(100% - 150px);
    margin: 0 27px 50px 27px;
    padding: 6.5% 0 10% 0;
    border: 2px solid #78c0fa;
  }
  .name{
    width:100px;
    height:40px;
    line-height: 40px;
    margin: 0 auto;
    text-align: center;
    font-size: 14px;
    color:#3980c2;
    border: 1px solid #3980c2;
    border-radius: 4px;
  }
  .charts .el-col{
    height: 100%;
  }
  .gauge{
    width: 100%;
    height: 100%;

  }
</style>
