<template>
  <listado :actions="actions" isTable hideFooter>

     <template #btn-action>

      <b-button variant="primary" @click="actions.refetchData()"
        class="d-flex flex-column justify-content-center">
        <font-awesome-icon icon="fas fa-rotate-right"/>
      </b-button>

    </template>

    <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns }">
      <b-card class="mt-1">
        <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
          empty-text="No se encontró ningúna tarjeta" :sort-desc="isSortDirDesc" sticky-header="700px"
          :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md" @sort-changed="sortChange">


          <template #cell(id)="{ item }">
            <span class="text-nowrap">
                # {{ item.id }}
            </span>
          </template>



          <template #cell(numero)="{ item }">
            <span class="text-nowrap">
              {{ item.numero }}
            </span>
          </template>

          <template #cell(monto)="{ item }">
            <span class="text-nowrap">
              {{ item.lote.monto | currency(item.lote.divisa.iso) }}
            </span>
          </template>

          <template #cell(tps)="{ item }">
            <span class="text-nowrap">
              TPS{{ item.lote.tps | currency() }}
            </span>
          </template>

          <template #cell(validada)="{ item }">

              <b-button variant="primary" @click="toggleValidar(item.id)"  size="sm" >
                <span class="text-nowrap">
                  {{ item.validada ? 'Sí, ¿Invalidar?' : 'No, ¿Validar?' }}
                </span>
              </b-button>
             
          </template>

          <template #cell(aplicada)="{ item }">
            <span class="text-nowrap">
              {{ item.aplicada ? 'Sí' : 'No' }}
            </span>
          </template>

          <template #cell(usuario)="{ item }">
              <b-media vertical-align="center" v-if="item.usuario">
                <template #aside> 
                  <b-avatar size="32" :src="item.usuario.avatar" :text="avatarText(`${item.usuario.nombre} ${item.usuario.apellido}`)"
                    variant="light-primary"
                    :to="{ name: 'mostrar.usuario', params: { id: item.id } }" disabled />
                </template>
                <b-link :to="{ name: 'mostrar.usuario', params: { id: item.id } }" disabled
                  class="font-weight-bold d-block text-nowrap">
                  {{ `${item.usuario.nombre} ${item.usuario.apellido}` }}
                </b-link>
                <small class="text-muted" v-if="item.usuario.username">{{ item.usuario.username }}</small>
              </b-media>

              <span v-else class="text-nowrap">
                NO ASOCIADA
              </span>
          </template>


          
        </b-table>
      </b-card>

    </template>
  </listado>
</template>

<script>

import store from '@/store';
import { onMounted, ref, computed,toRefs } from 'vue';
import useTarjetaList from './useTarjetaList.js'
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

  props:{
    lote:{
      type:String|Number,
      required:false,
    
    }
  },

  setup(props) {

    const {lote} = toRefs(props)
    const actions = useTarjetaList(lote);

    onMounted(() => {
      setTimeout(() => {
        actions.refetchData();
      }, 1000);
    })

    const sortChange = ({sortBy,sortDesc}) => {
      
      actions.sortBy.value = sortBy,
      actions.isSortDirDesc.value = sortDesc

    }

    return {
      actions: actions,
      refTable: actions.refTable,
      loading: computed(() => store.state.loading),
      avatarText,
      sortChange,
      toggleValidar:actions.toggleValidar
    }

  }
}
</script>