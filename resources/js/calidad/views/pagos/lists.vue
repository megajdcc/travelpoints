<template>

   <div class="container-fluid px-0 w-100 mx-0">

      <!-- Filters -->
      <pagos-list-filters :boda-filter.sync="bodaFilter" :forma-pago-filter.sync="formaPagoFilter"
         :status-pago.sync="statusPago" :status-pago-options="statusPagoOptions" :rango.sync="rango" />

      <!-- Table Container Card -->
      <b-card no-body class="mb-0">

         <div class="m-2">

            <!-- Table Top -->
            <b-row>

               <!-- Per Page -->
               <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                  <per-page v-model="perPage" :perPageOptions="perPageOptions" size="sm" />

               </b-col>

               <!-- Search -->
               <b-col cols="12" md="6">

                  <div class="d-flex align-items-center justify-content-end">

                     <b-input-group size="sm">
                        <b-form-input v-model="searchQuery" class="d-inline-block" placeholder="Buscar..." size="sm" />

                        <template #append is-text>
                           <b-button-group size="sm">
                              <b-button @click="exportarData" variant="primary">
                                 <feather-icon icon="downloadIcon" />
                                 Descargar
                              </b-button>
                           </b-button-group>
                        </template>
                     </b-input-group>


                  </div>
               </b-col>
            </b-row>

         </div>

         <b-table ref="refPagosListTable" :items="fetchPagos" responsive :fields="tableColumns" primary-key="id"
            :sort-by.sync="sortBy" empty-text="No se encontró ningún pago" :sort-desc.sync="isSortDirDesc"
            sticky-header="700px" :no-border-collapse="false">

            <template #table-colgroup="scope">
               <col v-for="field in scope.fields" :key="field.key"
                  :style="{ width: field.key === 'show_details' ? '30px' : '60px' }">
            </template>

            <template #cell(show_details)="{ detailsShowing, item, toggleDetails }">

               <b-button @click="toggleDetails" size="sm" variant="text" class="d-flex text-nowrap">
                  <feather-icon :icon="(detailsShowing) ? 'ChevronUpIcon' : 'ChevronDownIcon'" />
                  <span class="text-nowrap">{{item.id}}</span>
               </b-button>

            </template>

            <template #row-details="row">
               <b-card>
                  <b-row class="mb-2">

                     <b-col md="6" class="mb-1">
                        <table class="table table-hover table-sm">
                           <tr>
                              <td> <strong>Noches : </strong></td>
                              <td>{{ row.item.noches }} </td>
                           </tr>
                           <tr>
                              <td> <strong>Pagado por : </strong></td>
                              <td> {{ (row.item.pagador) ? row.item.pagador : row.item.invitado }}
                              </td>
                           </tr>

                           <tr>
                              <td> <strong>Boda de : </strong></td>
                              <td> {{ row.item.novios }}
                              </td>
                           </tr>

                           <tr>
                              <td> <strong>Fecha del pago : </strong></td>
                              <td> {{ getFecha(row.item.fecha_pago) }}</td>
                           </tr>

                           <tr v-if="row.item.concepto">
                              <td> <strong>Concepto del pago : </strong></td>
                              <td> {{ row.item.concepto }}</td>
                           </tr>

                        </table>

                     </b-col>
                  </b-row>
               </b-card>
            </template>

            <!-- Column: Forma de pago -->
            <template #cell(forma_pago)="{item}">
               <div class="text-nowrap">
                  {{getFormaPago(item.forma_pago)}}
               </div>
            </template>

            <template #cell(status)="data">

               <section v-if="$can('write','pagos')">

                  <el-select size="small" style="width:150px !important" filterable class="w-100"
                     v-model="data.item.status" @change="updateStatusPago({status:$event,pago:data.item.id})"
                     v-if="data.item.status != 3">
                     <el-option v-for="(statu,i) in status" :key="i" :value="statu.id" :label="statu.label"></el-option>
                  </el-select>

                  <strong v-else class="text-danger">Pago Rechazado</strong>
               </section>

               <b-badge v-else pill :variant="getStatusPago(data.item.status).variant ">
                  {{ getStatusPago(data.item.status).text }}
               </b-badge>

            </template>

            <template #cell(monto)="data">
               <div class="text-nowrap" style="width:100px">
                  {{data.item.monto | currency }} MXN
               </div>
            </template>

            <template #cell(status_pago)="data">
               <div class="text-nowrap" style="width:100px" v-text="getStatus(data.item.status_pago)">

               </div>
            </template>


            <!-- Column: Actions -->
            <template #cell(actions)="data">

               <b-button-group size="sm">

                  <b-button variant="primary" v-if="$can('update','pagos')" @click="editarPago(data.item.id)"
                     title="Editar Pago">
                     <feather-icon icon="EditIcon" />
                  </b-button>

                  <b-button variant="dark" @click="verComprobante(data.item)" title="Ver Comprobante"
                     v-if="data.item.comprobante && getExt(data.item.comprobante)">
                     <feather-icon icon="EyeIcon" />
                  </b-button>

                  <b-button :href="`/api/descargar/comprobante/pago/${data.item.id}`" variant="secondary" download
                     title="Descargar el comprobante de pago"
                     v-if="data.item.comprobante && (data.item.forma_pago == 1 || data.item.forma_pago == 5 || data.item.forma_pago == 2)">
                     <feather-icon icon="DownloadIcon" size="16" class="align-middle" />
                  </b-button>

               </b-button-group>

            </template>

         </b-table>

         <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="totalPagos" />

      </b-card>
      <show-imagen :showDialog.sync="showDialog" :url="urlImagen" size="lg" :tipo="tipoArchivo" />
      <form-pago v-model="showFormPago" @pagoUpdate="refetchData" />

   </div>

</template>

<script>

import {
   BCard,
   BRow,
   BCol,
   BTable,
   BBadge,
   BFormInput,
   BPagination,
   BButton,
   BButtonGroup,
   VBTooltip,
   BSidebar,
   BFormRadioGroup,
   BFormRadio,
   BFormGroup,
   BForm,
   BFormFile,
   BInputGroup


} from 'bootstrap-vue';



import StatisticCardWithLineChart from '@core/components/statistics-cards/StatisticCardWithLineChart.vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'

import {ref,onMounted,watch} from 'vue';
import xlsx from 'xlsx'

import store from '@/store';

import PagosListFilters from './PagosListFilters.vue';

import usePagosList from './usePagosList';

import {mapState } from 'vuex';
import vSelect from 'vue-select'
import CurrencyInput from 'components/CurrencyInput';

import { Notification } from 'element-ui';
import ShowImagen from 'components/ShowImagen';
import Swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import { getExt } from '@core/utils/utils';
export default {
   props:['id'],

   components:{
      BCard,
      BRow,
      BCol,
      BTable,
      BBadge,
      StatisticCardWithLineChart,
      StatisticCardHorizontal,
      PagosListFilters,
      BFormInput,
      BPagination,
      vSelect,
      BButton,
      BButtonGroup,
      BSidebar,
      BFormRadioGroup,
      BFormRadio,
      BInputGroup,
      BFormGroup,
      BForm,
      BFormFile,
      ShowImagen,
      CurrencyInput,
      PaginateTable:() => import('components/PaginateTable'),
      PerPage:() => import('components/PerPage'),
      FormPago:() => import('components/FormPago')
      },

   directives:{
      'b-tooltip' : VBTooltip
   },

   computed:{
      ...mapState(['loading']),
   },



   setup(props) {
      
      const showDialog = ref(false)
      const urlImagen = ref('')
      const tipoArchivo = ref('')
      const showFormPago = ref(false)

      const {
         fetchPagos,
         tableColumns,
         perPage,
         currentPage,
         totalPagos,
         dataMeta,
         perPageOptions,
         searchQuery,
         sortBy,
         isSortDirDesc,
         refPagosListTable,
         refetchData,
         bodaFilter,
         formaPagoFilter,
         pags,
         statusPago,
         statusPagoOptions,
         rango


      } = usePagosList()

      const status = ref([
         {
            id:0,
            label:'Por confirmar',
            variant:"warning"
         },
         
         // {
         //    id:1,
         //    label:'Comprobada',
         // },
         
         {
            id:2,
            label:'Aprobada',
            variant:'success'
         },

         {
            id:3,
            label:'Rechazada',
            variant:'danger'
         }

      ]);

      
      const getFormaPago = (forma) => {

         switch (forma) {
            
            case 1:
               return 'Transferencia';
               break;
            
            case 2:
               return 'Agencia';
               break;

            case 3:
               return 'Paypal';
               break;

            case 4:
               return 'Conekta';
               break;
         }

      } 
      
      const getStatusPago = (status) => {

         let getStatus = {
            text:'',
            variant:'danger'
         }



           switch (status) {
            
            case 0:
               getStatus.text = 'Por comprobar'
               getStatus.variant = 'info'
               break;
            
            case 1:
               getStatus.text = 'Comprobada'
               getStatus.variant = 'warning'
               break;

            case 2:
               getStatus.text = 'Aprobada'
               getStatus.variant = 'success'
               break;

            case 3:
               getStatus.text = 'Rechazada'
               getStatus.variant = 'danger'
               break;
         }

         return getStatus

      }

      const exportarData = () => {
         let dataExport = pags.value.map((val) => {


            return {
               Referencia:val.nro_referencia,
               Fecha:getFecha(val.created_at),
               'Forma de pago':getFormaPago(val.forma_pago),
               Status:getStatusPago(val.status).text,
               Monto:val.monto,
               'Pagado por ':(val.usuario) ? val.usuario.nombre+' '+val.usuario.apellido : val.reserva.reservante,
               'Boda': val.reserva.boda.novios.novia+' & '+val.reserva.boda.novios.novio,
               
            };
         }) 

         let data = xlsx.utils.json_to_sheet(dataExport)
         // console.log(data);
         // data.Cells["Adultos"].AutoFitColumns();
         // var ws = xlsx.utils.aoa_to_sheet(data);
         // console.log(ws);
         // data.Cells['a1:l50'].AutoFitColumns();

         var wscols = [
               {wch:30},
               {wch:30},
               {wch:20},
               {wch:20},
               {wch:20},
               {wch:20},
                {wch:20},
               
            ];

            data['!cols'] = wscols;

         const workbook = xlsx.utils.book_new()

         const filename = 'Pagos'
         xlsx.utils.book_append_sheet(workbook, data, filename)
         xlsx.writeFile(workbook, `${filename}.xlsx`)

      }

      const getFecha = (fecha) => {
         return moment(fecha).format('LLL')
      }  

       const verComprobante = (comprobante) => {
         
         tipoArchivo.value = getExt(comprobante.comprobante);
          urlImagen.value = `/api/descargar/comprobante/pago/${comprobante.id}`;
          showDialog.value = true;

      }

      const descargarComprobante = (pago) => {


         store.dispatch('pago/descargarComprobante', pago).then(respon => {

            console.log(respon);

         }).catch(e => console.log(e));

      }

      const updateStatusPago = (data) => {
         // console.log(data);
            Swal.fire({
            title: 'Deseas continuar con esta acción?',
                  text: "Siempre podrás cambiar el status de un pago!",
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonText: 'Sí!',
                  cancelButtonText:'Nó',
                  customClass: {
                     confirmButton: 'btn btn-primary',
                     cancelButton: 'btn btn-outline-danger ml-1',
                  },
                  buttonsStyling: false,
                  }).then(result => {
                  
                  if (result.value) {
                      store.dispatch('pago/cambiarStatus',data).then( respon => {

                        if(respon.data.result){
                           Notification.info("El estatus del pago se ha cambiado");
                           refetchData()
                        }else{
                           Notification.info("El estatus del pago no se pudo cambiar");
                        }
                     }).catch((e) => {
                        console.log(e)
                     })
                  }else{
                     refetchData();
                  }
            })

        


      }

      const editarPago = (pago) => {
         store.commit('pago/capturarPago',pago)
         showFormPago.value = true

      }

      return {
         fetchPagos,
         tableColumns,
         perPage,
         currentPage,
         totalPagos,
         dataMeta,
         perPageOptions,
         searchQuery,
         sortBy,
         isSortDirDesc,
         refPagosListTable,
         refetchData,
         bodaFilter,
         formaPagoFilter,
         getFormaPago,
         getStatusPago,
         exportarData,
         getFecha,
         verComprobante,
         urlImagen,
         showDialog,
         descargarComprobante,
         statusPago,
         statusPagoOptions,
         rango,
         status,
         tipoArchivo,
         updateStatusPago,
         editarPago,
         showFormPago,
         getExt,
         getStatus:(status) => {
            const valores  =['No Aplica','Transferido','Por Transferir'];
            return valores[status] 
         } 
      }


   },
}
</script>