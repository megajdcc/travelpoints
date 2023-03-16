<script>
import {h} from 'vue'

import store from '@/store';
import form from './form.vue';
import router from '@/router';


export default {
  
  setup(){

    store.commit('tienda/clear');

    return () => h(form,{

      on:{
        save:(data,formValidate) => {

          store.dispatch('tienda/guardar',data).then(({result,tienda}) => {

            if(result){
              toast.success('Se ha creado con éxito la tienda',{position:'bottom-right'});

              router.push({name:'tienda.edit',params:{id:tienda.id}})
            }else{
              toast.info('No se pudo registrar, inténte de nuevo',{position:'bottom-right'})
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