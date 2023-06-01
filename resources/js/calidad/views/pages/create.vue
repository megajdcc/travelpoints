<script>

import store from '@/store'
import {h} from 'vue'
import router from '@/router'

import form from './form.vue'
export default {
  

  setup(){


    store.commit('pagina/clear')

    return () => h(form,{


      
      on:{
        save:(data,formValidate) => {

          store.dispatch('pagina/guardar',data).then(({result,pagina}) => {

            if(result){
              toast.success('Se ha creado con éxito la pagina')
              router.push({name:'pagina.edit',params:{id:pagina.id}})
            }else{
              toast.info('NO se pudo crear la pagina, inténtelo de nuevo mas tarde')
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