<script>
import { h, onMounted,toRefs,watch } from '@vue/composition-api'

import store from '@/store'

import form from './form.vue'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {eventos} = toRefs(store.state.evento)

      const cargarForm = () => {

         if(!eventos.value.length){
            store.dispatch('evento/fetch',id.value)
         }else{
            store.commit('evento/capturar',id.value)
         }

      }


      onMounted(() =>cargarForm())
      watch([id,eventos],() => cargarForm())


      return () => h(form, {

         on: {

            save: (data, formValidate) => {

               store.dispatch('evento/guardar', data).then(({ result }) => {

                  if (result) {
                     toast.success('Se ha guardado con éxito el evento', { position: 'bottom-right' })
                 
                  } else {
                     toast.info('NO se pudo crear el registro, inténtelo de nuevo')
                  }

               }).catch(e => {

                  console.log(e)

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