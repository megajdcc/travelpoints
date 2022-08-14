export default [
  
   {
      title: 'Usuarios',
      route: 'listar.usuarios',
      action: 'read',
      resource: 'usuarios',
      icon: 'UsersIcon',
   },

   {
      title: 'Negocios',
      icon: 'HomeIcon',
      children:[
         {
            title: 'negocios',
            route: 'listar.negocios',
            action: 'read',
            resource: 'negocios',
            icon: 'ListIcon',
         },

         {
            title: 'Solicitudes',
            route: 'listar.solicitudes.negocios',
            action: 'read',
            resource: 'solicitudes',
            icon: 'ListIcon',
         },

      ]
   },


   {
      title:'Configuraciones',
      icon:'SettingsIcon',
      children:[
         
         {
            title: 'Roles',
            // exact:false,
            route: 'listar.roles',
            action:'read',
            resource:'roles'
         },
         {
            title: 'Permisos',
            route: 'listar.permisos',
            action: 'read',
            resource: 'permisos'
         },

         {
            title: 'Preguntas Frecuentes (Faqs)',
            route: 'listar.faqs',
            icon:'HelpCircleIcon',
            action: 'read',
            resource: 'faqs'
         },
         {
            title: 'Categorías de Preguntas frecuentes (Faqs)',
            route: 'listar.categoria-faqs',
            icon: 'ListIcon',
            action: 'read',
            resource: 'faqs'
         },

         {
            title: 'Categorías de negocios',
            route: 'negocio.categorias.list',
            icon: 'ListIcon',
            action: 'read',
            resource: 'Negocio categorías'
         }


      ]
   },
   
]

