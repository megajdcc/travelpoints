<template>
  <b-card no-body>
    <b-card-header class="pb-50">
      <h5>
        Filtros
      </h5>
    </b-card-header>
    <b-card-body>
      <b-row>



        <b-col cols="12" md="3" class="mb-md-0 mb-2">
          <label>Por Boda</label>
          <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :value="bodaFilter" :options="getBodas"
            class="w-100" :reduce="val => val.id" @input="(val) => $emit('update:bodaFilter', val)" />
        </b-col>


        <b-col cols="12" md="3" class="mb-md-0 mb-2">
          <label>Por forma de pago</label>
          <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :value="formaPagoFilter" :options="formas"
            class="w-100" :reduce="val => val.id" @input="(val) => $emit('update:formaPagoFilter', val)" />
        </b-col>

        <b-col cols="12" md="3" class="mb-md-0 mb-2">
          <label>Por status de pago</label>
          <v-select :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'" :value="statusPago" :options="statusPagoOptions"
            class="w-100" :reduce="val => val.id" @input="(val) => $emit('update:statusPago', val)" />
        </b-col>

        <b-col cols="12" md="3" class="mb-md-0 mb-2">
          <label>Por rango de fecha</label>

          <section class="d-flex">
            <flat-pickr :value="rango" @input="(val) => $emit('update:rango',val)" :config="optionsRango" />
            <b-button @click="() => $emit('update:rango',[])" variant="secondary" size="sm">
              <feather-icon icon="TrashIcon" />
            </b-button>
          </section>


        </b-col>

      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import { BCard, BCardHeader, BCardBody, BRow, BCol,BButton } from 'bootstrap-vue'
import vSelect from 'vue-select'

import {mapState,mapActions} from 'vuex';
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';
import { Spanish } from 'flatpickr/dist/l10n/es.js';

export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardBody,
    vSelect,
    flatPickr,
    BButton
  }, 

  data(){
    return{
      formas:[
        {
          id:1,// Transferencia
          label:'Transferencia bancaria'
        },
         {
          id:2,// Agencia
          label:'Pago en agencia'
        },
         {
          id:3,// Paypal
          label:'Paypal'
        },
         {
          id:4,// Conekta
          label:'Conekta'
        }
      ]
    }
  },

  props: {
 
   
   bodaFilter: {
      type: [Number, null],
      default: null,
    },

    formaPagoFilter:{
      type:[Number,null],
      default:null
    },
    statusPago:{
      type:Number,
      default:null
    },
    statusPagoOptions:{
      type:Array,
      required:true
    },
    rango:{
      type:Array|String
    }

  },


   computed:{
      ...mapState('boda',['bodas']),


      getBodas(){

         return this.bodas.map(val => {
            return {
               id:val.id,
               label:`${val.novios.novia} & ${val.novios.novio}`
            };
         })
      }



   },

   mounted(){
     this.cargarBodas();

   },
   methods:{
     ...mapActions('boda',['cargarBodas'])
   },

   setup(){

     let optionsRango = {
       wrap: true, // set wrap to true only when using 'input-group'
       altFormat: 'M j, Y',
       altInput: true,
       dateFormat: 'Y-m-d',
       locale: Spanish, // locale for this instance only   
       mode: 'range'
     }

     return {
       optionsRango
     }
   }



  
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-select.scss';
</style>
