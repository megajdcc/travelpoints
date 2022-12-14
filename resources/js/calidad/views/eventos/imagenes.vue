<template>
      <form-imagen  :imagenes="imagenes" path-imagenes="/storage/eventos/imagenes/" :actions="actions" />
</template>

<script>

import {onMounted,watch,toRefs,ref,computed} from '@vue/composition-api'
import store from '@/store'

export default {
   components:{
      FormImagen:() => import('components/FormImagen.vue')
   },

   props:['id'],

   setup(props){

      const {id} = toRefs(props)
      

      const {eventos,evento} = toRefs(store.state.evento)

      const cargarForm = () => {

         if (!eventos.value.length) {
            store.dispatch('evento/fetch', id.value)
         } else {
            store.commit('evento/capturar', id.value)
         }
      }


      onMounted(() => cargarForm())
      watch([id,eventos],() => cargarForm())

      const actions = () => {

         const eliminar = (imagen_id) => {
            
            store.dispatch('evento/eliminarImagen', imagen_id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha eliminado con éxito la imagen', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudo eliminar la Imagen, inténtelo de nuevo', { position: 'bottom-right' })

               }

            })
         }


         const fotoSeleccionada = (files,next) => {

            if (files.length) {

               store.dispatch('evento/cargarImagen', { imagenes: files }).then(({ result }) => {

                  if (result) {
                     toast.success('Se ha cargado con éxito la imagen', { position: 'bottom-right' })

                  } else {
                     toast.info('No se pudo cargar la imagen, inténtelo de nuevo ', { position: 'bottom-right' })
                  }

               }).then(() => {
                  next()
               })

            }
         }

         return {
            eliminar,
            fotoSeleccionada
         }

      }

      return {
         actions,
         imagenes:computed(() => evento.value.imagenes)
      }
   }
}
</script>