<!--构建整个页面的布局-->
<template>
    <el-container class="indexPage">
      <el-header class="logo-header">
        <el-row>
          <el-col :span="8"><!--左边logo-->
            <img src="../assets/img/logo-text.png">
          </el-col>
          <el-col :offset="10" :span="6"><!--右边信息-->
            <el-row class="message">
              <el-col :span="8">
                 <i class="icon iconfont">&#xe64a;</i>
                  <span>{{user}}</span>
              </el-col>
              <el-col :span="8">
                <!--sync的作用是自动更新父组件属性的v-on监听器-->
                <i class="icon iconfont" @click="authorizationVisible=true">&#xe62a;</i>
                <span @click="authorizationVisible=true">授权</span>
              </el-col>
              <el-col :span="8">
                 <i class="icon iconfont" @click="exitVisible=true">&#xe652;</i>
                <span @click="exitVisible=true">退出</span>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-header>
        <el-container class="main">
              <el-aside id="aside-menu">
                <el-scrollbar class="page-component_scroll">
                <el-menu :unique-opened=true :router="true" backgroundColor="rgba(0,0,0,0)" :default-active="$route.path"
                         text-color="#ffffff" active-text-color="#62c1fd">
                  <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden" >
                    <el-submenu :index="index+''" :key="item.id"  v-if="!item.leaf" :class="{active:item.isActive}">
                      <template slot="title">
                        <i :class="item.iconCls"></i>
                        <span slot="title">{{item.name}}</span>
                      </template>
                      <el-menu-item :class="" v-for="(child,index) in  item.children"
                                    :index="child.path" :key="child.path">{{child.name}}</el-menu-item>
                    </el-submenu>
                    <el-menu-item v-if="item.leaf && item.children.length>0"  :index="item.children[0].path" :key="item.children[0].path">
                      <i :class="item.iconCls"></i>
                      {{item.children[0].name}}
                   </el-menu-item>
                  </template>
                </el-menu>
                </el-scrollbar>
              </el-aside>
            <el-container class="main-content">
                <el-main> <router-view/></el-main>
                <el-footer>
                  @版权所有 上海辰锐信息科技公司
                </el-footer>
            </el-container>
        </el-container>
      <el-dialog title="关于授权" :visible.sync="authorizationVisible" width="30%">
        <div class="authorization">
          <img v-if="imgFlag" src="@/assets/img/un_authorization.jpg" width="100%"/>
          <div v-else>
            <img src="@/assets/img/authorization.jpg" width="100%"/>
          </div>
          <el-upload :action="uploadUrl" :limit="1" :file-list="fileList"  :on-success="handleSuccess">
            <el-button size="small" type="primary">上传</el-button>
          </el-upload>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary">确定</el-button>
          <el-button @click="authorizationVisible=false">取消</el-button>
        </div>
      </el-dialog>
      <el-dialog title="退出" :visible.sync="exitVisible" width="30%">
        <div class="exit">
            <el-row>
              <el-col :span="12" >
                <i class="icon iconfont">&#xe8d8;</i>
                <div>关机</div>
              </el-col>
              <el-col :span="12">
                <i class="icon iconfont">&#xe611;</i>
                <div>重启</div>
              </el-col>
            </el-row>
        </div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="exitVisible=false">取消</el-button>
        </div>
      </el-dialog>
    </el-container>
</template>
<script>
  import ElDialog from "../../node_modules/element-ui/packages/dialog/src/component";
  import ElRow from "element-ui/packages/row/src/row";
  import ElCol from "element-ui/packages/col/src/col";
  import ElUpload from "../../node_modules/element-ui/packages/upload/src/index";
  import ElButton from "../../node_modules/element-ui/packages/button/src/button";
  import ElSubmenu from "../../node_modules/element-ui/packages/menu/src/submenu";
  import ElScrollbar from "element-ui/packages/scrollbar/src/main";
    export default{
      components: {ElScrollbar, ElSubmenu, ElButton, ElUpload, ElCol, ElRow, ElDialog},
      name:'IndexPage',
        data(){
            return {
              uploadUrl:"https://jsonplaceholder.typicode.com/posts/",
              user:"admin",
              authorizationVisible: false,
              exitVisible:false,
              imgFlag:true,
              fileList:[]
            }
        },
      created(){
//        this.$http.get('../../static/json/menu.json').then((res)=>{
//          var data = res.body.data;
//          //先将一维数组整理出来
//          var array = [];
//          data.map(function(item,index,arr){
//            if(item.pid==-1){
//              array.push(item)
//            }
//          })
//          console.log(array)
//
//
//        })
      },
      methods:{
        handleSuccess(response, file, fileList){
          this.imgFlag = false
        }
      }
    }
</script>
<style>
  .indexPage{
    width: 100%;
    height: 100%;
  }
  .logo-header{
    width:100%;
    height:75px !important;
    line-height:75px;
    background:url("../assets/img/header-bg.png") no-repeat;
    background-size: cover;
  }
  .logo-header img{
    display: block;
    padding-top:17px;
    float:left;
    height:40px;
    line-height: 40px;
  }
  .message .el-col{
      color: #fff;
      text-align: center;
      font-family: "Microsoft YaHei";
      font-size: 15px;
      font-weight: 600;
      cursor: pointer;
  }
  .message .el-col i{
    font-size:18px;
  }
  .exit .el-col{
    text-align: center;
  }
  .exit .el-col i{
    font-size:50px;
  }
  .exit .el-col div{
    padding-top: 15px;
    font-size:16px;
  }
  .authorization .el-input{
    width:200px;
  }
  .authorization .el-button{
    float: right;
  }
  .authorization .el-upload-list{
    float: left;
    width: calc(100% - 100px);
  }
  .el-upload-list__item:first-child{
    margin-top:5px;
  }
  .main{
    position:relative;
    top:4px;
  }
  #aside-menu{
    width:200px !important;
    /*height:100%;*/
    overflow: hidden;
    background: rgba(0,0,0,.06);
    background-size: cover;
  }
  /*调整menu的样式*/
  #aside-menu .el-menu{
    border-width: 0;
  }
  .el-submenu__title i,
  .el-menu-item i{ /*图标未激活时候是白色*/
    color:#fff;
  }
  .el-menu>.el-menu-item:hover,
  .el-menu>.el-menu-item.is-active,
  .el-menu>.el-submenu:hover .el-submenu__title,
  .el-menu>.el-submenu:hover .el-submenu__title i{
    background: rgba(0,0,0,0) !important;
    color:#62c1fd !important;
  }
  .el-submenu .el-menu{ /*二级菜单的背景*/
    background: rgba(0,0,0,0.2) !important;
  }
  .el-submenu .el-menu .el-menu-item:hover,
  .el-submenu .el-menu .el-menu-item.is-active{
    background: #50abf1 !important;
    color: #fff !important;
  }
  .el-menu> .el-submenu.active i,
  .el-menu> .el-submenu.active span{
    color:#62c1fd !important;
  }
  .main-content{
    background: #F0F2F5;
  }
  .main-content .el-main{
    position: relative;
    padding:0;
    margin:0 20px 0 16px;
  }
  /*表格查询条件设置的表单样式*/
  .tableForm{
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  .tableForm .el-form{
    margin: 13px 0 15px;
    padding: 25px 25px 10px 10px;
    background: #fff;
  }
  .el-footer{
    height:30px !important;
    line-height:30px;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
  .tableBox{
    height:calc(100% - 97px);
    padding:15px;
    background: #fff;
  }
  /*设置滚动条*/
  #aside-menu .page-component_scroll{
    height: 100%;
  }
  #aside-menu .el-scrollbar__wrap{
    overflow-y: scroll !important;
    overflow-x:hidden !important;
  }
</style>
