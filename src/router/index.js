import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import Home from '@/components/homePage/Home'
import Alarm from '@/components/logPage/alarm'
import Operate from '@/components/logPage/operate'
import Menu from '@/components/systemPage/menu'
import Organization from '@/components/systemPage/organization'
import Role from '@/components/systemPage/role'
import User from '@/components/systemPage/user'
Vue.use(Router);
//IndexPage是整体框架的组件 嵌套的路由
export default new Router({
  routes: [
    {
      path:'/',
      hidden: true,

      redirect: { path: '/Home' }
    },
    {
      id:'1',
      path: '/',
      component: IndexPage,
      name: '', //只有一个子节点的时候不添加name
      iconCls:'el-icon-location',
      leaf:true,//只有一个子节点
      children:[
        {
          id:'4',path:'/Home',component:Home,name:'首页',isActive:true
        }
      ]
    },
    {
      id:'2',
      path:'/',
      component:IndexPage,
      name:'日志管理',
      iconCls:'el-icon-share',
      children:[
        {
          id:'5',path:'/alarm',component:Alarm,name:'告警日志',
        },
        {
          id:'6',path:'/operate',component:Operate,name:'操作日志'
        }
      ]
    },
    {
      id:'3',
      path:'/',
      component:IndexPage,
      name:'系统管理',
      iconCls:'el-icon-setting',
      children:[
        {
          id:'7',path:'/menu',component:Menu,name:'菜单管理'
        },
        {
          id:'8',path:'/organization',component:Organization,name:'机构管理'
        },
        {
          id:'9',path:'/role',component:Role,name:'角色管理'
        },
        {
          id:'10',path:'/user',component:User,name:'用户管理'
        }
        // {
        //   path:'/about',component:User,name:'关于'
        // }
      ]
    }
  ]
})
