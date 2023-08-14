<template>
   <section>
      <listado :actions="actions">
         <template #btn-action>
            <b-button  href="/reports/descargar/estados-cuenta" download variant="primary" class="d-flex align-items-center font-weight-bolder" v-if="isReport">
               <font-awesome-icon icon="fas fa-file-pdf" class="mr-1" size="2x" />
               Descargar
            </b-button>
         </template>
         <template #contenido="{ fetchData, tableColumns, isSortDirDesc, sortBy, perPage }">
            <b-table ref="refTable" :items="fetchData" responsive :fields="tableColumns" primary-key="id"
               :sort-by="sortBy" :empty-text="$t('No se encontró ningun movimiento...')" :sort-desc="isSortDirDesc"
               sticky-header="700px" :no-border-collapse="false" borderless outlined :busy="loading" :perPage="perPage"
               showEmpty small stacked="md">

               <template #cell(created_at)="{ item }">
                     {{ item.created_at | fecha('LLL') }}
               </template>

               <template #cell(monto)="{ item }">
                  <span style="color:black" class="font-weight-bolder text-nowrap">
                     {{ item.tipo_movimiento == 1 ? '+' : '-' }}
                     {{ item.divisa_id ? item.divisa.iso : 'Tp' }}
                     {{ item.monto | currency({
                        symbol: item.divisa_id ? item.divisa.simbolo :
                           '$'
                     }) }}
                  </span>
               </template>

               <template #cell(balance)="{ item }">
                  <span style="color:black" class="font-weight-bolder text-nowrap">
                     {{ item.tipo_movimiento == 1 ? '+' : '-' }}{{ item.divisa_id ? item.divisa.iso :
                        'Tp' }}{{ item.balance | currency({
   symbol: item.divisa_id ?
      item.divisa.simbolo : '$'
   }) }}
                  </span>
               </template>

            </b-table>
         </template>

         <template #botonera-footer>
            <b-button size="sm" variant="primary" title="Solicitar retiro" @click="mostrarFormRetiro" >
               {{ $t('Solicitar Retiro') }}
            </b-button>
         </template>

      </listado>
   </section>
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
   BSidebar,
   BForm, BFormGroup,
   BFormInvalidFeedback,
   BFormTextarea

} from 'bootstrap-vue'

import useCuentaList from './useCuentaList.js'
import store from '@/store'
import { ref, toRefs, computed, onMounted,inject } from 'vue'
import { useRoute } from 'vue2-helpers/vue-router'



import vSelect from 'vue-select'
export default {

   components: {
      BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      BInputGroup,
      BFormInput,
      Listado: () => import('components/Listado.vue'),
      BSidebar,
      BForm,
      BFormGroup,
      BFormInvalidFeedback,
      vSelect,
      BFormTextarea

   },

   props: {
      id: Number | String,
      isReport:Boolean
   },

   setup(props) {

      const { usuario } = toRefs(store.state.usuario)
      const { sistema } = toRefs(store.state.sistema)
      const { id,isReport } = toRefs(props)
      const route = useRoute();
      const showSidebarRetiro = inject('showSidebarRetiro')

      const actions = useCuentaList({
         model_id: computed(() => route.meta.layout == 'travel' ? usuario.value.id : id.value ? id.value : sistema.value.id),
         model_type: route.meta.layout == 'travel' ? 'User' : id.value ? 'User' : 'Sistema'
      });

      onMounted(() => {
         setTimeout(() => actions.refetchData(), 1000)
      })


      const mostrarFormRetiro = () => {

         showSidebarRetiro.value = true
      }
     
      return {
         refTable: actions.refTable,
         loading: computed(() => store.state.loading),
         actions,
         mostrarFormRetiro,
         showSidebarRetiro,
         descargarPdf: actions.descargarPdf,
         getSaldo:computed(() => {
            return usuario.value.cuenta ? usuario.value.cuenta.saldo : 0
         }), 
       
         
      }

   }


}
</script>