<template>

      <listado :actions="actions" hideFooter>
         
         <template #titulo>
             <h3>Movimientos de Cuentas</h3>
         </template>

         <template #contenido="{fetchData,tableColumns,isSortDirDesc,sortBy}">
            <b-card>
                <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
                     :sort-by="sortBy" empty-text="No se encontró ningún movimiento" :sort-desc="isSortDirDesc"
                     sticky-header="700px" :no-border-collapse="false" borderless outlined small>

                     <template #cell(created_at)="{ item }">
                           {{ item.created_at | fecha('LLL') }}
                     </template>

                     <template #cell(monto)="{ item }">
                        <span style="color:black" class="font-weight-bolder">
                        {{ item.tipo_movimiento == 1 ? '+' : '-' }} {{ item.cuenta.divisa.iso.toUpperCase() }}{{ item.monto | currency({ symbol: item.cuenta.divisa.simbolo }) }}
                        </span>
                     </template>

                     <template #cell(balance)="{ item }">
                        <span style="color:black" class="font-weight-bolder">
                           {{ item.tipo_movimiento == 1 ? '+' : '-' }}{{ item.cuenta.divisa.iso.toUpperCase() }}{{ item.balance | currency({ symbol: item.cuenta.divisa.simbolo }) }}
                        </span>
                     </template>

                  </b-table>
            </b-card>
           
         </template>
         
      </listado>

</template>

<script>

import {
   BContainer,
   BCard,
   BRow,
   BCol,
   BButton,
   BButtonGroup,
   BTable,
   BFormInput,
   BInputGroup,

} from 'bootstrap-vue'

import useCuentaList from './useCuentaList.js'
import store from '@/store'
import {ref,toRefs,computed,onMounted} from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'

export default {
   
   components:{
      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      BInputGroup,
      BFormInput,
      Listado:() => import('components/Listado.vue')

   },

   setup(props){

      const { usuario } = toRefs(store.state.usuario)
      const { sistema } = toRefs(store.state.sistema)
      const route = useRoute();

      const actions =   useCuentaList({
         model_id: computed(() => route.meta.layout == 'travel' ? usuario.value.id : sistema.value.id),
         model_type: route.meta.layout == 'travel' ? 'User' : 'Sistema'
      });
     

      onMounted(() => {
         setTimeout(() => actions.refetchData(),500)
      })


      return {
         refTable:actions.refTable,
         loading:computed(() => store.state.loading),
         actions
      }

   }


}
</script>