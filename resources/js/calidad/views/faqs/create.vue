
<script>

import form from './form'

import {h,onMounted} from 'vue'
import store from '@/store'
import router from '@/router'

export default {

   setup() {
      
      onMounted(() => {
         store.commit('faq/clearFaq')
      })

      return () => h(form,{

         on:{
           save:(data, formValidate) => {
                  store.dispatch('faq/guardarFaq', data).then(({ result, faq }) => {

                     if (result) {
                        toast.success('Se ha creado con éxito la pregunta.')
                        router.push({ name: 'edit.faq', params: { id: faq.id } })

                     } else {
                        toast.error('No se pudo registrar la pregunta, inténtelo de nuevo mas tarde')
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