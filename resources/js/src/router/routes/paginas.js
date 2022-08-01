export default [
   {
      path: '/',
      name: 'inicio',
      component: () => import('views/paginas'),
      meta: {
        layout:'travel',
         resource: 'Auth',

      },

      
   },
]
