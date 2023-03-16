<template>

   <listado :actions="actions">
         <template #btn-action>
               <b-button class="d-flex flex-column justify-content-center" :to="{name:'negocio.publicacion.create'}" v-if="$can('write','publicaciones negocio')" variant="primary" size="sm">
                  Agregar
               </b-button>
         </template>

         <template #contenido="{items,eliminar}">
               <b-container fluid>
                  <b-row>
                     <b-col cols="12" md="4" v-for="(item,i) in items" :key="i" class="px-0">
               
                        <b-card class="my-2" :class="{'ml-2' : i > 0}" header-class="py-0 px-1">
               
                           <template #header>
                              <!-- <b-img :src="`/storage/publicaciones/${item.logo}`" thumbnails class="logotipos cursor-pointer"
                                 style="border-radius:10px 10px 0px 0px" @click="irEditar(negocio)" /> -->

                              <b-carousel id="carousel-fade" style="text-shadow: 0px 0px 2px #000" fade controls indicators img-width="1024" img-height="220px">
                                 <b-carousel-slide  v-for="({imagen},i) in item.imagenes" :key="i" :img-src="`/storage/publicaciones/${imagen}`" img-height="220px"></b-carousel-slide>
                                
                              </b-carousel>

                           </template>
               
                           <h4 v-b-popover.hover="item.titulo" :title="item.titulo" class="mt-1">
                              {{ item.titulo }}
                           </h4>
               
               
                           <p class="text-justify" v-b-popover.hover="item.contenido" style="max-height:40px">
                              {{ item.contenido.substring(1,80) }}
                           </p>
               
                           <template #footer>
                              <b-button-group size="sm">
               
                                 <b-button :to="{ name:'negocio.publicacion.edit',params:{id:item.id}}"
                                    v-if="$can('update','publicaciones negocio')" variant="primary">
                                    <feather-icon icon="EditIcon" />
                                 </b-button>
               
                                 <b-button @click="eliminar(item.id)" v-if="$can('delete','publicaciones negocio')" variant="danger">
                                    <feather-icon icon="TrashIcon" />
                                 </b-button>

                                 <b-button :to="{ name:'negocio.publicacion.imagenes',params:{id:item.id}}" v-if="$can('update','publicaciones negocio')"
                                    variant="dark">
                                    Imagenes
                                 </b-button>

               
                              </b-button-group>
                           </template>
                        </b-card>
                     </b-col>
                  </b-row>
               </b-container>
         </template>
   </listado>

</template>

<script>

import usePublicacionesList from './usePublicacionesList'
import {toRefs,computed,ref,watch} from 'vue'
import store from '@/store'
import {
   BButtonGroup,
   BButton,
   BRow,
   BCol,
   BContainer,
   BCard,
   VBPopover,
   BCarousel,
   BCarouselSlide
} from 'bootstrap-vue'

export default {

   components:{
      Listado:() => import('components/Listado.vue'),
      BButtonGroup,
      BButton,
      BRow,
      BContainer,
      BCard,
      BCol,
      BCarousel,
      BCarouselSlide


     
   },

   directives:{
      'b-popover': VBPopover,
   },

   setup(props){
      const {negocio} = toRefs(store.state.negocio)

      const actions = usePublicacionesList(negocio);

      watch(negocio,() => actions.refetchData())

      return {
         actions,
      }
   }
}
</script>
