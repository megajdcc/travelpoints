export default [
  
   {
      title: 'Usuarios',
      icon: 'UsersIcon',
      children:[
         {
            title: 'Usuarios',
            route: 'listar.usuarios',
            action: 'read',
            resource: 'usuarios',
            icon: 'UsersIcon',
         },

          {
            title: 'Promotores',
            route: 'promotores.list',
            action: 'read',
            resource: 'promotores',
            icon: 'fa-user-tie',
            fontAwesome:true
         },

         {
            title: 'Lideres',
            route: 'lideres.list',
            action: 'read',
            resource: 'lideres',
            icon: 'fa-users-rays',
            fontAwesome:true
         },

          {
            title: 'Coordinadores',
            route: 'coordinadores.list',
            action: 'read',
            resource: 'coordinadores',
            icon: 'fa-users-line',
            fontAwesome:true
         },


         {
            title: 'Retiros',
            route: 'retiro.list',
            action: 'read',
            resource: 'retiros',
            fontAwesome:true,
            icon: 'fa-money-bill-transfer',
         }

      ]
   },

   {
      title: 'Negocios',
      icon: 'fa-house-chimney',
      fontAwesome:true,
      children:[
         {
            title: 'Negocios',
            route: 'negocio.lists',
            action: 'read',
            resource: 'negocios',
            icon: 'fa-shop',
            fontAwesome:true,
            
            
         },
         {
            title: 'Solicitudes',
            route: 'listar.solicitudes.negocios',
            action: 'read',
            resource: 'solicitudes',
            icon: 'fa-table-list',
            fontAwesome:true,
            tag:true,
            tagValue:() => {
               return new Promise((resolve, reject) => {
                  axios.get(`/api/negocios/get-cantidad/solicitudes`).then(({data}) => {
                     resolve(data)
                  }).catch(e => reject.log(e))
               })
            },
            tagVariant:'danger'
            
         },

      ]
   },

   {
      title:'Reservaciones',
      route:'reservaciones.list',
      action:'read',
      resource:'reservaciones',
      icon:'fa-calendar-check',
      fontAwesome:true,
   },

   {
      title:'Eventos',
      icon:'fa-calendar-day',
      fontAwesome:true,
      route:'eventos.list',
      resource:'eventos',
      action:'read'
   },

   {
      
      title:'Destinos e Iata',
      icon:'fa-map-location-dot',
      fontAwesome:true,
      children:[

         {
            title: 'Destinos',
            route: 'destino.lists',
            icon:'fa-arrows-turn-to-dots',
            fontAwesome:true,
            action: 'read',
            resource: 'destinos'
         },

         {
            title:'Códigos IATA',
            route:'iata.lists',
            icon:'fa-plane-departure',
            fontAwesome:true,
            action:'read',
            resource:'iatas'
         },
         {
            title: 'Paises',
            route: 'listar.paises',
            action: 'read',
            resource: 'pais'
         },
         {
            title: 'Estados',
            route: 'listar.estados',
            action: 'read',
            resource: 'estado'
         },
         {
            title: 'Ciudades',
            route: 'listar.ciudades',
            action: 'read',
            resource: 'ciudad'
         }
      ]
   },
   {
      title:'Tarjetas',
      icon:'fa-credit-card',
      fontAwesome:true,
      children:[
         { title:'Registrar lote',route:'lotes.list',icon:'fa-plus',resource:'lotes',action:'read',fontAwesome:true},
         { title:'Tarjetas',route:'tarjetas.list',icon:'fa-rectangle-list',resource:'tarjetas',action:'read',fontAwesome:true},
      ]
   },

   {
      title:'Tiendas Y Productos',
      icon:'fa-store',
      fontAwesome:true,
      children:[
         { title:'Tiendas',route:'tienda.list',icon:'fa-store',resource:'tiendas',action:'read',fontAwesome:true},
         { title: 'Productos', route: 'producto.list', icon: 'fa-gifts', resource: 'productos', action: 'read', fontAwesome: true, iconFa:'fas'},
         { title: 'Productos (Almacén)', route: 'producto.cj.list', icon: 'fa-gifts', resource: 'productos', action: 'read', fontAwesome: true, iconFa:'fas'},

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

   {
      title:'Multimedias',
      icon:'fa-upload',
      fontAwesome:true,
      route:'multimedias',
      resource:'multimedias',
      action:'read'
   },
   {
      title:"Perfil de Cuenta",
      route:'mi-perfil',
      resource:'perfil',
      action:'read',
      icon:'fa-user-pen',
      fontAwesome:true,
   },

   {
      title:'Configuraciones',
      icon:'SettingsIcon',
      children:[
         
         {

            title:'Datos de sistema',
            route:'sistema',
            icon:'SettingsIcon',
            resource:'sistema',
            action:'read'
         },

         {

            title:'Comisiones de Roles',
            route:'comisiones.list',
            icon:'fa-percent',
            fontAwesome:true,
            resource:'comisiones',
            action:'read'
         },


          {
            title:'Sucursales',
            route:'sucursales.list',
            icon:'fa-map-location',
            resource:'sucursales',
            action:'read',
            fontAwesome:true,
         },

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

            title   : 'Paginas',
            route   : 'pagina.list',
            action  : 'read',
            resource: 'paginas'
         },

         {
            title:'Academia',
            icon:'fa-play',
            fontAwesome:true,
            route:'academia.list',
            resource:'academias',
            action:'read'
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
            resource: 'negocio categorias'
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
         },
         {
            title: 'Mensajes (Vonages)',
            route: 'mensajes.list',
            action: 'read',
            resource: 'vonage'
         }
      ]
   },
   
]

