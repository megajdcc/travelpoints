
<script>

import form from './form'

import { h, onMounted } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {

   setup() {

      onMounted(() => {
         store.commit('faq/clearCategoria')
      })

      return () => h(form, {

         on:{
            save:(data, formValidate) => {
               store.dispatch('faq/guardarCategoria', data).then(({ result, faq }) => {

                  if (result) {
                     toast.success('Se ha creado con éxito la categoría.')
                     router.push({ name: 'edit.categoria-faq', params: { id: faq.id } })

                  } else {
                     toast.error('No se pudo registrar la categoría, inténtelo de nuevo mas tarde')
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