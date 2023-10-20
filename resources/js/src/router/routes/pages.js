import Error404 from '@/views/error/Error404.vue'
import Login from '@/views/pages/authentication/Login.vue';
import ForgotPassword from 'views/auth/ForgotPassword.vue'
import PasswordReset from 'views/auth/PasswordReset.vue';
import EstablecerContrasena from 'views/auth/EstablecerContrasena.vue'
import NotAuthorized from '@/views/pages/miscellaneous/NotAuthorized.vue'

export default [
  {
    path: '/error-404',
    name: 'error-404',
    component: Error404,
    meta: {
      layout: 'full',
      resource: 'Auth',
      action: 'read',
    },
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      layout: 'full',
      resource: 'Auth',
      redirectIfLoggedIn: true,
    },
  },

  {
    path: '/forgot-password',
    name: 'auth-forgot-password',
    component:ForgotPassword,
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
    component:PasswordReset,
    meta: {
      layout: 'full',
      resource:'Auth'
    },
  },

  {
    path: '/usuario/:usuario/establecer/contrasena',
    props:true,
    name: 'establecer-contrasena',
    component:EstablecerContrasena,
    meta: {
      layout: 'full',
      resource: 'Auth'
    },
  },


  {
    path: '/pages/miscellaneous/not-authorized',
    name: 'misc-not-authorized',
    component: NotAuthorized,
    meta: {
      layout: 'full',
      resource: 'Auth',
    },
  }
]
