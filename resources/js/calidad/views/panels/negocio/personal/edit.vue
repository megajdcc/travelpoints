<script>
import form from './form.vue'
import {h,onMounted,toRefs,watch} from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {
   
   props:['id'],

   setup(props){
      const {id} = toRefs(props)
      const {empleados} = toRefs(store.state.empleado)

      const cargarForm = () => {

         if(!empleados.value.length){
            store.dispatch('empleado/fetch',id.value)
         }else{
            store.commit('empleado/capturar', id.value)
         }

      }

      onMounted(() => cargarForm())
      watch([id,empleados],() => cargarForm())

      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('empleado/guardar',data).then(({result,empleado,usuario}) => {

                  if(result){
                     toast.success('Actualización con éxito')
                     store.commit('usuario/updateUsuario',usuario)
                     store.commit('empleado/update',empleado)
                     
                  }else{
                     toast.info('No se pudo actualizar, inténtelo de nuevo')

                  }

               }).catch(e => {

                  if(e.response.status === 422){
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