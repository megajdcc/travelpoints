
<script>
import form from './form'
import { h,onMounted} from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {

   setup() {
      
<<<<<<< HEAD
      onMounted(() => {
         store.commit('solicitud/clear');
      })
=======
      onMounted(() => store.commit('solicitud/clear'))
>>>>>>> vite

      return () => h(form,{

         on:{

            save:(data,formValidate) => {

               store.dispatch('solicitud/guardar',data).then(({result}) => {

                  if(result){
<<<<<<< HEAD
                     toast.success('Se ha enviado con éxito la solicitud de afiliación del negocio...')
                     router.push({ name:'socio.negocio.list'})
                  }else{
                     toast.error('No se pudo enviar la solicitud, intentelo de nuevo')
=======
                     toast.success('Se ha enviado con éxito la solicitud de afiliación del negocio...', {position:'bottom-right'})
                     router.push({ name:'socio.negocio.list'})
                  }else{
                     toast.error('No se pudo enviar la solicitud, intentelo de nuevo', { position: 'bottom-right' })
>>>>>>> vite
                  }

               }).catch(e => {
                  console.log(e)
                  if(e.response.status === 422){
                     formValidate.setErrors(e.response.data.errors)
                  }
               })
            }
         }

      })
<<<<<<< HEAD
   },
=======

   }

>>>>>>> vite
}
</script>