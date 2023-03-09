<template>
   <listado :actions="actions" hideFooter>

      <template #btn-action>
         <b-button variant="primary" title="Crear Nuevo Negocio" v-if="$can('write','negocios')" class="d-flex align-items-center">
            <font-awesome-icon icon="fa-plus"/>
            Nuevo Negocio
         </b-button>
      </template>

      <template #contenido="{fetchData,tableColumns,isSortDirDesc,sortBy,eliminar}">
         <b-card no-body class="p-1">
             <b-table ref="refTable" class="position-relative" :items="fetchData" responsive :fields="tableColumns"
              primary-key="id" :sort-by="sortBy" show-empty empty-text="No se encontró ningún negocio"
              :sort-desc="isSortDirDesc"  sticky-header="700px" :no-border-collapse="false"  
              borderless outlined small :busy="loading" stacked="md"> 

            <template #cell(id)="{ item, detailsShowing, toggleDetails }">
               <b-button variant="primary" @click="toggleDetails"  size="sm">
                  # {{ item.id }}
                  <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'fa-angle-down']" class="ml-1" />
               </b-button>
            </template>

               <template #row-details="{ item }">
                  <banner-negocio :negocio="item" :promedioCalificacion="promedioCalificacion(item)" />
               </template>

               <template #cell(saldo)="{item}">
                  <b-button variant="dark" @click="mostrarBalances(item)" v-b-tooltip.hover title="Mostrar Billetera" size="sm">
                           <span class="text-nowrap text-success" :class="{'text-danger': item.cuenta.saldo < 0}">
                              {{ item.cuenta.saldo | currency(item.cuenta.divisa.iso) }}
                           </span>
                  </b-button>
                
               </template>
              
               <!-- Column: Nombre Negocio -->
              <template #cell(nombre)="{ item }">

               <section class="d-flex align-items-center flex-wrap flex-md-nowrap justify-content-center">
                  <article class="flex-shrink-0">
                      <b-img :src="`/storage/negocios/logos/${item.logo}`" height="60" width="120" style="object-fit:contain" ></b-img>
                  </article>

                  <section class="flex-grow-1 d-flex justify-content-center">
                      <b-link :to="`/${item.url}`" 
                       class="font-weight-bold d-block text-nowrap"> 
                       {{ item.nombre }}
                     </b-link>
                  </section>

               </section>
           
              </template>

               <template #cell(comision)="{ item }">
                  <div class="text-nowrap">
                     <span class="align-text-top text-uppercase" 
                     v-if="item.tipo_comision == 2" v-b-tooltip.hover="'Monto por persona'">{{ item.comision | currency(item.divisa.iso) }}</span>
                     <span class="align-text-top text-uppercase" v-else v-b-tooltip.hover="'Porcentaje por venta'">{{ item.comision }} % </span>
                  </div>
               </template>

               <template #cell(origen)="{ item }">
                     <div class="text-nowrap">
                        <span class="align-text-top text-uppercase" v-if="item.estado">{{ `${item.estado.estado} - ${item.estado.pais.pais}` }}</span>
                     </div>
               </template>

                <template #cell(created_at)="{ item }">
                     <div class="text-nowrap">
                        <span class="align-text-top text-uppercase" >{{ item.created_at | fecha }}</span>
                     </div>
               </template>

              <!-- Column: Actions -->
              <template #cell(actions)="{ item }">
                  <b-button-group size="sm">
                     <b-button variant="primary" title="Editar" :to="{ name: 'negocio.edit', params: { id: item.id } }" v-if="$can('update', 'negocios')">
                        <font-awesome-icon icon="fas fa-pen-to-square"/>
                     </b-button>

                     <b-button variant="danger" title="Eliminar" @click="eliminar()"  v-if="$can('delete', 'negocios')">
                        <font-awesome-icon icon="fas fa-trash"/>
                     </b-button>
                  </b-button-group>
              </template>

            </b-table>
         </b-card>

         <b-modal v-model="showBalance" centered size="xl" title="Movimientos de Cuenta del negocio" lazy  hide-footer> 
            <movimientos isAdmin/>
         </b-modal>
        
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
   BSpinner,
   BAvatar,
   BLink,
   BMedia,
   VBTooltip,
   BModal

} from 'bootstrap-vue'

import useNegocioList from './useNegocioList.js'
import store from '@/store'
import router from '@/router'

import { ref, toRefs, computed, onMounted } from '@vue/composition-api'

import { regresar } from '@core/utils/utils.js'

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
      perPage: () => import('components/PerPage.vue'),
      paginateTable: () => import('components/PaginateTable.vue'),
      BSpinner,
      BAvatar,
      BMedia,
      bannerNegocio: () => import('components/BannerNegocio.vue'),
      BLink,
      Listado:() => import('components/Listado.vue'),
      BModal,
      movimientos:() => import('views/panels/negocio/movimientos.vue')

   },

   directives: {
      'b-popover': VBPopover,
      'b-tooltip':VBTooltip
   },

   setup(props) {

      const showBalance = ref(false)

      const actions = useNegocioList();

      onMounted(() => setTimeout(() => actions.refetchData(),1500))

      const mostrarBalances = (negocio) => {
         store.commit('negocio/setNegocio',negocio)
         showBalance.value = true;
      }

      return {
         actions,
         refTable:actions.refTable,
         loading: computed(() => store.state.loading),
         promedioCalificacion: (negocio) => store.getters['negocio/promedioCalificacion'](negocio),
         mostrarBalances,
         showBalance

      }

   }


}
</script>

<style lang="scss" scoped>
   .logotipos{
      width: 100% !important;
      height: auto;
      object-fit: cover;
   }
</style>