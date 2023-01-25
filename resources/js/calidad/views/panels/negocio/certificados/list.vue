<template>
   <listado :actions="actions">

      <template #btn-action>
         <b-button type="variant" :to="{ name: 'negocio.certificado.create' }" v-if="$can('write', 'negocio certificados')"
            class="d-flex flex-column justify-content-center">
            Crear
         </b-button>
      </template>

      <template #contenido="{ items, eliminar }">
         <b-container fluid class="mt-1 px-0 mx-0">
            <b-row>
               <b-col cols="12" md="4" v-for="(certificado, i) in items" :key="i">
                  <b-card>
                     <template #header>
                        <b-img :src="`/storage/negocios/certificados/${certificado.imagen}`" height="220px" 
                        style="width: 100%; object-fit: contain;"/>
                     </template>

                     <small>
                        Del {{ certificado.expide | fecha('LL') }} al {{ certificado.vence | fecha('LL') }}
                     </small>

                     <h4  :title="certificado.nombre" >
                        {{ certificado.nombre }}
                     </h4>


                     <p class="text-justify" :title="certificado.nombre" v-html="`${certificado.descripcion.substring(0, 80)}...`">

                     </p>

                     <template #footer>
                        <b-button-group size="sm">

                           <b-button :to="{ name: 'negocio.certificado.edit', params: { id: certificado.id } }"
                              v-if="$can('update', 'negocio certificados')" variant="primary">
                              <feather-icon icon="EditIcon" />
                           </b-button>

                           <b-button @click="eliminar(certificado.id)" v-if="$can('delete', 'negocio certificados')" variant="danger">
                              <feather-icon icon="TrashIcon" />
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

import { toRefs, watch } from '@vue/composition-api'


import Listado from 'components/Listado.vue'
import useCertificadosList from './useCertificadosList'
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
   BBadge,
   BImg

} from 'bootstrap-vue'

export default {

   components: {
      BButton,
      BButtonGroup,
      BContainer,
      BRow,
      BCol,
      BCard,
      Listado,
      BCarouselSlide,
      BCarousel,
      BBadge,
      BImg


   },

   setup() {

      const { negocio } = toRefs(store.state.negocio)
      const actions = useCertificadosList(negocio)


      watch(negocio, () => actions.refetchData())

      return {
         actions,

      }

   }
}
</script>