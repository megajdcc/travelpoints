<script>

import form from './form.vue'

import store from '@/store'
import {onMounted,h} from 'vue'

import router from '@/router'


export default {
  
  
  setup(){  
    
    store.commit('reservacion/clear')


    return () => h(form,{
      on:{
        
        save:(datos,formValidate) => {

          store.dispatch('reservacion/guardar',datos).then(({result}) => {
            
            if(result){
              toast.success('Se ha generado con éxito la reservación')
              router.push({name:'negocio.reservaciones'})
            }else{
              toast.info('No se pudo generar la reserva, inténte de nuevo mas tarde...')
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
  }
}
</script>