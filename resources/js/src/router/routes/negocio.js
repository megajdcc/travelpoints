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
      },

      /***************************************
       *    Información del Negocio
       * *************************************/

      {
            
            path:'/negocio/preferencias/informacion',
            component:() => import('views/panels/negocio/preferencias/informacion.vue'),
            name:'negocio.informacion',

            meta:{
                  resource:"preferencias negocio",
                  action:'update',
                  layout:'negocio',
                  pageTitle:'Información del negocio',
                  breadcrumb:[
                        {
                              text:'Home',
                              to:{name:'home'},
                              active:false
                        },

                        {
                              text: 'Preferencias',
                              active: true
                        }
                  ]
            }

      },

       /***************************************
       *    Logo y Portada
       * *************************************/

      {
            path:'/negocio/preferencias/logo-y-portada',
            name:'negocio.logo',
            component:() => import('views/panels/negocio/preferencias/Logo.vue'),

            meta:{
                  
                  resource:'preferencias negocio',
                  action:"read",
                  layout:'negocio',
                  pageTitle:'Logo y Portada',
                  breadcrumb:[
                        {
                              text: 'Home',
                              to: { name: 'home' },
                              active: false
                        },

                        {
                              text: 'Logo y Portada',
                              active: true
                        }
                  ]

            }
      },


      /***************************************
      *    Horario del Negocio
      * *************************************/

      {
            path:'/negocio/preferencias/horarios',
            component:() => import('views/panels/negocio/preferencias/Horario.vue'),
            name:'negocio.horario',
            meta:{
                  pageTitle:'Horario del Negocio',
                  resource:'preferencias negocio',
                  action:'read',
                  layout:'negocio',
                  breadcrumb:[
                        {
                              text: 'Home',
                              to: { name: 'home' },
                              active: false
                        },

                        {
                              text: 'Horario',
                              active: true
                        }
                  ]
            }

      },

      /***************************************
       *    Amenidades y Formas de Pago
       * *************************************/

      {
            path: '/negocio/preferencias/amenidades',
            component: () => import('views/panels/negocio/preferencias/Amenidades.vue'),
            name: 'negocio.amenidades',
            meta: {
                  pageTitle: 'Amenidades y Formas de Pago',
                  resource: 'preferencias negocio',
                  action: 'read',
                  layout: 'negocio',
                  breadcrumb: [
                        {
                              text: 'Home',
                              to: { name: 'home' },
                              active: false
                        },

                        {
                              text: 'Amenidades y Formas de Pago',
                              active: true
                        }
                  ]
            }

      },


      /***************************************
       *    Divisa predeterminada Negocio
       * *************************************/

      {
            path:'/negocio/preferencias/divisa',
            component: () => import('views/panels/negocio/preferencias/Divisa.vue'),

            name:'negocio.divisa',
            meta:{
                  resource: 'preferencias negocio',
                  pageTitle:'Divisa Predeterminada',
                  action:'read',

                  layout: 'negocio',
                  breadcrumb: [
                        {
                              text: 'Home',
                              to: { name: 'home' },
                              active: false
                        },

                        {
                              text: 'Divisa',
                              active: true
                        }
                  ]
            }


      },

      /***************************************
       *    Redes sociales de Negocios
       * *************************************/

      {
            path: '/negocio/preferencias/redes',
            component: () => import('views/panels/negocio/preferencias/redes.vue'),

            name: 'negocio.redes',
            meta: {
                  resource: 'preferencias negocio',
                  pageTitle: 'Redes Sociales',
                  action: 'read',

                  layout: 'negocio',
                  breadcrumb: [
                        {
                              text: 'Home',
                              to: { name: 'home' },
                              active: false
                        },

                        {
                              text: 'Redes',
                              active: true
                        }
                  ]
            }


      },

      /***************************************
      *    Videos de Negocio
      * *************************************/

      {
            path: '/negocio/preferencias/videos',
            component: () => import('views/panels/negocio/preferencias/videos.vue'),

            name: 'negocio.video',
            meta: {
                  resource: 'preferencias negocio',
                  pageTitle: 'Video del negocio',
                  action: 'read',
                  layout: 'negocio',
                  breadcrumb: [
                        {
                              text: 'Home',
                              to: { name: 'home' },
                              active: false
                        },

                        {
                              text: 'Video del negocio',
                              active: true
                        }
                  ]
            }


      },

      /***************************************
      *    Galerias de Negocio
      * *************************************/
      {
            path: '/negocio/galerias',
            component: () => import('views/panels/negocio/galeria.vue'),

            name: 'negocio.galerias',
            meta: {
                  resource: 'galerias negocio',
                  pageTitle: 'Galería de Imagenes',
                  action: 'read',
                  layout: 'negocio',
                  breadcrumb: [
                        {
                              text: 'Home',
                              to: { name: 'home' },
                              active: false
                        },

                        {
                              text: 'Galerías de imagenes',
                              active: true
                        }
                  ]
            }

      },

      /***************************************
    *    Publicaciones  de Negocio
    * *************************************/
      {
            path: '/negocio/publicaciones',
            component: () => import('views/publicaciones/index.vue'),

            children:[
                  {
                        path:'',
                        name:"negocio.publicaciones",
                        component:() => import('views/publicaciones/list.vue'),
                        meta:{
                              layout:'negocio',
                              resource:'publicaciones negocio',
                              pageTitle: 'Publicaciones',
                              action: 'read',
                              breadcrumb: [
                                    {
                                          text: 'Home',
                                          to: { name: 'home' },
                                          active: false
                                    },

                                    {
                                          text: 'Publicaciones',
                                          active: true
                                    }
                              ]

                        }

                  },


                  {
                        path: 'create',
                        name: "negocio.publicacion.create",
                        component: () => import('views/publicaciones/create.vue'),
                        meta: {
                              layout: 'negocio',
                              resource: 'publicaciones negocio',
                              pageTitle: 'Crear Publicación',
                              navActiveLink:'negocio.publicaciones',
                              action: 'write',
                              breadcrumb: [
                                    {
                                          text: 'Home',
                                          to: { name: 'home' },
                                          active: false
                                    },

                                    {
                                          text: 'Publicaciones',
                                          active: false,
                                          to:{name:'negocio.publicaciones'}
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
                        props:true,
                        name: "negocio.publicacion.edit",
                        component: () => import('views/publicaciones/edit.vue'),
                        meta: {
                              layout: 'negocio',
                              resource: 'publicaciones negocio',
                              pageTitle: 'Editar Publicación',
                              navActiveLink:'negocio.publicaciones',
                              action: 'update',
                              breadcrumb: [
                                    {
                                          text: 'Home',
                                          to: { name: 'home' },
                                          active: false
                                    },

                                    {
                                          text: 'Publicaciones',
                                          active: false,
                                          to:{name:'negocio.publicaciones'}
                                    },
                                    {
                                          text: 'Editar',
                                          active: true,
                                    }
                              ]

                        }

                  },


                  {
                        path: ':id/imagenes',
                        props: true,
                        name: "negocio.publicacion.imagenes",
                        component: () => import('views/publicaciones/imagenes.vue'),
                        meta: {
                              layout: 'negocio',
                              resource: 'publicaciones negocio',
                              pageTitle: 'Imagenes de Publicación',
                              navActiveLink: 'negocio.publicaciones',
                              action: 'update',
                              breadcrumb: [
                                    {
                                          text: 'Home',
                                          to: { name: 'home' },
                                          active: false
                                    },

                                    {
                                          text: 'Publicaciones',
                                          active: false,
                                          to: { name: 'negocio.publicaciones' }
                                    },
                                    {
                                          text: 'Imagenes',
                                          active: true,
                                    }
                              ]

                        }

                  }


            ]
          

      }



]