
<script>
import form from './form.vue'

import {h,toRefs,ref,onMounted} from 'vue'
import store from '@/store'
import router from '@/router'
export default {
   

   setup(){

      onMounted(() => store.commit('panel/clear'))

      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('panel/guardar',data).then(({result,panel}) => {

                  if(result){
                     toast.success('Se ha guardado con éxito el panel',{position:'bottom-right'})
                     router.push({name:'panel.edit',params:{id:panel.id}})
                  }else{
                     toast.info('No se ha podido, guardar el Panel, inténte de nuevo', { position: 'bottom-right' })

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