<template>
    <listado :actions="actions" hideFooter>
       <template #contenido="{ fetchData, tableColumns, sortBy, isSortDirDesc, perPage, eliminar }">
          <b-card class="mt-1">
        
            <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy"
              empty-text="No se encontró ninguna venta" :sort-desc.sync="isSortDirDesc" sticky-header="700px"
              :no-border-collapse="false"  borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">
            
              <template #cell(id)="{ item, toggleDetails, detailsShowing }">
              
                <b-button size="sm" variant="primary" @click="toggleDetails">
                  {{ item.id }} 
                  <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-arrow-up' : 'fa-arrow-down']" class="ml-1" />
                </b-button>
              
              </template>


              <template #row-details="{ item }">
              
              </template>

              <template #cell(monto)="{ item }">
        
                <div class="text-wrap text-justify">
                  {{ item.monto | currency }}
                </div>
        
              </template>

              <template #cell(cliente_id)="{ item }">
        
                <b-media vertical-align="center">
                  <template #aside>
                    <b-avatar size="32" :src="item.cliente.avatar" :text="avatarText(`${item.cliente.nombre} ${item.cliente.apellido}`)"
                      :variant="`light-primary`"
                      :to="{ name: 'mostrar.usuario', params: { id: item.cliente.id } }" disabled />
                  </template>
                  <b-link :to="{ name: 'mostrar.usuario', params: { id: item.cliente.id } }" disabled
                    class="font-weight-bold d-block text-nowrap"> 
                    {{ `${item.cliente.nombre} ${item.cliente.apellido}` }}
                  </b-link>
                  <small class="text-muted" v-if="item.cliente.username">{{ item.cliente.username }}</small>
                </b-media>
        
              </template>


               <template #cell(empleado_id)="{ item }">
        
                  <b-media vertical-align="center" v-if="item.empleado_id">
                    <template #aside>
                      <b-avatar size="32" :src="item.empleado.usuario.avatar" :text="avatarText(`${item.empleado.usuario.nombre} ${item.empleado.usuario.apellido}`)"
                        :variant="`light-primary`"
                        :to="{ name: 'mostrar.usuario', params: { id: item.empleado.usuario.id } }" disabled />
                    </template>
                    <b-link :to="{ name: 'mostrar.usuario', params: { id: item.empleado.usuario.id } }" disabled
                      class="font-weight-bold d-block text-nowrap"> 
                      {{ `${item.empleado.usuario.nombre} ${item.empleado.usuario.apellido}` }}
                    </b-link>
                    <small class="text-muted" v-if="item.empleado.usuario.username">{{ item.empleado.usuario.username }}</small>
                  </b-media>

                <span class="text-nowrap" v-else>
                  No Aplica
                </span>
        
              </template>

              <template #cell(model_id)="{ item }">
                  <span class="text-nowrap">
                    {{ item.model.nombre }} 
                    <!-- Nombre del producto -->
                  </span>
                </template>
            </b-table>
          </b-card>
        </template>
    </listado>
</template>

<script>

import useVentasList from './useVentasList.js';
import store from '@/store'
import {ref,toRefs,computed,onMounted,watch} from '@vue/composition-api'
import { avatarText } from '@core/utils/filter'

import {
  BCard,
  BButtonGroup,
  BTable,
  BButton,
  BMedia,
  BAvatar,
  BLink
} from 'bootstrap-vue'

export default {
  
  components:{
    Listado:() => import('components/Listado.vue'),

    BCard,
    BButtonGroup,
    BTable,
    BButton,
    BMedia,
    BAvatar,
    BLink

  },

  setup(props){
    const actions  = useVentasList();

    onMounted(() => {
      setTimeout(() => {
          actions.refetchData()
      }, 500);
    })

    return {
      actions,
      refTable: actions.refTable,
      avatarText,
      loading:computed(() => store.state.loading)

    }
  }
}
</script>