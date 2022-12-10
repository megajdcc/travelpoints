<script>

import form from './form.vue'

import { onMounted, h,toRefs } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'
export default {

   props:['destino'],

   setup(props) {

      const { destino } = toRefs(props)
      
      onMounted(() => store.commit('atraccion/clear'))

      return () => h(form, {

         on: {

            save: (datos, formValidate) => {

               store.dispatch('atraccion/guardar', {...datos,...{destino_id:destino.value}}).then(({ result, atraccion }) => {

                  if (result) {

                     toast.success('Se ha guardado con éxito la Atracción', { position: 'bottom-right' })
                     router.push({ name: 'edit.atraccion', params: { id: atraccion.id } })
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