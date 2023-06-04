<script>
import form from './form.vue'

import {h,onMounted,toRefs,watch} from 'vue'

import store from '@/store'
import router from '@/router'

export default {
   
   props:['id'],

      setup(props){
      
      const {negocios} = toRefs(store.state.negocio)
      const {id} = toRefs(props)

      const cargarForm = () => {

         if(!negocios.value.length){
            store.dispatch('negocio/fetch',id.value)
         }else{
            store.commit('negocio/capturar',id.value)
         }

      }


      onMounted(() => cargarForm())
      watch([id,negocios],() => cargarForm())

      return () => h(form,{

         on:{
            
            save:(datos,formValidate) => {

               store.dispatch('negocio/guardar',datos).then(({result,negocio})  => {

                  if(result){
                     toast.success('Se ha guardado con éxito el Negocio',{position:'bottom-right'})
                  }else{
                     toast.info('No se ha guardado el Negocio', { position: 'bottom-right' })
                  }

               }).catch(e => {
                  
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errrors)
                  }

               })

            }

         }

      })
   }
   
}
</script>