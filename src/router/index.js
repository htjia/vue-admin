import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
// 若你想不管路由下面的 children 声明的个数都显示你的根路由
// 你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由

/**
* hidden: true                   当设置 true 的时候该路由不会再侧边栏出现 如401，login等页面，或者如一些编辑页面
* alwaysShow: true               //当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
                                 //只有一个时，会将那个子路由当做根路由显示在侧边栏--如引导页面
                                 //若你想不管路由下面的 children 声明的个数都显示你的根路由
                                 //你可以设置 alwaysShow: true，这样它就会忽略之前定义的规则，一直显示根路由
* redirect: noredirect           当设置 noredirect 的时候该路由在面包屑导航中不可被点击
* name:'router-name'             设定路由的名字，一定要填写不然使用<keep-alive>时会出现各种问题
* meta : {
    title: 'title'               设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'             设置该路由的图标
    noCache: true                如果设置为true ,则不会被 <keep-alive> 缓存(默认 false)
    roles: ['admin', 'editor']   设置该路由进入的权限，支持多个权限叠加
}
  }
**/

export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/forecastDetail',
    component: Layout,
    hidden: true,
    children: [
      {
        path: 'index',
        name: 'ForecastDetail',
        component: () => import('@/views/forecastDetail/index'),
        meta: { title: '生产过程预测Detail', icon: 'log' }
      }
    ]
  }
]
export const asyncRouterMap = [
  // {
  //   path: '/department',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Separtment',
  //       component: () => import('@/views/department/index'),
  //       meta: { title: '组织管理', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/departmentDetail',
  //   component: Layout,
  //   hidden: true,
  //   children: [{
  //     path: 'index',
  //     name: 'DepartmentDetail',
  //     component: () => import('@/views/departmentDetail/index'),
  //     meta: { title: '组织详情', icon: 'table' }
  //   }]
  // },
  // {
  //   path: '/post',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Post',
  //       component: () => import('@/views/post/index'),
  //       meta: { title: '岗位管理', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/listDetail',
  //   component: Layout,
  //   redirect: '/listDetail/detail',
  //   meta: { title: '列表详情', icon: 'example' },
  //   hidden: true,
  //   children: [
  //     {
  //       path: 'detail',
  //       component: () => import('@/views/listDetail/index'),
  //       meta: { title: '列表详情', icon: 'dashboard' }
  //     }
  //   ]
  // },
  // {
  //   path: '/equipment',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Equipment',
  //       component: () => import('@/views/equipment/index'),
  //       meta: { title: '设备管理', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/apiToken',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'ApiToken',
  //       component: () => import('@/views/apiToken/index'),
  //       meta: { title: 'apiToken', icon: 'table' }
  //     }
  //   ]
  // },
  {
    path: '/uploadLog',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'UploadLog',
        component: () => import('@/views/uploadLog/index'),
        meta: { title: '日志管理', icon: 'log' }
      }
    ]
  },
  {
    path: '/equipmentRecommend',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'EquipmentRecommend',
        component: () => import('@/views/equipmentRecommend/index'),
        meta: { title: '设备派工推荐', icon: 'shebei' }
      }
    ]
  },
  {
    path: '/equipmentDetail',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'EquipmentDetail',
        component: () => import('@/views/equipmentDetail/index'),
        meta: { title: '设备详情', icon: 'log' }
      }
    ]
  },
  {
    path: '/parameterRecommend',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'ParameterRecommend',
        component: () => import('@/views/parameterRecommend/index'),
        meta: { title: '工艺参数推荐', icon: 'gongyi' }
      }
    ]
  },
  {
    path: '/forecast',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Forecast',
        component: () => import('@/views/forecast/index'),
        meta: { title: '生产过程预测', icon: 'yuce' }
      }
    ]
  },
  {
    path: '/report',
    name: 'Report',
    component: Layout,
    alwaysShow: true,
    meta: { title: '大数据分析报表', icon: 'baobiao' },
    children: [
      {
        path: '/routine',
        name: 'Routine',
        alwaysShow: true,
        component: () => import('@/views/report/generalReport/index'),
        meta: { title: '常规分析报表', icon: 'cgfenxi' },
        children: [
          {
            path: 'cockpit',
            name: 'Cockpit',
            component: () => import('@/views/report/generalReport/cockpit/index'),
            meta: { title: '报废率领导驾驶舱' }
          },
          {
            path: 'abnormal',
            name: 'Abnormal',
            component: () => import('@/views/report/generalReport/abnormal/index'),
            meta: { title: '报废原因分析' }
          },
          {
            path: 'abnormalProduct',
            name: 'AbnormalProduct',
            hidden: true,
            component: () => import('@/views/report/generalReport/abnormalProduct/index'),
            meta: { title: '报废原因分析' }
          },
          {
            path: 'classes',
            name: 'Classes',
            component: () => import('@/views/report/generalReport/classes/index'),
            meta: { title: '班次报废率分析' }
          },
          {
            path: 'equipment',
            name: 'Equipment',
            component: () => import('@/views/report/generalReport/equipment/index'),
            meta: { title: '设备报废率分析' }
          },
          {
            path: 'equipmentDetail',
            name: 'EquipmentDetail',
            hidden: true,
            component: () => import('@/views/report/generalReport/equipmentDetail/index'),
            meta: { title: '设备报废率分析' }
          },
          {
            path: 'product',
            name: 'Product',
            component: () => import('@/views/report/generalReport/product/index'),
            meta: { title: '产品报废率分析' }
          },
          {
            path: 'productTrend',
            name: 'ProductTrend',
            hidden: true,
            component: () => import('@/views/report/generalReport/productTrend/index'),
            meta: { title: '产品报废率分析' }
          },
          {
            path: 'productList',
            name: 'ProductList',
            hidden: true,
            component: () => import('@/views/report/generalReport/productList/index'),
            meta: { title: '产品报废率分析' }
          },
          {
            path: 'productDetail',
            name: 'ProductDetail',
            hidden: true,
            component: () => import('@/views/report/generalReport/productDetail/index'),
            meta: { title: '产品报废率分析' }
          },
          {
            path: 'contrast',
            name: 'Contrast',
            hidden: true,
            component: () => import('@/views/report/generalReport/contrast/index'),
            meta: { title: '产品报废率分析' }
          }
        ]
      },
      {
        path: 'olap',
        name: 'Olap',
        // hidden: true,
        component: () => import('@/views/olap/index'),
        meta: { title: 'OLAP多维分析', icon: 'dwdfenxi' }
      }
    ]
  },
  {
    path: '/backgroundManagement',
    name: 'BackgroundManagement',
    component: Layout,
    redirect: '/backgroundManagement/roles',
    alwaysShow: true,
    meta: { title: '后台管理', icon: 'houtaim' },
    children: [
      {
        path: 'roles',
        name: 'Roles',
        component: () => import('@/views/roles/index'),
        meta: { title: '角色管理', icon: 'jiaose' }
      },
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/user/index'),
        meta: { title: '用户管理', icon: 'userm' }
      }
    ]
  },
  {
    path: '/metaDataManager',
    name: 'MetaDataManager',
    component: Layout,
    redirect: '/metaDataManager/labelManager',
    alwaysShow: true,
    meta: { title: '平台数据管理', icon: 'metaData' },
    children: [
      {
        path: 'labelManager',
        name: 'LabelManager',
        component: () => import('@/views/metadataManager/labelManager/index'),
        meta: { title: '元数据字段管理', icon: 'field' }
      },
      {
        path: 'filedType',
        name: 'FiledType',
        component: () => import('@/views/metadataManager/filedType/index'),
        meta: { title: '元数据字段类型管理', icon: 'fieldType' }
      },
      {
        path: 'tableManager',
        name: 'TableManager',
        component: () => import('@/views/metadataManager/tableManager2/index'),
        meta: { title: '主数据表管理', icon: 'dataTable' }
      },
      {
        path: 'http://192.168.2.155:50070/explorer.html#/',
        meta: { title: 'Hadoop中心', icon: 'hadoop' }
      },
      {
        path: 'http://192.168.2.154:8080/',
        meta: { title: 'Spark中心', icon: 'spark' }
      }
      // {
      //   path: 'hdfsManager',
      //   name: 'HdfsManager',
      //   component: () => import('@/views/metadataManager/hdfsManager/index'),
      //   meta: { title: '集群管理', icon: 'table' }
      // }
      // {
      //   path: 'tableManager',
      //   name: 'TableManager',
      //   component: () => import('@/views/metadataManager/tableManager/index'),
      //   meta: { title: '原始表管理', icon: 'table' }
      // },
      // {
      //   path: 'filedManager',
      //   name: 'FiledManager',
      //   hidden: true,
      //   component: () => import('@/views/metadataManager/filedManager/index'),
      //   meta: { title: '表字段管理', icon: 'table' }
      // }
    ]
  },
  // {
  //   path: '/bigDataManager',
  //   component: Layout,
  //   meta: { roles: ['editor'] },
  //   children: [
  //     {
  //       path: 'http://192.168.2.161/ganglia2/',
  //       meta: { title: '大数据管理中心', icon: 'link', roles: ['editor'] }
  //     }
  //   ]
  // },
  { path: '*', redirect: '/404', hidden: true }
  // {
  //   path: '/factory',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'Factory',
  //       component: () => import('@/views/factory/index'),
  //       meta: { title: '工厂信息', icon: 'tree' }
  //     }
  //   ]
  // },
  // {
  //   path: '/factoryDetail',
  //   component: Layout,
  //   hidden: true,
  //   children: [{
  //     path: 'index',
  //     name: 'FactoryDetail',
  //     component: () => import('@/views/factoryDetail/index'),
  //     meta: { title: '工厂详情', icon: 'table' }
  //   }]
  // },
  // {
  //   path: '/targetChart',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: 'TargetChart',
  //       component: () => import('@/views/targetChart/index'),
  //       meta: { title: '打靶图', icon: 'chart' }
  //     }
  //   ]
  // },
  // {
  //   path: '/nested',
  //   component: Layout,
  //   redirect: '/nested/menu1',
  //   name: 'Nested',
  //   alwaysShow: true,
  //   meta: {
  //     title: '嵌套路由',
  //     icon: 'nested'
  //   },
  //   children: [
  //     {
  //       path: 'menu1',
  //       component: () => import('@/views/nested/menu1/index'), // Parent router-view
  //       name: 'Menu1',
  //       meta: { title: 'menu1' },
  //       children: [
  //         {
  //           path: 'menu1-1',
  //           component: () => import('@/views/nested/menu1/menu1-1'),
  //           name: 'Menu1-1',
  //           meta: { title: 'menu1-1' }
  //         },
  //         {
  //           path: 'menu1-2',
  //           component: () => import('@/views/nested/menu1/menu1-2'),
  //           name: 'Menu1-2',
  //           meta: { title: 'menu1-2' },
  //           children: [
  //             {
  //               path: 'menu1-2-1',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
  //               name: 'Menu1-2-1',
  //               meta: { title: 'menu1-2-1' }
  //             },
  //             {
  //               path: 'menu1-2-2',
  //               component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
  //               name: 'Menu1-2-2',
  //               meta: { title: 'menu1-2-2' }
  //             }
  //           ]
  //         },
  //         {
  //           path: 'menu1-3',
  //           component: () => import('@/views/nested/menu1/menu1-3'),
  //           name: 'Menu1-3',
  //           meta: { title: 'menu1-3' }
  //         }
  //       ]
  //     },
  //     {
  //       path: 'menu2',
  //       component: () => import('@/views/nested/menu2/index'),
  //       meta: { title: 'menu2' }
  //     }
  //   ]
  // },
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
