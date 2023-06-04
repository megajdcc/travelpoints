<template>
   <b-container fluid class="px-0">
      <b-row>
         <b-col cols="12">
            <b-card>
               <section v-html="sistema.terminos"></section>
            </b-card>
         </b-col>

      </b-row>
   </b-container>
</template>

<script>
import {
   BContainer,
   BCard,
   BRow,
   BCol,
   BMedia,
   BEmbed
} from 'bootstrap-vue'

import { toRefs, computed,onMounted } from 'vue'
import store from '@/store'
import useAuth from '@core/utils/useAuth';
export default {

   components: {
      BContainer,
      BCard,
      BRow,
      BCol,
      BMedia,
      BEmbed

   },

   setup() {
      const { windowWidth } = toRefs(store.state.app)
      const {authGoogle} = useAuth();
      const {sistema} = toRefs(store.state.sistema)

      onMounted(() => authGoogle())
      
      return {
         sistema,
         windowWidth,
         relation: computed(() => {
            return windowWidth.value < 762 ? '4by3' : '21by9'
         })
      }
   },
}
</script>