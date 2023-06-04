<script>

import form from './form.vue'

import {h} from 'vue'

import store from '@/store'
import router from '@/router'

export default {


  setup(props){
    
    store.commit('academiaVideos/clear')

    return () => h(form,{

      on:{
        
        save:(datos,formValidate) => {

          store.dispatch('academiaVideos/guardar',datos).then(({video,result}) => {

            if(result){
              
              toast.success('Se ha guardado con éxito')
              router.push({name:'academia.edit',params:{id:video.id}})

            }else{
              toast.info('No se pudo guardar, inténtelo de nuevo mas tarde.')
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