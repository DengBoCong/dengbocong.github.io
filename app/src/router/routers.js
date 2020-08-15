export default [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/views/Home'),
    meta: {
      hideInMenu: true,
      notCache: true
    },
    children: [{
      path: '/home',
      meta: {
        hideInMenu: true,
        title: '',
        notCache: true,
      },
      component: () => import('@/views/Home'),
      // children: [{
      //   path: '/',
      //   name: 'home',
      //   component: () => import('../views/About'),
      //   meta: {
      //     title: '首页',
      //     hideInMenu: true,
      //     notCache: true,
      //     description: '首页'
      //   },
      // }]
    }],
  },

  // **************************搜索***************************************
  // **************************相关***************************************
  // {
  //   path: '/search',
  //   name: 'search',
  //   meta: {
  //     title: '搜索',
  //     hideInMenu: true,
  //     notCache: true,
  //     description: '搜索'
  //   },
  //   component: () => import('views/Search'),
  // }
]