export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: () => import('@/views/error/Error404.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/pages/authentication/Login.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },

  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component: () => import('views/auth/ForgotPassword.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },

  {
    path: '/reset-password/:token',
    props: (route) => ({
      token: (route.params.token),
      email: (route.query.email),
    }),
    name: 'auth-reset-password',
    component: () => import('views/auth/PasswordReset.vue'),
    meta: {
      layout: 'full',
      resource:'Auth'
    },
  },

  {
    path: '/usuario/:usuario/establecer/contrasena',
    props:true,
    name: 'establecer-contrasena',
    component: () => import('views/auth/EstablecerContrasena.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth'
    },
  },

  // {
  //   path: '/pages/authentication/reset-password-v2',
  //   name: 'auth-reset-password-v2',
  //   component: () => import('@/views/pages/authentication/ResetPassword-v2.vue'),
  //   meta: {
  //     layout: 'full',
  //   },
  // },
  {
    path: '/pages/miscellaneous/not-authorized',
    name: 'misc-not-authorized',
    component: () => import('@/views/pages/miscellaneous/NotAuthorized.vue'),
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  },
  // {
  //   path: '/pages/miscellaneous/under-maintenance',
  //   name: 'misc-under-maintenance',
  //   component: () => import('@/views/pages/miscellaneous/UnderMaintenance.vue'),
  //   meta: {
  //     layout: 'full',
  //   },
  // },
  // {
  //   path: '/pages/miscellaneous/error',
  //   name: 'misc-error',
  //   component: () => import('@/views/pages/miscellaneous/Error.vue'),
  //   meta: {
  //     layout: 'full',
  //   },
  // },
 

]
