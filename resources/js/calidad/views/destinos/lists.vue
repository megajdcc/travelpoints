<template>

   <listado :actions="actions" hideFooter>
   
      <template #btn-action>
         <b-button variant="dark" size="sm" :to="{ name: 'create.destino' }" v-if="$can('write', 'destino')" class="d-flex align-items-center">
           {{ $t('Agregar Destino') }}
         </b-button>
      </template>
      <template #contenido="{items,eliminar}">
         <section class="d-flex justify-content-md-between justify-content-start flex-wrap">
             <b-card v-for="(destino, i) in items" :key="i"  style="flex:0 1 375px" header-class="p-0 bg-dark mb-1 ">
               <template #header>
                  <b-carousel :id="`carousel-${i}`"  indicators controls  background="#ababab" :intervals="3000" class="w-100"  >
                     <b-carousel-slide v-for="(imagen, e) in destino.imagenes" :key="e" img-width="320px" img-height="auto" :img-src="`/storage/destinos/imagenes/${imagen.imagen}`" style="max-height:182px; height:182px; object-fit:cover" >
                     </b-carousel-slide>
                  </b-carousel>
               </template>

                  <b-form-checkbox v-model="destino.activo" switch @change="destinoActiveToggle($event, destino.id)">
                        {{ destino.activo ? 'Activo, ¿Desactivar?' : 'Inactivo, ¿Activar?' }}
                  </b-form-checkbox>

                  <h4 v-b-popover.hover="destino.descripcion.substring(0, 150)" :title="destino.titulo">
                     {{ destino.nombre }}
                  </h4>
                  <em class="line-height-1 font-weight-bolder" v-b-popover.hover="destino.descripcion" :title="destino.titulo">
                     {{ destino.titulo }}
                  </em>
                  <template #footer>
                     <b-button-group size="sm">
                  
                        <b-button :to="{ name: 'edit.destino', params: { id: destino.id } }" v-if="$can('update', 'destinos')" variant="primary">
                           <feather-icon icon="EditIcon" />
                        </b-button>

                        <b-button @click="eliminar(destino.id)" v-if="$can('delete', 'destinos')" variant="danger">
                           <feather-icon icon="TrashIcon" />
                        </b-button>

                        <b-button :to="{ name: 'imagenes.destino', params: { id: destino.id } }" v-if="$can('update', 'destinos')" variant="dark">
                           <feather-icon icon="ImageIcon" />
                        </b-button>

                        <b-button :to="{ name: 'atracciones.lists', params: { destino: destino.id } }" v-if="$can('update', 'atracciones')" variant="warning">
                           <feather-icon icon="MapIcon" />
                           Atracciones
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
   VBPopover,
   BBadge,
   BFormCheckboxGroup,
   BFormCheckbox,

} from 'bootstrap-vue'

import useDestinoList from './useDestinoList.js'
import store from '@/store'
import { ref, toRefs, computed } from 'vue'

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
      BBadge,
      BFormCheckboxGroup,
      BFormCheckbox,
      Listado:() => import('components/Listado.vue')
   },

   directives:{
      'b-popover': VBPopover
   },

   setup(props) {

      const actions = useDestinoList();
      const optionsActive = ref([
         {
            value:true,
            text:'¿ Activo ?'
         },
      ])

      const destinoActiveToggle = (value, destino_id) => {
         store.dispatch('destino/toggleActive',{destino:destino_id,activo:value}).then(({result}) => {
               if(result){
                  toast.success('Se ha guardado con éxito el cambio')
               }else{
                  toast.info('No se pudo guardar, inténtelo de nuevo')
               }
         })
      }

      return {
         actions,
         items:actions.items,
         loading: computed(() => store.state.loading),
         optionsActive,
         destinoActiveToggle
      }

   }


}
</script>

<style lang="scss">
   .carousel-item img{
      height: 100%;
      object-fit: cover;
      object-position: center center;
   }
</style>