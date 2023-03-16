<template>
      <b-container fluid class="px-0 mx-0">
         
         <b-row>
            <b-col>
               <!-- filtros -->
               <b-card no-body class="mb-0">
               
                  <div class="m-2">
                     <!-- Table Top -->
                     <b-row>
                        <!-- Per Page -->
                        <b-col cols="12" md="6" class="d-flex align-items-center justify-content-start mb-1 mb-md-0">
                           <per-page v-model="perPage" :perPageOptions="perPageOptions"></per-page>
                        </b-col>
               
                        <b-col md="6">
                           <div class="d-flex align-items-center justify-content-end">
               
                              <b-input-group size="sm">
               
                                 <b-form-input v-model="searchQuery" type="search" placeholder="..." />
               
                                 <template #append>
                                    <b-button variant="dark" :to="{ name: 'personal.create' }" v-if="$can('write','empleados')">
                                       <feather-icon size="18" icon="PlusSquareIcon" />
                                       Añadir
                                    </b-button>
                                 </template>
                              </b-input-group>
               
               
                           </div>
                        </b-col>
               
                     </b-row>
               
                  </div>
               
               </b-card>

            </b-col> 
         </b-row>
        
         <!-- Empleados -->
         <b-row class="my-1">
            <b-col cols="12" md="4" v-for="({usuario,cargo,id,created_at},i) in empleados" :key="i">
               <b-card header-class="d-flex justify-content-center align-items-center header-card flex-column" body-class="px-1" footer-class="p-1">

                     <template #header>
                        <b-badge pill variant="primary" class="cargo-info"> <font-awesome-icon :icon="['fas','fa-user-tie']" /> {{ cargo.cargo }}</b-badge>
                        
                        <b-avatar :src="usuario.avatar" rounded="circle" size="8rem" />
                        <h4 class="font-weight-bolder text-center mt-1">{{ usuario.nombre }} {{ usuario.apellido }}</h4>

                     </template>

                     <section class="d-flex flex-wrap">
                      
                        <b-link  :href="`tel:${usuario.telefonos.find(val => val.principal).telefono}`" v-if="usuario.telefonos.length">
                              <b-badge pill variant="dark"> <font-awesome-icon :icon="['fas','fa-phone-alt']" class="font-weight-bolder" /> {{
                              usuario.telefonos.find(val => val.principal).telefono }}</b-badge>
                        </b-link>

                        <b-link :href="`mailto:${usuario.email}`" v-if="usuario.email" target="_blank">

                           <b-badge pill variant="danger" class="font-weight-bolder"> 
                              <font-awesome-icon :icon="['fas','fa-envelope']" /> 
                              {{ usuario.email }}
                           </b-badge>
                        
                        </b-link>

                        <small class="mt-1">Asociado desde el {{ created_at | fecha  }}</small>

                     </section>

                     <template #footer>

                        <b-button-group size="sm">
                           <b-button variant="primary" v-if="$can('edit','empleados')" :to="{name:'personal.edit',params:{id:id}}">
                              <feather-icon icon="EditIcon"/>
                              Editar
                           </b-button>
                           <b-button variant="danger" @click="eliminar(id)">
                              <feather-icon icon="TrashIcon" />
                              Eliminar
                           </b-button>
                        </b-button-group>

                     </template>
                    
               </b-card>
            </b-col>
         </b-row>
         
         <b-row>

            <b-col cols="12">
               <!-- <b-card class="py-0" body-class="py-0"> -->
                  <paginate-table :dataMeta="dataMeta" :currentPage.sync="currentPage" :perPage="perPage" :total="total" />
               <!-- </b-card> -->
            </b-col>
         </b-row>

      
         
      </b-container>
</template>

<script>

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BButtonGroup,
   BButton,
   BInputGroup,
   BFormInput,
   BImg,
   BAvatar,
   BBadge,
   BLink

} from 'bootstrap-vue'

import usePersonalList from './usePersonalList.js'
import store from '@/store'
import {toRefs,computed} from 'vue'


export default {
   
   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BButtonGroup,
      BButton,
      BInputGroup,
      BFormInput,
      BImg,
      BAvatar,
      BBadge,
      BLink,
      PerPage: () => import('components/PerPage'),
      PaginateTable: () => import('components/PaginateTable'),
   },

   setup(){
      const { negocio } = toRefs(store.state.negocio)

      const {
         fetchData,
         currentPage,
         perPage,
         searchQuery,
         refetchData,
         dataMeta,
         perPageOptions,
         items:empleados,
         total,
         isSortDirDesc,
         sortBy,
         eliminar
      } = usePersonalList(negocio);

      return {
         fetchData,
         currentPage,
         perPage,
         searchQuery,
         refetchData,
         dataMeta,
         perPageOptions,
         empleados,
         total,
         isSortDirDesc,
         sortBy,
         eliminar

      }
   }


   
}
</script>

<style lang="scss">
   .header-card{
      position:relative;

      .cargo-info{
         position: absolute;
         top:.5rem;
         left:.5rem;
         cursor:pointer;
      }


   }
</style>