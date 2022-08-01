<template>
   <b-container fluid >
      <b-row>
         <b-col cols="12">
            <ul class="nav justify-content-center">
               <li class="nav-item" v-if="!is_loggin">
                  <b-link :to="{name:'login'}" class="nav-link px-2 font-weight-bolder">
                     Inicia Sesión
                  </b-link>
               </li>

               <li class="nav-item" v-if="!is_loggin">
                  <b-link :to="{name:'register'}" class="nav-link px-2 font-weight-bolder">
                     Hazte socio
                  </b-link>
               </li>

               <li class="nav-item">
                  <b-link :to="{name:'afiliar.negocio'}" class="nav-link px-2 font-weight-bolder">
                     Afilia tú negocio
                  </b-link>
               </li>


               <li class="nav-item">
                  <b-link :to="{name:'faqs'}" class="nav-link px-2 font-weight-bolder">
                     Preguntas Frecuentes
                  </b-link>
               </li>

               <li class="nav-item">
                  <b-link :to="{name:'about'}" class="nav-link px-2 font-weight-bolder">
                     Acerca de {{ app_name }}
                  </b-link>
               </li>


            </ul>

         </b-col>
      </b-row>

      <b-row>
      
         <b-col cols="12" class="clearfix mb-0 border-top">
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-center pt-1">

               <ul class="list-unstyled d-flex m-0">
                  <li class="mr-3">
                     <b-link href="#" target="_blank" class="text-secondary">
                        <feather-icon icon="TwitterIcon" size="24" />
                     </b-link>
                  </li>
                  <li class="mr-3">
                     <b-link href="#" target="_blank" class="text-secondary">
                        <feather-icon icon="InstagramIcon" size="24" />
                     </b-link>
                  </li>
                  <li>
                     <b-link href="#" target="_blank" class="text-secondary">
                        <feather-icon icon="FacebookIcon" size="24" />
                     </b-link>
                  </li>
               </ul>


               <span class="float-md-left d-block d-md-inline-block mt-25">
                  COPYRIGHT © {{ new Date().getFullYear() }}
                  <b-link class="ml-25" href="#" target="_blank">TravelPoints</b-link>
                  <span class="d-none d-sm-inline-block">, Todos los derechos reservados</span>
               </span>


            </div>
         </b-col>
      </b-row>
   </b-container>
</template>

<script>
import { 
   BLink,
   BContainer,
   BRow,
   BCol
} from 'bootstrap-vue'
import useAuth from '@core/utils/useAuth'
import { $themeConfig } from '@themeConfig'
export default {
   components: {
      BContainer,
      BRow,
      BCol,
      BLink,
   },

   setup(){

      const {
         appName:app_name
      } = $themeConfig.app;

      const {
         is_loggin
      } = useAuth()

      return {
         is_loggin,
         app_name
      }
   }
}
</script>
