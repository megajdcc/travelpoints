<script>

import form from './form.vue'

import store from '@/store'
import {onMounted,h,toRefs,watch} from '@vue/composition-api'


export default {
   
   props:['id'],

   setup(props){
      const {id} = toRefs(props)

      const {amenidades} = toRefs(store.state.amenidad)

      const cargarForm = () => {
         
         if(!amenidades.value.length){
            store.dispatch('amenidad/fetch',id.value)
         }else{
            store.commit('amenidad/capturar',id.value)
         }

      }
      onMounted(() => cargarForm())
      watch([id,amenidades], () => cargarForm())


      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('amenidad/guardar',data).then(({result}) => {

                  if(result){
                     toast.success('Se ha actualizado con éxito la amenidad')
                  }else{
                     toast.info('No se pudo actualizar la amenidad')
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