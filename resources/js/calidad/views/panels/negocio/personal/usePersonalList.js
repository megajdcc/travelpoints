
import store from '@/store'
import {toRefs, ref, watch,onMounted,computed} from 'vue'


export default function usePersonalList(negocio){

   const isSortDirDesc = ref(true)
   const sortBy = ref('id')
   const searchQuery = ref('')
   const perPage = ref(100)
   const currentPage = ref(1)
   const total = ref(0);
   const items = ref([])

   const perPageOptions = ref([
      {
         label: '10',
         value: 10,
      },
      {
         label: '25',
         value: 25,
      },
      {
         label: '50',
         value: 50,
      },
      {
         label: '100',
         value: 100,
      },
      {
         label: 'Todas',
         value: 0,
      },

   ])

   const dataMeta = computed(() => {

      const localItemsCount = items.value.length

      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   const refetchData = () => {
      fetchData((vls) => {
         items.value = vls
      })
   }

   watch([currentPage, perPage, searchQuery,negocio], () => {
      refetchData()
   })

   const fetchData = (next) => {

      store.dispatch('empleado/fetchData', {
         perPage: perPage.value,
         sortBy: sortBy.value,
         isSortDirDesc: isSortDirDesc.value,
         q: searchQuery.value,
         page: currentPage.value,
         negocio_id: negocio.value ? negocio.value.id : null
      }).then(({empleados,total:all}) => {

         total.value = all
         next(empleados)
      })

   }


   onMounted(() => refetchData())

   const eliminar = (user_id) => {
      
      store.dispatch('empleado/eliminar',user_id).then(({result}) =>{
         
         if(result){
            toast.success('Se ha quitado con éxito el empleado')
            refetchData()
         }else{
            toast.info('No se pudo quitar al empleado')
         }

         
      })

   } 

   return {
      fetchData, 
      currentPage,
      perPage,
      searchQuery,
      refetchData,
      dataMeta,
      perPageOptions,
      items,
      total,
      isSortDirDesc,
      sortBy,
      eliminar

   }


}
