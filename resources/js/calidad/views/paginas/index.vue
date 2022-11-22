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


export default {

   components:{
      BContainer,
      BRow,
      BCol,
      NabvarPagina: () => import('components/NabvarPagina')
   },

   setup() {

   },
}

</script>