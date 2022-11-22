import { ref, watch, computed } from '@vue/composition-api'


export default function useComposeEmail() { 

   const showComposeEmail = ref(false)

   return {
      showComposeEmail
   }

}