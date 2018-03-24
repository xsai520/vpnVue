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
Vue.use(Router)
//IndexPage是整体框架的组件 嵌套的路由
export default new Router({
  routes: [
    {
      path: '/',
      component: IndexPage,
      name: '', //只有一个子节点的时候不添加name
      leaf:true,//只有一个子节点
      children:[
        {
          path:'/Home',component:Home,name:'首页'
        }
      ]
    },
    {
      path:'/',
      component:IndexPage,
      name:'日志管理',
      children:[
        {
          path:'/alarm',component:Alarm,name:'告警日志'
        },
        {
          path:'/operate',component:Operate,name:'操作日志'
        }
      ]
    },
    {
      path:'/',
      component:IndexPage,
      name:'系统管理',
      children:[
        {
          path:'/menu',component:Menu,name:'菜单管理'
        },
        {
          path:'/organization',component:Organization,name:'机构管理'
        },
        {
          path:'/role',component:Role,name:'角色管理'
        },
        {
          path:'/user',component:User,name:'用户管理'
        }
      ]
    }
  ]
})
