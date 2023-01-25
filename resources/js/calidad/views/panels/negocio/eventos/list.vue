<template>
      <listado :actions="actions">
            
            <template #btn-action>
               <b-button type="variant" :to="{name:'negocio.evento.create'}" v-if="$can('write','eventos')" class="d-flex flex-column justify-content-center">
                  Crear
               </b-button>
            </template>

            <template #contenido="{items,eliminar}">
               <b-container fluid class="mt-1 px-0 mx-0" >
                  <b-row>
                     <b-col cols="12" md="4" v-for="(evento, i) in items" :key="i">
                        <b-card>
                           <template #header>
                              <b-carousel :id="`carousel-${i}`" indicators controls background="#ababab" :intervals="3000">
                                 <b-carousel-slide v-for="(imagen, e) in evento.imagenes" :key="e" img-width="320px" img-height="auto"
                                    :img-src="`/storage/eventos/imagenes/${imagen.imagen}`"
                                    style="max-height:182px; height:182px; object-fit:cover">
               
                                 </b-carousel-slide>
               
                              </b-carousel>
                           </template>
               
                           <b-badge :variant="getStatus(evento.status).variant">
                              {{ getStatus(evento.status).status }}
                           </b-badge>
               
                           <br>
               
                           <small>
                              Del {{ evento.fecha_inicio | fecha('LL') }} al {{ evento.fecha_fin | fecha('LL') }}
                           </small>
               
                           <h4 :title="evento.titulo">
                              {{ evento.titulo }}
                           </h4>
               
               
                           <p class="text-justify" :title="evento.titulo" v-html="`${evento.contenido.substring(0, 80)}...`">
               
                           </p>
               
                           <template #footer>
                              <b-button-group size="sm">
               
                                 <b-button :to="{ name: 'negocio.evento.edit', params: { id: evento.id } }" v-if="$can('update', 'negocio eventos')"
                                    variant="primary">
                                    <feather-icon icon="EditIcon" />
                                 </b-button>
               
                                 <b-button @click="eliminar(evento.id)" v-if="$can('delete', 'negocio eventos')" variant="danger">
                                    <feather-icon icon="TrashIcon" />
                                 </b-button>
               
                                 <b-button :to="{ name: 'negocio.evento.imagenes', params: { id: evento.id } }"
                                    v-if="$can('update', 'negocio eventos')" variant="dark">
                                    <feather-icon icon="ImageIcon" />
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

import {toRefs,watch} from '@vue/composition-api'


import Listado from 'components/Listado.vue'
import useEventosList from './useEventosList'
import store from '@/store'

import {
   BButton,
   BButtonGroup,
   BContainer,
   BRow,
   BCol,
   BCard,
   BCarouselSlide,
   BCarousel,
   BBadge

} from 'bootstrap-vue'

export default {
   
   components:{
      BButton,
      BButtonGroup,
      BContainer,
      BRow,
      BCol,
      BCard,
      Listado,
      BCarouselSlide,
      BCarousel,
      BBadge

   },

   setup(){
      
      const {negocio} = toRefs(store.state.negocio)
      const actions = useEventosList(negocio)


      watch(negocio,() => actions.refetchData())

      return {
         actions,
         getStatus: (estado) => {
            let status = {
               variant: 'info',
               status: 'Sin definir'
            };
            switch (estado) {
               case 1:
                  status = {
                     variant: 'success',
                     status: 'Activo'
                  };
                  break;

               case 2:
                  status = {
                     variant: 'danger',
                     status: 'Vencido'
                  };
                  break;

               case 3:
                  status = {
                     variant: 'warning',
                     status: 'A Destiempo'
                  };
                  break;

            }

            return status;
         }


      }

   }
}
</script>