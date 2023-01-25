<script>

import form from './form.vue'

import {toRefs,onMounted,h,watch} from '@vue/composition-api'
import store from '@/store'

export default {
   
   props:['id'],

   setup(props){
      const {certificados} = toRefs(store.state.certificado)
      const {id} = toRefs(props)

      const cargarForm = () => {
         if(!certificados.value.length){
            store.dispatch('certificado/fetch',id.value)
         }else{
            store.commit('certificado/capturar',id.value)
         }
      }

      onMounted(() => cargarForm())
      watch([id,certificados],() => cargarForm())

      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('certificado/guardar',data).then(({result}) => {
                  if(result){
                     toast.success('Se ha guardado con éxito el certificado',{position:'bottom-right'})
                  }else{
                     toast.info('No se pudo actualizar el certificado, inténte de nuevo', { position: 'bottom-right' })

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