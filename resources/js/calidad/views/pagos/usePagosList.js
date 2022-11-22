import { ref, watch, computed } from '@vue/composition-api'
import store from '@/store'

// Notification
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable'
export default function usePagosList() {
   const refPagosListTable = ref(null)

   // Table Handlers
   const tableColumns = [
      { key: 'show_details', sortable: true, label: '#', width: '50px', isRowHeader: true, },
      { key: 'forma_pago', sortable: true, label: "Forma de pago" },
      { key: 'status', sortable: true, label: "Status" },
      { key: 'nro_referencia', sortable: true, label: "Nro de pago" },
      { key: 'monto', sortable: true, label: "Monto" },
      { key: 'status_pago', sortable: false, label: "Status" },

      { key: 'actions', sortable:false, variant: 'primary', },
   ]
   const totalPagos = ref(0)
   const bodaFilter = ref(null)
   const formaPagoFilter = ref(null)
   const pags = ref([])

   const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc
   } = useFilterTable();

   const rango = ref([])

   const statusPago = ref(null)

   const statusPagoOptions = [
      {id:0,label:'Por Comprobar'},
      { id: 1, label: 'Comprobada' },
      { id: 2, label: 'Aprobada' },
      { id: 3, label: 'Rechazada' },
      { id: 4, label: 'Pendiente' },
      { id: 5, label: 'Declinada' },
   ]

   const dataMeta = computed(() => {
      const localItemsCount = refPagosListTable.value ? refPagosListTable.value.localItems.length : 0

      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: totalPagos.value,
      }

   })

   const refetchData = () => {
      refPagosListTable.value.refresh()
   }

   watch([currentPage, perPage, searchQuery, bodaFilter, formaPagoFilter,statusPago,rango], () => {
      refetchData()
   })

   const fetchPagos = (ctx, callback) => {

      store.dispatch('pago/fetchPagosList', {
         q: searchQuery.value,
         perPage: perPage.value,
         page: currentPage.value,
         sortBy: sortBy.value,
         sortDesc: isSortDirDesc.value,
         boda: bodaFilter.value,
         formaPago:formaPagoFilter.value,
         statusPago:statusPago.value,
         rango:rango.value
      })
         .then(response => {
            const { pagos, total } = response.data

            callback(pagos)
            pags.value = pagos
            totalPagos.value = total
    
         })
         .catch((e) => {

            // console.log(e)
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo la data',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })

         })
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
      pags,
      statusPago,
      statusPagoOptions,
      rango
   }
}
