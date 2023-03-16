<script>

import form from './form.vue'
import { onMounted, h,toRefs } from 'vue'
import store from '@/store'

export default {

   props:['id'],

   setup(props) {

      const { id } = toRefs(props)

      const {atracciones} = toRefs(store.state.atraccion)

      const cargarForm = () => {

         if (!atracciones.value.length){
            store.dispatch('atraccion/fetch',id.value)
         }else{
            store.commit('atraccion/capturar',id.value)
         }

      }

      
      onMounted(() => cargarForm())

      return () => h(form, {

         on: {

            save: (datos, formValidate) => {

               store.dispatch('atraccion/guardar', datos).then(({ result }) => {

                  if (result) {
                     toast.success('Se ha guardado con éxito la Atracción', { position: 'bottom-right' })
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