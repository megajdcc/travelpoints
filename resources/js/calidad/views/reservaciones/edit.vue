<script>

import {h,toRefs,watch} from 'vue'
import form from './form.vue'
import store from '@/store'
import router from '@/router'

export default {
  
  props:{
    id:Number|String
  },

  setup(props){

    const {id} = toRefs(props)

    const cargarForm  = () => {
      store.dispatch('reservacion/fetch',id.value).then((reservacion) => {
          store.dispatch('negocio/fetch',reservacion.negocio_id)
          store.commit('usuario/setUsuario',reservacion.usuario)
          // store.dispatch('usuario/fetch',reservacion.usuario_id)
      })
    } 

    cargarForm();

    watch(id,() => cargarForm());

    return () => h(form,{ 
      on:{
        save:(data,formValidate) => {
          store.dispatch('reservacion/guardar',data).then(({result}) => {
            if(result){
              toast.success('Se ha actualizado con éxito la reservación')
              router.push({name:'reservaciones.list'})
            } else{
              toast.info('No se pudo actualizar la reserva, inténte de nuevo mas tarde')
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