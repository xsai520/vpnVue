<template>
    <div id="timeSet">
        <div>
          <div class="title">时间状态</div>
          <div class="content">
            系统时间状态：当前时间为
            <span>{{date}}</span>
            ，使用本地时间
          </div>
        </div>
        <div>
          <div class="title">时间配置</div>
          <div class="content"></div>
        </div>
    </div>
</template>
<style>
  #timeSet .title{
    width: 100%;
    border-left: 5px solid #0387db;
    font-size:15px;
    font-weight: bold;
    padding-left: 10px;
  }
  #timeSet .content{
    text-align: center;
  }
</style>

<script>
    export default{
        name:"ToTimeSet",
        data(){
            return {
                date:new Date()
            }
        }
    }
</script>
