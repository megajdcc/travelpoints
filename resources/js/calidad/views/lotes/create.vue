<script>

import {h} from 'vue'
import store from '@/store'
import router from '@/router'
import form from './form.vue'

export default {


  setup(props){

    store.commit('lote/clear')
    
    return () => h(form,{
      on:{
        save:(data,formValidate) => {
          
          store.dispatch('lote/guardar',data).then(({result,lote}) => {

            if(result){
              toast.success('Se ha cargado con éxito el Lote')
              router.push({name:'lotes.list'})
            }else{
              toast.info('NO se pudo cargar el lote, inténtelo de nuevo')
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