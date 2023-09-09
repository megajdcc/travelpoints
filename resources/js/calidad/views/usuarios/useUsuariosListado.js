
import store from '@/store'
import { ref, computed, onMounted, watch } from 'vue'

export default function useUsuariosListado() {

  const items = ref([])
   const isSortDirDesc = ref(true)
   const sortBy = ref('id')
   const searchQuery = ref('')
   const perPage = ref(100)
   const currentPage = ref(1)
   const total = ref(0);

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

      const localItemsCount = items.value.length;
      
      return {
         from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
         to: perPage.value * (currentPage.value - 1) + localItemsCount,
         of: total.value,
      }

   })

   const refetchData = () => {
      fetchData((usuarios) => items.value = usuarios)
   }

   watch([currentPage, perPage, searchQuery], () => {
      refetchData()
   })
   

   const fetchData = (next) => {
      store.dispatch('usuario/fetchUsers', {
         perPage: perPage.value,
         currentPage: currentPage.value,
         sortBy: sortBy.value,
         q: searchQuery.value,
         sortDesc: isSortDirDesc.value
      }).then(({total:all,users }) => {
         total.value = all
         next(users)

      }).catch(e => {
         toast.info('Error trayendo Data', { position: 'bottom-right' })
      })

   }



   return {
      isSortDirDesc,
      sortBy,
      searchQuery,
      perPage,
      currentPage,
      total,
      items,
      perPageOptions,
      dataMeta,
      refetchData,
      fetchData,
   }

}


