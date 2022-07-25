<script>
import form from './form'

import { h, ref,toRefs,onMounted} from '@vue/composition-api'

import store from '@/store';
import router from '@/router';

import { Notification } from 'element-ui';
export default {
   
   setup() {
   
   store.commit('plantilla/clear');


   return () => h(form,{
         on:{
            
            save(data,formValidate){
               
               store.dispatch('plantilla/guardar',data).then(({result,plantilla}) => {

                  if(result){
                     Notification.success({
                        message:'Se ha guardado con éxito la plantilla',
                        position:'bottom-right'
                     })

                     store.commit('plantilla/push',plantilla)
                     router.push({name:'edit.plantilla',params:{id:plantilla.id}})
                     
                  }else{
                     Notification.info({
                        message: 'No se pudo guardar, intentelo de nuevo mas tarde...',
                        position: 'bottom-right'
                     })
                  }

               }).catch(e => {

                  console.log(e)

                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }


               })


            }  

         }
      }
   )
      
   },
}
</script>