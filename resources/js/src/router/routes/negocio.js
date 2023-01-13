// Rutas de negocios
import store from '@/store'

export default [

      {
            path:'/negocio/home',
            name: 'negocio.home',
            meta: {
                  resource:'home negocio',
                  action:'read',
                  layout:'negocio',
            },
            component: () => import('views/panels/negocio/home.vue'),
      },

      /***************************************
       *    Cargos Negocio
       * *************************************/
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
                              resources:'cargos negocio',
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
                              resource:'cargos negocio',
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
                              resource: 'cargos negocio',
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
      },

      /***************************************
       *    Personal Negocio
       * *************************************/

      {
            path:'/negocio/personal',
            component:() => import('views/panels/negocio/personal/index.vue'),
            children:[
                  {
                        path:'',
                        name:'personal.list',
                        component:() => import('views/panels/negocio/personal/list.vue'),
                        meta:{
                              pageTitle:'Personal',
                              resource:'personal negocio',
                              action:'read',
                              layout:'negocio',
                              breadcrumb:[
                                    {
                                          text: 'Home',
                                          to: { name: 'negocio.home' },
                                          active: false
                                    },
                                    {
                                          text: 'Personal',
                                          active: true
                                    }
                              ]
                        }

                  },

                  {
                        path: 'create',
                        name: 'personal.create',
                        component: () => import('views/panels/negocio/personal/create.vue'),
                        meta: {
                              pageTitle: 'Asociar Personal',
                              resource: 'personal negocio',
                              action: 'write',
                              layout: 'negocio',
                              navActiveLink:'personal.list',
                              breadcrumb: [
                                    {
                                          text: 'Home',
                                          to: { name: 'negocio.home' },
                                          active: false
                                    },
                                    {
                                          text: 'Personal',
                                          active: false,
                                          to:{name:'personal.list'}
                                    },
                                    {
                                          text: 'Asociar',
                                          active: true,
                                    }
                              ]
                        }

                  },


                  {
                        path: ':id/edit',
                        name: 'personal.edit',
                        props:true,
                        component: () => import('views/panels/negocio/personal/edit.vue'),
                        meta: {
                              pageTitle: 'Editar Personal',
                              resource: 'personal negocio',
                              action: 'update',
                              layout: 'negocio',
                              navActiveLink: 'personal.list',
                              breadcrumb: [
                                    {
                                          text: 'Home',
                                          to: { name: 'negocio.home' },
                                          active: false
                                    },
                                    {
                                          text: 'Personal',
                                          active: false,
                                          to: { name: 'personal.list' }
                                    },
                                    {
                                          text: 'Actualizar Personal',
                                          active: true,
                                    }
                              ]
                        }

                  }


            ]
      }

]