export default [
 
  // {
  //   header: 'Apps & Pages',
  // },

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

      {
        title:'Movimientos en la cartera',
        icon:'DollarSignIcon',
        route:'movimientos',
        resource:'movimientos',
        action:'read',
      }

    ]
  },



]
