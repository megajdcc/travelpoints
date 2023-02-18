<template>
      <b-modal :visible="showHorario" @hide="cerrar" title="Horarios de atención" body-class="d-flex justify-content-center" hide-footer centered >
         <table class="table table-sm table-hover table-bordeless " >
               <tbody>
                  <tr v-for="({dia,apertura,cierre},i) in horarios" :key="i">
                     <td>
                        {{ getDay(dia) }}
                     </td>
                     
                     <td>
                        {{ getHora(apertura) }} - {{ getHora(cierre) }}
                     </td>

                  </tr>
               </tbody>
         </table>
      </b-modal>
</template>

<script>

import {
   BModal,
   BContainer,
   BRow,
   BCol
} from 'bootstrap-vue'

import {getDay,getHora } from '@core/utils/utils'

export default {
   
   components:{
      BModal,
      BContainer,
      BRow,
      BCol
   },

   props:{
      horarios:Array,
      showHorario:Boolean
   },


   setup(props,{emit}){


      const cerrar = () => {
         emit('update:showHorario',false)

      }

      return {

         cerrar,
         getDay,     
         getHora
      }

   }


}
</script>