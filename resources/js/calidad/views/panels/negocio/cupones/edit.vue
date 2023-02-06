<script>

import form from './form.vue'

import {toRefs,onMounted,h,watch} from '@vue/composition-api'
import store from '@/store'

export default {
   
   props:['id'],

   setup(props){
      const {cupones} = toRefs(store.state.cupones)
      const {id} = toRefs(props)

      const cargarForm = () => {
         if(!cupones.value.length){
            store.dispatch('cupones/fetch',id.value)
         }else{
            store.commit('cupones/capturar',id.value)
         }
      }

      onMounted(() => cargarForm())
      watch([id,cupones],() => cargarForm())

      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('cupones/guardar',data).then(({result}) => {
                  if(result){
                     toast.success('Se ha guardado con éxito el cupón',{position:'bottom-right'})
                  }else{
                     toast.info('No se pudo actualizar el Cupón, inténte de nuevo', { position: 'bottom-right' })

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