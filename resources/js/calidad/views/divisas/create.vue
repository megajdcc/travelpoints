
<script>

import form from './form.vue'

import store from '@/store'
import router from '@/router'

import {onMounted,h} from 'vue'

export default {

   setup(){

      onMounted(() => {

         store.commit('divisa/clear')

      })

      return h(form,{

         on:{
            save:(data,formValidate)  => {
               
               store.dispatch('divisa/guardar',data).then(({result,divisa}) => {

                  if(result){
                     toast.success('Se ha registrado con éxito la divisa.')
                     router.push({name:'divisa.edit',params:{id:divisa.id}})
                  }else{
                     toast.info('No se pudo registrar la divisa, intentelo de nuevo mas tarde')
                  }

               }).catch(e => {
                  
                  console.log(e)
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }

               })


            }

         }
      });

   }


}

</script>