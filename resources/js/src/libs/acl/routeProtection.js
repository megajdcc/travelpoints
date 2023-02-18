import ability from './ability'
<<<<<<< HEAD
=======

>>>>>>> vite
export const canNavigate = (to) => {

   return to.matched.some((route) => {
   
      const action = route.meta.action || 'read';
<<<<<<< HEAD
      const resource = route.meta.resource || 'read';
=======
      const resource = route.meta.resource || 'Auth';
>>>>>>> vite
      return ability.can(action, resource)   

   })

};

export const _ = undefined
