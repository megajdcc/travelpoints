<script>

import form from './form.vue'
import store from '@/store'
import router from '@/router'

import {h} from 'vue'

export default {
  
  
  setup(props){

    store.commit('retiro/clear');

    return () => h(form,{
      
      on:{
        save:(data,formValidate) => {

          store.dispatch(`retiro/guardar`,data).then(({result,retiro}) => {

            if(result){
              toast.success('Se ha realizado la solicitud con éxito...')
              router.push({name:'retiro.edit',params:{id:retiro.id}})

            }else{
              toast.info('No se pudo realizar la petición de solicitud de retiro')
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