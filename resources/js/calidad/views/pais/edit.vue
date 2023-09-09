<script>
import { h, onMounted,watch,toRefs } from 'vue'
import form from './form.vue'
import router from '@/router'

import store from '@/store'

export default {  

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {paises} = toRefs(store.state.pais)  

      const cargarForm = () => {

         if(!paises.value.length){
            store.dispatch('pais/fetchPais',id.value)
         }else{
            store.commit('pais/capturar',id.value)
         }


      }

      onMounted(() => cargarForm())

      watch([id,paises], () => cargarForm())


      return () => h(form, {

         on: {
            save: (data, formValidate) => {

               store.dispatch('pais/guardar', data).then(({ result, pais }) => {

                  if (result) {
                     toast.success('Se ha actualizado con éxito al pais')
                  } else {
                     toast.info('No se ha podido actualizar el pais, inténtelo de nuevo')

                  }
               }).catch(e => {

                  if (e.response.status === 422) {
                     formValidate.setErrors(e.response.data.errors)
                  }

               })

            }

         }

      })
   }
}
</script>