<script>

import form from './form.vue'

import store from '@/store'
import {onMounted,h,toRefs,watch} from 'vue'

import router from '@/router'


export default {
  
  
  props:['id'],


  setup(props){  
    
    const {id} = toRefs(props)
    const {reservaciones} = toRefs(store.state.reservacion)

    const cargarForm = () => {

      if(!reservaciones.value.length){
        store.dispatch('reservacion/fetch',id.value)
      }else{
        store.commit('reservacion/capturar',id.value)
      }
    }


    onMounted(() => cargarForm());

    watch([id,reservaciones],() => cargarForm())


    return () => h(form,{
      on:{
        
        save:(datos,formValidate) => {

          store.dispatch('reservacion/guardar',datos).then(({result}) => {
            
            if(result){
              toast.success('Se ha actualizado con éxito la reservación')
              router.push({name:'negocio.reservaciones'})
            }else{
              toast.info('No se pudo actualizar la reserva, inténte de nuevo mas tarde...')
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