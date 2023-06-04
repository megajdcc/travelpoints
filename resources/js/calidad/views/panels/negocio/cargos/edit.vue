<script>
import form from './form.vue'

import { h, onMounted,toRefs,watch } from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {cargos} = toRefs(store.state.cargo)

      const cargarform =()  => {
         if(!cargos.value.length){
            store.dispatch('cargo/fetch',id.value)
         }else{
            store.commit('cargo/capturar',id.value)
         }
      }

      onMounted(() => cargarform())

      watch([id,cargos],() => cargarform())

      return () => h(form, {

         on: {
            save: (data, formValidate) => {
               store.dispatch('cargo/guardar', data).then(({ result, cargo }) => {
                  if (result) {
                     toast.success('Se ha actualizado el cargo con éxito ')
                     store.commit('cargo/update',cargo)
                     
                  } else {
                     toast.info('NO se pudo crear el cargo, inténtelo de nuevo')
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