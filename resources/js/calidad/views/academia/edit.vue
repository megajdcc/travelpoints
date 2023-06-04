<script>

import form from './form.vue'

import { h,toRefs,watch } from 'vue'

import store from '@/store'

export default {

  props:{
    id:Number|String
  },

  setup(props) {

    const {id} = toRefs(props)

    const {videos} = toRefs(store.state.academiaVideos)

    const cargarForm = () => {

      if(!videos.value.length){

        store.dispatch('academiaVideos/fetch',id.value)
        
      }else{
        store.commit('academiaVideos/capturar',id.value)
      }

    }

    cargarForm();

    watch([id] , () => cargarForm());

    return () => h(form, {

      on: {

        save: (datos, formValidate) => {

          store.dispatch('academiaVideos/guardar', datos).then(({ result }) => {

            if (result) {

              toast.success('Se ha guardado con éxito')

            } else {
              toast.info('No se pudo guardar, inténtelo de nuevo mas tarde.')
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