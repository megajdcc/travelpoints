<template>
      <form-imagen path-imagenes="/storage/negocios/fotos/" :imagenes="formulario.imagenes" :actions="actionsImagenes" />
</template>

<script>

import {toRefs,ref} from '@vue/composition-api'

import store from '@/store'

export default {
   
   components:{
      FormImagen: () => import('components/FormImagen.vue')
   },

   setup(){
      const {negocio:formulario} = toRefs(store.state.negocio)

      const actionsImagenes = () => {

         const eliminar = (imagen_id) => {

            store.dispatch('negocio/eliminarImagen', imagen_id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha eliminado con éxito la imagen')
               } else {
                  toast.error('No se pudo eliminar la Imagen')
               }

            }).catch(e => console.log(e))


         }

         const fotoSeleccionada = (files) => {


            store.dispatch('negocio/addImagenes', { 'imagenes': files, negocio_id: formulario.value.id }).then(({ result }) => {

               if (result) {
                  toast.success(`Imagenes cargada con éxito`)
               } else {
                  toast.error('No se pudo cargar las Imagenes...')
               }

            }).catch(e => console.log(e))

         }

         const checkPrincipal = (valor, imagen_id) => {

            store.dispatch('negocio/togglePortada', { imagen: imagen_id, portada: valor, negocio: formulario.value.id }).then(({ result }) => {

               if (result) {

                  toast.success('Se ha actualizado con éxito', { position: 'bottom-right' })

               } else {

                  toast.info('No se pudo actualizar, inténte de nuevo...', { position: 'bottom-right' })

               }


            }).catch(e => console.log(e))

         }

         return {
            eliminar,
            checkPrincipal,
            fotoSeleccionada
         }
      }

      return {
         actionsImagenes,
         formulario
      }



   }

}
</script>