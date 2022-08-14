
<script>
import form from './form'
import { h, onMounted,toRefs,watch } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {

   props:['id'],

   setup(props) {
      
      const {id} = toRefs(props)

      const {solicitudes} = toRefs(store.state.solicitud);

      const cargarForm = () => {
         
         if(solicitudes.value.length){
            store.commit('solicitud/capturar',Number(id.value))
         }else{
            store.dispatch('solicitud/getsolicitud',id.value).then(() => {
               store.commit('solicitud/capturar',Number(id.value))
            })
         }

      }

      onMounted(() => {
         cargarForm()
      })

      watch([id,solicitudes],() => cargarForm())

      return () => h(form, {

         props:{
            titulo:'Solicitud de afiliación de Negocio',
            subTitulo:""
         },

         on: {

            save: (data, formValidate) => {
               data.situacion = 1;
               store.dispatch('solicitud/guardar', data).then(({ result }) => {

                  if (result) {
                     toast.success('Se ha enviado con éxito la solicitud, te estaremos informando sobre el estatus de esta solicitud')
                     router.push({ name: 'socio.negocio.solicitudes' })
                  } else {
                     toast.error('No se pudo enviar la solicitud, intentelo de nuevo')
                  }

               }).catch(e => {
                  console.log(e)

                  if (e.response.status === 422) {
                     formValidate.setErrors(e.response.data.errors)
                  }

               })
            }
         }

      })
   },
}
</script>