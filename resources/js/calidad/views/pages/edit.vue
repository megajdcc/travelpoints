<script>

import store from '@/store'
import { h,toRefs } from 'vue'

import form from './form.vue'
export default {

  props:{
    id:Number|String
  },

  setup(props) {
    const {paginas } = toRefs(store.state.pagina)
    const {id}  = toRefs(props)

    const cargarForm = () => {

      if(!paginas.value.length){
        store.dispatch('pagina/fetch',id.value)
      }else{
        store.commit('pagina/capturar',id.value)
      }

    }
    
    cargarForm();
  
    return () => h(form, {

      on: {
        save: (data, formValidate) => {

          store.dispatch('pagina/guardar', data).then(({ result, pagina }) => {

            if (result) {
              toast.success('Se ha guardado con éxito la pagina')
            } else {
              toast.info('NO se pudo guardar la pagina, inténtelo de nuevo mas tarde')
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