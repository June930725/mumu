const routes = [
  {
    name: 'home',
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        name: 'index',
        path: '',
        component: () => import('../pages/Index.vue'),
        meta: {
          title: '募募首頁',
          login: false
        }
      },
      {
        name: 'News',
        path: 'News',
        component: () => import('../pages/News.vue'),
        meta: {
          title: '最新消息',
          login: false
        }
      },
      {
        name: 'Donate',
        path: 'Donate',
        component: () => import('../pages/Donate.vue'),
        meta: {
          title: '物資捐贈',
          login: false
        }
      },
      {
        name: 'Share',
        path: 'Share',
        component: () => import('../pages/Share.vue'),
        meta: {
          title: '募募分享',
          login: false
        }
      },
      {
        name: 'About',
        path: 'About',
        component: () => import('../pages/About.vue'),
        meta: {
          title: '關於我們',
          login: false
        }
      },
      {
        name: 'Member',
        path: 'Member',
        component: () => import('../pages/Member.vue'),
        meta: {
          login: true
        }
      },
      {
        name: 'D_Cart',
        path: 'D_Cart',
        component: () => import('../pages/D_Cart.vue'),
        meta: {
          login: false
        }
      },
      {
        name: 'Donation',
        path: 'Donation/:id',
        component: () => import('../pages/Donation.vue'),
        meta: {
          login: false
        }
      },
      {
        name: 'S_Cart',
        path: 'S_Cart',
        component: () => import('../pages/S_Cart.vue'),
        meta: {
          login: false
        }
      },
      {
        name: 'Shares',
        path: 'Shares/:id',
        component: () => import('../pages/Shares.vue'),
        meta: {
          login: false
        }
      }
    ]
  },
  {
    name: 'admin',
    path: '/admin',
    component: () => import('../layouts/backMainLayout.vue'),
    children: [
      {
        name: 'backIndex',
        path: '',
        component: () => import('../pages/backIndex.vue'),
        meta: {
          title: '後台管理系統 | ',
          login: true,
          right: true
        }
      },
      {
        name: 'backNews',
        path: 'News',
        component: () => import('../pages/backNews.vue'),
        meta: {
          title: '後台管理系統 | 最新消息',
          login: true,
          right: true
        }
      },
      {
        name: 'backDonate',
        path: 'Donate',
        component: () => import('../pages/backDonate.vue'),
        meta: {
          title: '後台管理系統 | 物資捐贈',
          login: true,
          right: true
        }
      },
      {
        name: 'backShare',
        path: 'Share',
        component: () => import('../pages/backShare.vue'),
        meta: {
          title: '後台管理系統 | 募募分享',
          login: true,
          right: true
        }
      },
      {
        name: 'backContent',
        path: 'Content',
        component: () => import('../pages/backContent.vue'),
        meta: {
          title: '後台管理系統 | 網站內容',
          login: true,
          right: true
        }
      },
      {
        name: 'backMember',
        path: 'Member',
        component: () => import('../pages/backMember.vue'),
        meta: {
          title: '後台管理系統 | 會員資料',
          login: true,
          right: true
        }
      },
      {
        name: 'backOrder',
        path: 'Order',
        component: () => import('../pages/backOrder.vue'),
        meta: {
          title: '後台管理系統 | 訂單管理',
          login: true,
          right: true
        }
      }
    ]
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('../pages/Error404.vue')
  }
]

export default routes
