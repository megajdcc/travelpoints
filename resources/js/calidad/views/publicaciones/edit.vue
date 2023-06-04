<script>

import form from './form'
import store from '@/store'
import {h,onMounted,toRefs,watch} from 'vue'
export default {
   
   props:['id'],

   setup(props){
      const {id} = toRefs(props)

      const {publicaciones} = toRefs(store.state.publicacion)

      const cargarForm = () => {
         
         if(!publicaciones.value.length){
            store.dispatch('publicacion/fetch',id.value)
         }else{
            store.commit('publicacion/capturar',id.value)

         }

      }

      onMounted(() => cargarForm())
      
      watch([id,publicaciones],() => cargarForm())


      return () => h(form,{

         on:{
            save:(data,formValidate) => {

               store.dispatch('publicacion/guardar',data).then(({result}) =>{

                  if(result){
                     toast.success('Se ha guardado con éxito la publicación',{position:'bottom-right'})
                    
                  }else{
                     toast.info('No se pudo guardar la publicación, inténtelo de nuevo',{position:'bottom-right'})
                  }

               } ).catch(e => {
                  
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