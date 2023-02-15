<script>

import {h,toRefs, watch,} from '@vue/composition-api'
import store from '@/store'
import form from './form.vue'

export default {
  
  props:['id'],


  setup(props){

    const {id} = toRefs(props)
    const {categorias} = toRefs(store.state.categoriaProducto)

    const cargarForm = () => {

      if(!categorias.value.length){
          store.dispatch('categoriaProducto/fetch',id.value)
      }else{
        store.commit('categoriaProducto/capturar',id.value)
      }

    }

    watch([id,categorias],() => cargarForm())

    cargarForm();
    
    return () => h(form,{
      
      on:{
        save:(data,formValidate) => {
          store.dispatch('categoriaProducto/guardar',data).then(({result}) => {

            if(result){
              toast.success('Se ha guardar con éxito la categoría...', {position:'bottom-right'})
            }else{
              toast.info('No se pudo guardar, inténte de nuevo.', {position:'bottom-right'})

            }

          }).catch(e => {
            
            if(e.response.status === 422){
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