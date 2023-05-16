
import useFilterTable from "@core/utils/useFilterTable"
import store from '@/store'

import {ref} from 'vue'

export default function useVideosList(){

  const tableColumns = ref([
    {key:'id',sortable:true,sortKey:'id',label:'#'},
    {key:'titulo',sortable:true,sortKey:'titulo',label:'Titulo'},
    {key:'roles',sortable:true,sortKey:'id',label:'Roles'},
    {key:'actions',sortable:false,sortKey:'id',label:'Actions'},
  ]);

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


  const fetchData = (ctx,next) => {

    store.dispatch('academiaVideos/fetchData',{
        perPage:perPage.value,
        q:searchQuery.value,
        sortBy:sortBy.value,
        page:currentPage.value,
        isSortDirDesc:isSortDirDesc.value
    }).then(({videos,total:all}) => {
      
      total.value = all
      next(videos)
    
    }).catch(e => {

      toast.info('Error no se puedieron cargar los vídeos')
    
    })
  }

  const eliminar = (video_id) => {
 
      store.dispatch('academiaVideos/eliminar',video_id).then(({result}) => {

        if(result){
          toast.success('Eliminación con exito')
          refetchData();
        }

      }).catch(e => console.log(e))

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
    eliminar,
    fetchData
  }
}