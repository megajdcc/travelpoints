
import store from '@/store'

export default [
   {
      path: '/',
      name: 'inicio',
      component: () => import('views/paginas/index.vue'),
      meta: {
        layout:'travel',
         resource: 'Auth',

      },

      
   },

    {
      path: '/que-es-travel-points',
      name: 'about',
      component: () => import('views/paginas/about'),
      meta: {
        layout:'travel',
         resource: 'Auth',
         pageTitle:'Acerca de Travel Points (about)',
         breadcrumb:[
            {
               text:'Home',
               to:{name:'inicio'},
               active:false,
            },

            {
               text:'About',
               to:{name:'about'},
               active:true,
            }

         ]
      },
      
   },

   {
      path: '/porque-afiliar-mi-negocio',
      name: 'negocio.about',
      component: () => import('views/paginas/aboutNegocio'),
      meta: {
         layout: 'travel',
         resource: 'Auth',
         pageTitle: 'Porque afiliar mi negocio',
         breadcrumb: [
            {
               text: 'Home',
               to: { name: 'inicio' },
               active: false,
            },

            {
               text: 'Porque afiliar mi negocio',
               active: true,
            }

         ]
      },

   },

    {
      path: '/politicas-privacidad',
      name: 'politicas.privacidad',
      component: () => import('views/paginas/politicas'),
      meta: {
         layout: 'travel',
         resource: 'Auth',
         pageTitle: 'Políticas de privacidad',
         breadcrumb: [
            {
               text: 'Home',
               to: { name: 'inicio' },
               active: false,
            },

            {
               text: 'Políticas',
               active: true,
            }

         ]
      },

   },

   {
      path: '/terminos-y-condiciones',
      name: 'terminos-condiciones',
      component: () => import('views/paginas/terminosCondiciones'),
      meta: {
         layout: 'travel',
         resource: 'Auth',
         pageTitle: 'Términos y Condiciones',
         breadcrumb: [
            {
               text: 'Home',
               to: { name: 'inicio' },
               active: false,
            },

            {
               text: 'para usuarios Turistas',
               active: true,
            }

         ]
      },

   },


   {
      path:'/search',
      component:() => import('views/paginas/Search.vue'),
      props:(route) => ({query:route.query.q}),
      name:'searchResult',
      meta:{
         resource:'Auth',
         layout:'travel'
      }
   },

   {
      path: '/Destinos',
      component: () => import('views/paginas/DestinoPerfil.vue'),
      props: (route) => ({ query: route.query.q }),
      name: 'destino.perfil',

      beforeEnter:(to,from,next) => {
         store.dispatch('destino/fetchName',to.query.q).then(({result}) => {
            if(result){
               next()
            }else{
              next({name:'inicio'})
            }


         }).catch(e => {
            console.log(e)
            next({ name: 'inicio' })
         })

      },

      meta: {
         resource: 'Auth',
         layout: 'travel'
      }
   },

   // Atraccions
   {
      path: '/Atraccions',
      component: () => import('views/paginas/AtraccionPerfil.vue'),
      props: (route) => ({ query: route.query.q }),
      name: 'atraccion.perfil',

      beforeEnter: (to, from, next) => {
         store.dispatch('atraccion/fetchName', to.query.q).then(({ result }) => {
          
            if (result) {
               next()
            } else {
               next({ name: 'inicio' })
            }


         }).catch(e => {
            console.log(e)
            next({ name: 'inicio' })
         })

      },

      meta: {
         resource: 'Auth',
         layout: 'travel'
      }
   }




]
