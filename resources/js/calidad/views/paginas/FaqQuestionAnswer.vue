<template>
   <b-overlay :show="loading">
      <div v-if="options">
         <div class="d-flex align-items-center">
            <b-avatar rounded size="42" variant="light-primary" class="mr-1">
               <feather-icon :icon="options.icono" size="20" />
            </b-avatar>
            <div>
               <h4 class="mb-0 font-weight-bolder">
                  {{ $t(options.nombre) }}
               </h4>
            </div>
         </div>

         <!-- collapse -->
         <app-collapse id="faq-payment-qna" accordion type="margin" class="mt-2">

            <app-collapse-item v-for="( data, index) in options.faqs" :key="index" :title="$t(data.pregunta)">
               <template #header>
                  <h4 class="font-weight-bolder">{{ $t(data.pregunta) }}</h4>
               </template>
               <div v-html="$t(data.respuesta)"></div>
            </app-collapse-item>

         </app-collapse>

         <!--/ collapse -->
      </div>
   </b-overlay>
</template>

<script>
import { BAvatar,BOverlay } from 'bootstrap-vue'
import AppCollapse from '@core/components/app-collapse/AppCollapse.vue'
import AppCollapseItem from '@core/components/app-collapse/AppCollapseItem.vue'
import {computed,onMounted} from 'vue'
import store from '@/store'
import useAuth from '@core/utils/useAuth';

export default {
   components: {
      BAvatar,
      AppCollapseItem,
      AppCollapse,
      BOverlay
   },
   props: {
      options: {
         type: Object,
         default: () => { },
      },
   },

   setup(){

      const { authGoogle } = useAuth();

      onMounted(() => authGoogle())
      return {
         loading:computed(() => store.state.loading)
      }
   }
}
</script>
