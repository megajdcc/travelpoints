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
      },


      {
            path:'/negocio/cargos',
            component:() => import('views/panels/negocio/cargos/index.vue'),
            children:[
                  
                  {
                        path:'',
                        component:() => import('views/panels/negocio/cargos/list.vue'),
                        name:'cargos.list',
                        meta:{
                              pageTitle:"Cargos",
                              resources:'cargos',
                              action:'read',
                              layout:'negocio',
                              breadcrumb:[
                                    {
                                          text:'Home',
                                          to:{name:'negocio.home'},
                                          active:false
                                    },
                                    {
                                          text: 'Cargos',
                                          active: true
                                    }
                              ]
                        }

                  },

                  {
                        path:'create',
                        name:'cargo.create',
                        component:() => import('views/panels/negocio/cargos/create.vue'),
                        meta:{
                              layout:'negocio',
                              resource:'cargos',
                              action:'write',
                              navActiveLink:'cargos.list',
                              pagetTitle:'Crear Cargo',
                              breadcrumb:[
                                    
                                    {
                                          text: 'Home',
                                          to: { name: 'negocio.home' },
                                          active: false
                                    },

                                    {
                                          text: 'Cargos',
                                          active: false,
                                          to:{name:'cargos.list'}
                                    },

                                    {
                                          text: 'Crear',
                                          active: true,
                                    }

                              ]
                        }
                  },

                  {
                        path: ':id/edit',
                        name: 'cargo.edit',
                        props:true,
                        component: () => import('views/panels/negocio/cargos/edit.vue'),
                        meta: {
                              layout: 'negocio',
                              resource: 'cargos',
                              action: 'update',
                              navActiveLink: 'cargos.list',
                              pagetTitle: 'Editar cargo',

                              breadcrumb: [

                                    {
                                          text: 'Home',
                                          to: { name: 'negocio.home' },
                                          active: false
                                    },

                                    {
                                          text: 'Cargos',
                                          active: false,
                                          to: { name: 'cargos.list' }
                                    },

                                    {
                                          text: 'Editar',
                                          active: true,
                                    }

                              ]
                        }
                  }


            ]
      }
      

]