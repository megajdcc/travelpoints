<template>
  <listado :actions="actions" isTable hideFooter>
    <template #btn-action>

      <b-button variant="primary" :to="{ name: 'lotes.create' }" v-if="$can('write', 'lotes')"
        class="d-flex flex-column justify-content-center">
        Agregar Lote
      </b-button>

    </template>

    <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns, eliminar }">
      <b-card class="mt-1">
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          empty-text="No se encontró ningún lote" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">


          <template #cell(id)="{ item, detailsShowing, toggleDetails }">
            <b-button @click="toggleDetails" variant="primary" size="sm">
              # {{ item.id }}
              <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'fa-angle-down']" />
            </b-button>
          </template>

          <template #row-details="{ item }">
            <tarjetas :lote="item.id" />
          </template>


          <template #cell(fecha_llegada)="{ item }">
            <span class="text-nowrap">
              {{ item.fecha_llegada | fecha('LL') }}
            </span>
          </template>

          <template #cell(monto)="{ item }">
            <span class="text-nowrap">
              {{ item.monto | currency(item.divisa.iso) }}
            </span>
          </template>

            <template #cell(tps)="{ item }">
              <span class="text-nowrap">
                TPS{{ item.tps | currency() }}
              </span>
            </template>

            <template #cell(numero_inicial)="{ item }">
                <span class="text-nowrap">
                  {{ `${item.codigo_lada}${item.numero_inicial}`}}
                </span>
            </template>
            <template #cell(numero_final)="{ item }">
              <span class="text-nowrap">
                {{ `${item.codigo_lada}${item.numero_final}` }}
              </span>
            </template>

          <!-- Column: Actions -->
          <template #cell(actions)="{ item }">
            <b-button-group size="sm">

              <b-button variant="primary" :to="{ name: 'lotes.edit', params: { id: item.id } }" v-if="$can('update', 'lotes')">
                <font-awesome-icon icon="fas fa-pen" />
              </b-button>

              <b-button variant="danger" @click="eliminar(item.id)" v-if="$can('delete', 'lotes')">
                <font-awesome-icon icon="fas fa-trash" />
              </b-button>
            </b-button-group>
          </template>
        </b-table>
      </b-card>

    </template>
  </listado>
</template>

<script>

import store from '@/store';
import { onMounted, ref, computed } from 'vue';
import useLoteList from './useLoteList.js'
import {
  BCard,
  BRow,
  BCol,
  BFormInput,
  BInputGroup,
  BButton,
  BTable,
  BMedia,
  BAvatar,
  BLink,
  BBadge,
  BDropdown,
  BDropdownItem,
  BDropdownItemButton,
  BPagination,
  BFormCheckbox,
  BSidebar,
  BContainer,
  BForm,
  BFormGroup,
  BFormInvalidFeedback,
  BButtonGroup,

} from 'bootstrap-vue';
export default {

  components: {
    Listado: () => import('components/Listado.vue'),
    BCard,
    BRow,
    BCol,
    BFormInput,
    BInputGroup,
    BButton,
    BTable,
    BMedia,
    BAvatar,
    BLink,
    BBadge,
    BDropdown,
    BDropdownItem,
    BDropdownItemButton,
    BPagination,
    BFormCheckbox,
    BSidebar,
    BContainer,
    BForm,
    BFormGroup,
    BFormInvalidFeedback,
    BButtonGroup,
    Tarjetas:() => import('views/tarjetas/list.vue')
  },

  setup(props) {

    const actions = useLoteList();

    onMounted(() => {
      setTimeout(() => {
        actions.refetchData();
      }, 1000);
    })

    return {
      actions: actions,
      refTable: actions.refTable,
      loading: computed(() => store.state.loading),
    }

  }
}
</script>