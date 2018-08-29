//定义路由组件
import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '@/components/IndexPage'
import Login from '@/components/Login'
import Home from '@/components/homePage/Home'//首页
import Alarm from '@/components/logPage/alarm'
import Operate from '@/components/logPage/operate'//日志管理
import Menu from '@/components/systemPage/menu'
import Organization from '@/components/systemPage/organization'
import Role from '@/components/systemPage/role'
import User from '@/components/systemPage/user'
import TimeSet from '@/components/systemPage/TimeSet'
import RemoteControl from '@/components/systemPage/RemoteControl'
import ParameterSet from '@/components/systemPage/ParameterSet'
import About from '@/components/systemPage/About'//系统管理
import EquipmentLog from '@/components/serviceAudit/equipmentLog'
import ServiceLog from '@/components/serviceAudit/serviceLog'
import UserOperationLog from '@/components/serviceAudit/userOperationLog'//服务审计
import IpSet from '@/components/networkConfiguration/ipSet.vue'
import RouterSet from '@/components/networkConfiguration/routerSet.vue'//网络配置
import SnmpConfig from '@/components/externalRegulatoryConfiguration/snmpConfig.vue'
import SyslogConfig from '@/components/externalRegulatoryConfiguration/syslogConfig.vue'//外部监管配置
import ResumeOutFactory from '@/components/reductionAndBackups/resumeOutFactory.vue'
import SetRestore from '@/components/reductionAndBackups/setRestore.vue'
import SystemUpgrade from '@/components/reductionAndBackups/systemUpgrade.vue'//还原与备份
Vue.use(Router);
//IndexPage是整体框架的组件 嵌套的路由
//定义路由 每个路由映射一个组件
export default new Router({
  routes: [
    {
      path:'/',
      hidden: true,
      // redirect: { path: '/Login' }
    },
    {
      path:'/',
      hidden: true,
      redirect: { path: '/Home' }
    },
    {
      id:'1',
      path: '/',
      component: IndexPage,
      isActive:false,
      name: '', //只有一个子节点的时候不添加name
      iconCls:'el-icon-location',
      leaf:true,//只有一个子节点
      children:[
        {
          id:'4',path:'/Home',component:Home,name:'首页',
        }
      ]
    },
    {
      id:'2',
      path:'/',
      component:IndexPage,
      name:'日志管理',
      isActive:false,
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
      isActive:false,
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
        },
        {
          id:'11',path:'/TimeSet',component:TimeSet,name:'时间设置'
        },
        {
          id:'12',path:'/RemoteControl',component:RemoteControl,name:'远程访问控制'
        },
        {
          id:'13',path:'/ParameterSet',component:ParameterSet,name:'参数设置'
        },
        {
          id:'14',path:'/about',component:About,name:'关于'
        }
      ]
    },
    {
      id:'15',
      path:'/',
      component:IndexPage,
      isActive:false,
      name:"服务审计",
      iconCls:'el-icon-share',
      children:[
        {
          id:'16',path:'/equipmentLog',component:EquipmentLog,name:'设备运行日志',
        },
        {
          id:'17',path:'/serviceLog',component:ServiceLog,name:'交换平台服务日志',
        },
        {
          id:'18',path:'/UserOperationLog',component:UserOperationLog,name:'用户操作日志',
        },
      ]
    },
    {
      id:"19",
      path:'/',
      name:'网络配置',
      iconCls:'el-icon-share',
      children:[
        {
          id:'20',path:'/ipSet',component:IpSet,name:'IP配置'
        },
        {
          id:'21',path:'/routerSet',component:RouterSet,name:'路由配置'
        }
      ]
    },
    {
      id:"20",
      path:'/',
      name:'外部监管配置',
      iconCls:'el-icon-share',
      children:[
        {
          id:'21',path:'/snmpConfig',component:SnmpConfig,name:'SNMP设置'
        },
        {
          id:'22',path:'/syslogConfig',component:SyslogConfig,name:'Syslog配置'
        }
      ]
    },
    {
      id:"23",
      path:'/',
      name:'还原与备份',
      iconCls:'el-icon-share',
      children:[
        {
          id:'24',path:'/resumeOutFactory',component:ResumeOutFactory,name:'恢复出厂'
        },
        {
          id:'25',path:'/setRestore',component:SetRestore,name:'设置还原点'
        },
        {
          id:'26',path:'/systemUpgrade',component:SystemUpgrade,name:'系统升级'
        }
      ]
    }
  ]
})
