<template>
    <form-multimedias path-archivos="/storage/multimedias/" :videos="videos" :imagenes="imagenes" :actions="actions" :hideVideos="hideVideos" :hideImagenes="hideImagenes" :seleccionable="seleccionable">

    </form-multimedias>
</template>

<script>

import {toRefs,ref,computed,watch,onMounted} from 'vue'
import store from '@/store'

export default {
  
  components:{
    FormMultimedias:() => import('components/FormMultimedias.vue')
  },

  props:{
    hideVideos:{
      type:Boolean,
      default:false,
    },
     hideImagenes: {
      type: Boolean,
      default: false,
    },
    
    seleccionable: {
      type: Boolean,
      default: false,
    },
 
  },

  setup(props){

    const {sistema} = toRefs(store.state.sistema)

    const actions = () => {

      const archivoSeleccionado = (file,next) => {
        // cargar Archivo

        if(file.length > 0){
          store.dispatch('sistema/cargarArchivo', file).then(({ result }) => {

            if (result) {
              toast.success('Se ha cargado con éxito', {
                position: 'bottom-right'
              })

            } else {
              toast.info('NO se pudo cargar el Archivo', {
                position: 'bottom-right'
              })
            }

            next()

          })
        }
        

      }

      const eliminar = (archivo,tipo = 'imagen') =>{

        store.dispatch('sistema/eliminarArchivo', { archivo_id: archivo.id, tipo_archivo:tipo }).then(({ result }) => {

          if (result) {
            toast.success('Se ha eliminado con éxito el archivo', {
              position: 'bottom-right'
            })
          } else {

            toast.success('No se pudo eliminar el archivo', {
              position: 'bottom-right'
            })

          }
        })

      } 


      return {
        archivoSeleccionado,
        eliminar
      }

    }


    return {
      imagenes:computed(() => [...sistema.value.imagenes]),
      videos: computed(() => [...sistema.value.videos]),

      actions,

    }
  }
}
</script>