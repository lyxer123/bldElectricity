import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: '总体概览',
      component: () => import('@/views/home/index'),
      meta: { title: '总体概览', icon: 'home' }
    }]
  },

  {
    path: '/client',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '客户管理',
        component: () => import('@/views/client/index'),
        meta: { title: '客户管理', icon: 'client' }
      }
    ]
  },
  {
    path: '/asset',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '资产管理',
        component: () => import('@/views/asset/index'),
        meta: { title: '资产管理', icon: 'asset' }
      }
    ]
  },
  {
    path: '/device',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '设备管理',
        component: () => import('@/views/device/index'),
        meta: { title: '设备管理', icon: 'device' }
      }
    ]
  },
  {
    path: '/block',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '钱包管理',
        component: () => import('@/views/block/index'),
        meta: { title: '钱包管理', icon: 'blockHeight' }
      }
    ]
  },
  {
    path: '/map',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '位置管理',
        component: () => import('@/views/map/index'),
        meta: { title: '位置管理', icon: 'map' }
      }
    ]
  },
  {
    path: '/customer',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '顾客管理',
        component: () => import('@/views/customer/index'),
      }
    ]
  },
  {
    path: '/tenant',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '租户管理',
        component: () => import('@/views/tenant/index'),
        meta: { title: '租户管理', icon: 'tenant' }
      }
    ]
  },
  {
    path: '/tenantAdmin',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '租户管理员管理',
        component: () => import('@/views/tenantAdmin/index'),
      }
    ]
  },
  // {
  //   path: '/transaction',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       name: '电桩交易',
  //       component: () => import('@/views/transaction/index'),
  //       meta: {title: '电桩交易', icon: 'transaction'}
  //     }
  //   ]
  // },
  {
    path: '/maintain',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '电桩维护',
        component: () => import('@/views/maintain/index'),
        meta: { title: '电桩维护', icon: 'maintain' }
      }
    ]
  },
  {
    path: '/price',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '资费维护',
        component: () => import('@/views/price/index'),
        meta: { title: '资费维护', icon: 'price' }
      }
    ]
  },
  /*{
    path: '/orderCharge',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '有序充电',
        component: () => import('@/views/orderCharge/index'),
        meta: {title: '有序充电', icon: 'order_charged'}
      }
    ]
  },
  {
    path: '/traceability',
    component: Layout,
    children: [
      {
        path: 'traceability',
        name: '绿电溯源',
        component: () => import('@/views/traceability/traceability'),
        meta: {title: '绿电溯源', icon: 'traceability'}
      }
    ]
  },*/
  {
    path: '/transfer',
    component: Layout,
    children: [
      {
        path: 'transfer',
        name: '资金归集',
        component: () => import('@/views/transfer/transfer'),
        meta: { title: '资金归集', icon: 'collect' }
      }
    ]
  },
  {
    path: '/traceability',
    component: Layout,
    children: [
      {
        path: 'traceability',
        name: '资源管理',
        component: () => import('@/views/traceability/traceability'),
        meta: { title: '资源管理', icon: 'traceability' }
      }
    ]
  }, {
    path: '/orderCharge',
    component: Layout,
    children: [
      {
        path: 'index',
        name: '分段电价表',
        component: () => import('@/views/basics_sectional_tariff/index'),
        meta: { title: '分段电价表', icon: 'el-icon-s-management' }
      }
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
