import { ref, onMounted, watch } from '@vue/composition-api'
import store from '@/store'

import useFilterTable from '@core/utils/useFilterTable'

export default function useCategoriaFaqslist() {

   // Table Handlers
   const tableColumns = [
      { key: 'id', sortable: true, label: '#' },
      { key: 'nombre', sortable: true, label: "Categoría" },
      { key: 'faqs', sortable: true, label: 'Preguntas con esta categoría' },
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

   } = useFilterTable();

   const eliminar = (id) => {


      store.dispatch('faq/eliminarCategoria', id).then(({ result }) => {

         if (result) {

            toast.success('Se ha eliminado con éxito la categoría')
            refetchData();

         } else {

            toast.error('No se pudo, eliminar la categoría, inténtelo de nuevo mas tarde..')

         }

      })


   }


   const fetchData = (ctx, next) => {

      store.dispatch('faq/fetchCategorias', {
         perPage    : perPage.value,
         currentPage: currentPage.value,
         q          : searchQuery.value,
         sortBy     : sortBy.value,
         sortDirDesc: isSortDirDesc.value
      }).then(({ total: all, categorias }) => {
         total.value = all
         next(categorias)
      }).catch(e => {
         toast.error('NO se pudo cargar la data')
      })

   }

   return {
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
      tableColumns,
      fetchData,
      eliminar

   }


}