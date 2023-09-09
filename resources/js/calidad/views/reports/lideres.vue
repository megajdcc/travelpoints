<template>
  <listado :actions="actions" hideFooter>

    <template #btn-action>
      <b-button variant="primary" @click="descargar">
        <font-awesome-icon icon="fas fa-download" size="lg" />
        <span class="ml-1">{{ $t('Descargar') }}</span>
      </b-button>
    </template>

    <template #contenido="{sortBy,isSortDirDesc,perPage,tableColumns,fetchData}">

      <b-card class="mt-1">
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          empty-text="No se encontró ningún Líder" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">

          <template #table-busy>
            <div class="text-center text-danger my-2">
              <b-spinner class="align-middle"></b-spinner>
              <strong>{{  $t('Cargando')  }}...</strong>
            </div>
          </template>

          <!-- Column: User -->
          <template #cell(username)="{ item }">
            <b-media vertical-align="center" class="cursor-pointer" @click="mostrarAboutUsuario(item)">
              <template #aside>
                <b-avatar size="32" :src="`/storage/img-perfil/${item.imagen}`"
                  :text="avatarText(`${item.nombre} ${item.apellido}`)" :variant="`light-primary`"
                  @click="mostrarAboutUsuario(item)" />
              </template>
              <b-button @click="mostrarAboutUsuario(item)" variant="outline-text" size="sm"
                class="font-weight-bold d-block text-nowrap p-0">
                {{ item.nombre ? `${item.nombre} ${item.apellido}` : 'Sin definir nombre' }}
              </b-button>
              <small class="text-muted" v-if="item.username">{{ item.username }}</small>
            </b-media>
          </template>

        </b-table>
      </b-card>
    </template>
  </listado>
</template>

<script>
import { toRefs, computed, watch, ref, inject } from 'vue'
import store from '@/store'
import useLideresList from './useLideresList.js'


import {
  BCard,
  BTable,
  BMedia,
  BButtonGroup,
  BButton,
  BAvatar,
  BFormGroup,
  BSpinner,
  BTr,
  BTh
} from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    Listado: () => import('components/Listado.vue'),
    BCard,
    BTable,
    BMedia,
    BButtonGroup,
    BButton,
    BAvatar,
    BFormGroup,
    BSpinner,
    BTr,
    BTh
  },


  setup(props) {

    const actions = useLideresList()
    const userAbout = inject('userAbout')
    const showAboutProfile = inject('showAboutProfile')
    const mostrarAboutUsuario = (user) => {
      userAbout.value = user
      showAboutProfile.value = true
    }


    return {
      actions,
      refTable: actions.refTable,
      loading: computed(() => store.state.loading),
      avatarText,
      mostrarAboutUsuario,
      redondeo: redondeo,
      descargar: actions.descargar
    }
  }

}

</script>