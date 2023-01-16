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
            route: 'negocio.lists',
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
      title:'Eventos',
      icon:'OctagonIcon',
      route:'eventos.list',
      resource:'eventos',
      action:'read'
   },

   {
      
      title:'Destinos e Iata',
      icon:'MapPinIcon',

      children:[

         {
            title: 'Destinos',
            route: 'destino.lists',
            action: 'read',
            resource: 'destinos'
         },

         {
            title:'Códigos IATA',
            route:'iata.lists',
            action:'read',
            resource:'iatas'
         }
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
            title   : 'Paneles',
            route   : 'panel.list',
            action  : 'read',
            resource: 'panels'
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
         },
         {
            title: 'Divisas',
            route: 'divisas.list',
            icon: 'DollarSignIcon',
            action: 'read',
            resource: 'divisas'
         },

         {
            title:'Amenidades',
            route:'amenidad.list',
            action:'read',
            resource:'amenidades'
         },
         {
            title: 'Formas de Pago',
            route: 'formasPago.list',
            action: 'read',
            resource: 'formas de pago'
         }


      ]
   },
   
]

