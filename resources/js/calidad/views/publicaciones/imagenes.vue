<template>
      <form-imagen :imagenes="publicacion.imagenes" path-imagenes="/storage/publicaciones/" :actions="actionsImagenes
      "></form-imagen>
</template>

<script>

import {toRefs,ref,computed,onMounted,watch} from '@vue/composition-api'
import store from '@/store'

export default {
   
   props:['id'],

   components:{
      FormImagen:() => import('components/FormImagen.vue')
   },

   setup(props){
      
      const {id} = toRefs(props)

      const {publicacion,publicaciones} = toRefs(store.state.publicacion)

      const cargarForm = () => {
         
         if(!publicaciones.value.length){
            store.dispatch('publicacion/fetch',id.value)
         }else{
            store.commit('publicacion/capturar', id.value)

         }

      }
      onMounted(() => cargarForm())

      watch([id,publicaciones],() => cargarForm())


      const actionsImagenes = () => {

         const eliminar = (imagen_id) => {

            store.dispatch('publicacion/eliminarImagen', imagen_id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha eliminado con éxito la imagen')
               } else {
                  toast.error('No se pudo eliminar la Imagen')
               }

            }).catch(e => console.log(e))


         }

         const fotoSeleccionada = (files) => {


            store.dispatch('publicacion/addImagenes', { 'imagenes': files, publicacion_id: publicacion.value.id }).then(({ result }) => {

               if (result) {
                  toast.success(`Imagenes cargada con éxito`)
               } else {
                  toast.error('No se pudo cargar las Imagenes...')
               }

            }).catch(e => console.log(e))

         }

         const checkPrincipal = (valor, imagen_id) => {

            store.dispatch('publicacion/togglePortada', { imagen: imagen_id, portada: valor, publicacion: publicacion.value.id }).then(({ result }) => {

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
        publicacion,
         actionsImagenes
      }

   }
}
</script>