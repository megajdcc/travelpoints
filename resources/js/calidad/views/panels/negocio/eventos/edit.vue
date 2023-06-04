<script>

import form from 'views/eventos/form.vue'

import {onMounted,h,watch,toRefs} from 'vue'

import store from '@/store'
import router from '@/router'

export default {
   

   props:['id'],
   
   setup(props){ 

      const {id} = toRefs(props)
      const {eventos} = toRefs(store.state.evento)


      const cargarForm = () => {

         if(!eventos.value.length){
            store.dispatch('evento/fetch',id.value)
         }else{
            store.commit('evento/capturar',id.value)
         }


      }
      onMounted(() => cargarForm())

      watch([id,eventos],() => cargarForm())

      return () => h(form,{

         props:{
            negocio:true,
         },

         on:{
            save:(data,formValidate) => {

               store.dispatch('evento/guardar',data).then(({result}) => {

                  if(result){
                     toast.success('Se ha guardado con éxito el evento',{position:'bottom-right'})
                 
                  }else{
                     toast.info('No se pudo guardar el evento, inténte de nuevo', { position: 'bottom-right' })
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