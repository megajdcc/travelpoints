<script>

import form from './form.vue'
import store from '@/store'

import {h,toRefs,watch} from 'vue'

export default {
  

  props:{
    id:Number|String
  },

  setup(props){

    const {id} = toRefs(props)
    const {retiros} = toRefs(store.state.retiro)

    const cargarForm = () => {

      if(!retiros.value.length){
        store.dispatch('retiro/fetch',id.value)
      }else{
        store.commit('retiro/capturar',id.value)
      }

      
    }


    cargarForm();

    watch(id,() => cargarForm())


    return () => h(form,{
      
      on:{
        save:(data,formValidate) => {

          store.dispatch(`retiro/guardar`,data).then(({result,retiro}) => {

            if(result){
              toast.success('Se ha guardado con éxito la solicitud...')

            }else{
              toast.info('No se pudo realizar la actualización, inténtelo de nuevo mas tarde...')
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