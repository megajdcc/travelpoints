<template>
  <listado :actions="actions" isTable hideFooter>

    <template #btn-action>
      <b-button type="variant" :to="{ name: 'retiro.create' }" v-if="$can('write', 'retiros')"
        class="d-flex flex-column justify-content-center">
        Generar Solicitud
      </b-button>
    </template>

    <template #contenido="{ eliminar, fetchData, perPage, sortBy, isSortDirDesc, tableColumns }">

      <b-card class="mt-1">
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          empty-text="No se encontró ningún Retiro" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">

          <template #cell(id)="{item,detailsShowing, toggleDetails }">
            <b-button variant="primary" @click="toggleDetails" size="sm" class="text-nowrap">
              #-{{ item.id }}
              <font-awesome-icon :icon="['fas' , detailsShowing ? 'angle-up' : 'angle-down']" class="ml-1" />
            </b-button>
          </template>

          <template #row-details="{item}">
            <el-divider content-position="left">Nota del Retiro</el-divider>
            <p class="text-justify">
              {{ item.nota }}
            </p>
          </template>



          <template #cell(monto)="{ item }">
            <span class="text-nowrap">
              {{ item.monto | currency({
                currency:item.usuario.cuenta.divisa.iso
              }) }}
            </span>

          </template>

          <template #cell(fecha)="{ item }">
            <span class="text-nowrap">
              {{ `${item.created_at}` | fecha('YYYY-MM-DD hh:mm A') }}
            </span>

          </template>

          <template #cell(usuario_id)="{ item }">
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

          <template #cell(status)="{ item }">
            <span class="text-nowrap">{{ getStatus(item.status) }}</span>
          </template>


          <template #cell(actions)="{ item }">

            <b-button-group size="sm">

              <b-button :to="{ name: 'retiro.edit', params: { id: item.id } }" variant="primary"
                v-if="$can('update', 'retiros')">
                Editar
              </b-button>

              <b-button @click="eliminar(item.id)" variant="danger" v-if="$can('delete', 'retiros')">
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

import { toRefs, watch, computed, onMounted } from 'vue'


import Listado from 'components/Listado.vue'
import useRetirosList from './useRetirosList.js'
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

    const actions = useRetirosList()

    
    onMounted(() => setTimeout(() => {
      actions.refetchData()
    },
      400))

    return {
      actions,
      loading: computed(() => store.state.loading),
      refTable: actions.refTable,
      avatarText,
      getStatus:actions.getStatus

    }

  }
}
</script>