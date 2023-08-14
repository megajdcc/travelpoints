<template>
  <section>
    <listado :actions="actions" hideFooter>
        <template #contenido="{ items }">
          <b-container fluid class="px-0 mx-0">
            <b-row>
              <b-col v-for="(a, i) in items" :key="i" cols="12" md="3">
                  <b-card  style="max-height:280px;" body-class="px-1" footer-class="px-1 py-1" header-class="px-1 py-1" >
                    <template #header>
                      <h4>{{ a.titulo }}</h4>
                    </template>

                    <section style="overflow-y: auto; height:150px" class="d-flex justify-content-center flex-wrap">
                       <video class="mx-1" v-for="(video, e) in a.videos" :key="e"  style="max-width:215px">
                          <source :src="`/storage/multimedias/${video.url}`">
                        </video>
                        
                    </section>
                     
                    <template #footer>
                         <b-button @click="verVideo(a)" variant="primary">Ver</b-button>
                    </template>
                  </b-card>
              </b-col>
            </b-row>
          </b-container>
        </template>
      </listado>

    <b-modal v-model="showContenido" size="xl" centered hide-footer lazy>  
        <section class="d-flex justify-content-center flex-wrap" v-if="contenido">
            <h3 class="text-uppercase" > {{ contenido.titulo }}</h3>

             <b-embed  class="mx-1"  type="video" controls="true" :aspect="relation" v-for="(video, e) in contenido.videos" :key="e" :src="`/storage/multimedias/${video.url}`" allowfullscreen >
              </b-embed>
            <el-divider content-position="left">Descripción</el-divider>
            <span class="" v-html="contenido.descripcion">
            </span>
        </section>
    </b-modal>

  </section>
  
</template>

<script>

import store from '@/store'
import {toRefs,ref,computed} from 'vue'
import useAcademiaList from './useAcademiaList.js'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BImg,
  BModal,
  BEmbed,
  BButton
} from 'bootstrap-vue'


export default {
  
  components:{
    listado:() => import('components/Listado.vue'),
    BCard,
    BContainer,
    BRow,
    BCol,
    BImg,
    BModal,
    BButton,
    BEmbed
  },


  setup(props){

    const actions = useAcademiaList();
    const contenido = ref(null)
    const showContenido = ref(false)
    const { windowWidth } = toRefs(store.state.app)

     const verVideo = (a) => {
      contenido.value = a
      showContenido.value = true
    }

    actions.refetchData();

    return {
      actions,
      verVideo,
      showContenido,
      contenido,
       relation: computed(() => {
        return windowWidth.value < 762 ? '4by3' : '21by9'
      })
    }
  }
}
</script>