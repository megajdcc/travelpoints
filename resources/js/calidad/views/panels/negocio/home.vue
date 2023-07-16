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
                  :statistic="total.ventas" statistic-title="Total de ventas mensuales" color-icon="warning" :to="{ name: 'negocio.ventas' }"  />

            </b-col>

            <b-col cols="12" md="4">
               <statistic-card-horizontal icon="fa-calendar-alt" fontAwesome :statistic="total.reservas"
                  statistic-title="Reservas" color-icon="primary"  :to="{ name: 'negocio.reservaciones' }" >
                  <template #titulo>
                     <strong>Reservas <small>(Acumuladas del mes)</small></strong>
                  
                  </template>
               </statistic-card-horizontal>
            </b-col>

            <b-col cols="12" md="4">
               <statistic-card-horizontal icon="fa-money-bill-wave" fontAwesome :statistic="total.tps"
                  statistic-title="TravelPoints Bonificados" title="Puntos entregados a viajeros, por consumo en tu negocio. " v-b-tooltip:hover color-icon="success" :to="{ name: 'negocio.ventas' }" >

                     <template #statistic="{ statistic }">
                        Tp{{ statistic | currency }}
                     </template>

                  </statistic-card-horizontal>

            </b-col>



            <b-col cols="12" md="4">
            
               <statistic-card-horizontal icon="fa-money-bill" fontAwesome clipboard-list  :statistic="saldo"
                  statistic-title="Saldo" color-icon="success" :to="{name:'negocio.movimientos'}">

                  <template #statistic="{ statistic }">
                     {{ statistic | currency(negocio.divisa ? negocio.divisa.iso : 'MXN') }}
                  </template>
                 
               </statistic-card-horizontal>
            
            
            </b-col>

            <b-col cols="12" md="4">

               <statistic-card-horizontal icon="fa-users" fontAwesome  :statistic="negocio.vistas"
                  statistic-title="Visitas Al perfil del Negocio" color-icon="info"  title="Visitas al perfil del negocio" v-b-tooltip:hover />
            </b-col>

             <b-col cols="12" md="4">

                  <statistic-card-horizontal icon="fa-bell" fontAwesome  :statistic="total.seguidores"
                     statistic-title="Total Seguidores" color-icon="info"  title="Total seguidores del negocio" v-b-tooltip:hover />
               </b-col>
                <b-col cols="12" md="4">

                  <statistic-card-horizontal icon="fa-heart" fontAwesome  :statistic="total.recomendaciones"
                        statistic-title="Total Recomendaciones" color-icon="danger"  title="Total recomendaciones de mi negocio" v-b-tooltip:hover />
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
   BBadge,
   VBTooltip
}
   from 'bootstrap-vue'
import { ref, onMounted, watch, toRefs, computed } from 'vue';

// import StatisticCardWithLineChart from 'components/dashboard/StaticCardWithLineChart.vue'
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
      // StatisticCardWithLineChart,
      StatisticCardHorizontal,
      TarjetasAgrupadasStaticas,
      BLink,
      BBadge,
      HeaderNegocio:() => import('components/HeaderNegocio.vue')

   },

   directives:{
      'b-tooltip':VBTooltip
   },


   setup(props) {

      const { negocio } = toRefs(store.state.negocio)
      
      const total = ref({
         ventas: computed(() => negocio.value.ventas.length),
         reservas: 0,
         tps: 0,
         seguidores:0,
         recomendaciones:0
      })


      const cargarForm = () => {
         store.dispatch('negocio/datosHome').then(({ reservasMes,tps,seguidores,recomendaciones }) => {
            total.value.reservas = reservasMes
            total.value.tps = tps
            total.value.seguidores = seguidores
            total.value.recomendaciones = recomendaciones
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
@import '@core/scss/vue/pages/dashboard-ecommerce.scss';
@import '@core/scss/vue/libs/chart-apex.scss';
</style>
