<script>

import form from './form.vue'

import store from '@/store'
import {onMounted,h} from '@vue/composition-api'
import router from '@/router'

export default {
   
   
   setup(){
      onMounted(() => store.commit('formasPago/clear'))

      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('formasPago/guardar',data).then(({result,amenidad}) => {

                  if(result){
                     toast.success('Se ha guardado con éxito la Forma de Pago')

                     router.push({ name:'edit.formasPago',params:{id:amenidad.id}})
                  }else{
                     toast.info('No se pudo guardar la forma de Pago')
                  }

               }).catch(e => {
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }
                  console.log(e)

               })

            }
         }
      })

   }
   
}
</script>