<script>

import { h,toRefs,watch } from '@vue/composition-api'
import store from '@/store'
import form from './form.vue'

export default {

  props:{
    id:{
      type:Number|String
    }
  },

  setup(props) {
    const {id} = toRefs(props)
    const { sucursales } = toRefs(store.state.sucursal)


    const cargar = () => {
      
      if(!sucursales.value.length){
        store.dispatch('sucursal/fetch',id.value)
      }else{
        store.commit('sucursal/capturar',id.value)
      }

    }

    cargar();

    watch([id,sucursales],() => cargar())


    return () => h(form, {
      on: {
        save: (data, formValidate) => {
          store.dispatch('sucursal/guardar', data).then(({ result }) => {
            if (result) {
              toast.success('Se ha actualizado con éxito la sucursal', { position: 'bottom-right' })
            } else {
              toast.info('No se pudo actualizar la sucursal, inténtelo de nuevo mas tarde', { position: 'bottom-right' })
            }
          }).catch(e => {

            console.log(e)

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