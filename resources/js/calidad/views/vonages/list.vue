<template>
  <listado :actions="actions" isTable hideFooter>

    <template #btn-action>

      <b-button variant="primary" @click="actions.refetchData()" class="d-flex flex-column justify-content-center">
        <font-awesome-icon icon="fas fa-rotate-right" />
      </b-button>

    </template>

    <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns,eliminar }">
      <b-card class="mt-1">
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          empty-text="No se encontró ningún mensaje" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md"
          @sort-changed="sortChange">


          <template #cell(id)="{ item, detailsShowing, toggleDetails }">
              <b-button @click="toggleDetails" variant="primary" size="sm">
                # {{ item.id }}
                <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'fa-angle-down']" />
              </b-button>
          </template>

          <template #row-details="{ item }">
            <table class="table table-sm table-hover table-responsive">
              <tr v-for="(v,i) in Object.keys(item)" :key="i">
                <td class="text-uppercase">{{ v }}</td>
                <td class="">
                  {{ item[v] }}
                </td>
              </tr>
            </table>
          </template>

          <template #cell(text)="{ item }">
            <span class="text-wrap" style="max-width:220px" >
              {{ item.text }}
            </span>
          </template>

          <template #cell(actions)="{item}">
            <b-button-group size="sm">
              <b-button variant="danger" title="Eliminar" @click="eliminar(item.id)">
                <font-awesome-icon icon="fas fa-trash"/>
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
import { onMounted, ref, computed, toRefs } from 'vue';
import useVonageList from './useVonageList.js'
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

import { avatarText } from '@core/utils/filter'

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
  },

  setup(props) {

    const actions = useVonageList();

    onMounted(() => {
      setTimeout(() => {
        actions.refetchData();
      }, 1000);
    })

    const sortChange = ({ sortBy, sortDesc }) => {

      actions.sortBy.value = sortBy,
      actions.isSortDirDesc.value = sortDesc

    }

    return {
      actions: actions,
      refTable: actions.refTable,
      loading: computed(() => store.state.loading),
      avatarText,
      sortChange,
    }

  }
}
</script>