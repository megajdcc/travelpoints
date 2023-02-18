<script>
import form from './form.vue'

import store from '@/store'
import { h,onMounted,toRefs, watch} from '@vue/composition-api'

export default {

   props:['id'],


   setup(props) {


      const {iatas} =  toRefs(store.state.iata)
      const {id} = toRefs(props)
      
      const cargarForm = () => {

         if(!iatas.value.length){
            store.dispatch('iata/fetch',id.value)
         }else{
            store.commit('iata/capturar',id.value)
         }
      }


      onMounted(() => cargarForm())

      watch([id,iatas],() => cargarForm())

      return () => h(form, {

         on: {

            save: (data, formValidate) => {

               store.dispatch(`iata/guardar`, data).then(({ result, iata }) => {

                  if (result) {
                     toast.success('Se ha actualizado con éxito el código Iata... ');
                     store.commit('iata/update', iata)
                  } else {
                     toast.info('No se pudo guardar el Código Iata...')
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