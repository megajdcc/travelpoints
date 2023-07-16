<template>

   <b-card no-body class="mb-0 mx-0 px-0">

      <div class="m-2">

         <!-- Table Top -->
         <b-row>

            <!-- Per Page -->
            <b-col cols="12" md="5" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">

               <per-page v-model="perPage" :perPageOptions="perPageOptions">
               </per-page>

               <el-date-picker v-model="anoFilter" type="year" value-format="yyyy" placeholder="Filtre por año"
                  class="ml-1" size="small">
               </el-date-picker>

            </b-col>

            <!-- Search -->
            <b-col cols="12" md="7">



               <div class="d-flex align-items-center justify-content-end">
                  <b-input-group size="sm">
                     <b-form-input v-model="searchQuery" class="d-inline-block" placeholder="Buscar..."
                        size="sm" />
                     <template #append >
                        <b-button @click="exportarData" variant="primary" size="sm">
                           <feather-icon icon="downloadIcon" />
                           Descargar
                        </b-button>
                     </template>
                  </b-input-group>

               </div>
            </b-col>
         </b-row>

      </div>

      <b-table ref="refVentasListTable" :items="fetchVentas" responsive hover bordered :fields="tableColumns"
         primary-key="id" :sort-by.sync="sortBy" empty-text="No se encontró ningún dato" :sort-desc.sync="isSortDirDesc"
         sticky-header="700px" :no-border-collapse="false" thead-tr-class="cabecera_thead" tbody-tr-class="tbody_tr"
         borderless outlined small>

         <template #thead-top>
            <b-tr>

               <b-th variant="primary" colspan="2" class="text-center bg-primary text-white">BODA</b-th>
               <b-th variant="dark" colspan="2" class="text-center bg-dark text-white">NOCHES</b-th>
               <b-th variant="info" colspan="4" class="text-center bg-info text-white">HABITACIONES</b-th>
               <b-th variant="primary" colspan="4" class="text-center bg-success text-white">BALANCE</b-th>

            </b-tr>
         </template>


         <template #table-colgroup="scope">
            <col v-for="field in scope.fields" :key="field.key"
               :style="{ width: field.key === 'show_details' ? '100px' : '60px' }">
         </template>

         <template #cell(show_details)="row">

            <b-button @click="row.toggleDetails" size="sm" variant="primary" class="d-flex text-nowrap">
               <feather-icon :icon="(row.detailsShowing) ? 'ChevronUpIcon' : 'ChevronDownIcon'" />
               <span class="text-nowrap">{{row.item.novios}}</span>
            </b-button>

         </template>

         <template #row-details="row">
            <b-card>
               <div class="col-12">
                  <table class="table responsive table-hover w-auto" width="auto">
                     <tr>
                        <td>Interno:</td>
                        <td class="text-left"><strong>{{row.item.interno}}</strong></td>
                     </tr>

                     <tr>
                        <td>Total Pendiente por pagar al Hotel:</td>
                        <td class="text-left"><strong>{{row.item.totalgrupo.balance.total_grupo -
                              row.item.totalgrupo.balance.pagadoalhotel | currency }}MXN</strong></td>
                     </tr>
                     <tr>
                        <td>Comisiones:</td>
                        <td class="text-left"><strong>{{ row.item.comision | currency }}MXN</strong></td>
                     </tr>
                     <tr>
                        <td>Costo del grupo de la Boda:</td>
                        <td class="text-left"><strong>{{ row.item.totalgrupo.balance.total_grupo - row.item.comision |
                              currency }}MXN</strong></td>
                     </tr>



                     <!-- <tr>
                        <td>Comisión al día:</td>
                        
                        <td class="text-left font-weight-bold p-2"><strong>{{ row.item.comision | currency }} MXN {{row.item.bcomision}} %</strong>
                           <b-form-group label="Comisión al día" class="w-100" description="Cambie la comisión cuando lo desee">
                              <el-slider v-model="row.item.bcomision" @change="cambiarComisionHotel(row.item)" :min="3" :max="100" :format-tooltip="(val) => `${val} %`" />
                           </b-form-group>
                        </td>
                        
                     </tr> -->


                  </table>




               </div>
            </b-card>
         </template>

         <template #cell(fecha)="{item}">
            <div class="text-nowrap" style="width:130px">
               {{ item.fecha }}
            </div>
         </template>


         <template #cell(n_solicitadas)="{item}">
            <div class="text-nowrap" style="width:100px">
               {{ item.n_solicitadas ? item.n_solicitadas : 0 }}
            </div>
         </template>

         <template #cell(h_pconfirmar)="{item}">
            <div class="text-nowrap" style="width:100px">
               {{ item.h_pconfirmar ? item.h_pconfirmar : 0 }}
            </div>
         </template>



         <template #cell(tpi)="data">
            <div class="text-nowrap" style="width:150px">
               {{ data.item.totalgrupo.balance.pagado | currency }} MXN
            </div>
         </template>

         <template #cell(tth)="{item}">
            <div class="text-nowrap" style="width:150px">
               <strong style="width:150px">{{ item.totalgrupo.balance.pagadoalhotel | currency }} MXN</strong>
            </div>


         </template>
         <template #cell(tsc)="{item}">
            <div class="text-nowrap" style="width:150px">
               <strong style="width:150px">{{ item.totalgrupo.balance.solicitado | currency }} MXN</strong>
            </div>


         </template>
         <template #cell(tgb)="{item}">
            <div class="text-nowrap" style="width:150px">
               <strong style="width:150px">{{ item.totalgrupo.balance.total_grupo | currency }} MXN</strong>
            </div>

         </template>

      </b-table>

      <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="totalVentas" />

   </b-card>

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
   BTr,
   BTh,
   BInputGroup


} from 'bootstrap-vue';



import StatisticCardWithLineChart from '@core/components/statistics-cards/StatisticCardWithLineChart.vue'
import StatisticCardHorizontal from '@core/components/statistics-cards/StatisticCardHorizontal.vue'

import {ref,onMounted,watch} from 'vue';
import xlsx from 'xlsx'

import store from '@/store';

import useVentasList from './useVentasList';

import {mapState } from 'vuex';
import vSelect from 'vue-select'
import CurrencyInput from 'components/CurrencyInput.vue';

import { Notification } from 'element-ui';

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
      CurrencyInput,
      BTr,
      BTh,
      PaginateTable:() => import('components/PaginateTable.vue'),
      PerPage:() => import('components/PerPage.vue')
      },

   directives:{
      'b-tooltip' : VBTooltip
   },

   computed:{
      ...mapState(['loading']),
   },



   setup(props) {
      
      const {
         fetchVentas,
         tableColumns,
         perPage,
         currentPage,
         totalVentas,
         dataMeta,
         perPageOptions,
         searchQuery,
         sortBy,
         isSortDirDesc,
         refVentasListTable,
         refetchData,
         ventas,
         anoFilter


      } = useVentasList()
      
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
         let dataExport = ventas.value.map((val) => {


            return {
               Interno:val.interno,
               Grupo:val.dnovios,
               Fecha:val.fecha,
               'Noches contratadas':val.n_contratadas,
               'Noches solicitadas':val.n_solicitadas ? val.n_solicitadas : 0,
               'Habitaciones contratadas':val.h_contratadas,
               'Habitaciones Solicitadas':val.h_solicitadas,
               'Habitaciones confirmadas':val.h_confirmadas,
               'Habitaciones por confirmar':val.h_pconfirmar ? val.h_pconfirmar : 0,
               'Total pagado invitados': val.totalgrupo.balance.pagado, 
               'Total transferido al hotel':val.totalgrupo.balance.pagadoalhotel,
               'Total confirmado':val.totalgrupo.balance.solicitado,
               'Total grupo boda':val.totalgrupo.balance.total_grupo,
               'Total Pendiente por pagar al Hotel':val.totalgrupo.balance.total_grupo - val.totalgrupo.balance.pagadoalhotel,
               'Comisiones':val.comision,
              'Costo del grupo de la Boda:':val.totalgrupo.balance.total_grupo -   val.comision,
            };
         }) 

         let data = xlsx.utils.json_to_sheet(dataExport)
         // console.log(data);
         // data.Cells["Adultos"].AutoFitColumns();
         // var ws = xlsx.utils.aoa_to_sheet(data);
         // console.log(ws);
         // data.Cells['a1:l50'].AutoFitColumns();

         var wscols = [
               {wch     : 10},
               {wch     :30},
               {wch     : 20},
               {wch     : 30},
               {wch     : 30},
               {wch     : 30},
                {wch    : 30},
                 {wch   : 30},
                  {wch  : 30},
                   {wch : 30},
                    {wch: 30},
                     {wch:30},
                     {wch:30},
                     {wch:30},
                     {wch:30},
                     {wch:30},
               
            ];

            data['!cols'] = wscols;

         const workbook = xlsx.utils.book_new()

         const filename = 'Ventas'
         xlsx.utils.book_append_sheet(workbook, data, filename)
         xlsx.writeFile(workbook, `${filename}.xlsx`)

      }

      const getFecha = (fecha) => {
         return moment(fecha).format('LL')
      }



      
      const cambiarComisionHotel = ({bcomision,boda_id}) => {

            console.log(boda_id);
            store.dispatch('boda/changeComision',{comision:bcomision,id:boda_id}).then(respon => {
               
               if(respon.data.result){
                  Notification.info('La comisión ha cambiado');
                  refetchData();
               }else{
                  Notification.info('La notificación no se pudo cambiar');
               }


            })


      } 




      return {
            fetchVentas,
         tableColumns,
         perPage,
         currentPage,
         totalVentas,
         dataMeta,
         perPageOptions,
         searchQuery,
         sortBy,
         isSortDirDesc,
         refVentasListTable,
         refetchData,
         ventas,
         getFormaPago,
         getStatusPago,
         exportarData,
         cambiarComisionHotel,
         anoFilter
      }


   },
}
</script>

<style>

.cabecera_thead th {
   font-size: 8pt !important;
   padding: .8rem !important;
   text-align: center !important;
}
.tbody_tr td{
   padding: 0px !important;
   text-align: center;
}
</style>