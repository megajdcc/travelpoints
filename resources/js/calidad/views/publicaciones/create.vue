<script>

import form from './form'
import store from '@/store'
import {h,onMounted,toRefs} from '@vue/composition-api'
import router from '@/router'

export default {
   
   setup(){
      const {negocio} = toRefs(store.state.negocio)
      
      onMounted(() => store.commit('publicacion/clear'))

      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               data.model_id = negocio.value.id
               data.model_type = 'App\\Models\\Negocio\\Negocio';
               store.dispatch('publicacion/guardar',data).then(({result,publicacion}) =>{

                  if(result){
                     toast.success('Se ha creado con éxito la publicación',{position:'bottom-right'})
                     router.push({name:'negocio.publicacion.edit',params:{id:publicacion.id}})
                  }else{
                     toast.info('No se pudo guardar la publicación, inténtelo de nuevo',{position:'bottom-right'})
                  }
               } ).catch(e => {
                  
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