<script>

import {h,toRefs,ref, computed} from 'vue'

import store from '@/store'
import router from '@/router'

import form from './form.vue'

export default {
  
  setup(){


    store.commit('categoriaProducto/clear')


    return () => h(form,{
      
      on:{
        save:(data,formValidate) => {
          store.dispatch('categoriaProducto/guardar',data).then(({result,categoria}) => {

            if(result){
              toast.success('Se ha creado con éxito la categoría...', {position:'bottom-right'})
              router.push({name:'categoriaProducto.edit',params:{id:categoria.id}})
            }else{
              toast.info('No se pudo crear, inténte de nuevo.', {position:'bottom-right'})

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