import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable'

export default function useVentasList() {

   const refVentasListTable = ref(null)

   // Table Handlers
   const tableColumns = [
      { key: 'show_details', sortable: true, label: 'Nombre del Grupo', variant:"text", width: '50px', isRowHeader: true, class:'text-nowrap' },
      {  key:'fecha',sortable:true,label:'Fecha'},
      { key: 'n_contratadas', sortable: true, label: "Contratadas" , class:'text-nowrap' },
      { key: 'n_solicitadas', sortable: true, label: "Solicitadas" , class:'text-nowrap'},
      { key: 'h_contratadas', sortable: true, label: "Contratadas" , class:'text-nowrap' },
      { key: 'h_solicitadas', sortable: true, label: "Solicitadas"  , class:'text-nowrap'},
      { key: 'h_confirmadas', sortable: true, label: "Confirmadas" , class:'text-nowrap' },
      { key: 'h_pconfirmar', sortable: true, label: " Por Confirmar"  , class:'text-nowrap'},
      { key: 'tpi', sortable: false, label: "Total pagado invitados" , class:'text-nowrap' },
      { key: 'tth', sortable: false, label: "Total transferido al hotel" , class:'text-nowrap' },
      { key: 'tsc', sortable: false, label: "Total confirmado" , class:'text-nowrap' },
      { key: 'tgb', sortable: false, label: "Total grupo boda" , class:'text-nowrap' },
  

   ]
   const totalVentas = ref(0)
   const ventas = ref([])
   const anoFilter = ref(null);

   const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc
   } = useFilterTable();


   const dataMeta = computed(() => {
      const localItemsCount = refVentasListTable.value ? refVentasListTable.value.localItems.length : 0

      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: totalVentas.value,
      }

   })

   const refetchData = () => {
      refVentasListTable.value.refresh()
   }

   watch([currentPage, perPage, searchQuery,anoFilter], () => {
      refetchData()
   })

   const fetchVentas = (ctx, callback) => {

      store.dispatch('boda/fetchVentasList', {
         q: searchQuery.value,
         perPage: perPage.value,
         page: currentPage.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
         ano:anoFilter.value
      })
         .then(response => {

            callback(response.data.ventas)
            ventas.value = response.data.ventas
            totalVentas.value = response.data.total
         })
         .catch((e) => {


            refetchData();
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo los datos',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })

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
      anoFilter
   }
}
