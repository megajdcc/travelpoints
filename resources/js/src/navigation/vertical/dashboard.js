export default [
 
  // {
  //   header: 'Apps & Pages',
  // },

  {
    title: 'Home',
    icon:'HomeIcon',
    children:[

      {
        title: 'Home',
        icon: 'HomeIcon',
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
