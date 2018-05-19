<template>
  <div id="about">
    <div class="imgBg">
      <img class="imgLogo" src="../../assets/img/about_logo.png" :style="{styleObject}">
    </div>
    <ul class="about_messageBox">
      <li>
        <div>
          <label>产品名称：</label>
          <span class="content" id="productName">{{message.productName}}</span>
        </div>
        <div class="">
          <label>产品型号：</label>
          <span class="content" id="productModel">{{message.productModel}}</span>
        </div>
      </li>
      <li>
        <div>
          <label>产品ID：</label>
          <span class="content" id="productId">{{message.productId}}</span>
        </div>
        <div>
          <label>产品版本号：</label>
          <span class="content" id="productVersion">{{message.productVersion}}</span>
        </div>
      </li>
      <li>
        <div>
          <label>授权起始时间：</label>
          <span class="content" id="authStartTime">{{message.authStartTime}}</span>
        </div>
        <div>
          <label>授权截止时间：</label>
          <span class="content" id="authEndTime">{{message.authEndTime}}</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
  /*添加改变浏览器高度改变about_logo*/
  export default{
    name:"About",
    data(){
        return {
          message:{
            productName:'',
            productModel:'',
            productId:'',
            productVersion:'',
            authStartTime:'',
            authEndTime:''
          },
          styleObject:{
            width:'512px',
            height:'512px'
          }
        }
    },
    mounted(){
      this.initData();
    },
    methods:{
      initData(){
          this.$http.get("../../static/json/about.json").then((res)=>{
            this.message = res.body;
          })
      }
    }
  }
</script>
<style>
  #about{
    position: absolute;
    width: 100%;
    height: 100%;
  }
  #about .imgBg{
    width: 100%;
    height: 80%;
    background: url("../../assets/img/about_bg.png") no-repeat;
    background-size: cover;
  }
  #about .imgLogo{
    position: absolute;
    width:512px;
    height: 512px;
    top:40%;
    left: 50%;
    margin-top:-256px;
    margin-left: -256px;
  }
  .about_messageBox{
    clear: both;
  }
  .about_messageBox li{
    float: left;
    width: 33.33%;
    list-style: none;
  }
  .about_messageBox li div{
    margin-bottom: 10px;
  }
</style>
