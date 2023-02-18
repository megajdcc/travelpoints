<template>
   <section id="dashboard">
      <b-container fluid>
         <b-row>
            <b-col cols="12">
              <header-negocio :negocio="negocio" />
            </b-col>
         </b-row>
         <b-row>
            <b-col cols="12" md="4">

               <statistic-card-horizontal icon="fa-chart-line" fontAwesome clipboard-list 
                  :statistic="total.ventas" statistic-title="Total de ventas mensuales" color-icon="warning"  />

            </b-col>

            <b-col cols="12" md="4">
               <statistic-card-horizontal icon="fa-calendar-alt" fontAwesome :statistic="total.reservas"
                  statistic-title="Reservas" color-icon="primary" >
                  <template #titulo>
                     <strong>Reservas <small>(Acumuladas del mes)</small></strong>
                  
                  </template>
               </statistic-card-horizontal>
            </b-col>

            <b-col cols="12" md="4">
               <statistic-card-horizontal icon="fa-money-bill-wave" fontAwesome :statistic="total.tps"
                  statistic-title="TravelPoints Bonificados" color-icon="success"/>
            </b-col>



            <b-col cols="12" md="4">
            
               <statistic-card-horizontal icon="fa-money-bill" fontAwesome clipboard-list  :statistic="saldo"
                  statistic-title="Saldo" color-icon="success" >

                  <template #valor="{ statistic }">
                     {{ statistic | currency(negocio.divisa ? negocio.divisa.iso : 'MXN') }}
                  </template>
                 
               </statistic-card-horizontal>
            
            
            </b-col>

            <b-col cols="12" md="4">

               <statistic-card-horizontal icon="fa-users" fontAwesome  :statistic="negocio.vistas"
                  statistic-title="Visitas" />
            </b-col>

          
         </b-row>
        
       
      </b-container>
   </section>
</template>

<script>

import {
   BRow, BCol,
   BContainer,
   BCard,
   BCardTitle,
   BLink,
   BBadge
}
   from 'bootstrap-vue'
import { ref, onMounted, watch, toRefs, computed } from '@vue/composition-api';

import StatisticCardWithLineChart from 'components/dashboard/StaticCardWithLineChart.vue'
import TarjetasAgrupadasStaticas from 'components/dashboard/TarjetasAgrupadasStaticas.vue';

import store from '@/store';

import StatisticCardHorizontal from 'components/dashboard/StatisticCardHorizontal.vue'


export default {

   components: {
      BRow,
      BCol,
      BContainer,
      BCard,
      BCardTitle,
      StatisticCardWithLineChart,
      StatisticCardHorizontal,
      TarjetasAgrupadasStaticas,
      BLink,
      BBadge,
      HeaderNegocio:() => import('components/HeaderNegocio.vue')

   },

   setup(props) {

      const { negocio } = toRefs(store.state.negocio)
      
      const total = ref({
         ventas: computed(() => negocio.value.ventas.length),
         reservas: 0,
         tps: 0
      })


      const cargarForm = () => {
         store.dispatch('negocio/datosHome').then(({ reservasMes }) => {

            total.value.reservas = reservasMes
         })
      }

      if(negocio.value.id){
         cargarForm();

      }
      watch([negocio],() => cargarForm())
      
  


      return {
         total,
         saldo:computed(() => negocio.value.cuenta ? negocio.value.cuenta.saldo : 0),
         negocio,

      };

   }


}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '~@core/scss/vue/libs/chart-apex.scss';
</style>
