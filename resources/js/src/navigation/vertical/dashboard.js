export default [
 
  // {
  //   header: 'Apps & Pages',
  // },

  {
    title: 'Home',
<<<<<<< HEAD
    icon: 'HomeIcon',
    tagVariant: 'light-warning',
    route: 'home',
    resource:'home',
    action:'read'
=======
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
>>>>>>> vite
  },



]
