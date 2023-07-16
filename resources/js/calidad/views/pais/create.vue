<script>
import {h,onMounted} from 'vue'
import form from './form.vue'
import router from '@/router'

import store from '@/store'

export default {
   
   setup(props){

      onMounted(() => {
         store.commit('pais/clear')
      })


      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('pais/guardar',data).then(({result,pais}) => {

                  if(result){
                     
                     toast.success('Se ha guardado con éxito al pais')
                     router.push({name:'edit.pais',params:{id:pais.id}})

                  }else{
                     toast.info('No se ha podido guardar el pais, inténtelo de nuevo')

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