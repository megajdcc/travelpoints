
<script>
import form from './form'
import {h,onMounted} from 'vue'

import store from '@/store'

import router from '@/router'

export default {
   
   setup() {
      onMounted(() => {
         store.commit('categoriaNegocio/clear')
      })   

      return () => h(form,{
         on:{
            
            save(data,formValidate){

               store.dispatch('categoriaNegocio/guardar',data).then(({result,categoria}) => {

                  if(result){
                     toast.success('Se Ha registrado con éxito la categoría')
                     router.push({name:'negocio.categorias.edit',params:{id:categoria.id}})
                  }else{
                     toast.error('No se pudo registrar la categoría, inténtelo de nuevo mas tarde')
                  }

               }).catch(e => {
                  console.log(e)
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }
               })

            }

         }
      })
   },
}
</script>