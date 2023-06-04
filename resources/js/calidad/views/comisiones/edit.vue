<script >

import {h,toRefs,watch} from 'vue'
import form from './form.vue'
import store from '@/store'
import router from '@/router'

export default {

  props:['id'],

  setup(props){
    const {id} = toRefs(props)
    const {comisiones} = toRefs(store.state.comision)

    const cargarForm = () => {
      if(!comisiones.value.length){
        store.dispatch('comision/getComisiones').then((data) => {
          store.commit('comision/capturar',Number(id.value))
        })
      }else{
          store.commit('comision/capturar', Number(id.value))
      }
    }

    cargarForm();

    watch([id],() => cargarForm())

    return () => h(form,{
      on:{
        save:(data,formValidate) => {
          store.dispatch('comision/guardar',data).then(({result,comision}) => {
            if(result){
              toast.success('Se ha actualizado con éxito la comisión..')
              router.push({name:'comision.edit',params:{id:comision.id}})
            }else{
              toast.info('No se pudo actualizar la comisión, inténte de nuevo')

            }
          }).catch( e => {
            
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