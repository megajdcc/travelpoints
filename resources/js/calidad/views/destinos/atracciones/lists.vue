<template>


<listado :actions="actions" hideFooter>
   <template #btn-action>
          <b-button variant="dark" size="sm" :to="{ name: 'create.atraccion', params: { destino: destino } }"
                              v-if="$can('write', 'atracciones')" class="d-flex align-items-center">
              Agregar Atracción
         </b-button>
   </template>
   <template #contenido="{items,eliminar}">
      <section class="d-flex justify-content-md-between justify-content-start flex-wrap">
         <b-card v-for="(atraccion,i) in items" :key="i" style="flex:0 1 375px" header-class="p-0 bg-dark mb-1 ">

            <template #header>

               <b-carousel :id="`carousel-${i}`" indicators controls background="#ababab" :intervals="3000" class="w-100">

                  <b-carousel-slide v-for="(imagen, e) in atraccion.imagenes" :key="e" img-width="320px"
                     img-height="auto" :img-src="`/storage/atracciones/imagenes/${imagen.imagen}`"
                     style="max-height:182px; height:182px; object-fit:cover">

                  </b-carousel-slide>

               </b-carousel>

            </template>

            <h4 v-b-popover.hover="atraccion.descripcion.substring(0, 150)" :title="atraccion.nombre">
               {{ atraccion.nombre }}
            </h4>

            <p class="text-justify" v-b-popover.hover="atraccion.descripcion.substring(0, 150)" :title="atraccion.nombre">
               {{ atraccion.descripcion.substring(0, 80) }} ...
            </p>

            <template #footer>
               <b-button-group size="sm">

                  <b-button :to="{ name: 'edit.atraccion', params: { id: atraccion.id } }" v-if="$can('update', 'atracciones')"
                     variant="primary">
                     <feather-icon icon="EditIcon" />
                  </b-button>

                  <b-button @click="eliminar(atraccion.id)" v-if="$can('delete', 'atracciones')" variant="danger">
                     <feather-icon icon="TrashIcon" />
                  </b-button>

                  <b-button :to="{ name: 'imagenes.atraccion', params: { id: atraccion.id } }"
                     v-if="$can('update', 'atracciones')" variant="dark">
                     <feather-icon icon="ImageIcon" />
                  </b-button>

                  <b-button :to="{ name: 'atraccion.horarios', params: { id: atraccion.id } }"
                     v-if="$can('update', 'horarios')" variant="primary">
                     <feather-icon icon="ClockIcon" />
                     Horarios
                  </b-button>


               </b-button-group>
            </template>
         </b-card>
      </section>
   </template>
</listado>

</template>

<script>

import {
   BContainer,
   BCard,
   BRow,
   BCol,
   BButton,
   BButtonGroup,
   BTable,
   BFormInput,
   BInputGroup,
   BInputGroupAppend,
   BCarousel,
   BCarouselSlide,
   BImg,
   VBPopover

} from 'bootstrap-vue'

import useAtraccionesList from './useAtraccionesList.js'
import store from '@/store'
import { ref, toRefs, computed, onActivated } from 'vue'
export default {

   components: {
      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      BInputGroup,
      BFormInput,
      BCarousel,
      BCarouselSlide,
      BInputGroupAppend,
      BImg,
      Listado:() => import('components/Listado.vue')

   },

   directives: {
      'b-popover': VBPopover
   },

   props:['destino'],

   setup(props) {

      const { destino } = toRefs(props)
      
      const actions = useAtraccionesList(destino.value)

      return {
         actions,
         items:actions.items,
         loading: computed(() => store.state.loading),
      }

   }


}
</script>