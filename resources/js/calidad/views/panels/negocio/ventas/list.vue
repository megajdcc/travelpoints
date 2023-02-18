<template>
      <listado :actions="actions" >
         
         <template #btn-action>
            
            <b-button variant="primary" :to="{name:'negocio.venta.create'}" v-if="$can('write','ventas negocio')" class="d-flex flex-column justify-content-center">
                  Generar Venta
            </b-button>

         </template>

         <template #contenido="{ eliminar, items }">

            <b-card v-for="(venta,i) in items" :key="i" class="my-1">
               <strong>Cliente</strong>

               <b-media vertical-align="center">
                  <template #aside>
                     <b-avatar size="32" :src="venta.cliente.avatar"
                        :text="avatarText(`${venta.cliente.nombre} ${venta.cliente.apellido}`)" :variant="`light-primary`"
                        :to="{ name: 'mostrar.usuario', params: { id: venta.cliente.id } }" disabled />
                  </template>
                  <b-link :to="{ name: 'mostrar.usuario', params: { id: venta.cliente.id } }" disabled
                     class="font-weight-bold d-block text-nowrap">
                     {{ `${venta.cliente.nombre} ${venta.cliente.apellido}` }}
                  </b-link>
                  <small class="text-muted" v-if="venta.cliente.username">{{ venta.cliente.username }}</small>
               </b-media>

               <b-container fluid>

                  <b-row>

                     <b-col cols="12" md="4">
                        <strong>Total de Venta</strong>
                        <p class="text-mute">{{ venta.monto | currency(venta.divisa.simbolo) }} {{ venta.divisa.iso.toUpperCase()  }}</p>
                     </b-col>

                     <b-col cols="12" md="4">
                        <strong>Comisión</strong>
                        <p class="text-mute">{{ getComision(venta) | currency(venta.divisa.simbolo) }} {{ venta.divisa.iso.toUpperCase() }}</p>
                     </b-col>


                     <b-col cols="12" md="4">
                        <strong>Travel Points Bonificados</strong>
                        <p class="text-mute">Tp${{ venta.tps }} </p>
                     </b-col>
                  </b-row>
               </b-container>

               <el-divider></el-divider>

               <section class="d-flex justify-content-between">
                  <p>Registrado por <strong> {{ venta.empleado ? `${venta.empleado.usuario.nombre} ${venta.empleado.usuario.apellido}` : 'Sin definir' }}</strong> - {{ venta.empleado ? venta.empleado.usuario.username : '' }} el día {{ venta.created_at | fecha('LLL') }}</p>

                  <strong># {{ venta.id }}</strong>
               </section>
              


            </b-card>
          
         </template>

        
      
      </listado>

</template>

<script>

import store from '@/store'
import {toRefs,ref,computed,watch} from '@vue/composition-api'

import useVentasList from './useVentasList.js'
import { avatarText } from '@core/utils/filter'

import {

   BTable,
   BButtonGroup,
   BButton,
   BCard,
   BContainer,
   BRow,
   BCol,
   BMedia,
   BLink,
   BAvatar

} from 'bootstrap-vue'
export default {

   components:{
      Listado:() => import('components/Listado.vue'),
      BTable,
      BButtonGroup,
      BButton,
      BCard,
      BContainer,
      BRow,
      BCol,
      BMedia,
      BLink,
      BAvatar

   },


   setup(props){
      const {negocio} = toRefs(store.state.negocio)

      const actions = useVentasList(negocio)

      const getComision = ({monto,tipo_comision, comision,personas}) => {

         let monto_comision = 0;

         if(tipo_comision == 1){

            monto_comision = monto * comision / 100;
         
         }else{
            monto_comision = comision * personas;
         }


         return monto_comision;
      } 

 

      return {
         loading:computed(() => store.state.loading),
         actions,
         avatarText,
         getComision,

      }

   }
}
</script>