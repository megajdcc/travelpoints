
import store from '@/store'
import {ref,watch} from 'vue'

import useFilterTable from '@core/utils/useFilterTable'
export default function useLideresList(){

  const tableColumns = ref([
    { key:'username',label:"Lider",sortable:true},
    { key: 'total_promotores', sortable: false,label:"Promotores Activos"},
    { key: 'status', sortable: false,label:"Status" },
    { key: 'comision', sortable: false,label:"Comisiones ganadas"},
  ])

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


  
  const fetchData = (ctx,next) => {

    store.dispatch('usuario/fetchDataReportLideres',{

      page:currentPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      perPage:perPage.value,
      q:searchQuery.value,

    }).then(({total:all,lideres}) => {
      total.value = all
      next(lideres)
    })

  } 


  const descargar = () => {

    store.dispatch('usuario/downloadReportLider',{
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
    descargar
  }

}