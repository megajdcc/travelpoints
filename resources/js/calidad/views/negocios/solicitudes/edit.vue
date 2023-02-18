
<script>
import form from 'views/socio/negocio/solicitudes/form'
import { h, onMounted, toRefs, watch } from '@vue/composition-api'
import store from '@/store'
import router from '@/router'

export default {

   props: ['id'],

   setup(props) {

      const { id } = toRefs(props)

      const { solicitudes } = toRefs(store.state.solicitud);

      const cargarForm = () => {

         if (solicitudes.value.length) {
            store.commit('solicitud/capturar', Number(id.value))
         } else {
            store.dispatch('solicitud/getsolicitud', id.value).then(() => {
               store.commit('solicitud/capturar', Number(id.value))
            })
         }

      }

      onMounted(() => {
         cargarForm()
      })

      watch([id, solicitudes], () => cargarForm())

      return () => h(form, {

         props: {
            titulo: 'Solicitud de afiliación de Negocio',
            subTitulo: "Puedes aceptar,rechazar o puedes regresarla para su modificación",
            admin:true
         },

         on: {

            save: (data, formValidate) => {

<<<<<<< HEAD
               store.dispatch('solicitud/guardar', data).then(({ result,solicitud }) => {

                  if (result) {
                     toast.success('Se ha enviado con éxito la solicitud, le hemos enviado un correo al solicitante.')
=======
               store.dispatch('solicitud/guardar', {...data,...{panel:'infochannel'}}).then(({ result,solicitud }) => {

                  if (result) {
                     toast.success('Se ha enviado con éxito la solicitud, le hemos enviado un correo al solicitante.',{position:'bottom-right'})
>>>>>>> vite
                     router.push({ name: 'listar.solicitudes.negocios' })
                  } else {
                     toast.error('No se pudo guardar tu solicitud, inténtelo de nuevo')
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