<script>

import form from './form.vue'

import {toRefs,onMounted,h} from 'vue'
import store from '@/store'
import router from '@/router'

export default {
   
   
   setup(){
      
      const {negocio} = toRefs(store.state.negocio)
      store.commit('cupones/clear');

      return () => h(form,{

         on:{
            save:(data,formValidate) => {
               data.negocio_id = negocio.value.id

               store.dispatch('cupones/guardar',data).then(({result,cupon}) => {
                  if(result){
                     toast.success('Se ha creado con éxito el cupón',{position:'bottom-right'})
                     router.push({name:'negocio.cupon.edit',params:{id:cupon.id}})
                  }else{
                     toast.info('No se pudo crear el cupón, inténte de nuevo', { position: 'bottom-right' })

                  }
               }).catch(e => {
                  
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }else{
                        console.log(e)
                  }
               
               })

            }

         }

      })
   }
}
</script>