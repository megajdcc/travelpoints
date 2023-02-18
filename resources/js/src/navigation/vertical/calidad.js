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
<<<<<<< HEAD
            route: 'listar.negocios',
=======
            route: 'negocio.lists',
>>>>>>> vite
            action: 'read',
            resource: 'negocios',
            icon: 'ListIcon',
         },
<<<<<<< HEAD

=======
>>>>>>> vite
         {
            title: 'Solicitudes',
            route: 'listar.solicitudes.negocios',
            action: 'read',
            resource: 'solicitudes',
            icon: 'ListIcon',
         },

      ]
   },

<<<<<<< HEAD
=======
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
      title:'Tiendas Y Productos',
      icon:'fa-store',
      fontAwesome:true,
      children:[
         { title:'Tiendas',route:'tienda.list',icon:'fa-store',resource:'tiendas',action:'read',fontAwesome:true},
         { title: 'Productos', route: 'producto.list', icon: 'fa-gifts', resource: 'productos', action: 'read', fontAwesome: true, iconFa:'fas'},
         {
            title: 'Categorías',
            route: 'categorias',
            icon: 'ListIcon',
            action: 'read',
            resource: 'categoria productos'
         },

         {
            title: 'Ventas',
            route: 'ventas.productos.list',
            icon: 'ListIcon',
            action: 'read',
            resource: 'ventas productos'
         },
      ]

   },
>>>>>>> vite

   {
      title:'Configuraciones',
      icon:'SettingsIcon',
      children:[
         
         {
<<<<<<< HEAD
=======
            title:'Datos de sistema',
            route:'sistema',
            icon:'SettingsIcon',
            resource:'sistema',
            action:'read'
         },

         {
>>>>>>> vite
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
<<<<<<< HEAD
=======
            title   : 'Paneles',
            route   : 'panel.list',
            action  : 'read',
            resource: 'panels'
         },

         {
>>>>>>> vite
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
<<<<<<< HEAD
            resource: 'Negocio categorías'
=======
            resource: 'negocio categorías'
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
>>>>>>> vite
         }


      ]
   },
   
]

