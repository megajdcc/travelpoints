
import {ref} from '@vue/composition-api'


export default function useTogglePassword(){

   const passwordFieldType = ref('password')

   const togglePasswordVisibility = () => {
      passwordFieldType.value = passwordFieldType.value === 'password' ? 'text' : 'password'
   }

   return {
      passwordFieldType,
      togglePasswordVisibility
   }
  

  
}

export const _ = null
