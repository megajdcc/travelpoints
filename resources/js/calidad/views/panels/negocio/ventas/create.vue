<script>

import {h,toRefs,onMounted} from 'vue'

import store from '@/store'

import form from './form.vue'

import router from '@/router'


export default {
  
  setup(){
    store.commit('venta/clear')

    
    return () => h(form,{

      on:{
        save:(datos,formValidate) => {

          store.dispatch('venta/guardar',datos).then(({result}) => {

            if(result){
              toast.success('Se ha cargado con éxito el consumo',{position:'bottom-right'})
              router.push({name:'negocio.ventas'})
            }else{
              toast.info('No se pudo registrar el consumo del cliente, inténtelo de nuevo mas tarde', { position: 'bottom-right' })
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