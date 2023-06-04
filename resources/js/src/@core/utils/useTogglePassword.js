
import {ref} from 'vue'


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
