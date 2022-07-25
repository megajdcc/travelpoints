export default [
  
   {
      title: 'Usuarios',
      route: 'listar.usuarios',
      action: 'read',
      resource: 'usuarios',
      icon: 'UsersIcon',
   },

   {
      title:'Configuraciones',
      icon:'SettingsIcon',
      children:[
         
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
         }

      ]
   },

   {
      header: 'Mi Cuenta',
      icon:'MinusIcon'
   },
   {
      title:'Perfil',
      route:'perfil',
      icon:'UserIcon',
      action: 'read',
      resource: 'perfil',
   }
   
]

