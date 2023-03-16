<script>

import {h} from 'vue'
import store from '@/store'
import form from './form.vue'
import router from '@/router'

export default {
  
  setup(props){
    store.commit('sucursal/clear')

    return () => h(form,{
      on:{
        save:(data,formValidate) => {
          store.dispatch('sucursal/guardar',data).then(({result,sucursal}) => {
            if(result){
              toast.success('Se ha creado con éxito la sucursal',{position:'bottom-right'})
              router.push({name:'sucursales.edit',params:{id:sucursal.id}})
            }else{
              toast.info('No se pudo crear la sucursal, inténtelo de nuevo mas tarde',{position:'bottom-right'})
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