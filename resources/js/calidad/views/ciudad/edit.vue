<script>
import { h, onMounted,watch,toRefs } from 'vue'
import form from './form.vue'

import store from '@/store'

export default {  

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {ciudades} = toRefs(store.state.ciudad)  

      const cargarForm = () => {

         if(!ciudades.value.length){
            store.dispatch('ciudad/fetchCiudad',id.value)
         }else{
            store.commit('ciudad/capturar',id.value)
         }


      }

      onMounted(() => cargarForm())

      watch([id,ciudades], () => cargarForm())


      return () => h(form, {

         on: {
            save: (data, formValidate) => {

               store.dispatch('ciudad/guardar', data).then(({ result }) => {

                  if (result) {
                     toast.success('Se ha actualizado con éxito la ciudad')
                  } else {
                     toast.info('No se ha podido actualizar la ciudad, inténtelo de nuevo')

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