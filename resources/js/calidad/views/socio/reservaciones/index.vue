<template>
  <b-row>
    <b-col cols="12">
      <listado :actions="actions" hideFooter>

        <template #titulo>
          <h3>Mis reservaciones</h3>
        </template>

      <template #contenido="{ items, eliminar,fetchData,perPage,sortBy, isSortDirDesc,tableColumns  }">
      
        <b-card class="mt-1">
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy"
            empty-text="No se encontró ningúna reservación" :sort-desc.sync="isSortDirDesc" sticky-header="700px"
            :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">

            <template #cell(id)="{ item, toggleDetails, detailsShowing }">
              <b-button variant="primary" size="sm" @click="toggleDetails">
                # {{ item.id }}
                <font-awesome-icon :icon="['fas' , detailsShowing ? 'fa-angle-up' : 'fa-angle-down']" />
              </b-button>
            </template>
            <template #row-details="{item}">
              <b-container fluid>
                <b-row>
                  <b-col cols="12" >
                    <h3>Observación</h3>
                    <p class="text-justify">
                      {{ item.observacion }}
                    </p>
                  </b-col>
                </b-row>
              </b-container>
            </template>


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
      
      
            <template #cell(negocio_id)="{item}">
              
              <b-link :to="{name:'perfil.negocio',params:{url:item.negocio.url}}">
                <span class="text-nowrap">{{ item.negocio.nombre }}</span>
              </b-link>
             
            </template>
      
            <template #cell(status)="{item}">
              <span class="text-nowrap">{{ getStatus(item.status) }}</span>
            </template>
      
      
            <template #cell(actions)="{ item }">
      
              <b-button-group size="sm">
      
      
                <b-button @click="cancelarReserva(item.id)" variant="danger" v-if="item.status  == 1 ">
                  Cancelar
                </b-button>

              </b-button-group>
            </template>
      
          </b-table>
        </b-card>
      
      
      </template>

      </listado>
    </b-col>
  </b-row>


</template>


<script>

import {
  BTable,
  BCard,
  BButton,
  BButtonGroup,
  BContainer,
  BRow,
  BCol,
  BLink,
  BBadge,
  VBTooltip,
  BMedia,
  BAvatar
} from 'bootstrap-vue'


import store from '@/store'

import { toRefs, ref, computed, onMounted, watch } from 'vue'
import useReservacionsList from './useReservacionsList.js'
import { avatarText } from '@core/utils/filter'

export default {

  components: {
    BTable,
    BCard,
    BButton,
    BButtonGroup,
    BContainer,
    BRow,
    BCol,
    BLink,
    BBadge,
    BMedia,
    BAvatar,
    Listado: () => import('components/Listado.vue'),
  },



  directives: {
    'b-tooltip': VBTooltip
  },

  setup(props) {

    const { usuario } = toRefs(store.state.usuario)

    const actions = useReservacionsList(usuario)

    const cargarForm = () => {

      setTimeout(() => {
        actions.refetchData()
      },300)
    }

    onMounted(() => cargarForm() )
    watch([usuario],() => cargarForm())

    const getStatus = (status) => {
      const statuses = ['Sin consumar', 'Consumada', 'Cancelada'];

      return statuses[status - 1];

    } 


    return {
      actions,
      refTable: actions.refTable,
      avatarText,
      getStatus,
      cancelarReserva:actions.cancelarReserva,
      loading:computed(() => store.state.loading)
    }
  }


}

</script>

