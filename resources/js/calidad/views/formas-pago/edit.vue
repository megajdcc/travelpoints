<script>

import form from './form.vue'

import store from '@/store'
import {onMounted,h,toRefs,watch} from '@vue/composition-api'


export default {
   
   props:['id'],

   setup(props){
      const {id} = toRefs(props)

      const { formas } = toRefs(store.state.formasPago)

      const cargarForm = () => {
         
         if(!formas.value.length){
            store.dispatch('formasPago/fetch',id.value)
         }else{
            store.commit('formasPago/capturar',id.value)
         }

      }
      onMounted(() => cargarForm())
      watch([id,formas], () => cargarForm())


      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('formasPago/guardar',data).then(({result}) => {

                  if(result){
                     toast.success('Se ha actualizado con éxito la Forma de Pago')
                  }else{
                     toast.info('No se pudo actualizar la Forma de Pago')
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