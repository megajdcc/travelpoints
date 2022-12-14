
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
            resource:'negocio.home',
            icon: 'fa-solid fa-gauge',
         
         },

         {
            title: 'Movimientos de cuenta',
            route: 'negocio.movimientos',
            action: 'read',
            resource: 'negocio.movimientos',
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
            resource: 'negocio.ventas',
            action: 'write',
         },

         {
            title: 'Historial de Ventas',
            route: 'negocio.venta.historial',
            icon: 'fa-solid fa-database',
            resource: 'negocio.ventas.historial',
            action: 'write',
         }

      ]
   },

   // Certificados de regalos
   {
      title: 'Certificados',
      icon: 'fas fa-certificate',
      route: 'negocio.certificados',
      resource: 'negocio.certificados',
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
            resource:'negocio.galerias',
            action:'read',
         },

         {
            title: 'Publicaciones',
            route: 'negocio.publicaciones',
            resource: 'negocio.publicaciones',
            action: 'read',
         },

         {
            title: 'Eventos',
            route: 'negocio.eventos',
            resource: 'negocio.eventos',
            action: 'read',
         }

      ]

   },

   // Personal
   {
      title:'Personal',
      route:'negocio.personal',
      icon:'fas fa-people-group',
      action:'negocio.personal',
      rosource:'negocio.personal',
   },

   // preferencias del Negocio
   {
      title: 'Preferencias del Negocio',
      icon: 'fas fa-gear',
      children:[
         {
            title:'Información del Negocio',
            route:'negocio.informacion',

         },

         {
            title: 'Logo y portal',
            route: 'negocio.informacion',

         },


          {
            title: 'Amenidades',
            route: 'negocio.informacion',

         },


          {
            title: 'Horario de Trabajo',
            route: 'negocio.informacion',

         },

         {
            title: 'Divisa y precios',
            route: 'negocio.informacion',

         },

         {
            title: 'Divisa y precios',
            route: 'negocio.informacion',

         },

         {
            title: 'Redes Sociales',
            route: 'negocio.informacion',
         },


         {
            title: 'Publica un video',
            route: 'negocio.informacion',
         }





      ]

   },


   // Reportes

   {
      title:'Reportes',
      icon:'fas fa-file-csv',

      children:[
         {
            title:'Ventas'
         },

         {
            title: 'Certificados'
         },
      ]

   }



   


]
