<script>
import {h,onMounted} from 'vue'

import store from '@/store'
import router from '@/router'

import form from './form.vue'

export default {

   setup(props){

      onMounted(() => store.commit('evento/clear'))

      return () => h(form,{
         
         on:{

            save:(data,formValidate) => {
            
               store.dispatch('evento/guardar',data).then(({result,evento}) => {

                  if(result){
                     toast.success('Se ha creado con éxito el evento',{position:'bottom-right'})
                     router.push({name:'edit.evento',params:{id:evento.id}})
                  }else{
                     toast.info('NO se pudo crear el registro, inténtelo de nuevo')
                  }

               }).catch(e => {
                  
                  console.log(e)

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