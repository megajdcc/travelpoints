<script>
import { h, onMounted,watch,toRefs } from 'vue'
import form from './form'

import store from '@/store'

export default {  

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {estados} = toRefs(store.state.estado)  

      const cargarForm = () => {

         if(!estados.value.length){
            store.dispatch('estado/fetchEstado',id.value)
         }else{
            store.commit('estado/capturar',id.value)
         }


      }

      onMounted(() => cargarForm())

      watch([id,estados], () => cargarForm())


      return () => h(form, {

         on: {
            save: (data, formValidate) => {

               store.dispatch('estado/guardar', data).then(({ result, estado }) => {

                  if (result) {
                     toast.success('Se ha actualizado con éxito al estado')
                  } else {
                     toast.info('No se ha podido actualizar el estado, inténtelo de nuevo')

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