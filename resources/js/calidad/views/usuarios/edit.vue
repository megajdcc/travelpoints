<script>

import form from './form';

import { h, onMounted,watch,computed,toRefs } from 'vue'
import store from '@/store'

export default {

   props:['id'],

   setup(props) {

      const {id} = toRefs(props)

      const usuarios = computed(() => store.state.usuario.usuarios)


      const cargarForm = () => {
         
         if(!usuarios.value.length){

            store.dispatch('usuario/getUsuario',id.value).then((data) => {
               store.commit('usuario/capturarUsuario',Number(id.value))
            })

         }else{

            store.commit('usuario/capturarUsuario', Number(id.value))
         
         }


      }

      onMounted(() => {
         cargarForm()
      })

      watch([id],() => {
         cargarForm()
      })

      return () => h(form, {

         on: {

            save: (data, formValidate) => {

               store.dispatch('usuario/guardar', data).then(({ result, usuario }) => {

                  if (result) {
                     toast.success('Se ha actualizado con éxito al usuario...')
                  } else {
                     toast.error('No se pudo actualizar al usuario, inténtelo de nuevo mas tarde')

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