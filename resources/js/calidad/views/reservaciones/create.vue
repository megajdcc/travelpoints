<script>

import {h,onMounted} from 'vue'
import form from './form.vue'
import store from '@/store'
import router from '@/router'

export default {
  
  setup(props){

    store.commit('reservacion/clear')
    return () => h(form,{ 
      on:{
        save:(data,formValidate) => {
          store.dispatch('reservacion/guardar',data).then(({result,reservacion}) => {
            if(result){
              toast.success('Se ha creado con éxito la reservación')
              router.push({name:'reservaciones.list'})
            } else{
              toast.info('No se pudo crear la reserva, inténte de nuevo mas tarde')
            }
          }).catch(e => {

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