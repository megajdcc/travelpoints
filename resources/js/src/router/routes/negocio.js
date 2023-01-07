// Rutas de negocios
import store from '@/store'

export default [

      {
            path:'/negocio/home',
            name: 'negocio.home',
            beforeEnter:(to,from,next) => {

                  store.dispatch('negocio/cargarNegocio').then((negocio) => {

                        if(to.name !== from.name){
                              if (negocio.id) {
                                    next();
                              } else {
                                    next({ name: 'inicio' })
                              }
                        }
                      
                  }).catch(e => {
                        next({ name: 'inicio' })

                  })


            },

            meta: {
                  resource: 'home',
                  action: 'read',
                  layout:'negocio',
                  
            },
            component: () => import('views/panels/negocio/home.vue'),
      }
      

]