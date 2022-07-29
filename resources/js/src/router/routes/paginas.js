export default [
   {
      path: '/',
      name: 'inicio',
      component: () => import('views/paginas'),
      meta: {
        layout:'full',
         resource: 'Auth',

      },

      
   },
]
