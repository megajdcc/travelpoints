<template>
  <listado :actions="actions" isTable hideFooter>

    <template #btn-action>
      <b-button :to="{ name: 'tienda.create' }" v-if="$can('read', 'tiendas')" variant="primary"
        class="d-flex align-items-center">
        <font-awesome-icon icon="fas fa-plus" class="mr-1" />
        Agregar
      </b-button>
    </template>
    <template #contenido="{ fetchData, tableColumns, sortBy, isSortDirDesc, perPage, eliminar }">
      <b-card class="mt-1">

        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
          :sort-by.sync="sortBy" empty-text="No se encontró ninguna tienda" :sort-desc.sync="isSortDirDesc"
          sticky-header="700px" :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage"
          showEmpty small stacked="md">

          <template #cell(id)="{ item, toggleDetails, detailsShowing }">

            <b-button size="sm" variant="primary" @click="toggleDetails" v-if="item.fisica">
              {{ item.id }}
              <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-arrow-up' : 'fa-arrow-down']" class="ml-1" />
            </b-button>

            <div class="text-wrap text-justify" v-else>
              {{ item.id}}
            </div>

          </template>


          <template #row-details="{ item }">
            <!-- ubicación -->
            <el-divider content-position="left">Ubicación</el-divider>
            <table class="table table-sm table-hover ">
              <tr>
                <td>Pais:</td><td> {{ item.estado.pais.pais  }}</td>
              </tr>

              <tr>
                <td>Estado:</td>
                <td> {{ item.estado.estado }}</td>
              </tr>

              <tr>
                <td>Ciudad:</td>
                <td> {{ item.ciudad ? item.ciudad.ciudad : 'Sin definir' }}</td>
              </tr>

              <tr>
                <td>Iata:</td>
                <td> {{ item.iata ? `${item.iata.codigo} - ${item.iata.aeropuerto}` : 'Sin definir' }}</td>
              </tr>

              <tr>
                <td colspan="2">
                    <GmapMap :center="{lat:Number(item.lat), lng:Number(item.lng)}" :zoom="17" map-type-id="terrain"
                      style="width: 100%; height: 300px">
                    
                      <GmapMarker :key="0" :position="{
                        	lat:Number(item.lat),
                        	lng:Number(item.lng)
                        }" :visible="true" :draggable="false" :clickable="false">
                    
                        <GmapInfoWindow :options="optionsPlace(item)">
                        </GmapInfoWindow>
                    
                      </GmapMarker>
                    
                    </GmapMap>
                </td>
              </tr>


            </table>
          </template>

          <template #cell(divisa_id)="{ item }">

            <div class="text-wrap text-justify">
              {{ item.divisa ? item.divisa.nombre : 'sin definir' }}
            </div>

          </template>

            <template #cell(fisica)="{ item }">
            
              <div class="text-wrap text-justify">
                {{ item.fisica ? 'Sí, tienda fisica' : 'No, tienda online' }}
              </div>
            
            </template>

          <template #cell(productos)="{ item }">
          
            <div class="text-wrap text-justify">
              {{ item.productos.length }} Producto
            </div>
          
          </template>

          <template #cell(actions)="{ item }">

            <b-button-group size="sm">
              <b-button variant="primary" v-if="$can('update', 'tiendas')"
                :to="{ name: 'tienda.edit', params: { id: item.id } }">
                <feather-icon icon="EditIcon" />
              </b-button>

              <b-button variant="danger" v-if="$can('delete', 'tiendas')" @click="eliminar(item.id)">
                <feather-icon icon="TrashIcon" />
              </b-button>

            </b-button-group>
          </template>


        </b-table>
      </b-card>
    </template>
  </listado>
</template>

<script>

import { toRefs, ref, computed, onMounted } from '@vue/composition-api'

import useTiendasList from './useTiendasList.js'
import store from '@/store'

import {
  BCard,
  BButtonGroup,
  BButton,
  BTable

} from 'bootstrap-vue'

export default {


  components: {
    Listado: () => import('components/Listado.vue'),
    BCard,
    BButtonGroup,
    BButton,
    BTable

  },

  setup() {

    const actions = useTiendasList();

    onMounted(() => {

      setTimeout(() => {
        actions.refetchData()

      }, 500);

    });

    return {
      loading: computed(() => store.state.loading),
      actions,
      refTable: actions.refTable,
      optionsPlace: (tienda) => ({ content: `<strong>${tienda.nombre}</strong>` })

    }

  }
}
</script>