<template>
      <form-imagen path-imagenes="/storage/destinos/imagenes/" :imagenes="destino.imagenes" :actions="actions" />
</template>

<script>

import {computed,toRefs,toRef,onMounted,watch} from 'vue'

import store from '@/store'

export default {
   
   props:['id'],
   components:{
      FormImagen:() => import('components/FormImagen.vue')
   },

   setup(props){

      const {id} = toRefs(props)

      const {destinos,destino} = toRefs(store.state.destino)

      const cargarForm = () => {
         store.dispatch('destino/fetch', id.value)
      }
      cargarForm()


      watch([id,destinos],() => cargarForm())


      const actions = () => {

         const fotoSeleccionada = (files) => {


            if (files.length) {

               store.dispatch('destino/cargarImagen', { imagenes: files }).then(({ result }) => {

                  if (result) {
                     toast.success('Se ha cargado con éxito la imagen', { position: 'bottom-right' })
                  } else {
                     toast.info('No se pudo cargar la imagen, inténtelo de nuevo ', { position: 'bottom-right' })
                  }

               })

            }


         }

         const eliminar = (imagen_id) => {

            store.dispatch('destino/eliminarImagen', imagen_id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha eliminado con éxito la imagen', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudo eliminar la Imagen, inténtelo de nuevo', { position: 'bottom-right' })

               }

            })
         }

         const checkPrincipal = (valor, imagen_id) => {

            store.dispatch('destino/togglePortada', { imagen: imagen_id, portada: valor }).then(({ result }) => {

               if (result) {

                  toast.success('Se ha actualizado con éxito', { position: 'bottom-right' })

               } else {

                  toast.info('No se pudo actualizar, inténte de nuevo...', { position: 'bottom-right' })

               }


            }).catch(e => console.log(e))

         }



         return {
            fotoSeleccionada,
            eliminar,
            checkPrincipal
         }

      }

      return {
         destino,
         actions
      }


   }



}
</script>

<style lang="scss">

</style>