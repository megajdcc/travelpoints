<template>
   <form-horario :horarios="formulario.horarios" :actions="actionsHorario" />
</template>

<script>
import store from '@/store'
import { toRefs, ref,onMounted,watch } from 'vue'

export default {

   components: {
      FormHorario: () => import('components/FormHorario.vue'),
   },

   props:['id'],

   setup(props) {
      const { atraccion: formulario,atracciones } = toRefs(store.state.atraccion)
      const {id} = toRefs(props)

      const cargarForm = () => {
         store.dispatch('atraccion/fetch', id.value)
      }
      cargarForm()
      watch([id],() => cargarForm())

      const actionsHorario = () => {

         const aperturarHorario = () => {

            store.dispatch('atraccion/aperturarHorario', formulario.value.id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha aperturado el Horario correctamente', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudo aperturar el horario, inténte de nuevo')
               }

            });
         }

         const guardarHorario = (horario) => {

            // if (horario.apertura && horario.cierre) {
            store.dispatch('atraccion/guardarHorario', horario).then(({ result }) => {

               if (result) {
                  toast.success('Se ha actualizado el horario', { position: 'bottom-right' })
               } else {
                  toast.info('No se ha actualizado el horario, inténte de nuevo', { position: 'bottom-right' })
               }

            })
            // }
         }

         const quitarHorario = () => {

            store.dispatch('atraccion/quitarHorario', formulario.value.id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha quitado con éxito el horario', { position: 'bottom-right' })
               } else {

                  toast.info('No se ha quitado el horario, inténte de nuevo', { position: 'bottom-right' })
               }

            })

         }

         return {
            aperturarHorario,
            guardarHorario,
            quitarHorario
         }

      }

      return {
         actionsHorario,
         formulario
      }

   }

}
</script>