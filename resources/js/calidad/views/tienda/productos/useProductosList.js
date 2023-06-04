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
  const precios = ref([0, 20000])

  const sortBy = ref('price-asc')

  const sortByOptions = [
    { text: 'Mas bajos ', value: 'price-asc' },
    { text: 'Mas altos', value: 'price-desc' },
  ]


  const {categorias} = toRefs(store.state.categoriaProducto)



  const cargarForm = () => {
    
    if(!categorias.value.length){
      store.dispatch('categoriaProducto/getCategorias')
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

  watch([currentPage, perPage, searchQuery,categoria_id,sortBy,precios], () => {
    refetchData()
  })



  const fetchData = (next) => {

    store.dispatch('producto/fetchData', {
      perPage: perPage.value,
      currentPage: currentPage.value,
      sortBy: sortBy.value,
      q: searchQuery.value,
      isSortDirDesc: isSortDirDesc.value,
      categoria_id:categoria_id.value,
      precios: precios.value,


    }).then(({ total: all, productos }) => {
      total.value = all
      next(productos)
    }).catch(e => {
      toast.info('Error trayendo Data')
    })

  }

  const eliminar = (producto_id) => {
    store.dispatch('producto/eliminar', producto_id).then(({ result }) => {

      if (result) {
        toast.success('Se ha eliminado con éxito el producto',{position:'bottom-right'})

        refetchData()
      } else {
        toast.info('No se pudo eliminar , inténtelo de nuevo , mas tarde', { position: 'bottom-right' });

      }
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
    fetchData,
    eliminar,
    items,
    categorias,
    categoria_id,
    precios,
    sortByOptions


  }
}