<template>
   <b-card v-if="usuarios.length">
      <template #header>
         <h2 class="font-weight-bolder">Mis Referidos</h2>
      </template>

      <b-container fluid>
         <!-- <b-row>
            <b-col cols="12" md="6">
               <per-page v-model="perPage" :perPageOptions="perPageOptions" />
            </b-col>
         </b-row> -->

         <b-row>
            <b-col cols="12" class="p-1" v-for="(usuario,i) in usuarios" :key="i" md="4">
               <b-media vertical-align="center" style="cursor:pointer;border-radius:10px ; border:1px dotted rgba(0,0,0,0.5);padding: .5rem;" class="shadow-lg">
                  <template #aside>
                     <b-avatar :src="usuario.imagen" :alt="usuario.nombre_completo || usuario.username" size="md" />
                  </template>

                  <h3>{{ usuario.nombre_completo || usuario.username }}</h3>
               </b-media>
            </b-col>
         </b-row>


         <b-row>
            <b-col cols="12">
               <paginate-table :dataMeta="dataMeta" :perPage.sync="perPage" :total="total" :currentPage="currentPage" />
            </b-col>
         </b-row>
      </b-container>

   </b-card>

</template>

<script>

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BMedia,
   BAvatar

} from 'bootstrap-vue'

import useMisInvitadosList from './useMisInvitadosList'
import {toRefs,computed} from 'vue'
import store from '@/store'

export default {
   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BMedia,
      BAvatar,
      PerPage:() => import('components/PerPage'),
      PaginateTable:() => import('components/PaginateTable')
   },

   setup() {

      const {usuario} = toRefs(store.state.usuario)

      const {
         perPageOptions,
         currentPage,
         perPage,
         total,
         dataMeta,
         refetchData,
         fetchData,
         usuarios
      } = useMisInvitadosList(usuario.value.id)


      return {
         loading:computed(() => store.state.loading),
         perPageOptions,
         currentPage,
         perPage,
         total,
         dataMeta,
         refetchData,
         fetchData,
         usuarios

      }
      
   }
}
</script>