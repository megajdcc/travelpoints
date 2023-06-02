<template>
  
  <div v-html="pagina.contenido">
    
  </div>
  
</template>

<script>

import store from '@/store'
import {ref,computed,toRefs,watch} from 'vue'
import router from '@/router';

export default {
  
  props:{
    page:String
  },

  setup(props){
    const {page} = toRefs(props)

    const {pagina} = toRefs(store.state.pagina)

    watch(page,() => {
        store.dispatch('pagina/capturarPagina', page.value).then(({ result }) => {
          if (!result) {
              router.push({ name: 'error-404' })
          }
        })
    })

    return {
      pagina,
      loading:computed(() => store.state.loading)
    }
  }
  
}
</script>
