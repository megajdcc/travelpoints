import {ref,watch,onMounted,computed} from '@vue/composition-api'
import {Notification} from 'element-ui';

import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import useFilterTable from '@core/utils/useFilterTable';

import store from '@/store'

export default function usePlantillasList(){


   // Table Handlers
   const tableColumns = [

      { key: 'id', sortable: true, label: "#" },
      { key: 'created_at', sortable: true, label: "Creado" },
      { key: 'updated_at', sortable: true, label: "Actualizado" },
      { key: 'disparador', sortable: true, label: "Evento" },
      { key: 'novios', sortable: false, label: "Boda" },
      { key: 'actions', sortable: false },
   ]


   const {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      refTable,
      total,
      dataMeta,
      refetchData,
      toast
   } = useFilterTable();

   const fetchPlantillas = (ctx, callback) => {
      
      store.dispatch('plantilla/fetchPlantillas', {
         q       : searchQuery.value,
         perPage : perPage.value,
         page    : currentPage.value,
         sortBy  : sortBy.value,
         sortDesc: isSortDirDesc.value,
      })
         .then(({plantillas,total:all}) => {
            callback(plantillas)
            total.value = all
         })
         .catch((e) => {
            
            console.log(e)
            toast({
               component: ToastificationContent,
               props: {
                  title: 'Error trayendo las plantillas',
                  icon: 'AlertTriangleIcon',
                  variant: 'danger',
               },
            })

         })
   }




   return {
      perPageOptions,
      currentPage,
      perPage,
      searchQuery,
      sortBy,
      isSortDirDesc,
      tableColumns,
      refTable,
      total,
      dataMeta,
      refetchData,
      fetchPlantillas


   }

}