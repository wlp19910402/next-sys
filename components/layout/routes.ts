export const constantRoutes = [
  {
    path: '/home', // （唯一）
    meta: {
      title: '首页', // 标题
      icon: 'House', // 图标
      hidden: '0', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
    },
  },
  {
    path: '/personal', // （唯一）
    meta: {
      title: '修改个人信息', // 标题
      icon: '', // 图标
      hidden: '0', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
    },
  },
  {
    path: '/company', // （唯一）
    meta: {
      title: '单位管理', // 标题
      icon: 'OfficeBuilding', // 图标 HomeFilled
      hidden: '0', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
  },
  {
    path: '/machine', // （唯一）
    meta: {
      title: '设备管理', // 标题
      icon: 'Box', // 图标 HomeFilled
      hidden: '0', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
  },
  {
    path: '/contact', // （唯一）
    meta: {
      title: '全域联系法官一体机', // 标题
      icon: 'Refrigerator', // 图标 HomeFilled
      hidden: '0', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
  },

  {
    path: '/mountings', // （唯一）
    meta: {
      title: '配件管理', // 标题
      icon: 'Postcard', // 图标 HomeFilled
      hidden: '0', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
  },
  {
    path: '/purchase', // （唯一）
    meta: {
      title: '配件需求管理',
      icon: 'Refrigerator',
      hidden: '1',
      roleCode: ['admin', 'readOnly'],
    },
  },

  {
    path: '/system', // 路由访问路径（唯一）
    name: 'system', // 命名路由（唯一）
    redirect: '/system/user', // path路径，<router-link name="/404"> 也是使用path进行跳转
    meta: {
      title: '系统管理', // 标题
      icon: 'Setting', // 图标
      hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
    children: [
      {
        path: '/system/user', // （唯一）
        meta: {
          title: '用户管理', // 标题
          icon: 'User', // 图标
          hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
        },
      },
      {
        path: '/system/role', // （唯一）
        meta: {
          title: '角色管理', // 标题
          icon: 'Coffee', // 图标
          hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
        },
      },
      {
        path: '/system/dic', // （唯一）
        meta: {
          title: '字典管理', // 标题
          icon: 'Collection', // 图标
          hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
        },
      },
    ],
  },
  /** 单位管理 */
  {
    path: '/company', // （唯一）
    meta: {
      title: '单位管理', // 标题
      icon: 'OfficeBuilding', // 图标 HomeFilled
      hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
  },
  /** 设备管理 */
  {
    path: '/machine', // （唯一）
    meta: {
      title: '设备管理', // 标题
      icon: 'Box', // 图标 HomeFilled
      hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
  },
  // 全域联系法官一体机
  {
    path: '/contact', // （唯一）
    meta: {
      title: '全域联系法官一体机', // 标题
      icon: 'Refrigerator', // 图标 HomeFilled
      hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
  },
  // 配件
  {
    path: '/mountings', // （唯一）
    meta: {
      title: '配件管理', // 标题
      icon: 'Postcard', // 图标 HomeFilled
      hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
      roleCode: ['admin', 'readOnly'],
    },
  },
  // 配件需求管理
  {
    path: '/purchase', // （唯一）
    meta: {
      title: '配件需求管理',
      icon: 'CreditCard',
      hidden: '1',
      roleCode: ['admin', 'printSale', 'readOnly'],
    },
  },
  {
    path: '/order',
    name: 'order',

    redirect: '/order/maintain/create', // path路径，<router-link name="/404"> 也是使用path进行跳转
    meta: {
      title: '工单管理', // 标题
      icon: 'Files', // 图标
      hidden: '1', // 代表路由在菜单中是否隐藏，是否隐藏（0隐藏，1显示）
    },
    children: [
      {
        path: '/order/create',
        meta: {
          title: '创建工单',
          icon: 'DocumentAdd',
          hidden: '1',
        },
      },
      {
        path: '/order/processing/list',
        meta: {
          title: '执行中工单',
          icon: 'ScaleToOriginal',
          hidden: '1',
        },
      },
      {
        path: '/order/waiting/list',

        meta: {
          title: '待处理工单',
          icon: 'Clock',
          hidden: '1',
        },
      },
      {
        path: '/order/passing/list',

        meta: {
          title: '已处理工单',
          icon: 'SetUp',
          hidden: '1',
        },
      },
      {
        path: '/order/complete/list',
        meta: {
          title: '已完成工单',
          icon: 'DocumentChecked',
          hidden: '1',
        },
      },
      {
        path: '/order/all/list',
        meta: {
          title: '工单查询',
          icon: 'Notebook',
          hidden: '0',
        },
      },
      {
        path: '/order/edit/:id',

        meta: {
          title: '工单编辑',
          icon: '',
          hidden: '0',
        },
      },
      {
        path: '/order/report/:id',
        meta: {
          title: '生成报告单',
          icon: '',
          hidden: '0',
        },
      },
    ],
  },
  {
    path: '/order/all/list',
    meta: {
      title: '工单查询',
      icon: 'Notebook',
      hidden: '1',
      roleCode: ['admin', 'readOnly'],
    },
  },
]
