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
             name:'perfil'
             
            //  navActiveLink: 'socio'
          },

          children:[

             {
                path: '',
                name: 'miperfil',
                component: () => import('views/socio/perfil/datos'),
                meta: {
                   name: 'perfil'
                   //  navActiveLink: 'socio'
                },
             },

             {
                path: 'invitados',
                name: 'misinvitados',
                component: () => import('views/socio/perfil/invitados'),
                meta: {
                   name: 'perfil'
                   //  navActiveLink: 'socio'
                },
             },

             {
                path: 'editar',
                name: 'perfil.editar',
                component: () => import('views/socio/perfil/editar'),
                meta: {
                   name: 'perfil'
                   //  navActiveLink: 'socio'
                },
             },
             {
                path: 'contrasena',
                name: 'perfil.password',
                component: () => import('views/socio/perfil/CambiarPassword'),
                meta: {
                   name: 'perfil'
                   //  navActiveLink: 'socio'
                },
             },

             {
                path: 'desactivar',
                name: 'perfil.desactivar',
                component: () => import('views/socio/perfil/desactivar'),
                meta: {
                   name: 'perfil'
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
             name:'negocio'
            //  navActiveLink: 'socio'
          },

          children:[
            {
               path:'',
               name:'socio.negocio.list',
               component:()=> import('views/socio/negocio/list'),
                meta: {
                   name: 'negocio'
                   //  navActiveLink: 'socio'
                },
            },
            {
                path: 'afiliar',
                name: 'socio.negocio.afiliar',
                component: () => import('views/socio/negocio/create'),
               meta: {
                  navActiveLink: 'socio.negocio',
                  name: 'negocio'

               },
             },
             {
                path: 'siguiente',
                name: 'socio.negocio.siguiendo',
                component: () => import('views/socio/negocio/siguiendo'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio'

                },
             },
             {
                path: 'recomendados',
                name: 'socio.negocio.recomendados',
                component: () => import('views/socio/negocio/recomendados'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio'

                },
             },
             {
                path: 'solicitudes',
                name: 'socio.negocio.solicitudes',
                component: () => import('views/socio/negocio/solicitudes'),
                meta: {
                   navActiveLink: 'socio.negocio',
                   name: 'negocio'

                },
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
