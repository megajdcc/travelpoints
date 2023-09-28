<template>
   <div>
      <!-- faq search section -->
      <section id="faq-search-filter">
         <b-card no-body class="faq-search" :style="{ backgroundImage: `url(${imgBanner})` }">
            <b-card-body class="text-center content-banner">
               <h1 class="text-white font-weight-bolder display-5">
                  {{ $t('Respondamos algunas preguntas') }}
               </h1>
               <b-card-text class="mb-2 font-weight-bolder text-white ">
                  {{ $t('o elige una categoría para encontrar rápidamente la ayuda que necesitas') }}
               </b-card-text>

               <!-- form -->
               <b-form class="faq-search-input">
                  <b-input-group class="input-group-merge">
                     <b-input-group-prepend is-text>
                        <feather-icon icon="SearchIcon" />
                     </b-input-group-prepend>
                     <b-form-input id="searchbar" v-model="faqSearchQuery" :placeholder="$t('Busca la pregunta')" />
                  </b-input-group>
               </b-form>
               <!-- form -->
            </b-card-body>
         </b-card>
      </section>
      <!--/ faq search section -->

      <!-- frequently asked questions tabs pills -->
      <section id="faq-tabs">
         <b-tabs vertical content-class="col-12 col-md-8 col-lg-9" pills
            nav-wrapper-class="faq-navigation col-md-4 col-lg-3 col-12" nav-class="nav-left">

            <!-- payment tab -->
            <b-tab v-for="(categoria, i) in datos" :key="i" :active="!i">

               <!-- title -->
               <template #title>
                  <feather-icon :icon="categoria.icono" size="18" class="mr-1" />
                  <span class="font-weight-bolder">{{ $t(categoria.nombre) }}</span>
               </template>
               <faq-question-answer :options="categoria" />
            </b-tab>
            <!--/ payment tab -->

            <!-- sitting lady image -->
            <template #tabs-end>
               <b-img fluid :src="faqsBannerImg"
                  class="d-none d-md-block mt-auto" />
            </template>
            <!--/ sitting lady image -->
         </b-tabs>
      </section>
      <!--/ frequently asked questions tabs pills -->

      <!-- contact us -->
      <section class="faq-contact">
         <b-row class="mt-5 pt-75 text-center">
            <b-col cols="12">
               <h2>{{ $t('¿Aún tienes una pregunta?') }}</h2>
               <b-card-text class="mb-3">
                 {{ $t('Si no puede encontrar una pregunta en nuestras preguntas frecuentes, siempre puede contactarnos. ¡Te responderemos en breve!') }}
               </b-card-text>
            </b-col>
            <b-col sm="6">
               <b-card class="shadow-none py-1 faq-contact-card">
                  <b-avatar size="70" rounded variant="light-primary" class="mb-2">
                     <font-awesome-icon icon="fas fa-phone" size="4x" />
                  </b-avatar>
                  <h4>{{ $t('01 800 400 INFO (4636), (322) 225 9635.') }}</h4>
                  <span class="text-body">{{ $t('¡Siempre estamos felices de ayudar!') }}</span>
               </b-card>
            </b-col>
            <b-col sm="6">
               <b-card class="shadow-none py-1 faq-contact-card">
                  <b-avatar size="70" rounded variant="light-primary" class="mb-2">
                     <b-link href="mailto:soporte@infochannel.si" target="_blank">
                        <font-awesome-icon icon="fas fa-envelope" size="4x" />
                     </b-link>
                  </b-avatar>
                  <h4>{{ $t('soporte@infochannel.si') }}</h4>
                  <span class="text-body">{{ $t('¡La mejor manera de obtener una respuesta más rápida!') }}</span>
               </b-card>
            </b-col>
         </b-row>
      </section>
      <!--/ contact us -->
   </div>
</template>

<script>
import {
   BCard,
   BCardBody,
   BForm,
   BInputGroup,
   BFormInput,
   BCardText,
   BInputGroupPrepend,
   BTabs,
   BTab,
   BImg,
   BRow,
   BCol,
   BAvatar,
   BLink
} from 'bootstrap-vue'

import FaqQuestionAnswer from './FaqQuestionAnswer.vue'
import store from '@/store'
import { ref, onMounted, watch, toRefs, computed, onActivated } from 'vue'
import faqsBannerImg from '@/assets/images/illustration/faq-illustrations.svg';

import useAppConfig from '@core/app-config/useAppConfig';

import useAuth from '@core/utils/useAuth';

export default {

   components: {
      BForm,
      BCard,
      BRow,
      BCol,
      BAvatar,
      BCardBody,
      BInputGroup,
      BFormInput,
      BCardText,
      BInputGroupPrepend,
      BTabs,
      BTab,
      BImg,
      FaqQuestionAnswer,
      BLink

   },

   setup() {
      const datos = ref([])

      const { sistema } = toRefs(store.state.sistema)
      const { skin } = useAppConfig();
      const { authGoogle } = useAuth();

      onMounted(() => authGoogle())

      const faqSearchQuery = ref('')

      const cargarForm = () => {

         store.dispatch('faq/getCategorias', faqSearchQuery.value).then((data) => {

            datos.value = data


         })


      }

      onMounted(() => cargarForm())

      watch([faqSearchQuery], () => {
         cargarForm();
      })


      return {
         skin,
         imgBanner: computed(() => `/storage/${sistema.value.banner_principal}`),
         datos,
         faqSearchQuery,
         loading: computed(() => store.state.loading),
         faqsBannerImg
      }

   }
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-faq.scss';

.faq-search {
   // background-attachment: fixed;
   position: relative;
   border-radius: 7px;
   background-position: center center !important;
   background-repeat: no-repeat;
   background-size: cover;
   height: 300px;

   &::after {
      content: '';
      position: absolute;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3);
      z-index: 9;
      border-radius: 7px;
   }

   .content-banner {
      z-index: 10;
   }

}
</style>