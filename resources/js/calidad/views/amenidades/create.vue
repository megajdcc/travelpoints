<script>

import form from './form.vue'

import store from '@/store'
import {onMounted,h} from 'vue'
import router from '@/router'

export default {
   
   
   setup(){
      onMounted(() => store.commit('amenidad/clear'))

      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('amenidad/guardar',data).then(({result,amenidad}) => {

                  if(result){
                     toast.success('Se ha guardado con éxito la amenidad')

                     router.push({name:'edit.amenidad',params:{id:amenidad.id}})
                  }else{
                     toast.info('No se pudo guardar la amenidad')
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