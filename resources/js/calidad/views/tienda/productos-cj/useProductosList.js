import { ref, computed,watch,onMounted,toRefs } from 'vue'
import store from '@/store'

export default function useProductosList() {

  const refTable = ref(null)
  const isSortDirDesc = ref(true)
  const searchQuery = ref('')
  const perPage = ref(100)
  const currentPage = ref(1)
  const total = ref(0);
  const items = ref([])
  const categoria_id = ref([])

  const categorias = ref([])

  const cargarForm = () => {
    
    if(!categorias.value.length){
      store.dispatch('categoriaProducto/getCategoriasDropShipping').then(({categorias:categories}) => {
        categorias.value = categories
      })
    }

  }

  onMounted(() => cargarForm());

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
    fetchData((vals) => items.value = vals)
  }

  watch([currentPage, perPage, searchQuery,categoria_id], () => {
    refetchData()
  })



  const fetchData = (next) => {

    store.dispatch('producto/fetchDataProductoDropShipping', {
      perPage: perPage.value,
      page: currentPage.value,
      q: searchQuery.value,
      categoria_id:categoria_id.value,

    }).then(({ total: all, productos }) => {
      total.value = all
      next(productos)
    }).catch(e => {
      toast.info('Error trayendo Data')
    })

  }



  return {

    perPageOptions,
    currentPage,
    perPage,
    searchQuery,
    isSortDirDesc,
    refTable,
    total,
    dataMeta,
    refetchData,
    fetchData,
    items,
    categorias,
    categoria_id,
  }
}