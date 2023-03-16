
import useFilterTable from "@core/utils/useFilterTable";

import store from '@/store'
import {ref,onMounted,watch,computed} from 'vue'

export default function useConsumosList(usuario){

  const isSortDirDesc = ref(true)
  const sortBy = ref('id')
  const searchQuery = ref('')
  const perPage = ref(12)
  const currentPage = ref(1)
  const total = ref(0);
  const items = ref([]);
  const perPageOptions = ref([
    {
      label: '12',
      value: 12,
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

    const localItemsCount = items.value ? items.value.length : 0

    return {
      from: perPage.value * (currentPage.value - 1) + (localItemsCount ? 1 : 0),
      to: perPage.value * (currentPage.value - 1) + localItemsCount,
      of: total.value,
    }

  })


  const refetchData = () => fetchData((ventas) => items.value = ventas)

  watch([currentPage, perPage, searchQuery], () => {
    refetchData()
  })

  onMounted(() => refetchData())



  const fetchData = (next) => {

    store.dispatch('venta/fetchDataConsumo', {
      perPage: perPage.value,
      currentPage: currentPage.value,
      sortBy: sortBy.value,
      q: searchQuery.value,
      isSortDirDesc: isSortDirDesc.value,
      usuario:usuario.value ? usuario.value.id : null
    }).then(({ total: all, ventas }) => {

      total.value = all
      next(ventas)
    }).catch(e => {
      toast.info('Error trayendo Data', { position: 'bottom-right' })
    })

  }

  return {
    items,
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
