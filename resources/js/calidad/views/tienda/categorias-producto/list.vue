<template>
    <listado :actions="actions" isTable>

      <template #btn-action>
        <b-button :to="{name:'categoriaProducto.create'}" v-if="$can('read','categoria productos')" variant="primary" class="d-flex align-items-center">
          <font-awesome-icon icon="fas fa-plus" class="mr-1"/>
          Agregar
        </b-button> 
      </template>
      <template #contenido="{ fetchData, tableColumns, sortBy, isSortDirDesc , perPage,eliminar }">
        <b-card class="mt-1">
      
          <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy"
            empty-text="No se encontró ninguna categoría" :sort-desc.sync="isSortDirDesc" sticky-header="700px"
            :no-border-collapse="false"  borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">
          
            <template #cell(id)="{ item, toggleDetails, detailsShowing }">
            
              <b-button size="sm" variant="primary" @click="toggleDetails">
                {{ item.id }} 
                <font-awesome-icon :icon="['fas', detailsShowing ? 'fa-arrow-up' : 'fa-arrow-down']" class="ml-1" />
              </b-button>
            
            </template>


            <template #row-details="{item}">
              <h2>Descripción</h2>
              <p>{{ item.descripcion }}</p>
            </template>

            <template #cell(nombre)="{item}">
      
              <div class="text-wrap text-justify" >
                {{ item.nombre }}
              </div>
      
            </template>

            <template #cell(actions)="{item}">

              <b-button-group size="sm">
                <b-button variant="primary" v-if="$can('update','categoria productos')" :to="{name:'categoriaProducto.edit',params:{id:item.id}}">
                  <feather-icon icon="EditIcon" />
                </b-button>

                <b-button variant="danger" v-if="$can('delete','categoria productos')"
                  @click="eliminar(item.id)">
                  <feather-icon icon="TrashIcon" />
                </b-button>

              </b-button-group>
            </template>
      
      
          </b-table>
        </b-card>
      </template>
    </listado>
</template>

<script>

import {toRefs,ref,computed,onMounted} from 'vue'

import useCategoriaProductoList from './useCategoriaProductoList.js'
import store from '@/store'

import {
  BCard,
  BButtonGroup,
  BButton,
  BTable

} from 'bootstrap-vue'

export default {
  
  
  components:{
    Listado:() => import('components/Listado.vue'),
    BCard,
    BButtonGroup,
    BButton,
    BTable

  },

  setup(){

    const actions = useCategoriaProductoList();

    onMounted(() => {

      setTimeout(() => {
        actions.refetchData()

      }, 500);

    });

    return {
      loading: computed(() => store.state.loading),
      actions,
      refTable:actions.refTable,

    }

  }
}
</script>