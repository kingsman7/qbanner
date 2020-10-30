export default {
  //Home Page
  index: {
    permission: 'ibanners.banners.index',
    activated: true,
    path: '/banners/index',
    name: 'qbanner.admin.index',
    page: () => import('@imagina/qbanner/_pages/admin/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qbanner.sidebar.adminIndex',
    icon: 'fas fa-photo-video',
    authenticated: true,
    subHeader: {refresh: true}
  },
  showSlider: {
    permission: 'ibanners.banners.index',
    activated: true,
    path: '/banners/:id',
    name: 'qbanner.admin.show',
    page: () => import('@imagina/qbanner/_pages/admin/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qbanner.sidebar.adminShow',
    icon: 'fas fa-image',
    authenticated: true,
    subHeader : {
      refresh: true,
      breadcrumb: ['qbanner.index']
    }
  }
}
