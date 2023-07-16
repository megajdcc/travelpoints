<script>

import { h,toRefs,watch } from 'vue'
import store from '@/store'
import router from '@/router'
import form from './form.vue'

export default {

  props:{
    id:Number|String
  },


  setup(props) {

    const {id} = toRefs(props)
    const {lotes} = toRefs(store.state.lote)

    const cargarForm = () => {

      if(!lotes.value.length){
          store.dispatch('lote/fetch',id.value)
      }else{
        store.commit('lote/capturar',id.value)
      }


    }

    cargarForm();

    watch([id],() => cargarForm())

    
    return () => h(form, {
      on: {
        save: (data, formValidate) => {

          store.dispatch('lote/guardar', data).then(({ result, lote }) => {

            if (result) {
              toast.success('Se ha guardado con éxito el Lote')
              router.push({ name: 'lotes.list' })
            } else {
              toast.info('NO se pudo guardar el lote, inténtelo de nuevo')
            }

          }).catch(e => {

            if (e.response.status === 422) {
              formValidate.setErrors(e.response.data.errors)
            } else {
              console.log(e)
            }

          })

        }

      }
    })
  }

}
</script>