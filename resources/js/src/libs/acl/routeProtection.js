import ability from './ability'
export const canNavigate = (to) => {

   return to.matched.some((route) => {
   
      const action = route.meta.action || 'read';

      const resource = route.meta.resource || 'Auth';
   })
};

export const _ = undefined
