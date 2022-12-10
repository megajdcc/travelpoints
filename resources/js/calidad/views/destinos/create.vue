<script>

import form from './form.vue'

import {onMounted,h} from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
export default {  

   setup(){

      onMounted(() => store.commit('destino/clear'))

      return () => h(form,{

         on:{
            
            save:(datos,formValidate) => {

               store.dispatch('destino/guardar',datos).then(({result,destino}) => {

                  if(result){
                     
                     toast.success('Se ha guardado con éxito el destino',{position:'bottom-right'})
                     router.push({name:'edit.destino',params:{id:destino.id}})
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