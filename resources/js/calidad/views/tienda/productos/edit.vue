<script>

import form from './form.vue';
import store from '@/store';

import {
  h,
  toRefs,
  watch
} from '@vue/composition-api'


export default {

  props: ['id'],


  setup(props) {

   const {productos,producto} = toRefs(store.state.producto)
    const {id} = toRefs(props)

    const cargarForm =() => {
      
      if(!productos.value.length){
        store.dispatch('producto/fetch',id.value)
      }else{
        store.commit('producto/capturar',id.value)
      }

    }

    cargarForm();

    watch([id,productos],() => cargarForm())


    return () => h(form, {


      on: {
        save: (data, formValidate) => {

          store.dispatch('producto/guardar', data).then(({ result, producto }) => {

            if (result) {
              toast.success('Se ha actualizado con éxito el producto', { position: 'bottom-right' })
            } else {
              toast.info('No se pudo actualizar el producto, inténte de nuevo', { position: 'bottom-right' })

            }

          }).catch(e => {

            if (e.response.status === 422) {
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