export default {
  //Home Page
  index: {
    permission: 'ibanners.positions.index',
    activated: true,
    path: '/banners/index',
    name: 'qbanner.admin.sliders',
    page: () => import('@imagina/qbanner/_pages/admin/sliders/index'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qbanner.sidebar.adminSlider',
    icon: 'fas fa-images',
    authenticated: true,
    subHeader: {refresh: true}
  },
  showSlider: {
    permission: 'ibanners.banners.index',
    activated: true,
    path: '/banners/show/:id',
    name: 'qbanner.admin.sliders.show',
    page: () => import('@imagina/qbanner/_pages/admin/sliders/form'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qbanner.sidebar.adminSliderEdit',
    icon: 'fas fa-image',
    authenticated: true,
    subHeader : {
      refresh: true,
      breadcrumb: ['qbanner.index']
    }
  },
  createSlide: {
    permission: 'ibanners.banners.create',
    activated: true,
    path: '/banners/create/:sliderId',
    name: 'qbanner.admin.slide.create',
    page: () => import('@imagina/qbanner/_pages/admin/slide/create.vue'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qbanner.sidebar.adminIndex',
    icon: 'fas fa-images',
    authenticated: true,
  },
  updateSlide: {
    permission: 'ibanners.banners.update',
    activated: true,
    path: '/banners/update/:sliderId/:id',
    name: 'qbanner.admin.slide.update',
    page: () => import('@imagina/qbanner/_pages/admin/slide/show.vue'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'qbanner.sidebar.adminIndex',
    icon: 'fas fa-images',
    authenticated: true,
  },
}
