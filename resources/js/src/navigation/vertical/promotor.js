
const promotor = [
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

  {
    title: 'Registrar Usuario',
    icon:'fa-user-pen',
    fontAwesome:true,
    route:'create.usuario',
    resource:'usuarios',
    action:'write'
  },

  {
    title:'Hacer Reserva',
    route:'reservaciones.list',
    action:'read',
    resource:'reservaciones',
    icon:'fa-calendar-check',
    fontAwesome:true,
   },

    {
      title:'Movimientos en cartera',
      icon:'DollarSignIcon',
      route:'movimientos',
      resource:'movimientos',
      action:'read',
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
        title: 'Usuarios Registrados',
        route: 'listar.usuarios',
        action: 'read',
        resource: 'usuarios',
        icon: 'UsersIcon',
      },

    {
        title: 'Reportes',
        icon: 'fa-chart-pie',
        fontAwesome:true,
        children:[
          {
            title:'Estados de Cuenta',
            route:'report.movimientos',
            resource:'reportes',
            action:'read',
          },
           {
            title:'Activaciones',
            route:'activaciones',
            resource:'reportes',
            action:'read',
          }
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

export default [...promotor];