<script>

import form from './form.vue'

import {toRefs,onMounted,h} from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {
   
   
   setup(){
      const {negocio} = toRefs(store.state.negocio)
      onMounted(() => store.commit('certificado/clear'))

      return () => h(form,{

         on:{
            save:(data,formValidate) => {
               data.negocio_id = negocio.value.id

               store.dispatch('certificado/guardar',data).then(({result,certificado}) => {
                  if(result){
                     toast.success('Se ha creado con éxito el certificado',{position:'bottom-right'})
                     router.push({name:'negocio.certificado.edit',params:{id:certificado.id}})
                  }else{
                     toast.info('No se pudo crear el certificado, inténte de nuevo', { position: 'bottom-right' })

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