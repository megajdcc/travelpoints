<template>
  <listado :actions="actions" isTable>

    <template #btn-action>
      <b-button type="variant" :to="{ name: 'negocio.reservacion.create' }" v-if="$can('write', 'negocio reservaciones')"
        class="d-flex flex-column justify-content-center">
        Generar Reserva
      </b-button>
    </template>

    <template #contenido="{ items, eliminar,fetchData,perPage,sortBy, isSortDirDesc,tableColumns  }">
      
      <b-card class="mt-1">
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy"
            empty-text="No se encontró ningúna reservación" :sort-desc.sync="isSortDirDesc" sticky-header="700px"
            :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md"
            >
          
            <template #cell(fecha)="{item}">
              <span class="text-nowrap">
                {{ `${item.fecha} ${item.hora}` | fecha('YYYY-MM-DD hh:mm A') }}
              </span>
          
            </template>
          
            <template #cell(usuario_id)="{item}">
              <b-media vertical-align="center">
                <template #aside>
                  <b-avatar size="32" :src="item.usuario.avatar"
                    :text="avatarText(`${item.usuario.nombre} ${item.usuario.apellido}`)" :variant="`light-primary`"
                    :to="{ name: 'mostrar.usuario', params: { id: item.usuario.id } }" disabled />
                </template>
                <b-link :to="{ name: 'mostrar.usuario', params: { id: item.usuario.id } }" disabled
                  class="font-weight-bold d-block text-nowrap">
                  {{ `${item.usuario.nombre} ${item.usuario.apellido}` }}
                </b-link>
                <small class="text-muted" v-if="item.usuario.username">{{ item.usuario.username }}</small>
              </b-media>
            </template>
          
            <template #cell(operador_id)="{item}">
          
              <b-media vertical-align="center" v-if="item.operador_id">
                <template #aside>
                  <b-avatar size="32" :src="item.operador.avatar"
                    :text="avatarText(`${item.operador.nombre} ${item.operador.apellido}`)" :variant="`light-primary`"
                    :to="{ name: 'mostrar.usuario', params: { id: item.operador.id } }" disabled />
                </template>
                <b-link :to="{ name: 'mostrar.usuario', params: { id: item.operador.id } }" disabled
                  class="font-weight-bold d-block text-nowrap">
                  {{ `${item.operador.nombre} ${item.operador.apellido}` }}
                </b-link>
                <small class="text-muted" v-if="item.operador.username">{{ item.operador.username }}</small>
              </b-media>
          
              <span class="text-nowrap" v-else>
                No Aplica
              </span>
          
            </template>
          
          
          
          
          
            <template #cell(negocio_id)="{item}">
              <span class="text-nowrap">{{ item.negocio.nombre }}</span>
            </template>
          
            <template #cell(status)="{item}">
              <span class="text-nowrap">{{ getStatus(item.status) }}</span>
            </template>
          
          
            <template #cell(actions)="{ item }">
          
              <b-button-group size="sm">
          
                <b-button :to="{ name: 'negocio.reservacion.edit', params: { id: item.id } }" variant="primary"
                  v-if="$can('update', 'negocio reservaciones')">
                  Editar
                </b-button>
          
                <b-button @click="eliminar(item.id)" variant="danger" v-if="$can('delete', 'negocio reservaciones')">
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

import { toRefs, watch,computed } from 'vue'


import Listado from 'components/Listado.vue'
import useReservacionesList from './useReservacionesList'
import store from '@/store'
import { avatarText } from '@core/utils/filter'

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
  BImg,
  BTable,
  BMedia,
  BLink,
  BAvatar

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
    BImg,
    BTable,
    BMedia,
    BLink,
    BAvatar


  },

  setup() {

    const { negocio } = toRefs(store.state.negocio)
    const actions = useReservacionesList(negocio)


    watch(negocio, () => actions.refetchData())
    
    const getStatus = (status) => {
      const statuses = ['Sin consumar','Consumada','Cancelada'];

      return statuses[ status -1 ];

    } 


    return {
      actions,
      loading:computed(() => store.state.loading),
      refTable:actions.refTable,
      avatarText,
      getStatus

    }

  }
}
</script>