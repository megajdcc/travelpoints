<template>
      <listado :actions="actions" isTable >
         
         <template #btn-action>
            
            <b-button variant="primary" :to="{name:'negocio.venta.create'}" v-if="$can('write','ventas negocio')" class="d-flex flex-column justify-content-center">
                  Generar Venta
            </b-button>

         </template>
         <template #contenido="{ eliminar, fetchData, tableColumns, sortBy, isSortDirDesc, perPage }">

               <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id" :sort-by.sync="sortBy"
                  empty-text="No se encontró ningúna Venta" :sort-desc.sync="isSortDirDesc" sticky-header="700px"
                  :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage" showEmpty small stacked="md">
               
               
                  <template #cell(panel)="{ item }">
                     <span class="text-nowrap font-weight-bolder">
                        {{ item.panel }}
                     </span>
                  </template>
               
                  <template #cell(actions)="{ item }">
               
                     <b-button-group size="sm">
               
                        <b-button @click="eliminar(item.id)" variant="danger" v-if="$can('delete', 'ventas negocio')">
                           Eliminar
                        </b-button>
                     </b-button-group>
                  </template>
               </b-table>

         </template>
      
      </listado>

</template>

<script>

import store from '@/store'
import {toRefs,ref,computed,watch} from '@vue/composition-api'

import useVentasList from './useVentasList.js'

import {
   BTable,
   BButtonGroup,
   BButton,
} from 'bootstrap-vue'
export default {

   components:{
      Listado:() => import('components/Listado.vue'),
       BTable,
      BButtonGroup,
      BButton,
   },


   setup(props){
      const {negocio} = toRefs(store.state.negocio)


      const actions = useVentasList(negocio)


      watch(negocio,() => actions.refetchData())
      return {
         loading:computed(() => store.state.loading),
         actions
      }

   }
}
</script>