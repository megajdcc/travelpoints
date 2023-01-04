import {computed,onMounted,ref,toRef,toRefs, watch} from '@vue/composition-api'

import store from '@/store'

export default function dataSearchBookmars(){

  const paginas = ref({
    key: 'title',
    data: [
      { title: 'Home', route: { name: 'home' }, icon: 'HomeIcon', isBookmarked: false, resource: 'home', action: 'read' },
    ],
  });

  const destinosSearch = ref({key:'title',data:[]})  
  const atraccionesSearch = ref({key:'title',data:[]})


  const { destinos } = toRefs(store.state.destino)
  const { atracciones } = toRefs(store.state.atraccion)

  const cargarForm = () => {

    if (destinos.value.length) {

      destinosSearch.value.data = destinos.value.map(val => {

        return {
          descripcion:`${val.descripcion}`,
          title: `${val.nombre}`,
          icon: 'CheckIcon',
          route: { name: 'destino.public.perfil', params: { id: val.id } }
        }

      })

    } else {
      store.dispatch('destino/getDestinos')
    }

    if (atracciones.value.length) {

      atraccionesSearch.value.data = atracciones.value.map(val => {

        return {

          descripcion: `${val.descripcion}`,
          title: `${val.nombre}`,
          icon: 'CheckIcon',
          route: { name: 'atraccion.public.perfil', params: { id: val.id } }

        }

      })

    } else {
      store.dispatch('atraccion/getAtracciones')
    }

  }
  onMounted(() => cargarForm())

  watch([destinos,atracciones], () => {
    cargarForm();
  })

  return {
    paginas,
    destinosSearch,
    atraccionesSearch
  }

}
/* eslint-enable */

