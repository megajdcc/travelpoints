<template>
  
  <div v-html="pagina.contenido">
    
  </div>
  
</template>

<script>

import store from '@/store'
import {ref,computed,toRefs} from 'vue'

export default {
  
  props:{
    page:String
  },

  setup(props){
    const {page} = toRefs(props)

    const {pagina} = toRefs(store.state.pagina)

    return {
      pagina,
      loading:computed(() => store.state.loading)
    }
  }
  
}
</script>
