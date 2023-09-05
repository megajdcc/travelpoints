
const coordinador = [
  {
    title: 'Home',
    icon:'fa-house',
    fontAwesome:true,
    children:[
      {
        title: 'Tablero',
        icon: 'fa-house',
        fontAwesome:true,
        tagVariant: 'light-warning',
        route: 'home',
        resource: 'home',
        action: 'read',
      },
    ]
  },



  // {
  //   title:'Hacer Reserva',
  //   route:'reservaciones.list',
  //   action:'read',
  //   resource:'reservaciones',
  //   icon:'fa-calendar-check',
  //   fontAwesome:true,
  //  },

    {
      title:'Movimientos en cartera',
      icon:'DollarSignIcon',
      route:'movimientos',
      resource:'movimientos',
      action:'read',
    },

     {
      title:'Retiros',
      icon:'fa-circle-dollar-to-slot',
      route:'mis-retiros',
      resource:'retiros',
      action:'read',
      fontAwesome:true,
    },

    {
      title:'Estatus & Nivel',
      icon:'fa-heart-pulse',
      route:'estatus',
      resource:'estatus',
      action:'read',
      fontAwesome:true,
    },

    {
      title: 'Mis Lideres',
      route: 'lideres.list',
      action: 'read',
      resource: 'lideres',
      icon: 'UsersIcon',
    },

    {
      title: 'Negocios Invitados',
      route: 'negocios-invitados.list',
      action: 'read',
      resource: 'Negocios invitados',
      icon: 'fa-table-list',
      fontAwesome:true,
    },

    {
        title: 'Reportes',
        icon: 'fa-chart-pie',
        fontAwesome:true,
        children:[
         
          {
            title:'Estados de Cuenta',
            route:'report.movimientos.full',
            resource:'reportes',
            action:'read',
          },

         
        ]

      },

      {
        title: 'Academia',
        route: 'academia',
        action: 'read',
        resource: 'Auth',
        icon: 'fa-graduation-cap',
        fontAwesome:true,

      },

    


];

export default [...coordinador];