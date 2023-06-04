<template >

    <listado :actions="actions" hideFooter>
      <template #btn-action>
        <b-button variant="primary" v-if="$can('write','sucursales')" :to="{name:'sucursales.create'}" 
        class="d-flex align-items-center">
          Agregar
        </b-button>
      </template>

      <template #contenido="{fetchData,tableColumns,isSortDirDesc,perPage,sortBy,eliminar}">
        <b-card no-body class="p-1">
              <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
                empty-text="No se encontró ningúna sucursal " :sort-desc="isSortDirDesc" sticky-header="700px"
                :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">
                <template #cell(id)="{item,toggleDetails,detailsShowing}">
                    <b-button @click="toggleDetails" variant="primary" size="sm">
                      {{ item.id }}
                      <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'fa-angle-down']" class="ml-1"/>
                    </b-button>
                </template> 

                <template #row-details="{item}">

                  <b-container fluid>
                    <b-row>
                      <b-col>
                        <el-divider content-position="left">Dirección</el-divider>
                      </b-col>
                    </b-row>
                    <b-row>
                      <b-col cols="12" md="4">
                        <b-form-group label="Pais">
                          {{ item.estado.pais.pais }}
                        </b-form-group>
                      </b-col>

                       <b-col cols="12" md="4">
                          <b-form-group label="Estado">
                            {{ item.estado.estado }}
                          </b-form-group>
                        </b-col>

                         <b-col cols="12" md="4">
                            <b-form-group label="Ciudad">
                              {{ item.ciudad.ciudad }}
                            </b-form-group>
                          </b-col>

                            <b-col cols="12" md="6">
                              <b-form-group label="Dirección">
                                {{ item.direccion }}
                              </b-form-group>
                            </b-col>

                             <b-col cols="12" md="6">
                                <b-form-group label="Iata">
                                  {{ item.iata.codigo }} - {{ item.iata.aeropuerto }}
                                </b-form-group>
                              </b-col>

                        <b-col cols="12" md="6">
                          <b-form-group label="Teléfonos">
                            {{ item.telefonos.map(val => val.telefono).join() }}
                          </b-form-group>
                        </b-col>
                    </b-row>
                  </b-container>
                  
                    <GmapMap ref="input" :center="{
                      lat: getLatitud(item.lat),
                      lng: getLongitud(item.lng)
                            }" :zoom="10" :options="options_map"
                        style="width:100%; height:250px; display: flex; justify-content:center;">
                        <GmapMarker :key="0" :position="{
                          lat: getLatitud(item.lat),
                          lng: getLongitud(item.lng)
                        }" :visible="visibleMarker" :draggable="false" :clickable="true" :icon="iconMarker">
                          <GmapInfoWindow :options="optionsPlace(item)">
                          </GmapInfoWindow>
                        </GmapMarker>
                
                    </GmapMap>
                </template>


                <template #cell(actions)="{ item }">
                  <b-button-group size="sm">
                    <b-button :to="{ name: 'sucursales.edit', params: { id: item.id } }" variant="primary"
                      v-if="$can('update', 'sucursales')">
                      Editar
                    </b-button>
          
                    <b-button @click="eliminar(item.id)" variant="danger" v-if="$can('delete', 'sucursales')">
                      Eliminar
                    </b-button>
                  </b-button-group>
                </template>
          
            </b-table>
        </b-card>
      
      </template>

    </listado>

</template>

<script>
import store from '@/store'

import {onMounted,watch,computed,ref} from 'vue'
import useSucursalesList from './useSucursalesList.js'
import useDireccion from '@core/utils/useDireccion.js'

import {
  BButton,
  BButtonGroup,
  BTable,
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
} from 'bootstrap-vue'

export default {

  components:{
    Listado:() => import('components/Listado.vue'),
    // BS
    BButton,
    BButtonGroup,
    BTable,
    BCard,
    BContainer,
    BRow,
    BCol,
    BFormGroup,

  },

  setup(props){

    const actions = useSucursalesList();
    const {
      buscadormap,
      visibleMarker,
      zoom_map,
      markers,
      iconMarker,
      input,
      options_map,
      getLatitud,
      getLongitud,
    } = useDireccion();
    
    onMounted(() => {
      setTimeout(() => actions.refetchData(),400)

    })

    const optionsPlace = (item) => {
      return {
        content: `<strong>${item.nombre}</strong>`,
      }  
    }
    
   

    return {
      actions,
      refTable:actions.refTable,
      loading:computed(() => store.state.loading),
      buscadormap,
      visibleMarker,
      zoom_map,
      markers,
      iconMarker,
      input,
      optionsPlace,
      options_map,
      getLatitud,
      getLongitud,
    }
  }

}
</script>