
import store from '@/store'
import Inicio from 'views/paginas/index.vue'
export default [
   {
      path: '/',
      name: 'inicio',
      component:Inicio,
      meta: {
        layout:'travel',
         resource: 'Auth',
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
               
               if(to.name !== from.name){
                  next()
               }
               
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
   },


   // Tienda de Regalos

   {
      path:"/tienda-travel",
      component: () => import('views/paginas/TiendaTravel.vue'),
      name:'tienda.travel',
      meta: {
         resource: 'Auth',
         layout: 'travel',
         pageTitle:'Tienda de Regalos',
         breadcrumb:[
            {text:'Listado',active:true}
         ]
      }

   },
   {
      path:'/tienda-travel/producto/:id?/show',
      component:() => import('views/paginas/PerfilProducto.vue'),
      props:true,
      name:'tienda.travel.show.producto',
      meta: {
         resource: 'Auth',
         layout: 'travel',
         pageTitle: 'Producto',
         breadcrumb: [
            { text: 'Listado', active: false,to:{name:'tienda.travel'} },
            { text: 'Perfil', active: true },

         ]
      }
   },


   // Afiliación de negocio

   {
      path:'/negocios/asociarme/invitacion/:invitacion_id',
      name:'negocio.invitacion.afiliar',
      component: () => import('views/negocios-invitados/afiliarme.vue'),
      props:true,
      beforeEnter: (to, from, next) => {
         
         store.dispatch('invitacion/fetch',to.params.invitacion_id).then((data) => {
             if(data){
               next()
            }else{
               toast.info('La invitación ya no está disponible')
               next(`/inicio`)
            }  
         }).catch(e => {
                next(`/inicio`)
         })

        
      },
      meta:{
         resource:'Auth',
         layout:'full',
      }
      
   }

]
