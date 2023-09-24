
import useFilterTable from "@core/utils/useFilterTable";
import store from '@/store'
import {ref,watch,computed} from 'vue'

export default function useGastoTuristicoList(pais){
  
  const tableColumns = computed(() => {
    if(pais.value){
      return [
          {key:'destino',label:'Destino',sortable:true},
          {key:'total_compras',label:'Total Compras',sortable:true},
          {key:'total_operaciones',label:'Total Operaciones',sortable:false},
          {key:'reg_promedio',label:'Registro promedio',sortable:false},

      ]
    }
    return [
      {key:'pais',label:'Pais',sortable:true},
      {key:'total_compras',label:'Total Compras',sortable:true},
      {key:'total_operaciones',label:'Total Operaciones',sortable:false},
      {key:'reg_promedio',label:'Registro promedio',sortable:false},
    ]
  })


  const mes = ref(null)
  const ordenarPor = computed(() => {
    if(pais.value){
      return 'destino';
    }
    return 'pais'
  })
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
  } = useFilterTable(ordenarPor,false);
  

  watch([mes,pais], () => refetchData())

  const fetchData = (ctx,n) => {

    store.dispatch('venta/reportFetchData',{
      page:currentPage.value,
      perPage:perPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value,
      mes:mes.value,
      pais:pais.value,
    }).then(({total:all,registros}) => {
      total.value = all
      n(registros)
    })

  } 


  const descargar = () =>{
    store.dispatch('venta/reportFetchDataDescargar',{
      page:currentPage.value,
      perPage:perPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value,
      mes:mes.value,
      pais:pais.value,
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
      descargar,
      mes,
  }
}