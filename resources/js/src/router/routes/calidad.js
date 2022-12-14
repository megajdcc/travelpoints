export default [
   /*****************************************/
   /* SOCIO
   /*************************************** */
    {
    path: '/socio',
    name:'socio',
    component: () => import('views/socio'),
    children:[
      {
          path: 'perfil',
          name: 'perfil',
          component: () => import('views/socio/perfil'),
          meta: {
             resource: 'perfil',
             action: 'read',
             name:'perfil',
             layout:'travel'
             
            //  navActiveLink: 'socio'
          },

          children:[

             {
                path: '',
                name: 'miperfil',
                component: () => import('views/socio/perfil/datos'),
                meta: {

                   name: 'perfil',
                   layout: 'travel'

                   //  navActiveLink: 'socio'
                },
             },

             {
               path:'mi-cuenta',
               name:'micuenta',
               component:() => import('views/socio/perfil/cuenta.vue'),
               meta:{
                  name:'perfil',
                  resource:'micuenta',
                  action:'read',
                  layout:'travel',
               }
             },

             {
                path: 'invitados',
                name: 'misreferidos',
                component: () => import('views/socio/perfil/invitados'),
                meta: {
                   name: 'perfil',
                   layout: 'travel'

                   
                   //  navActiveLink: 'socio'
                },
             },

             {
                path: 'editar',
                name: 'perfil.editar',
                component: () => import('views/socio/perfil/editar'),
                meta: {
                   name: 'perfil',
                   layout: 'travel'

                   //  navActiveLink: 'socio'
                },
             },
             {
                path: 'contrasena',
                name: 'perfil.password',
                component: () => import('views/socio/perfil/CambiarPassword'),
                meta: {
                   name: 'perfil',
                   layout: 'travel'

                   //  navActiveLink: 'socio'
                },
             },

             {
                path: 'desactivar',
                name: 'perfil.desactivar',
                component: () => import('views/socio/perfil/desactivar'),
                meta: {
                   name: 'perfil',
                   layout: 'travel'

                   //  navActiveLink: 'socio'
                },
             },

          ]

       },
      //  negocio
       {
          path: 'negocio',
          name: 'socio.negocio',
          component: () => import('views/socio/negocio'),
          meta: {
             resource: 'perfil',
             action: 'read',
             name:'negocio',
             layout: 'travel'

            //  navActiveLink: 'socio'
          },

          children:[
            {
               path:'',
               name:'socio.negocio.list',
               component:()=> import('views/socio/negocio/list'),
                meta: {
                   name: 'negocio',
                   layout: 'travel'

                   //  navActiveLink: 'socio'
                },
            },
           
             {
                path: 'siguiente',
                name: 'socio.negocio.siguiendo',
                component: () => import('views/socio/negocio/siguiendo'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio',
                   layout: 'travel'


                },
             },
             {
                path: 'recomendados',
                name: 'socio.negocio.recomendados',
                component: () => import('views/socio/negocio/recomendados'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio',
                   layout: 'travel'


                },
             },
             {
                path: 'solicitudes',
                component: () => import('views/socio/negocio/solicitudes'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio',
                   layout: 'travel'
                },

                children:[
                  {
                     path:'',
                     component:()  => import('views/socio/negocio/solicitudes/list'),
                     name:'socio.negocio.solicitudes',
                     meta: {
                        navActiveLink: 'socio.negocio',
                        name: 'negocio',
                        layout: 'travel',
                     }
                        
                  },

                  {
                     path: 'afiliar',
                     name: 'socio.negocio.afiliar',
                     component: () => import('views/socio/negocio/solicitudes/create'),
                        meta: {
                           navActiveLink: 'socio.negocio',
                           name: 'negocio',
                           layout: 'travel'
                        },
                  },
                  
                  {
                     path:':id/edit',
                     props:true,
                     component:()  => import('views/socio/negocio/solicitudes/edit'),
                     name:'socio.negocio.solicitudes.edit',
                     meta: {
                        navActiveLink: 'socio.negocio',
                        name: 'negocio',
                        layout: 'travel',
                     }
                  }
                    
                ]
             }
          ]

       },
       // reservaciones
       {
          path: 'reservaciones',
          name: 'socio.reservaciones',
          component: () => import('views/socio/reservaciones'),
          meta: {
            resource: 'perfil',
            action: 'read',
            layout: 'travel'

            //  navActiveLink: 'socio'
          }

       },

      //  consumos

       {
          path: 'consumos',
          name: 'socio.consumos',
          component: () => import('views/socio/consumos'),
          meta: {
             resource: 'perfil',
             action: 'read',
             layout: 'travel'
            //  navActiveLink: 'socio'
          }

       },
      //  certificados
       {
          path: 'certificados',
          name: 'socio.certificados',
          component: () => import('views/socio/certificados'),
          meta: {
             resource: 'perfil',
             action: 'read',
             layout: 'travel'
            //  navActiveLink: 'socio'
          }

       },
      //  compras
       {
          path: 'compras',
          name: 'socio.compras',
          component: () => import('views/socio/compras'),
          meta: {
             resource: 'perfil',
             action: 'read',
             layout: 'travel'
            //  navActiveLink: 'socio'
          }

       }


    ]
  },

   /*****************************************/
   /* USUARIO
   /*************************************** */

   {
      path:'/usuarios',
      name:'usuarios',
      component: () => import(
         /*  webpackChunkName: "group-usuario"  */ 
         /* webpackPreload:true  */ 'views/usuarios'),

      children:[
         {
            path:'',
            name:'listar.usuarios',
            component: () => import(/*  webpackChunkName: "group-usuario" */ 'views/usuarios/lists'),
          
            meta:{
               resource: 'usuarios',
               action: 'read',
               pageTitle:'Usuarios',
               breadcrumb:[
                  {
                     text:'listado',
                     active:true
                  }
               ]
            }
         },
         {
            path:'create',
            name:'create.usuario',
            component: () => import( /*  webpackChunkName: "group-usuario" */ 'views/usuarios/create'),
           

            meta: {
               pageTitle: 'Agregar usuario',
               navActiveLink: 'listar.usuarios',
               resource: 'usuarios',
               action: 'write',
               breadcrumb: [

                  {
                     text: 'Usuarios',
                     active: false,
                     to: { name: 'listar.usuarios' }
                  },

                  {
                     text: 'crear',
                     active: true
                  }
               ]
            }
            

         },
         {
            path: ':id/edit',
            props:true,
            name: 'edit.usuario',
            component: () => import( /*  webpackChunkName: "group-usuario" */ 'views/usuarios/edit'),
            

            meta: {
               pageTitle: 'Editar usuario',
               navActiveLink: 'listar.usuarios',
               resource: 'usuarios',
               action: 'update',
               breadcrumb: [

                  {
                     text: 'Usuarios',
                     active: false,
                     to: { name: 'listar.usuarios' }
                  },

                  {
                     text: 'editar',
                     active: true
                  }
               ]
            }


         }
      ]
   },

   /*****************************************/
   /* Movimientos de Cuentas
   /*************************************** */
   {
      path:'/movimientos',
      component:() => import('views/movimientos/index.vue'),
      children:[
         {
            path:'',
            component:() => import('views/socio/perfil/cuenta.vue'),
            name:'movimientos',
            meta:{
               resources:'movimientos',
               action:'read'
            }

         }
      ]

      
   },

   /*****************************************/
   /* Iatas
   /*************************************** */

   {
      path:'/iatas',
      component:() => import('views/iatas/index.vue'),
      name:'iata',
      children:[
         {
            path:'',
            component:() => import('views/iatas/lists.vue'),
            name:'iata.lists',
            meta:{
               resource:'iatas',
               action:'read',
               pageTitle:'Códigos IATA',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false,
                  },
                  {
                     text:'Listado de Iatas',
                     active:true
                  }
               ]
            }
         },

         {
            path: 'create',
            component: () => import('views/iatas/create.vue'),
            name: 'iata.create',

            meta: {
               resource: 'iatas',
               action: 'write',
               pageTitle: 'Registrar Código Iata',
               navActiveLink:'iata.lists',

               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Listado de Código IATA',
                     active: false,
                     to:{name:'iata.lists'}

                  },
                  {
                     text: 'Registrar nuevo Iata',
                     active: true,

                  }
               ]
            }
         },
         {
            path: ':id/edit',
            component: () => import('views/iatas/edit.vue'),
            name: 'iata.edit',
            props:true,
            meta: {
               resource: 'iatas',
               action: 'update',
               pageTitle: 'Actualizar Código Iata',
               navActiveLink: 'iata.lists',

               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Listado de Códigos IATA',
                     active: false,
                     to: { name: 'iata.lists' }

                  },
                  {
                     text: 'Actualizar nuevo Iata',
                     active: true,

                  }
               ]
            }
         }

      ]
   },


   /*****************************************/
   /* Destinos
   /*************************************** */
   {
      path:'/destinos',
      component:() => import('views/destinos/index.vue'),

      children:[

         {
            path:'',
            component:() => import('views/destinos/lists.vue'),
            name:'destino.lists',
            meta:{
               resource:'destinos',
               action:'read',

               pageTitle:'Destinos',

               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },
                  {
                     text:'Destinos',
                     active:true
                  }
               ]
            }

         },
         {
            path:'create',
            name:'create.destino',
            component:() => import('views/destinos/create.vue'),

            meta:{
               pageTitle:'Registrar Destino',
               navActiveLink:'destino.lists',
               resource:'destinos',
               action:'write',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Destinos',
                     active: false,
                     to:{name:'destino.lists'},

                  },
                  {
                     text:'Crear Registro',
                     active:true
                  }
               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.destino',
            props:true,
            component: () => import('views/destinos/edit.vue'),
            meta: {
               pageTitle: 'Registrar Destino',
               navActiveLink: 'destino.lists',
               resource: 'destinos',
               action: 'write',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Destinos',
                     active: false,
                     to: { name: 'destino.lists' },

                  },
                  {
                     text: 'Crear Registro',
                     active: true
                  }
               ]
            }
         },

         {
            path: ':id/imagenes',
            name: 'imagenes.destino',
            props: true,
            component: () => import('views/destinos/FormImagen.vue'),
            meta: {
               pageTitle: 'Imagenes de Destino',
               navActiveLink: 'destino.lists',
               resource: 'destinos',
               action: 'write',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Destinos',
                     active: false,
                     to: { name: 'destino.lists' },

                  },
                  {
                     text: 'Imagenes',
                     active: true
                  }
               ]
            }
         },

         
      ]
   },



   /*****************************************/
   /* Atracciones
   /*************************************** */
   {
      path: '/atracciones',
      component: () => import('views/destinos/atracciones/index.vue'),
      props: true,
      children: [
         {
            path: ':destino',
            props:true,
            name: 'atracciones.lists',
            component: () => import('views/destinos/atracciones/lists.vue'),
            meta: {
               resource: 'atracciones',
               action: 'read',
               pageTitle: 'Atracciones de Destinos',
               navActiveLink: 'destino.lists',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Atracciones',
                     active: true
                  }
               ]
            }
         },

         {
            path: ':destino/create',
            props: true,
            name: 'create.atraccion',
            component: () => import('views/destinos/atracciones/create.vue'),
            meta: {
               resource: 'atracciones',
               action: 'write',
               pageTitle: 'Crear Atracción',
               navActiveLink: 'destino.lists',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },
                  {
                     text: 'Atracciones',
                     to: { name: 'atracciones.lists' },
                     active: false,
                  },
                  {
                     text: 'Crear',
                     active: true
                  }
               ]
            }
         },

          {
            path: ':id/edit',
            props: true,
            name: 'edit.atraccion',
            component: () => import('views/destinos/atracciones/edit.vue'),
            meta: {
               resource: 'atracciones',
               action: 'write',
               pageTitle: 'Actualizar Atracción',
               navActiveLink: 'destino.lists',
               breadcrumb: [

                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Atracciones',
                     active: false,
                  },

                  {
                     text: 'Actualizar',
                     active: true
                  }

               ]
            }
         },

         {
            path: ':id/imagenes',
            name: 'imagenes.atraccion',
            props: true,
            component: () => import('views/destinos/atracciones/FormImagen.vue'),
            meta: {
               pageTitle: 'Imagenes de Atracción',
               navActiveLink: 'destino.lists',
               resource: 'atracciones',
               action: 'write',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Destinos',
                     active: false,
                     to: { name: 'destino.lists' },

                  },

                  {
                     text: 'Atracciones',
                     active: false,
                  },

                  {
                     text: 'Imagenes',
                     active: true
                  }
               ]
            }
         },
         // Horarios de Atracciones
         {
            path:':id/horarios',
            component:() => import('views/destinos/atracciones/horarios.vue'),
            name:'atraccion.horarios',
            props:true,
            meta:{
               resource:'horarios',
               action:'read',
               pageTitle:'Horarios de Atracción',
               navActiveLink:'destino.lists',

               breadcrumb:[
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Destinos',
                     active: false,
                     to: { name: 'destino.lists' },

                  },

                  {
                     text: 'Atracciones',
                     active: false,
                  },

                  {
                     text: 'Horarios',
                     active: true
                  }
               ]
            }
         }


      ]
   },


   /*****************************************/
   /* Eventos
   /*************************************** */
   {
      path:'/eventos',
      component:() => import('views/eventos/index.vue'),
      children:[
         {
            path:'',
            name:'eventos.list',
            component:() => import('views/eventos/lists.vue'),
            meta:{
               
               pageTitle:'Eventos',
               resource:'eventos',
               action:'read',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },
                  {
                     text:'Eventos',
                     active:true
                  }
               ]
            }
         },

         {
            path: 'create',
            name: 'create.evento',
            component: () => import('views/eventos/create.vue'),
            meta: {

               pageTitle: 'Eventos',
               resource: 'eventos',
               action: 'write',
               navActiveLink:'eventos.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Eventos',
                     to:{name:'eventos.list'},
                     active: false,
                  },

                  {
                     text:'Crear',
                     active:true
                  }
               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.evento',
            props:true,
            component: () => import('views/eventos/edit.vue'),
            meta: {

               pageTitle: 'Eventos',
               resource: 'eventos',
               action: 'update',
               navActiveLink: 'eventos.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Eventos',
                     to: { name: 'eventos.list' },
                     active: false,
                  },

                  {
                     text: 'Actualizar',
                     active: true
                  }
               ]
            }
         },

         {
            path: ':id/imagenes',
            name: 'evento.imagenes',
            props: true,
            component: () => import('views/eventos/imagenes.vue'),
            meta: {

               pageTitle: 'Eventos',
               resource: 'eventos',
               action: 'update',
               navActiveLink: 'eventos.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Eventos',
                     to: { name: 'eventos.list' },
                     active: false,
                  },

                  {
                     text: 'Imagenes',
                     active: true
                  }
               ]
            }
         }


      ]
   },




   /*****************************************/
   /* ROL DE USUARIO
   /*************************************** */

   {
      path: '/roles',
      name: 'roles',
      component: () => import(  'views/roles'),
      exact:false,
      children: [
         {
            path: '',
            name: 'listar.roles',
            component: () => import('views/roles/lists'),
            meta: {
               pageTitle: 'Rol de usuarios',
               breadcrumb: [
                  {
                     text: 'Listado',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'read'
            }
         },
         {
            path: 'create',
            name: 'create.role',
            component: () => import('views/roles/create'),
            meta: {
               pageTitle: 'Crear Rol',
               navActiveLink:'listar.roles',
               breadcrumb: [
                  {
                     text: 'Rol de usuarios',
                     active: false,
                     to: { name: 'listar.roles' }
                  },

                  {
                     text: 'Crear',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'write'
            }
         },
         {
            path: ':id/edit',
            props:true,
            name: 'edit.role',
            component: () => import('views/roles/edit'),
            meta: {
               pageTitle: 'Editar Rol',
               navActiveLink: 'listar.roles',
               breadcrumb: [
                  {
                     text: 'Rol de usuarios',
                     active: false,
                     to: { name: 'listar.roles' }
                  },

                  {
                     text: 'Editar',
                     active: true,
                  },
               ],
               resource: 'roles',
               action: 'update'
            }
         },

      ]
   },


   /*****************************************/
   /* PERMISOS DE USUARIO
   /*************************************** */

   {
      path: '/permisos',
      name: 'permisos',

      component: () => import('views/permisos'),

      exact: false,
      children: [
         {
            path: '',
            name: 'listar.permisos',
            component: () => import('views/permisos/lists'),
            meta: {
               pageTitle: 'Permisos de usuario',
               breadcrumb: [
                  {
                     text: 'Listado',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'read'
            }
         },
         {
            path: 'create',
            name: 'create.permiso',
            component: () => import('views/permisos/create'),
            meta: {
               pageTitle: 'Crear Permiso',
               navActiveLink: 'listar.permisos',
               breadcrumb: [
                  {
                     text: 'Permisos de usuario',
                     active: false,
                     to: { name: 'listar.permisos' }
                  },

                  {
                     text: 'Crear',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'write'
            }
         },
         {
            path: ':id/edit',
            props: true,
            name: 'edit.permiso',
            component: () => import('views/permisos/edit'),
            meta: {
               pageTitle: 'Editar Permiso',
               navActiveLink: 'listar.permisos',
               breadcrumb: [
                  {
                     text: 'Permisos de usuario',
                     active: false,
                     to: { name: 'listar.permisos' }
                  },

                  {
                     text: 'Editar',
                     active: true,
                  },
               ],
               resource: 'permisos',
               action: 'update'
            }
         },

         

      ]
   },


   /*****************************************/
   /* LINK DE REFERIDO
   /*************************************** */
   {
      path:'/register/:codigo?',
      props:true,
      component:() => import('views/auth/registro'),
      name:'registro.referido',
      meta:{
         layout:'full',
         resource:'Auth',
         action:'read'
      }


   },

   /*****************************************/
   /* LINK DE REGISTRO
   /*************************************** */
    {
      path:'/register',
      props:true,
      component:() => import('views/auth/registro'),
      name:'register',
      meta:{
         layout:'full',
         resource:'Auth',
         action:'read'
      }

   },


   /*****************************************/
   /* Preguntas Frecuentes FAQs
   /*************************************** */
   {
      path: '/configuracion/faqs',
      component: () => import('views/faqs'),
      name: 'configuracion.faq',
      children:[
         {
            path:'',
            name:'listar.faqs',
            component:() => import('views/faqs/list'),
            meta:{
               pageTitle:'Preguntas Frecuentes',
               resource:'faqs',
               action:'read',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },
                  {
                     text: 'Preguntas frecuentes',
                     active: true
                  }

               ]
            }
         },

         {
            path: 'create',
            name: 'create.faq',
            component: () => import('views/faqs/create'),
            meta: {
               pageTitle: 'Crear pregunta Frecuente',
               resource: 'faqs',
               action: 'write',
               navActiveLink:'listar.faqs',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Preguntas frecuentes',
                     to: { name: 'listar.faqs' },
                     active:false
                  },
                  {
                     text: 'Crear',
                     active: true
                  }

               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.faq',
            props:true,
            component: () => import('views/faqs/edit'),
            meta: {
               pageTitle: 'Editar pregunta Frecuente',
               resource: 'faqs',
               action: 'update',
               navActiveLink: 'listar.faqs',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Preguntas frecuentes',
                     to: { name: 'listar.faqs' },
                     active: false
                  },
                  {
                     text: 'Atualizar',
                     active: true
                  }

               ]
            }
         }


      ]
   },

   /*****************************************/
   /* Categoría de Faqs
   /*************************************** */

   {
      path: '/configuracion/categorias-faqs',
      component: () => import('views/faqs'),
      name: 'configuracion.categorias-faq',
      children: [
         {
            path: '',
            name: 'listar.categoria-faqs',
            component: () => import('views/faqs/categorias/list'),
            meta: {
               pageTitle: 'Categorías de Preguntas Frecuentes (Faqs)',
               resource: 'faqs',
               action: 'read',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Categorías',
                     active: true
                  }

               ]
            }
         },

         {
            path: 'create',
            name: 'create.categoria-faq',
            component: () => import('views/faqs/categorias/create'),
            meta: {
               pageTitle: 'Crear categoría',
               resource: 'faqs',
               action: 'write',
               navActiveLink: 'listar.categoria-faqs',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Categoría de Peguntas frecuentes',
                     to: { name: 'listar.categoria-faqs' },
                     active: false
                  },
                  {
                     text: 'Crear',
                     active: true
                  }

               ]
            }
         },

         {
            path: ':id/edit',
            props:true,
            name: 'edit.categoria-faq',
            component: () => import('views/faqs/categorias/edit'),
            meta: {
               pageTitle: 'Editar Categoría',
               resource: 'faqs',
               action: 'update',
               navActiveLink: 'listar.categoria-faqs',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Categoría de Peguntas frecuentes',
                     to: { name: 'listar.categoria-faqs' },
                     active: false
                  },
                  {
                     text: 'Atualizar',
                     active: true
                  }

               ]
            }
         }


      ]
   },


   {
      path: '/faqs',
      component: () => import('views/paginas/faqs'),
      name: 'faqs',
      meta: {
         layout  : 'travel',
         resource: 'Auth',
         action  : 'read'
      }

   },


   /*****************************************/
   /* Categoría de Negocios
   /*************************************** */

   {
      path:'/negocios/categorias',
      component:()=> import('views/negocios/categorias'),
      children:[
         {
            path:'',
            name:'negocio.categorias.list',
            component:() => import('views/negocios/categorias/list'),
            meta:{
               resource:'negocio categorías',
               action:'read',
               pageTitle:'Categorías de negocios',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },
                  {
                     text: 'Categorías',
                     active: true
                  }

               ]
            }
         },

         {
            path: 'create',
            name: 'negocio.categorias.create',
            component: () => import('views/negocios/categorias/create'),
            meta: {
               resource: 'negocio categorías',
               action: 'write',
               pageTitle: 'Crear categoría',
               navActiveLink:'negocio.categorias.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Categorías',
                     to: { name: 'negocio.categorias.list' },
                     active: false
                  },

                  {
                     text: 'crear',
                     active: true
                  }

               ]
            }
         },
         {
            path: ':id/edit',
            name: 'negocio.categorias.edit',
            props:true,
            component: () => import('views/negocios/categorias/edit'),
            meta: {
               resource: 'negocio categorías',
               action: 'update',
               pageTitle: 'Editar categoría',
               navActiveLink:'negocio.categorias.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Categorías',
                     to: { name: 'negocio.categorias.list' },
                     active: false
                  },
                  {
                     text: 'editar',
                     active: true
                  }

               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Solicitudes de negocios
   /*************************************** */

   {
      path:'/negocios/solicitudes',
      component:() => import('views/negocios/solicitudes'),
      children:[
         {
            path:'',
            name:'listar.solicitudes.negocios',
            component:() => import('views/negocios/solicitudes/list'),

            meta:{
               pageTitle:'Solicitudes de negocios',
               resource:'solicitudes',
               action:'read',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },

                  {
                     text: 'Solicitudes',
                     active: true
                  }
               ]
            }
         },
         {
            path: ':id/show',
            props:true,
            name: 'negocio.solicitud.show',
            component: () => import('views/negocios/solicitudes/edit'),

            meta: {
               // pageTitle: 'Solicitud de negocio',
               resource: 'solicitudes',
               action: 'read',
               navActiveLink:'listar.solicitudes.negocios',

               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Solicitudes',
                     active: false,
                     to: { name:'listar.solicitudes.negocios'}
                  },
                  {
                     text: 'Ver solicitud',
                     active: true
                  }
               ]
            }
         }
      ]
   },


   /*****************************************/
   /* Divisas
   /*************************************** */
   {
      path:'/divisas',
      name:'divisas',
      component:() => import('views/divisas/index.vue'),

      children:[
         {
            path:'',
            name:'divisas.list',
            component:() => import('views/divisas/list.vue'),
            meta:{
               pageTitle:'Divisas',
               resource:'divisas',
               action:'read',

               breadcrumb:[
                  {
                     text:'Home',
                     to:'home',
                     active:false,
                  },
                  {
                     text:'Listado',
                     active:true
                  }
               ]
            }
         },

         {
            path: 'create',
            name: 'create.divisa',
            component: () => import('views/divisas/create.vue'),
            meta: {
               pageTitle: 'Divisas',
               resource: 'divisas',
               action: 'write',
               navActiveLink:'divisas.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Listado',
                     active: false,
                     to: {name:'divisas.list'},

                  },
                  {
                     text: 'Crear',
                     active: true,

                  }
               ]
            }
         },

         {
            
            path:':id/edit',
            name:'divisa.edit',
            props:true,
            component: () => import('views/divisas/edit.vue'),

            meta: {
               pageTitle: 'Divisas',
               resource: 'divisas',
               action: 'update',
               navActiveLink: 'divisas.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Listado',
                     active: false,
                     to: { name: 'divisas.list' },
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



   /*****************************************/
   /* PAGINA DE Mantenimiento
   /*************************************** */
   {
      path:'/mantenimiento',
      name:'show.mantenimiento',
      component:() => import('views/mantenimiento/index.vue'),
      meta:{
         layout:'full',
      }
   },
   
]
