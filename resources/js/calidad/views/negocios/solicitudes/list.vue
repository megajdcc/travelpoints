<template>
   <b-card>
      <b-container fluid>
         <b-row class="mb-1">
            <b-col cols="12" md="6">
               <per-page v-model="perPage" :perPageOptions="perPageOptions" />
            </b-col>
            <b-col cols="12" md="6">
               <b-input-group size="sm">
                  <b-form-input v-model="searchQuery" type="search" placeholder="Buscar" />
               </b-input-group>
            </b-col>

         </b-row>

         <b-row>
            <b-col cols="12">
               <b-table ref="refTable" :fields="tableColumns" :items="fetchData" :sort-by="sortBy"
                  :sort-desc="isSortDirDesc" primary-key="id" hover bordered small striped show-empty
                  empty-text="Sin Data" responsive>

                  <template #cell(id)="{ item, toggleDetails, detailsShowing }">
                     <b-button variant="primary" @click="toggleDetails" class="mx-auto text-nowrap" size="sm">
                        <span class="mr-1 fas" :class="detailsShowing ? 'fa-angle-up' : 'fa-angle-down'" />
                        # - {{ item.id }}
                     </b-button>
                  </template>

                  <template #row-details="{ item }">
                     <table class="table table-sm table-hover responsive">
                        <tr>
                           <td>
                              Nombre
                           </td>
                           <td>
                              {{ item.nombre }}
                           </td>
                        </tr>

                        <tr>
                           <td>
                              Breve
                           </td>
                           <td>
                              {{ item.breve }}
                           </td>
                        </tr>

                        <tr>
                           <td>
                              Categoría
                           </td>
                           <td>
                              {{ item.categoria.categoria }}
                           </td>
                        </tr>

                        <tr>
                           <td colspan="2">
                              Dirección
                           </td>
                        </tr>
                        <tr>
                           <td colspan="2">
                              {{ item.direccion }}
                           </td>
                        </tr>

                        <tr>
                           <td>
                              Ciudad
                           </td>
                           <td>
                              {{ item.ciudad ? item.ciudad.ciudad : 'Sin definir' }}
                           </td>
                        </tr>

                        <tr>
                           <td>
                              Estado
                           </td>
                           <td>
                              {{ item.estado ? item.estado.estado : 'Sin definir' }}
                           </td>
                        </tr>

                        <tr>
                           <td>
                              Pais
                           </td>
                           <td>
                              {{ item.estado.pais ? item.estado.pais.pais : 'Sin definir' }}
                           </td>
                        </tr>

                        <tr>
                           <td>
                              Teléfono
                           </td>
                           <td>
                              <a :href="`tel:${item.telefono}`" target="_blank">
                                 {{ item.telefono }}
                              </a>
                           </td>
                        </tr>


                        <tr>
                           <td>
                              Email
                           </td>
                           <td>
                              <a :href="`mailto:${item.email}`" target="_blank">
                                 {{ item.email }}
                              </a>
                           </td>
                        </tr>

                        <tr v-if="item.sitio_web">
                           <td>
                              Sitio web
                           </td>
                           <td>
                              <a :href="item.sitio_web" target="_blank">
                                 {{ item.sitio_web }}
                              </a>
                           </td>
                        </tr>


                        <tr>
                           <td>
                              Comisión 
                           </td>
                           <td>
                              <strong class="text-success" v-if="item.tipo_comision == 2">
                                 {{ item.comision | currency }} por persona
                              </strong>

                              <strong class="text-success" v-else>
                                 {{ item.comision }} % por venta
                              </strong>
                           </td>
                        </tr>

                        <tr>
                           <td>
                              Divisa con la va a operar: 
                           </td>
                           <td>
                              <strong class="text-success">
                                 {{ item.divisa.nombre }} {{ item.divisa.iso }} {{ item.divisa.simbolo }}
                              </strong>
                           </td>
                        </tr>



                        <tr>
                           <td>
                              <b-img :src="`/storage/negocios/logos/${item.logo}`" responsive thumbnail style="max-height:350px" />
                           </td>

                           <td>
                              <b-img :src="`/storage/negocios/fotos/${item.foto}`" responsive thumbnail style="max-height:350px" />
                           </td>

                        </tr>

                     </table>
                  </template>

                  <template #cell(situacion)="{item}">
                     
                     <b-badge class="text-nowrap" :variant="getSituacionSolicitud(item.situacion).variant">
                        {{ getSituacionSolicitud(item.situacion).text }}
                     </b-badge>
                  
                  </template>

                  <template #cell(created_at)="{item}">
                     {{ item.created_at | fecha('LLL') }}
                  </template>
                  <template #cell(updated_at)="{item}">
                     {{ item.updated_at | fecha('LLL') }}
                  </template>

                  <template #cell(nombre)="{item}">
                     <b-link :to="{ name:'negocio.show.solicitud',params:{id:item.id}}"
                        v-if="$can('update', 'nagocio solicitudes')" class="text-nowrap">
                        {{ item.nombre }}
                     </b-link>
                     <strong class="text-primary text-nowrap " v-else v-text="item.nombre"></strong>
                  </template>

                  <template #cell(usuario_id)="{item}">

                     <b-link :to="{ name:'show.usuario',params:{id:item.usuario_id}}" class="text-nowrap" v-if="item.usuario">
                        <b-avatar size="sm" :src="item.usuario.avatar" />
                        {{ item.usuario.nombre }}
                     </b-link>

                     <span v-else class="text-nowrap">
                        Usuario eliminado del sistema
                     </span>
                  </template>


                  <template #cell(actions)="{ item }">
                     <b-button-group size="sm">

                        <b-button variant="primary" :to="{ name:'negocio.solicitud.show',params:{id:item.id}}"
                           v-if="$can('read', 'solicitudes')">
                           <feather-icon icon="EyeIcon" />
                        </b-button>

                           <b-button variant="danger" @click="eliminar(item.id)"
                              v-if="$can('delete', 'solicitudes')">
                              <feather-icon icon="TrashIcon" />
                           </b-button>

                     </b-button-group>
                  </template>


               </b-table>

            </b-col>
         </b-row>

         <b-row class="mt-1">
            <b-col cols="12">
               <paginate-table :dataMeta="dataMeta" :perPage="perPage" :currentPage.sync="currentPage" :total="total" />
            </b-col>
         </b-row>
      </b-container>

   </b-card>

</template>

<script>

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BButton,
   BButtonGroup,
   BTable,
   BInputGroup,
   BInputGroupAppend,
   BFormInput,
   BLink,
   BAvatar,
   BBadge,
   BImg

} from 'bootstrap-vue'

import useNegocioSolicitudesList from './useNegocioSolicitudesList'

import { ref } from '@vue/composition-api'
import { getSituacionSolicitud } from '@core/utils/utils';

export default {

   components: {
      BCard,
      BContainer,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      PerPage: () => import('components/PerPage'),
      PaginateTable: () => import('components/PaginateTable'),
      BInputGroup,
      BInputGroupAppend,
      BFormInput,
      BLink,
      BAvatar,
      BBadge,
      BImg



   },


   setup() {

      const {
         perPageOptions,
         currentPage,
         perPage,
         searchQuery,
         sortBy,
         isSortDirDesc,
         refTable,
         total,
         dataMeta,
         refetchData,
         tableColumns,
         fetchData,
         eliminar
      } = useNegocioSolicitudesList();


      return {
         perPageOptions,
         currentPage,
         perPage,
         searchQuery,
         sortBy,
         isSortDirDesc,
         refTable,
         total,
         dataMeta,
         refetchData,
         tableColumns,
         fetchData,
         eliminar,
         getSituacionSolicitud
      }


   },
}
</script>