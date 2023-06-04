<template>
    <listado :actions="actions" isTable hideFooter>
        <template #btn-action>

          <b-button variant="primary" :to="{name:'pagina.create'}" v-if="$can('write', 'paginas')"
            class="d-flex flex-column justify-content-center">
            Agregar Pagina
          </b-button>

        </template>

        <template #contenido="{ fetchData, perPage, sortBy, isSortDirDesc, tableColumns,eliminar }">
          <b-card class="mt-1">
            <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by="sortBy"
              empty-text="No se encontró ningúna pagina" :sort-desc="isSortDirDesc" sticky-header="700px"
              :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small
              stacked="md">


              <template #cell(id)="{ item, detailsShowing, toggleDetails }">
                    <b-button @click="toggleDetails" variant="primary" size="sm" >
                        # {{ item.id }}
                        <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-angle-up' : 'fa-angle-down']"/>
                    </b-button>
              </template>

               <template #row-details="{ item }">

                 <el-divider content-position="left">Vista Previa</el-divider>
                  <b-container fluid>
                    <b-row>
                      <b-col>
                          <section v-html="item.contenido"></section>
                      </b-col>
                    </b-row>
                  </b-container>

              </template>


               <template #cell(ruta)="{ item }">
                  <b-link :href="`/${item.ruta}`" target="_blank">
                    <font-awesome-icon :icon="['fas',`fa-${item.icono}`]" v-if="item.icono" class="mr-1"/>
                    {{ item.ruta }}
                  </b-link>
                </template>

              <template #cell(is_termino)="{item}">
                <span class="text-nowrap">
                  {{ item.is_termino ? 'Sí' : 'No' }}
                </span>
              </template>

              <template #cell(is_contacto)="{ item }">
                  <span class="text-nowrap">
                    {{ item.is_contacto ? 'Sí' : 'No' }}
                  </span>
              </template>

              <template #cell(is_politica)="{ item }">
                <span class="text-nowrap">
                  {{ item.is_politica ? 'Sí' : 'No' }}
                </span>
              </template>

               <template #cell(activo)="{ item }">
                  <span class="text-nowrap">
                    {{ item.activo ? 'Sí' : 'No' }}
                  </span>
                </template>

              <!-- Column: Actions -->
              <template #cell(actions)="{ item }">
                  <b-button-group size="sm">
                      
                      <b-button variant="primary" :to="{name:'pagina.edit',params:{id:item.id}}" v-if="$can('update','paginas')">
                        <font-awesome-icon icon="fas fa-pen"/>
                      </b-button>

                    <b-button variant="danger" @click="eliminar(item.id)" v-if="$can('delete', 'paginas')">
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
import {onMounted,ref,computed} from 'vue';
import usePaginaList from './usePaginaList.js'
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
  
  components:{
    Listado:() => import('components/Listado.vue'),
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

  setup(props){

    const actions = usePaginaList();

    onMounted(() => {
      setTimeout(() => {
        actions.refetchData();
      },1000);
    })

    return {
      actions:actions,
      refTable:actions.refTable,
      loading:computed(() => store.state.loading),
    } 

  }
}
</script>