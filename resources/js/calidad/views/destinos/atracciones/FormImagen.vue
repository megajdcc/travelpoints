<template>
      <form-imagen path-imagenes="/storage/atracciones/imagenes/" :imagenes="imagenes" :actions="actions" />
</template>

<script>

import {computed,toRefs,onMounted,watch} from '@vue/composition-api'

import store from '@/store'


export default {
   
   props:['id'],
   components:{
      FormImagen:() => import('components/FormImagen.vue')
   },

   setup(props){

      const {id} = toRefs(props)

      const imagenes = computed(() => store.state.atraccion.atraccion.imagenes)

      const { atracciones } = toRefs(store.state.atraccion)

      const cargarForm = () => {

         if(!atracciones.value.length){
            store.dispatch('atraccion/fetch',id.value)
         }else{
            store.commit('atraccion/capturar',id.value)
         }


      }

      onMounted(() => {
         cargarForm()
      })

      watch([id,atracciones],() => cargarForm())

      const actions = () => {

         const fotoSeleccionada = (files) => {


            if (files.length) {

               store.dispatch('atraccion/cargarImagen', { imagenes: files }).then(({ result }) => {

                  if (result) {
                     toast.success('Se ha cargado con éxito la imagen', { position: 'bottom-right' })

                  } else {
                     toast.info('No se pudo cargar la imagen, inténtelo de nuevo ', { position: 'bottom-right' })
                  }

               }).then(() => {
                  imagenes.value = [];
               })

            }


         }


         const eliminar = (imagen_id) => {

            store.dispatch('atraccion/eliminarImagen', imagen_id).then(({ result }) => {

               if (result) {
                  toast.success('Se ha eliminado con éxito la imagen', { position: 'bottom-right' })
               } else {
                  toast.info('No se pudo eliminar la Imagen, inténtelo de nuevo', { position: 'bottom-right' })

               }

            })
         }

         const checkPrincipal = (valor, imagen_id) => {

            store.dispatch('atraccion/togglePortada', { imagen: imagen_id, portada: valor }).then(({ result }) => {

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
         imagenes,
         actions,
      }



   }



}
</script>

<style lang="scss">

</style>