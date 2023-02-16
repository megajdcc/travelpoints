<script>

import form from './form.vue';
import store from '@/store';
import router from '@/router';

import {
  h
} from '@vue/composition-api'


export default {


  setup(props){

    store.commit('producto/clear');

    return () => h(form,{

    
      on:{

        save: (data, formValidate) => {

          store.dispatch('producto/guardar', data).then(({ result, producto }) => {

            if (result) {
              toast.success('Se ha registrado con éxito el producto', { position: 'bottom-right' })
              router.push({ name: 'producto.edit', params: { id: producto.id } })
            } else {
              toast.info('No se pudo registrar el producto, inténte de nuevo', { position: 'bottom-right' })

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