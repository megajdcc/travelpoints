<script>
import form from './form.vue'

import store from '@/store'
import router from '@/router'

import {h,onMounted} from '@vue/composition-api'

export default {

   setup(props){

      onMounted(() => store.commit('iata/clear'))

      return () => h(form,{

         on:{
            
            save:(data,formValidate) => {

               store.dispatch(`iata/guardar`,data).then(({result,iata}) => {
                  
                  if(result){
                     toast.success('Se ha registrado con éxito el código Iata... ');

                     router.push({name:'iata.edit',params:{id:iata.id}})


                  }else{
                     toast.info('No se pudo guardar el Código Iata...')
                  }

               }).catch(e => {

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