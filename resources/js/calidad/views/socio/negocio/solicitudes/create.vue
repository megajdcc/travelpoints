
<script>
import form from './form'
import { h,onMounted} from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {

   setup() {
      
      onMounted(() => {
         store.commit('solicitud/clear');
      })

      return () => h(form,{

         on:{

            save:(data,formValidate) => {

               store.dispatch('solicitud/guardar',data).then(({result}) => {

                  if(result){
                     toast.success('Se ha enviado con éxito la solicitud de afiliación del negocio...')
                     router.push({ name:'socio.negocio.list'})
                  }else{
                     toast.error('No se pudo enviar la solicitud, intentelo de nuevo')
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
   },
}
</script>