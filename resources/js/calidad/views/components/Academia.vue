<template>
  <section>
    
    <b-nav-item @click="toggleAcademia">
      <font-awesome-icon icon="fas fa-play"/>
    </b-nav-item>

    <b-sidebar v-model="show"  right backdrop title="Academia" z-index="1052">
        <b-container fluid>
          <b-row>
            <b-col>
              <section class="d-flex flex-wrap w-100" style="overflow-y:auto">
                
                <b-card v-for="(a, i) in academia" :key="i" :title="a.titulo">

                  <video class="mx-1" width="222" v-for="(video,e) in a.videos" :key="e" loop muted controls="false" style="max-width:222px">
                    <source :src="`/storage/multimedias/${video.url}`">
                  </video>

                   <b-button @click="verVideo(a)" variant="primary">Ver</b-button>
                </b-card>
               

              </section>
            </b-col>
          </b-row>
        </b-container>
    </b-sidebar>


    <b-modal v-model="showContenido" size="lg" centered hide-footer lazy>  
      <section class="d-flex justify-content-center flex-column flex-wrap w-100 align-items-center" v-if="contenido">
          <h3 class="text-uppercase" > {{  contenido.titulo  }}</h3>
          <video class="mx-1 mb-1" height="300" v-for="(video, e) in contenido.videos" :key="e" controls >
              <source :src="`/storage/multimedias/${video.url}`">
          </video>
          
          <el-divider content-position="left">Descripción</el-divider>
          <span class="" v-html="contenido.descripcion">
          </span>
      </section>
    </b-modal>

  </section>
  
</template>

<script>

import {
  BSidebar,
  BCard,
  BContainer,
  BRow,
  BCol,
  BNavItem,
  BButton
} from 'bootstrap-vue'

import {computed,ref,toRefs,onMounted} from 'vue'
import store from '@/store'

export default{

  components:{
    BSidebar,
    BCard,
    BContainer,
    BRow,
    BCol,
    BNavItem,
    BButton

  },

  props:{
    isNegocio:Boolean
  },


  setup(props,{emit}) {

    const show = ref(false)
    const {usuario} = toRefs(store.state.usuario)
    const showContenido = ref(false)
    const academia = ref([])

    const toggleAcademia = () => {
      show.value = !show.value
    }
    const contenido = ref(null)


    const verVideo = (a) => {
      contenido.value = a
      showContenido.value = true
    }

  

    onMounted(() => {
        academia.value = usuario.value.rol ? usuario.value.rol.academia : []

        if(props.isNegocio) {
          cargarVideosNegocio()
        }
    
    })

    const cargarVideosNegocio = () => {

      store.dispatch('academiaVideos/cargarVideosNegocio').then(({videos}) => {
        academia.value = [
          ...academia.value,
          ...videos
        ]
      }).catch(e => console.log(e))

    } 

    return {
      show,
      toggleAcademia,
      academia,
      verVideo,
      showContenido,
      contenido
    }

  },

}
</script>
