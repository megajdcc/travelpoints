<script>

import form from './form.vue'

import { onMounted, h,toRefs } from 'vue'
import store from '@/store'
export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)
      const {destinos} = toRefs(store.state.destino)

      const cargarForm = () => {

            if(!destinos.value.length){
               store.dispatch('destino/fetch',id.value).then(() => {

               })

            }else{
               store.commit('destino/capturar',id.value)
            }


      }


      onMounted(() => cargarForm())

      return () => h(form, {

         on: {

            save: (datos, formValidate) => {

               store.dispatch('destino/guardar', datos).then(({ result, destino }) => {

                  if (result) {

                     toast.success('Se ha guardado con éxito el destino', { position: 'bottom-right' })
                   
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