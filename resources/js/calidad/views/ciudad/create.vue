<script>
import {h,onMounted} from 'vue'
import form from './form'
import router from '@/router'

import store from '@/store'

export default {
   
   setup(props){

      onMounted(() => {
         store.commit('ciudad/clear')
      })


      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('ciudad/guardar',data).then(({result,ciudad}) => {

                  if(result){
                     
                     toast.success('Se ha guardado con éxito la ciudad')
                     router.push({name:'edit.ciudad',params:{id:ciudad.id}})

                  }else{
                     toast.info('No se ha podido guardar la ciudad, inténtelo de nuevo')

                  }
               }).catch(e => {
                  
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }

               })

            }

         }

      })
   }
}
</script>