// Rutas de negocios
import store from '@/store'

export default [

      {
            path:'/negocio/home',
            name: 'negocio.home',
            meta: {
                  resource:'home',
                  action:'read',
                  layout:'negocio',
            },
            component: () => import('views/panels/negocio/home.vue'),
      }
      

]