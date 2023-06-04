<script>

import form from 'views/eventos/form.vue'

import {onMounted,h,toRefs} from 'vue'

import store from '@/store'
import router from '@/router'

export default {
   
   
   setup(){ 

      const {negocio} = toRefs(store.state.negocio)

      onMounted(() => store.commit('evento/clear'))

      return () => h(form,{

         props:{
            negocio:true,
         },

         on:{
            save:(data,formValidate) => {

               data.model = {
                  model_id: negocio.value.id,
                  model_type: "App\\Models\\Negocio\\Negocio"
               }

               store.dispatch('evento/guardar',data).then(({result,evento}) => {

                  if(result){
                     toast.success('Se ha creado con éxito el evento',{position:'bottom-right'})
                     router.push({name:'negocio.eventos'})
                  }else{
                     toast.info('No se pudo crear el evento, inténte de nuevo', { position: 'bottom-right' })
                  }

               }).catch(e => {
                  
                  if(e.response.status === 422){
                     if(e.response.status === 422){
                        formValidate.setErrors(e.response.data.errors)
                     }

                     console.log(e)

                  }

               })
               
            }

         }

      })
   }
   
   
}
</script>