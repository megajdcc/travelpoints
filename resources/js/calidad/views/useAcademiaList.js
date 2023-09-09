import {ref,watch,computed} from 'vue'
import store from '@/store'

export default function  useAcademiaList(){
  const items = ref([])
  const sortBy = ref('id')
  const searchQuery = ref('')
  const perPage = ref(100)
  const currentPage = ref(1)
  const total = ref(0);
  const isSortDirDesc = ref(true)

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
      fetchData((videos) => {
        items.value = videos
      })
   }


   watch([currentPage, perPage, searchQuery], () => {
    console.log(searchQuery.value)
      refetchData()
   })

   const fetchData = (next) => {

    store.dispatch('academiaVideos/fetchData',{
      page:currentPage.value,
      q:searchQuery.value,
      sortBy:sortBy.value,
      perPage:perPage.value,
      isSortDirDesc:isSortDirDesc.value
    }).then(({total:all,videos}) => {
      total.value = all
      next(videos)
      
    }).catch(e => {
      toast.info('No se pudo cargar los vídeos, problemas técnicos...')
    })
   }


   return {
    items,
    sortBy,
    currentPage,
    total,
    perPage,
    refetchData,
    fetchData,
    perPageOptions,
    dataMeta,
    searchQuery
   }
}

