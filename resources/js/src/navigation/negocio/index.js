
export default [

   // Tablero
   {
      title: 'Tablero',
      icon: 'fa-solid fa-home',
      children:[
         {
            title:'Tablero',
            route:'negocio.home',
            action:'read',
            resource:'home negocio',
            icon: 'fa-solid fa-gauge',
         
         },

         {
            title: 'Movimientos de cuenta',
            route: 'negocio.movimientos',
            action: 'read',
            resource: 'movimientos negocio',
            icon: 'fa-solid fa-money-check-dollar',

         },

      ]
   },

   // Ventas del negocio
   {
      title:'Ventas',
      icon:'fas fa-cash-register',
      children:[

         {
            title:'Nueva Venta',
            route:'negocio.nueva.venta',
            icon:'fas fa-money-bill',
            resource: 'ventas negocio',
            action: 'write',
         },

         {
            title: 'Historial de Ventas',
            route: 'negocio.venta.historial',
            icon: 'fa-solid fa-database',
            resource: 'ventas historial negocio',
            action: 'write',
         }

      ]
   },

   // Certificados de regalos
   {
      title: 'Certificados',
      icon: 'fas fa-certificate',
      route: 'negocio.certificados',
      resource: 'certificados negocio',
      action: 'read'
   },


   // Publicaciones y Contenidos
   {
      title: 'Publicaciones y contenidos',
      icon: 'fa-solid fa-bullhorn',
      children:[
         
         {
            title:'Galerias de Imagenes',
            route:'negocio.galerias',
            resource:'galerias negocio',
            action:'read',
         },

         {
            title: 'Publicaciones',
            route: 'negocio.publicaciones',
            resource: 'publicaciones negocio',
            action: 'read',
         },

         {
            title: 'Eventos',
            route: 'negocio.eventos',
            resource: 'eventos negocio',
            action: 'read',
         }

      ]

   },

   // Personal
   {
      title:'Personal y Cargos',
      icon:'fas fa-people-group',
     
      children:[

         {
            icon: 'fas fa-people-group',
            title: 'Personal',
            route: 'personal.list',
            action: 'read',
            rosource: 'personal negocio',

         },

         {
         
            title:'Cargos',
            route:'cargos.list',
            action: 'read',
            rosource: 'cargos negocio',
            

         }
      ]
   },

   // preferencias del Negocio
   {
      title: 'Preferencias del Negocio',
      icon: 'fas fa-gear',
      children:[
         {
            title:'Información del Negocio',
            route:'negocio.informacion',
            resource:'preferencias negocio',
            action:'read'

         },

         {
            title: 'Logo y portada',
            route: 'negocio.logo',
            resource: 'preferencias negocio',
            action: 'read'


         },


          {
            title: 'Amenidades',
            route: 'negocio.amenidades',
             resource: 'preferencias negocio',
             action: 'read'

         },


          {
            title: 'Horario de Trabajo',
            route: 'negocio.horario',
             resource: 'preferencias negocio',
             action: 'read'

         },

         {
            title: 'Divisa y precios',
            route: 'negocio.divisa',
            resource: 'preferencias negocio',
            action: 'read'

         },

       

         {
            title: 'Redes Sociales',
            route: 'negocio.redes',
            resource: 'preferencias negocio',
            action: 'read'
         },


         {
            title: 'Publica un video',
            route: 'negocio.video',
            resource: 'preferencias negocio',
            action: 'read'
         }





      ]

   },


   // Reportes

   {
      title:'Reportes',
      icon:'fas fa-file-csv',

      children:[
         {
            title:'Ventas',
            resource: 'reportes negocio',
            action: 'read'
         },

         {
            title: 'Certificados',
            action: 'read',
            resource: 'reportes negocio' ,
         },
      ]

   }



   


]
