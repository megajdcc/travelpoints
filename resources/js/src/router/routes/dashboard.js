export default [
  {
    path: '/home',
    name: 'home',
    meta:{
      resource: 'home',
      action: 'read',
    },
    component: () => import('views/home'),
  },
]
