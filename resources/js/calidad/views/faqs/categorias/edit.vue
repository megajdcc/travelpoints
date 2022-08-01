
<script>

import form from './form'

import { h, onMounted,toRefs,watch } from '@vue/composition-api'
import store from '@/store'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)

      const { categorias } = toRefs(store.state.faq)


      const cargarForm = () => {
         
         if(!categorias.value.length){
            store.dispatch('faq/cargarCategoria',id.value).then((data) => {
               store.commit('faq/capturarCategoria', Number(id.value))
            })
         }else{
            store.commit('faq/capturarCategoria', Number(id.value))

         }
      }

      onMounted(() => {
         cargarForm()
      })

      watch([id, categorias],() => {
         cargarForm();
      })

      return () => h(form, {

         on: {
            save: (data, formValidate) => {
               store.dispatch('faq/guardarCategoria', data).then(({ result, faq }) => {

                  if (result) {
                     toast.success('Se ha actualizado con éxito la categoría.')

                  } else {
                     toast.error('No se pudo actualizar la categoría, inténtelo de nuevo mas tarde')
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