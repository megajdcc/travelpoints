<template>
   <b-container fluid >
      <b-row>
         <b-col cols="12">
            <h2>Hola a todos</h2>
         </b-col>
      </b-row>

   </b-container>
</template>

<script>
import {
   BContainer,
   BRow,
   BCol,
} from 'bootstrap-vue'

import {onMounted,onActivated} from '@vue/composition-api'


import store from '@/store'
import useAuth from '@core/utils/useAuth';
export default {

   components:{
      BContainer,
      BRow,
      BCol,
      NabvarPagina: () => import('components/NabvarPagina')
   },

   setup() {
      const { authGoogle } = useAuth()

      onMounted(() => authGoogle()) 
     

   },
}

</script>