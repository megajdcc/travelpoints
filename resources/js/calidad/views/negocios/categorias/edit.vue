
<script>
import form from './form.vue'
import { h, onMounted,toRefs,watch } from 'vue'

import store from '@/store'

export default {

   props:['id'],

   setup(props) {
      const {id} = toRefs(props)
      const {categorias} = toRefs(store.state.categoriaNegocio)

      const cargarForm = () => {
         
         if(!categorias.value.length){
            
            store.dispatch('categoriaNegocio/getCategoria',id.value).then((data) => {
               store.commit('categoriaNegocio/capturar',Number(id.value))
            })

         }else{
            store.commit('categoriaNegocio/capturar', Number(id.value))
         }

      }

      onMounted(() => cargarForm())

      watch([id,categorias],() => cargarForm())


      return () => h(form, {
         on: {

            save(data, formValidate) {

               store.dispatch('categoriaNegocio/guardar', data).then(({ result, categoria }) => {

                  if (result) {
                     toast.success('Se ha actualizado con éxito la categoría')
                  } else {
                     toast.error('No se pudo actualizar la categoría, inténtelo de nuevo mas tarde')
                  }

               }).catch(e => {
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