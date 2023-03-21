<script >

import {h,onMounted} from 'vue'
import form from './form.vue'
import store from '@/store'
import router from '@/router'

export default {

  setup(props){

    store.commit('comision/clear')
    store.dispatch('comision/getComisiones')

    return () => h(form,{
      on:{
        save:(data,formValidate) => {
          store.dispatch('comision/guardar',data).then(({result,comision}) => {
            if(result){
              toast.success('Se ha creado con éxito la comisión..')
              router.push({name:'comision.edit',params:{id:comision.id}})
            }else{
              toast.info('No se pudo crear la comisión, inténte de nuevo')

            }
          }).catch(e => {

            if (e.response.status === 422) {
              formValidate.setErrors(e.response.data.errors)
            }

          })
        }
      }
    })
  }

}
</script>