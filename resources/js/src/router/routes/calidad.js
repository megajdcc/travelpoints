import store from '@/store';

export default [

   /*****************************************/
   /* MI Perfil
   /*************************************** */

   {
      path:'/perfil',
      name: 'mi-perfil',
      component: () => import('views/perfil/index.vue'),
      meta: {
         pageTitle: 'Mi perfil',
         resource: 'perfil',
         action: 'read',
         breadcrumb: [
         {
            text: 'Configuración de perfil',
            active: true,
         },
         ],
      },
   },

   /*****************************************/
   /* SOCIO
   /*************************************** */
   {
    path: '/socio',
   //  name:'socio',
    component: () => import('views/socio/index.vue'),
    children:[
      {
          path: 'perfil',
         //  name: 'perfil',
          component: () => import('views/socio/perfil/index.vue'),
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
                component: () => import('views/socio/perfil/datos.vue'),
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

               path:'mi-tarjetas',
               name:'mi.tarjetas',
               component:() => import('views/socio/perfil/tarjetas.vue'),
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
                component: () => import('views/socio/perfil/invitados/index.vue'),
                meta: {
                   name: 'perfil',
                   layout: 'travel'
                   //  navActiveLink: 'socio'
                },
             },

             {
                path: 'editar',
                name: 'perfil.editar',
                component: () => import('views/socio/perfil/editar.vue'),
                meta: {
                   name: 'perfil',
                   layout: 'travel'

                   //  navActiveLink: 'socio'
                },
             },

             {
                path: 'datos-pago',
                name: 'perfil.datos_pago',
                component: () => import('views/socio/perfil/datosPago.vue'),
                meta: {
                   name: 'perfil',
                   layout: 'travel'
                },
             },

             {
                path: 'contrasena',
                name: 'perfil.password',
                component: () => import('views/socio/perfil/CambiarPassword.vue'),
                meta: {
                   name: 'perfil',
                   layout: 'travel'

                   //  navActiveLink: 'socio'
                },
             },

             {
                path: 'desactivar',
                name: 'perfil.desactivar',
                component: () => import('views/socio/perfil/desactivar.vue'),
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
         //  name: 'socio.negocio',
          component: () => import('views/socio/negocio/index.vue'),
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
               component:()=> import('views/socio/negocio/list.vue'),
                meta: {
                   name: 'negocio',
                   layout: 'travel'

                   //  navActiveLink: 'socio'
                },
            },
           
             {
                path: 'siguiente',
                name: 'socio.negocio.siguiendo',
                component: () => import('views/socio/negocio/siguiendo.vue'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio',
                   layout: 'travel'


                },
             },
             {
                path: 'recomendados',
                name: 'socio.negocio.recomendados',
                component: () => import('views/socio/negocio/recomendados.vue'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio',
                   layout: 'travel'


                },
             },
             {
                path: 'solicitudes',
                component: () => import('views/socio/negocio/solicitudes/index.vue'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio',
                   layout: 'travel'
                },

                children:[
                  {
                     path:'',
                     component:()  => import('views/socio/negocio/solicitudes/list.vue'),
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
                     component: () => import('views/socio/negocio/solicitudes/create.vue'),
                        meta: {
                           navActiveLink: 'socio.negocio',
                           name: 'negocio',
                           layout: 'travel'
                        },
                  },
                  
                  {
                     path:':id/edit',
                     props:true,
                     component:()  => import('views/socio/negocio/solicitudes/edit.vue'),
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
          path: '/socio/reservaciones',
          name: 'socio.reservaciones',
          component: () => import('views/socio/reservaciones/index.vue'),
          meta: {
            resource: 'perfil',
            action: 'read',
            layout: 'travel'

            //  navActiveLink: 'socio'
          }

       },
      //  Socio cupones
       {
          path: '/socio/cupones',
          name: 'socio.cupones',
          component: () => import('views/socio/cupones/list.vue'),
          meta: {
            resource: 'perfil',
            action: 'read',
            layout: 'travel',
            name:'cupones'
          }

       },

      //  consumos

       {

          path: '/consumos',
         //  name: 'socio.consumos',
          component: () => import('views/socio/consumos/index.vue'),
          children:[
            {
               path:'',
               name:'socio.consumos',
               component:() => import('views/socio/consumos/list.vue'),
               meta:{
                  resource:'perfil',
                  action:'read',
                  layout:'travel',
                  name:'consumos',
                 
               }
            },
             {
                path: '/opinions',
                name: 'socio.consumos.opinions',
                component: () => import('views/socio/consumos/opinions.vue'),
                meta: {
                   resource: 'perfil',
                   action: 'read',
                   layout: 'travel',
                   name: 'consumos',

                }
             }

          ]

       },
      // //  cupones
      //  {
      //     path: '/cupones',
      //     name: 'socio.cupones',
      //     component: () => import('views/socio/cupones/index.vue'),
      //     meta: {
      //        resource: 'perfil',
      //        action: 'read',
      //        layout: 'travel',
      //       //  navActiveLink: 'socio'
      //     }

      //  },
      //  compras
       {
          path: 'compras',
          name: 'socio.compras',
          component: () => import('views/socio/compras/index.vue'),
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
      // name:'usuarios',
      component: () => import('views/usuarios/index.vue'),
      children:[
         {
            path:'',
            name:'listar.usuarios',
            component: () => import('views/usuarios/lists.vue'),
          
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
            component: () => import('views/usuarios/create.vue'),
           

            meta: {
               pageTitle: 'Agregar usuario',
               // navActiveLink: 'listar.usuarios',
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
            component: () => import('views/usuarios/edit.vue'),
            

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
   /* Promotores
   /*************************************** */
   {
      path:'/promotores',
      // name:'promotores',
      component:() => import('views/promotores/index.vue'),
      children:[
         {
            path:':id?',
            props:true,
            name:'promotores.list',
            component:() => import('views/promotores/list.vue'),
            meta:{
               pageTitle:'Promotores',
               resource:'promotores',
               action:'read',
               breadcrumb:[
                  {text:'Listado',active:true}
               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Lideres
   /*************************************** */
   {
      path:'/lideres',
      // name:'lideres',
      component:() => import('views/promotores/index.vue'),
      children:[
         {
            path:'',
            name:'lideres.list',
            component:() => import('views/lideres/list.vue'),
            meta:{
               pageTitle:'Lideres',
               resource:'lideres',
               action:'read',
               breadcrumb:[
                  {text:'Listado',active:true}
               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Coordinadores
   /*************************************** */
   {
      path:'/coordinadores',
      component:() => import('views/coordinadores/index.vue'),
      children:[
         {
            path:'',
            name:'coordinadores.list',
            component:() => import('views/coordinadores/list.vue'),
            meta:{
               pageTitle:'Coordinadores',
               resource:'coordinadores',
               action:'read',
               breadcrumb:[
                  {text:'Listado',active:true}
               ]
            }
         }
      ]
   },



   /*****************************************/
   /* Movimientos de Cuenta del sistema
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
         },

         {
            
            path:':id/user',
            props:true,
            component:() => import('views/socio/perfil/cuenta.vue'),
            name:'movimientos.user',
            meta:{
               resources:'movimientos',
               action:'read',
               navActiveLink:'listar.usuarios',
               breadcrumb:[
                  {text:'Usuarios',active:false,to:{name:'listar.usuarios'}},
                  {text:'Movimientos de Cuenta',active:true},
               ]
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
      // name:'iata',
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
      // name:'destino',
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
      component: () => import(  'views/roles/index.vue'),
      exact:false,
      children: [
         {
            path: '',
            name: 'listar.roles',
            component: () => import('views/roles/lists.vue'),
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
            component: () => import('views/roles/create.vue'),
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
            component: () => import('views/roles/edit.vue'),
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
      // name: 'permisos',

      component: () => import('views/permisos/index.vue'),

      exact: false,
      children: [
         {
            path: '',
            name: 'listar.permisos',
            component: () => import('views/permisos/lists.vue'),
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
            component: () => import('views/permisos/create.vue'),
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
            component: () => import('views/permisos/edit.vue'),
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
      component:() => import('views/auth/registro.vue'),
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
      component:() => import('views/auth/registro.vue'),
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
      component: () => import('views/faqs/index.vue'),
      children:[
         {
            path:'',
            name:'listar.faqs',
            component:() => import('views/faqs/list.vue'),
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
            component: () => import('views/faqs/create.vue'),
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
            component: () => import('views/faqs/edit.vue'),
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
      component: () => import('views/faqs/index.vue'),
      // name: 'configuracion.categorias-faq',
      children: [
         {
            path: '',
            name: 'listar.categoria-faqs',
            component: () => import('views/faqs/categorias/list.vue'),
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
            component: () => import('views/faqs/categorias/create.vue'),
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
            component: () => import('views/faqs/categorias/edit.vue'),
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
      component: () => import('views/paginas/faqs.vue'),
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
      component:()=> import('views/negocios/categorias/index.vue'),
      children:[
         {
            path:'',
            name:'negocio.categorias.list',
            component:() => import('views/negocios/categorias/list.vue'),
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
            component: () => import('views/negocios/categorias/create.vue'),
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
            component: () => import('views/negocios/categorias/edit.vue'),
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
   /* Negocios
   /*************************************** */

   {
      path:'/negocios',
      component:() => import('views/negocios/index.vue'),

      children:[

         {
            path:'',
            name:'negocio.lists',
            component:() => import('views/negocios/lists.vue'),
            meta:{
               resource:'negocios',
               action:'read',
               pageTitle:'Negocios asociados',

               breadcrumb:[
                  {text:'Home',to:{name:'home'},active:false},
                  { text: 'Listado', active: false },

               ]
            }
         },
         {
            path:':id/edit',
            props:true,
            component:() => import('views/negocios/edit.vue'),
            name: 'negocio.edit',
            meta:{
               resource:'negocios',
               action:'update',
               pageTitle:'Editar negocios',
               navActiveLink:'negocio.lists',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },

                  {
                     text: 'Negocios',
                     to: { name: 'negocio.lists' },
                     active: false
                  },

                  {
                     text: 'Actualizar',
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
      component:() => import('views/negocios/solicitudes/index.vue'),
      children:[
         {
            path:'',
            name:'listar.solicitudes.negocios',
            component:() => import('views/negocios/solicitudes/list.vue'),

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
            component: () => import('views/negocios/solicitudes/edit.vue'),

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
      // name:'divisas',
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
   /* PAnels
   /*************************************** */

   {
      path:'/panels',
      component:() => import('views/panels/index.vue'),

      children:[
         {
            path:'',
            component:() => import('views/panels/list.vue'),
            name:'panel.list',
            meta:{
               resource:'panels',
               action:'read',
               pageTitle:'Paneles',
               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false,
                  },

                  {
                     text: 'Listado',
                     active:true
                  }

               ]
            }
         },
         {
            path:'create',
            name:'panel.create',
            component:() => import('views/panels/create.vue'),
            meta: {
               resource: 'panels',
               action: 'write',
               pageTitle: 'Paneles',
               navActiveLink: 'panel.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Listado',
                     active: false,
                     to:{name:"panel.list"}
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
            name: 'panel.edit',
            props:true,
            component: () => import('views/panels/edit.vue'),
            meta: {
               resource: 'panels',
               action: 'update',
               pageTitle: 'Paneles',
               navActiveLink:'panel.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false,
                  },

                  {
                     text: 'Listado',
                     active: false,
                     to: { name: "panel.list" }
                  },
                  {
                     text: 'Editar',
                     active: true
                  }

               ]
            }

         }

      ]
   },


   /*****************************************/
   /* Amenidades
   /*************************************** */

   {
      path:'/amenidads',
      component:() => import('views/amenidades/index.vue'),

      children:[
         {
            path:'',
            name:'amenidad.list',
            component:() => import('views/amenidades/list.vue'),

            meta:{
               resource:'amenidades',
               action:'read',
               pageTitle:'Amenidades',
               breadcrumb:[
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Listado',
                     active: false,
                  },

                 
               ]
            }
         },


         {
            path: 'create',
            name: 'create.amenidad',
            component: () => import('views/amenidades/create.vue'),

            meta: {
               resource: 'amenidades',
               action: 'read',
               pageTitle: 'Crear Amenidad',
               navActiveLink:'amenidad.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Listado',
                     active:false,
                     to:{name:'amenidad.list'}
                  },

                  {
                     text: 'Crear',
                     active: true,
                    
                  },



               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.amenidad',
            props:true,
            component: () => import('views/amenidades/edit.vue'),

            meta: {
               resource: 'amenidades',
               action: 'read',
               pageTitle: 'Editar Amenidad',
               navActiveLink: 'amenidad.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Listado',
                     active: false,
                     to: { name: 'amenidad.list' }
                  },

                  {
                     text: 'Editar',
                     active: true,

                  },



               ]
            }
         }


      ]
   },

   /*****************************************/
   /* formas de pago
   /*************************************** */

   {
      path: '/formas-pago',
      component: () => import('views/formas-pago/index.vue'),

      children: [
         {
            path: '',
            name: 'formasPago.list',
            component: () => import('views/formas-pago/list.vue'),

            meta: {
               resource: 'formas de pago',
               action: 'read',
               pageTitle: 'Formas de pago',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Listado',
                     active: false,
                  },


               ]
            }
         },


         {
            path: 'create',
            name: 'create.formasPago',
            component: () => import('views/formas-pago/create.vue'),

            meta: {
               resource: 'formas de pago',
               action: 'read',
               pageTitle: 'Crear Forma de pago',
               navActiveLink: 'formasPago.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Listado',
                     active: false,
                     to: { name: 'formasPago.list' }
                  },

                  {
                     text: 'Crear',
                     active: true,

                  },



               ]
            }
         },

         {
            path: ':id/edit',
            name: 'edit.formasPago',
            props: true,
            component: () => import('views/formas-pago/edit.vue'),

            meta: {
               resource: 'formas de pago',
               action: 'read',
               pageTitle: 'Editar Forma',
               navActiveLink: 'formasPago.list',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Listado',
                     active: false,
                     to: { name: 'formasPago.list' }
                  },

                  {
                     text: 'Editar',
                     active: true,

                  },



               ]
            }
         }


      ]
   },
   
   /*****************************************/
   /* Sistema
   /*************************************** */
   {  
      path:'/admin/sistema',
      name:'sistema',
      component:() => import('views/sistema.vue'),
      meta:{
         resource:'sistema',
         action:'read',
         pageTitle:'Datos del sistema',
         breadcrumb:[
            {
               text: 'Home',
               to: 'home',
               active: false,
            },
            {
               text: 'Configuración de sistema',
               active: true,
            },
         ]
      }
   },

   {  
      path:'/admin/sucursales',
      component:() => import('views/sucursales/index.vue'),
      children:[
         {
            path:'',
            component:() => import('views/sucursales/list.vue'),
            name:'sucursales.list',
            meta:{
               resource:'sucursales',
               action:'read',
               pageTitle:'Sucursales',
               breadcrumb:[
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Sucursales',
                     active: true,
                  },
               ]
            }
         },

          {
            path:'create',
            component:() => import('views/sucursales/create.vue'),
            name:'sucursales.create',
            meta:{
               resource:'sucursales',
               action:'write',
               pageTitle:'Sucursales',
               navActiveLink:'sucursales.list',
               breadcrumb:[
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Sucursales',
                     active: false,
                     to:{name:'sucursales.list'}
                  },
                    {
                     text: 'Crear',
                     active: true,
                  },
               ]
            }
         },

          {
            path:':id/edit',
            props:true,
            component:() => import('views/sucursales/edit.vue'),
            name:'sucursales.edit',
            meta:{
               resource:'sucursales',
               action:'update',
               pageTitle:'Sucursales',
               navActiveLink:'sucursales.list',
               breadcrumb:[
                  {
                     text: 'Home',
                     to: 'home',
                     active: false,
                  },
                  {
                     text: 'Sucursales',
                     active: false,
                     to:{name:'sucursales.list'}
                  },
                  {
                     text: 'Editar',
                     active: true,
                  },
               ]
            }
         }
      ]
   
   },




   /*****************************************/
   /* Tiendas
   /*************************************** */
   {
      path:'/tiendas',
      component:() => import('views/tienda/index.vue'),
      children:[
         {
            path:'',
            component:() => import('views/tienda/list.vue'),
            name:'tienda.list',
            meta:{
               resource:'tiendas',
               action:'read',
               pageTitle:'Tiendas',
               breadcrumb:[
                  {text:'Home',to:{name:'home'},active:false},
                  { text: 'Tiendas', active: true },
               ]
            }
         },

         {
            path: 'create',
            component: () => import('views/tienda/create.vue'),
            name: 'tienda.create',
            meta: {
               resource: 'tiendas',
               action: 'write',
               pageTitle: 'Agregar Tienda',
               navActiveLink:'tienda.list',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Tiendas', active: false,to:{name:'tienda.list'} },
                  { text: 'Crear tienda', active: true },

               ]
            }
         },

         {
            path: ':id/edit',
            props:true,
            component: () => import('views/tienda/edit.vue'),
            name: 'tienda.edit',
            meta: {
               resource: 'tiendas',
               action: 'update',
               pageTitle: 'Actualizar Tienda',
               navActiveLink: 'tienda.list',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Tiendas', active: false, to: { name: 'tienda.list' } },
                  { text: 'Actualizar', active: true },

               ]
            }
         }
      ]
   },


   /*****************************************/
   /* Productos
   /*************************************** */
   {
      path: '/productos',
      component: () => import('views/tienda/productos/index.vue'),
      children: [
         {
            path: '',
            component: () => import('views/tienda/productos/list.vue'),
            name: 'producto.list',
            meta: {
               resource: 'productos',
               action: 'read',
               pageTitle: 'Productos',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Productos', active: true },
               ]
            }
         },

         {
            path: 'create',
            component: () => import('views/tienda/productos/create.vue'),
            name: 'producto.create',
            meta: {
               resource: 'productos',
               action: 'write',
               pageTitle: 'Agregar Producto',
               navActiveLink: 'producto.list',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Productos', active: false, to: { name: 'producto.list' } },
                  { text: 'Crear Producto', active: true },

               ]
            }
         },

         {
            path: ':id/edit',
            props: true,
            component: () => import('views/tienda/productos/edit.vue'),
            name: 'producto.edit',
            meta: {
               resource: 'productos',
               action: 'update',
               pageTitle: 'Actualizar Producto',
               navActiveLink: 'producto.list',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Productos', active: false, to: { name: 'producto.list' } },
                  { text: 'Actualizar', active: true },

               ]
            }
         },

         {
            path: ':id/imagenes',
            props: true,
            component: () => import('views/tienda/productos/imagenes.vue'),
            name: 'producto.imagenes',
            meta: {
               resource: 'productos',
               action: 'update',
               pageTitle: 'Imagenes del Producto',
               navActiveLink: 'producto.list',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Productos', active: false, to: { name: 'producto.list' } },
                  { text: 'Imagenes', active: true },

               ]
            }
         },


         {
            path: ':id/show',
            props: true,
            component: () => import('views/tienda/productos/perfil.vue'),
            name: 'producto.show',
            meta: {
               resource: 'productos',
               action: 'read',
               pageTitle: 'Producto',
               navActiveLink: 'producto.list',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Productos', active: false, to: { name: 'producto.list' } },
                  { text: 'Perfil', active: true },

               ]
            }
         }
      ]
   },

    /*****************************************/
   /* Productos CJDROPSHIPPING
   /*************************************** */
   {
      path: '/productos/cj-dropshiping',
      component: () => import('views/tienda/productos-cj/index.vue'),
      children: [
         {
            path: '',
            component: () => import('views/tienda/productos-cj/list.vue'),
            name: 'producto.cj.list',
            meta: {
               resource: 'productos',
               action: 'read',
               pageTitle: 'Productos (Almacén)',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Productos', active: true },
               ]
            }
         },

         {
            path: ':id/show',
            props: true,
            component: () => import('views/tienda/productos-cj/perfil.vue'),
            name: 'producto.show.cj',
            meta: {
               resource: 'productos',
               action: 'read',
               pageTitle: 'Producto',
               navActiveLink: 'producto.cj.list',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Productos', active: false, to: { name: 'producto.cj.list' } },
                  { text: 'Perfil', active: true },

               ]
            }
         }

      ]
   },


   /*****************************************/
   /* Ventas de Productos
   /*************************************** */
   {
      path:'/productos/ventas',
      component:() => import('views/tienda/productos/ventas/index.vue'),

      children:[
         {
            path:'',
            component:() => import('views/tienda/productos/ventas/list.vue'),
            name:'ventas.productos.list',
            meta:{
               resources:'ventas productos',
               action:'read',
               pageTitle:'Ventas de Productos',
               breadcrumb:[
                  {text:'Home',to:{name:'home'},active:false},
                  { text: 'Ventas', active: true },

               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Categoria de Productos
   /*************************************** */
   {
      path:'/categoria-productos',
      component:() => import('views/tienda/categorias-producto/index.vue'),

      children:[
         {
            path:'',
            name:'categorias',
            component:() => import('views/tienda/categorias-producto/list.vue'),
            meta:{
               resource:'categoria productos',
               action:'read',
               pageTitle:'Categoría de Productos',
               breadcrumb:[
                  {text:'Home',to:{name:'home'},active:false},
                  { text: 'Categorias', active: true },

               ]
            }
         },

         {
            path: 'create',
            name: 'categoriaProducto.create',
            component: () => import('views/tienda/categorias-producto/create.vue'),
            meta: {
               resource: 'categoria productos',
               action: 'write',
               pageTitle: 'Crear Categoría',
               navActiveLink:'categorias',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Categorias', active: false,to:{name:'categorias'} },
                  { text: 'Crear', active: true },


               ]
            }
         },


         {
            path: ':id/edit',
            name: 'categoriaProducto.edit',
            props:true,
            component: () => import('views/tienda/categorias-producto/edit.vue'),
            meta: {
               resource: 'categoria productos',
               action: 'update',
               pageTitle: 'Editar Categoría',
               navActiveLink: 'categorias',
               breadcrumb: [
                  { text: 'Home', to: { name: 'home' }, active: false },
                  { text: 'Categorias', active: false, to: { name: 'categorias' } },
                  { text: 'Editar', active: true },


               ]
            }
         }
      ]
   },


   /*****************************************/
   /* Pago en caja
   /*************************************** */

   {
      path:'/carrito/caja',
      component:() => import('views/tienda/caja.vue'),
      name:'caja',
      meta:{
         resource:'Auth',
         action:'read',
         layout:'travel'
      }

   },

   /*****************************************/
   /* Multimedias
   /*************************************** */
   {
      path: '/multimedias',
      name: 'multimedias',
      component: () => import('views/multimedias/multimedia.vue'),
      meta: {
         resource: 'multimedia',
         action: 'read',
         pageTitle: 'Multimedias',
         breadcrumb: [
            { text: 'Archivos', active: true }
         ]
      }
   },

   /*****************************************/
   /* Comisiones
   /****************************************/
   {
      path:'/comisiones',
      // name:'comisiones',
      component:() => import('views/comisiones/index.vue'),
      children:[
         {
            path:'',
            name:'comisiones.list',
            component:() => import('views/comisiones/list.vue'),
            meta:{
               pageTitle:'Comisiones de Roles',
               resource:'comisiones',
               action:'read',
               breadcrumb:[
                  {text:'Listado',active:true}
               ]
            }
         },

           {
            path:'create',
            name:'comision.create',
            component:() => import('views/comisiones/create.vue'),
            meta:{
               pageTitle:'Crear Comisión',
               resource:'comisiones',
               action:'write',
               navActiveLink:'comisiones.list',
               breadcrumb:[
                  {text:'Listado',active:false,to:{name:'comisiones.list'}},
                  {text:'Crear',active:true},
               ]
            }
         },

         {
            path:':id/edit',
            props:true,
            name:'comision.edit',
            component:() => import('views/comisiones/edit.vue'),
            meta:{
               pageTitle:'Editar Comisión',
               resource:'comisiones',
               action:'update',
               navActiveLink:'comisiones.list',
               breadcrumb:[
                  {text:'Listado',active:false,to:{name:'comisiones.list'}},
                  {text:'Editar',active:true},
               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Reservaciones
   /****************************************/
   {
      path:'/reservaciones',
      // name:'reservaciones',
      component:() => import('views/reservaciones/index.vue'),
      children:[
         {
            path:'',
            name:'reservaciones.list',
            component:() => import('views/reservaciones/list.vue'),
            meta:{
               resource:'reservaciones',
               action:'read',
               pageTitle:'Reservaciones',
               breadcrumb:[
                  {text:'listado',active:true}
               ]
            }
         },
         {
            path:'create',
            name:'reservacion.create',
            component:() => import('views/reservaciones/create.vue'),
            meta:{
               resource:'reservaciones',
               action:'write',
               pageTitle:'Crear Reservación',
               navActiveLink:'reservaciones.list',
               breadcrumb:[
                  {text:'listado',active:false,to:{name:'reservaciones.list'}},
                  {text:'crear',active:true},

               ]
            }
         },
          {
            path:':id/edit',
            name:'reservacion.edit',
            props:true,
            component:() => import('views/reservaciones/edit.vue'),
            meta:{
               resource:'reservaciones',
               action:'update',
               pageTitle:'Editar Reservación',
               navActiveLink:'reservaciones.list',
               breadcrumb:[
                  {text:'Listado',active:false,to:{name:'reservaciones.list'}},
                  {text:'Editar',active:true},
               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Estatus 
   /****************************************/
   {
      path:'/estatus',
      name:'estatus',
      component:() => import('views/estatus/estatus.vue'),
      meta:{
         resource:'estatus',
         action:'read',
         // pageTitle:'Estatus'
      }
   },

   /*****************************************/
   /* Retiros comisiones
   /****************************************/

   {
      path:'/retiros',
      // name:'retiros',
      component:() => import('views/retiros/index.vue'),
      children:[
         {
            path:'',
            name:'retiro.list',
            component:() => import('views/retiros/list.vue'),
            meta:{
               resource:'retiros',
               action:'read',
               pageTitle:'Retiros de comisiones',
               breadcrumb:[
                  {text:'Retiros',active:true}
               ]
            }
         },
         {
            path:'create',
            name:'retiro.create',
            component:() => import('views/retiros/create.vue'),
            meta:{
               resource:'retiros',
               action:'write',
               pageTitle:'Crear Retiro',
               navActiveLink:'retiro.list',
               breadcrumb:[
                  {text:'Retiros',active:false,to:{name:'retiro.list'}},
                  {text:'Crear',active:true},
               ]
            }
         },

          {
            path:':id/edit',
            name:'retiro.edit',
            props:true,
            component:() => import('views/retiros/edit.vue'),
            meta:{
               resource:'retiros',
               action:'update',
               pageTitle:'Actualizar Retiro',
               navActiveLink:'retiro.list',
               breadcrumb:[
                  {text:'Retiros',active:false,to:{name:'retiro.list'}},
                  {text:'Actualizar',active:true},
               ]
            }
         }

      ]
   },


   /*****************************************/
   /* Pais
   /****************************************/

   {
      path:'/pais',
      component:() => import('views/pais/index.vue'),
      // name:'pais',

      children:[
         {
            path:'',
            component:() => import('views/pais/list.vue'),
            name:'listar.paises',
            meta:{
               resource:'pais',
               action:'read',
               pageTitle:'Paises',

               breadcrumb:[
                  {
                     text:'Home',
                     to:{name:'home'},
                     active:false
                  },
                  {
                     text: 'Listado',
                     active: true
                  }
               ]
            }
         },
         {
            path:'create',
            component: () => import('views/pais/create.vue'),
            name:'create.pais',

            meta: {
               resource: 'pais',
               action: 'write',
               pageTitle: 'Registrar Pais',
               navActiveLink:'listar.paises',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Paises',
                     to: { name: 'listar.paises' },
                     active: false
                  },
                  {
                     text: 'create',
                     active: true
                  }
               ]
            }

         },

         {
            path: ':id/edit',
            props:true,
            component: () => import('views/pais/edit.vue'),
            name: 'edit.pais',

            meta: {
               resource: 'pais',
               action: 'update',
               pageTitle: 'Actualizad Pais',
               navActiveLink: 'listar.paises',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Paises',
                     to: { name: 'listar.paises' },
                     active: false
                  },
                  {
                     text: 'edit',
                     active: true
                  }
               ]
            }

         }

      ]
   },

   /*****************************************/
   /* Estado
   /*************************************** */

   {
      path: '/estado',
      component: () => import('views/estado/index.vue'),
      // name: 'estado',

      children: [
         {
            path: '',
            component: () => import('views/estado/list.vue'),
            name: 'listar.estados',
            meta: {
               resource: 'estado',
               action: 'read',
               pageTitle: 'Estados',

               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Listado',
                     active: true
                  }
               ]
            }
         },
         {
            path: 'create',
            component: () => import('views/estado/create.vue'),
            name: 'create.estado',

            meta: {
               resource: 'estado',
               action: 'write',
               pageTitle: 'Registrar Estado',
               navActiveLink: 'listar.estados',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Estados',
                     to: { name: 'listar.estados' },
                     active: false
                  },
                  {
                     text: 'create',
                     active: true
                  }
               ]
            }

         },

         {
            path: ':id/edit',
            props: true,
            component: () => import('views/estado/edit.vue'),
            name: 'edit.estado',

            meta: {
               resource: 'estado',
               action: 'update',
               pageTitle: 'Actualizad Estado',
               navActiveLink: 'listar.estados',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Estados',
                     to: { name: 'listar.estados' },
                     active: false
                  },
                  {
                     text: 'edit',
                     active: true
                  }
               ]
            }

         }

      ]
   },


   /*****************************************/
   /* Ciudad
   /*************************************** */
   {
      path: '/ciudad',
      component: () => import('views/estado/index.vue'),
      // name: 'ciudad',

      children: [
         {
            path: '',
            component: () => import('views/ciudad/list.vue'),
            name: 'listar.ciudades',
            meta: {
               resource: 'ciudad',
               action: 'read',
               pageTitle: 'Ciudades',

               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },
                  {
                     text: 'Listado',
                     active: true
                  }
               ]
            }
         },
         {
            path: 'create',
            component: () => import('views/ciudad/create.vue'),
            name: 'create.ciudad',

            meta: {
               resource: 'ciudad',
               action: 'write',
               pageTitle: 'Registrar Ciudad',
               navActiveLink: 'listar.ciudades',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Ciudades',
                     to: { name: 'listar.ciudades' },
                     active: false
                  },
                  {
                     text: 'create',
                     active: true
                  }
               ]
            }

         },

         {
            path: ':id/edit',
            props: true,
            component: () => import('views/ciudad/edit.vue'),
            name: 'edit.ciudad',

            meta: {
               resource: 'ciudad',
               action: 'update',
               pageTitle: 'Actualizad Ciudad',
               navActiveLink: 'listar.ciudades',
               breadcrumb: [
                  {
                     text: 'Home',
                     to: { name: 'home' },
                     active: false
                  },

                  {
                     text: 'Ciudades',
                     to: { name: 'listar.ciudades' },
                     active: false
                  },
                  {
                     text: 'edit',
                     active: true
                  }
               ]
            }

         }

      ]
   },


   /*****************************************/
   /* Academia
   /*************************************** */
   {
      path:'/academia',
      // name:'academia',
      component:() => import('views/academia/index.vue'),
      children:[
         {
            path:'',
            name:'academia.list',
            component:() => import('views/academia/list.vue'),
            meta:{
               pageTitle:'Academia',
               resource:'academias',
               action:'read',
               breadcrumb:[
                  {text:'Listado',active:true}
               ]
            }
         },

         {
            path:'create',
            name:'academia.create',
            component:() => import('views/academia/create.vue'),
            meta:{
               pageTitle:'Academia',
               resource:'academias',
               action:'write',
               navActiveLink:'academia.list',
               breadcrumb:[
                  {text:'Listado',active:false,to:{name:'academia.list'}},
                  {text:'Crear',active:true}
               ]
            }
         },

         {
            path:':id/edit',
            name:'academia.edit',
            props:true,
            component:() => import('views/academia/edit.vue'),
            meta:{
               pageTitle:'Academia',
               resource:'academias',
               action:'update',
               navActiveLink:'academia.list',
               breadcrumb:[
                  {text:'Listado',active:false,to:{name:'academia.list'}},
                   {text:'Editar',active:true}
               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Paginas
   /*************************************** */
   {
      path:'/paginas',
      // name:'pagina',
      component:() => import('views/pages/index.vue'),
      children:[
         {
            path:'',
            name:'pagina.list',
            component:() => import('views/pages/list.vue'),
            meta:{
               resource:'paginas',
               action:'read',
               pageTitle:'Paginas',
               breadcrumb:[
                  {text:'Paginas',active:true}
               ]
            }
         },

          {
            path:'create',
            name:'pagina.create',
            component:() => import('views/pages/create.vue'),
            meta:{
               resource:'paginas',
               action:'write',
               pageTitle:'Paginas',
               navActiveLink:'pagina.list',
               breadcrumb:[
                  {text:'Paginas',active:false,to:{name:'pagina.list'}},
                  {text:'Crear',active:true}
               ]
            }
         },
         {
            path:':id/edit',
            props:true,
            name:'pagina.edit',
            component:() => import('views/pages/edit.vue'),
            meta:{
               resource:'paginas',
               action:'update',
               pageTitle:'Paginas', 
               navActiveLink:'pagina.list',
               breadcrumb:[
                  {text:'Paginas',active:false,to:{name:'pagina.list'}},
                  {text:'Editar',active:true}
               ]
            }
         }
      ]
   },

   /*****************************************/
   /* Lotes
   /*************************************** */
   {
      path:'/lotes',
      // name:'lotes',
      component:() => import('views/lotes/index.vue'),
      children:[
         {
            path:'',
            name:'lotes.list',
            component:() => import('views/lotes/list.vue'),
            meta:{
               resource:'lotes',
               action:'read',
               pageTitle:'Lotes',
               breadcrumb:[
                  {text:'Listado',active:true}
               ]
            }
         },
          {
            path:'create',
            name:'lotes.create',
            component:() => import('views/lotes/create.vue'),
            meta:{
               resource:'lotes',
               action:'write',
               pageTitle:'Lotes',
               navActiveLink:'lotes.list',
               breadcrumb:[
                  {text:'Listado',active:false,to:{name:'lotes.list'}},
                  {text:'Crear',active:true},
               ]
            }
         },
          {
            path:':id/update',
            props:true,
            name:'lotes.edit',
            component:() => import('views/lotes/edit.vue'),
            meta:{
               resource:'lotes',
               action:'read',
               pageTitle:'Lotes',
               navActiveLink:'lotes.list',
               breadcrumb:[
                  {text:'Listado',active:false,to:{name:'lotes.list'}},
                  {text:'Actualizar',active:true},
               ]
            }
         }
      ]
   },


   /*****************************************/
   /* tarjetas
   /*************************************** */
   {
      path:'/tarjetas',
      name:'tarjetas',
      component:() => import('views/tarjetas/index.vue'),
      children:[
         {
            path:':lote?',
            props:true,
            name:'tarjetas.list',
            component:() => import('views/tarjetas/list.vue'),
            meta:{
               resource:'tarjetas',
               action:'read',
               pageTitle:'Tarjetas',
               breadcrumb:[
                  {text:'Listado',active:true}
               ]
            }
         },
         
         
      ]
   },


   /*****************************************/
   /* Vonages
   /*************************************** */
   {
      path:'/vonages/sms',
      component:() => import('views/vonages/index.vue'),

      children:[
         {
            path:'',
            component:() => import('views/vonages/list.vue'),
            name:'mensajes.list',
            meta:{
               resource:'vonage',
               action:'read',
               pageTitle:'Mensajes (vonage)',
               breadcrumb:[
                  {text:'Listado' ,active:true}
               ]
            }
         }
      ]
   },

   
   /*****************************************/
   /* PAGINA DE perfil de negocios
   /*************************************** */
   {
      path: '/negocio/:url',
      props:true,
      component: () => import('views/paginas/negocio/index.vue'),
      meta: {
         layout: 'travel',
         resource: 'Auth',
         action:'read'
      },

      children:[

        {

         path:'',
         component:() => import('views/paginas/negocio/perfil.vue'),
         name:'perfil.negocio',
         meta: {
            layout:'travel',
         },

        },

         {
            path: 'cupones',
            component: () => import('views/paginas/negocio/cupones.vue'),
            name: 'perfil.negocio.cupones',
            meta: {
               layout: 'travel',
            },

         },

         {
            path: 'publicaciones',
            component: () => import('views/paginas/negocio/publicaciones.vue'),
            name: 'perfil.negocio.publicaciones',
            meta: {
               layout: 'travel',
            },

         },

         {
            path: 'eventos',
            component: () => import('views/paginas/negocio/eventos.vue'),
            name: 'perfil.negocio.eventos',
            meta: {
               layout: 'travel',
            },

         },

         {
            path: 'opiniones',
            component: () => import('views/paginas/negocio/opiniones.vue'),
            name: 'perfil.negocio.opiniones',
            meta: {
               layout: 'travel',
            },

         }

      ]

     
      
   },

   /*****************************************/
   /* PAGINA DE EVENTOS
   /*************************************** */

   {
      path:'/eventos/:event',
      props:true,
      component:() => import('views/paginas/eventos/show.vue'),
      name:'evento.show',
      beforeEnter: (to, from, next) => {
          let param = to.params;

         store.dispatch('evento/fetchEventPublic',param.event).then(({result,evento}) => {
            if(result){
               next();
            }else{
               next({name:'error-404'})
            }
         }).catch(e => {
            next({name:'error-404'})
         })
      },
      meta:{
         layout:'travel',
         resource:'Auth',
         action:"read"
      }
   },

   /*****************************************/
   /* Reportes
   /*************************************** */
   {
      path:'/reports/estados-cuenta',
      component:() => import('views/reports/estadoCuenta.vue'),
      name:'report.movimientos',
      meta:{
         resouorce:'reportes',
         action:'read',
         pageTitle:'Movimientos de Cuentas',
         breadcrumb:[
            {text:'Movimientos',active:true}
         ]
      }
   },

   {
      path:'/reports/activaciones',
      component:() => import('views/reports/activaciones.vue'),
      name:'activaciones',
      meta:{
         resouorce:'reportes',
         action:'read',
         pageTitle:'Activaciones',
         breadcrumb:[
            {text:'Usuarios registrados',active:true}
         ]
      }
   },

   /*****************************************/
   /* Academia
   /*************************************** */

   {
      path:'/mi-academia',
      component:() => import('views/academia.vue'),
      name:'academia',
      meta:{
         resouorce:'Auth',
         action:'read',
         pageTitle:'Academia',
         breadcrumb:[
            {text:'Lista de Vídeos',active:true}
         ]
      }
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
