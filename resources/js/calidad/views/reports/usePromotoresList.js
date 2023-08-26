
import store from '@/store'
import {ref,watch} from 'vue'

import useFilterTable from '@core/utils/useFilterTable'
export default function useViajerosList(){

  const tableColumns = ref([
    { key:'username',label:"Promotor",sortable:true},
    { key: 'total_viajeros_registrados', sortable: false,label:"Total registrados" },
    { key: 'total_viajeros_activos', sortable: false,label:"Total activos" },
    { key: 'ultima_activacion', sortable: false,label:"última Activación"},
    { key: 'activaciones', sortable: true,label:'Activaciones' },
  ])

  const filtermes  = ref(null)
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
      items,
  } = useFilterTable();

  watch(filtermes,() => refetchData())

  
  const fetchData = (ctx,next) => {

    store.dispatch('usuario/fetchDataReportPromotores',{
      page:currentPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
      q:searchQuery.value,
      mes:filtermes.value

    }).then(({total:all,promotores}) => {
      total.value = all
      next(promotores)
    })

  } 


  const descargar = () => {
    store.dispatch('usuario/downloadReportPromotores',{
      page:currentPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
      q:searchQuery.value,
      mes:filtermes.value
    }).then(({url,filename}) => {
        
          // Crea un enlace (link) para descargar el archivo
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', filename); // Establece el nombre de descarga
          document.body.appendChild(link);

          // Haz clic en el enlace para iniciar la descarga
          link.click();

          // Limpia el objeto URL y el enlace
          document.body.removeChild(link);
					
    } ).catch(e  => {
        	console.log(e)
					toast.error('Error descargando el archivo')
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
      items,
      tableColumns,
      fetchData,
      filtermes,
      descargar

  }
}