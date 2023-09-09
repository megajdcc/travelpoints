<script>

import form from './form.vue'

import {h} from 'vue'
import store from '@/store'
import router from '@/router'

export default {
  

  setup(){

    store.commit('invitacion/clear')

    return () => h(form,{
      on:{
        save:(datos,formValidate) => {
          
          store.dispatch('invitacion/guardar',datos).then(({result}) => {
            if(result){
              toast.success('Se ha enviado con éxito la invitación')
              router.push({ name: 'negocios-invitados.list' })
            }else{
              toast.info('No se pudo crear la invitación, inténtelo de nuevo')
            }
              
          }).catch(e => {
            if(e.response.status === 422){
              formValidate.value.setErrors(e.response.data.errors)
            } 

            console.log(e)

          })


        }
      }
    })
  }
}
</script>