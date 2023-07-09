<script>
import form from './form.vue'

import {h,onMounted} from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   setup(){

      onMounted(() => store.commit('cargo/clear'))
      return () => h(form,{

         on:{
            save:(data,formValidate) => {
               store.dispatch('cargo/guardar',data).then(({result,cargo}) => {
                  if(result){
                     toast.success('Se ha creado el Cargo con éxito ')
                     store.commit('cargo/push',cargo)
                     router.push({name:'cargos.list'})
                  }else{
                     toast.info('NO se pudo crear el cargo, inténtelo de nuevo')
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