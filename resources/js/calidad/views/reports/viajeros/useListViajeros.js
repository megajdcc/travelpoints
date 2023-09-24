
import useFilterTable from "@core/utils/useFilterTable";
import store from '@/store'
import {ref,watch,computed} from 'vue'

export default function useListViajeros(pais){
  
  const tableColumns = computed(() => {
    if(pais.value){
      return [
          {key:'id',label:'#',sortable:false},
          {key:'username',label:'Viajero',sortable:true},
          {key:'email',label:'Email',sortable:true},
          {key:'pais',label:'Pais',sortable:true},
      ]
    }
    return [
      {key:'pais',label:'Pais',sortable:true},
      {key:'viajeros',label:'Cant viajeros',sortable:true},
      {key:'con_consumo',label:'Viajeros con Consumo',sortable:false},
      {key:'sin_consumo',label:'Viajeros sin Consumo',sortable:false},


    ]
  })


  const totalPaises = ref(0)
  const mes = ref(null)
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
  } = useFilterTable('pais',false);
  

  watch([mes,pais], () => refetchData())

  const fetchData = (ctx,n) => {

    store.dispatch('usuario/reportFetchViajeros',{
      page:currentPage.value,
      perPage:perPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value,
      mes:mes.value,
      pais:pais.value
    }).then(({total:all,viajeros,totalPaises:tp}) => {
      total.value = all
      totalPaises.value = tp
      n(viajeros)
    })

  } 


  const descargar = () =>{
    store.dispatch('usuario/reportFetchViajerosDescargar',{
      page:currentPage.value,
      perPage:perPage.value,
      sortBy:sortBy.value,
      isSortDirDesc:isSortDirDesc.value,
      q:searchQuery.value,
      mes:mes.value,
      pais:pais.value
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
      totalPaises,
      mes,
  }
}