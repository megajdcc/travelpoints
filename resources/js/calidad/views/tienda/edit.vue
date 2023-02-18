<script>
import {h,toRefs,watch} from '@vue/composition-api'

import store from '@/store';
import form from './form.vue';

export default {
  
  props:['id'],

  setup(props){

    const {id} = toRefs(props)
    const {tiendas} = toRefs(store.state.tienda)

    const cargarForm = () => {
      
      if(!tiendas.value.length){
        store.dispatch('tienda/fetch',id.value)
      }else{
        store.commit('tienda/capturar',id.value)
      }

    }

    cargarForm();

    watch([id,tiendas],() => cargarForm());


    return () => h(form,{

      on:{
        save:(data,formValidate) => {

          store.dispatch('tienda/guardar',data).then(({result,tienda}) => {

            if(result){
              toast.success('Se ha guardar con éxito la tienda',{position:'bottom-right'});

            }else{
              toast.info('No se pudo actualizar, inténte de nuevo',{position:'bottom-right'})
            }
          }).catch((e) => {
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