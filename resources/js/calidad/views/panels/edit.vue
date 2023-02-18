
<script>
import form from './form.vue'

import { h, toRefs, onMounted,watch } from '@vue/composition-api'
import store from '@/store'

export default {

   props:['id'],

   setup(props) {
      const {panels} = toRefs(store.state.panel)
      const {id} = toRefs(props)

      const cargarForm = () => {

         if(!panels.value.length){
            store.dispatch('panel/fetch',id.value)
         }else{
            store.commit('panel/capturar',id.value)
         }
         
      }

      onMounted(() => cargarForm())

      watch([panels,id],() => cargarForm())



      return () => h(form, {

         on: {
            save: (data, formValidate) => {

               store.dispatch('panel/guardar', data).then(({ result, panel }) => {

                  if (result) {
                     toast.success('Se ha guardado con éxito el panel', { position: 'bottom-right' })
                  } else {
                     toast.info('No se ha podido, guardar el Panel, inténte de nuevo', { position: 'bottom-right' })

                  }

               }).catch(e => {

                  if (e.response.status === 422) {
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