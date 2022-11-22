
<script>

import form from './form'

import { h, onMounted,toRefs,watch} from '@vue/composition-api'
import store from '@/store'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)

      const {faqs} = toRefs(store.state.faq)

      const cargarForm = () => {
         
         if(!faqs.value.length){
            
            store.dispatch('faq/getFaq',id.value).then(() => {
               store.commit('faq/capturarFaq',Number(id.value))
            })

         }else{
            store.commit('faq/capturarFaq',Number(id.value))
         }


      }

      onMounted(() => cargarForm())
      
      watch([id], () => cargarForm())

      return () => h(form, {

         on: {
            save: (data, formValidate) => {
               store.dispatch('faq/guardarFaq', data).then(({ result, faq }) => {

                  if (result) {
                     toast.success('Se ha actualizado con éxito la pregunta.')

                  } else {
                     toast.error('No se pudo actualizar la pregunta, inténtelo de nuevo mas tarde')
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
   },
}
</script>