<script>
import {h,onMounted} from 'vue'
import form from './form'
import router from '@/router'

import store from '@/store'

export default {
   
   setup(props){

      onMounted(() => {
         store.commit('estado/clear')
      })


      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('estado/guardar',data).then(({result,estado}) => {

                  if(result){
                     
                     toast.success('Se ha guardado con éxito al estado')
                     router.push({name:'edit.estado',params:{id:estado.id}})

                  }else{
                     toast.info('No se ha podido guardar el estado, inténtelo de nuevo')

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