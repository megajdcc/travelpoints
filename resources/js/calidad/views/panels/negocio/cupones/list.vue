<template>
   <listado :actions="actions">

      <template #btn-action>
         <b-button type="variant" :to="{ name: 'negocio.cupones.create' }" v-if="$can('write', 'negocio cupones')"
            class="d-flex flex-column justify-content-center">
            Crear
         </b-button>
      </template>

      <template #contenido="{ items, eliminar }">
         <b-container fluid class="mt-1 px-0 mx-0">
            <b-row>
               <b-col cols="12"  v-for="(cupon, i) in items" :key="i">
                  <b-card no-body class="p-1 d-flex flex-column">

                     <section class="d-flex justify-content-between align-items-md-center flex-wrap flex-column flex-md-row">
                        <section class="d-flex align-items-md-center flex-md-row flex-column">
                           <b-badge :variant="getVariantStatus(cupon)" class="mr-1">
                              {{ getStatusCupon(cupon)  }}
                           </b-badge>
                           <strong class="text-warning">
                              Inicia: {{ cupon.expide | fecha('LL') }} & Termina: {{ cupon.vence | fecha('LL') }} | Disponibles: {{
                              cupon.disponibles }} | Valor: {{ cupon.precio | currency(cupon.divisa.iso)}}
                           </strong>

                        </section>
                     
                        <b-button-group size="sm">
<!-- 
                           <b-button variant="warning" :to="{name:'negocio.reservar.cupon',params:{id:cupon.id}}" title="Reservar Cupón" v-if="cupon.disponibles > 0 && $can('read','negocio cupones')">
                              <font-awesome-icon icon="fas fa-user-check" />
                           </b-button>
                         -->
                           <b-button :to="{ name: 'negocio.cupon.edit', params: { id: cupon.id } }" v-if="$can('update', 'negocio cupones')"
                              variant="primary">
                              <feather-icon icon="EditIcon" />
                           </b-button>
                        
                           <b-button @click="eliminar(cupon.id)" v-if="$can('delete', 'negocio cupones')" variant="danger">
                              <feather-icon icon="TrashIcon" />
                           </b-button>
                        </b-button-group>

                     </section>
                     <hr>

                     <section class="d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">

                        <article class="d-flex justify-content-center w-100">
                              <b-img :src="`/storage/negocios/cupones/${cupon.imagen}`" class="img-card"/>
                        </article>

                        <main class="flex-grow-1 flex-chrink-0 mt-1 mt-md-0 ml-1">
                           
                           <h4 :title="cupon.nombre" class="text-warning">
                              {{ cupon.nombre }}
                           </h4>
                           
                           <p class="text-justify" :title="cupon.nombre" >
                              {{ cupon.descripcion  }}
                           </p>

                           <section class="d-flex justify-content-between flex-wrap flex-md-nowrap">
                              <article class="d-flex flex-column mr-md-1">
                                 <strong class="text-warning font-weight-bolder">Condiciones</strong>
                                 <p class="text-justify">
                                    {{ cupon.condiciones }}
                                 </p>
                              </article>

                              <article class="d-flex flex-column ">
                                 <strong class="text-warning font-weight-bolder ">Restricciones</strong>
                                 <p class="text-break text-justify">
                                    {{ cupon.restricciones }}
                                 </p>
                              </article>
                             
                           </section>

                        
                        </main>

                     </section>

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
import useCuponesList from './useCuponesList.js'
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
      const actions = useCuponesList(negocio)


      watch(negocio, () => actions.refetchData())

      return {
         actions,
         getVariantStatus:(cupon) => {
            let fecha_actual = moment();

            let fecha_inicio = moment(cupon.expide);
            let fecha_termina = moment(cupon.vence);

            return fecha_actual.isBetween(fecha_inicio,fecha_termina) ? 'success' : 'danger'

         },
         getStatusCupon: (cupon) => {
            let fecha_actual = moment();

            let fecha_inicio = moment(cupon.expide);
            let fecha_termina = moment(cupon.vence);  

            if(fecha_actual.isAfter(fecha_termina)){
               return 'Expirado';
            }

            return fecha_actual.isBetween(fecha_inicio, fecha_termina) ? 'Activo' : 'No activo'

         }


      }

   }
}
</script>

<style lang="scss">

.img-card{
   width: 310px;
   object-fit: contain;
   height: 100%;
   object-position: center center;
}

</style>