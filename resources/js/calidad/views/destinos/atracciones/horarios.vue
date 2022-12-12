<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
            
               <b-row>
            
                  <b-col cols="12">
                     <h3 v-if="formulario.horarios.length">Horarios de esta atracción</h3>
                     <h3 v-else>Esta atracción no tiene horario. ¿ Desea Aperturar Horario ? </h3>
                  </b-col>

                  <b-col cols="12">
                     <p>El horario de trabajo indica a los turístas en qu&eacute; d&iacute;as de la semana abre la atracción turística.</p>
                     <ul>
                        <li>Al especificar el horario de un d&iacute;a, es necesario ingresar la hora de entrada y la hora de salida (ambas).
                        </li>
                        <li>Para indicar un d&iacute;a cerrado basta con dejar en blanco el horario de entrada</li>
                        <li>Ejemplos: Entrada: 08:30, Salida: 22:00.</li>
                     </ul>
                  </b-col>
            
               </b-row>
            
               <b-row v-loading="loading">
                  <b-container fluid>
                     <div class="row my-1" v-for="(horario,i) in formulario.horarios" :key="i">
                        <div class=" col-12 col-md-3">
                           <div class="form-group d-flex justify-content-between align-items-center">
                              <label class="font-weight-bolder">{{ horarioDia(horario) }}</label>
                              <b-badge variant="success" v-if="horario.apertura && horario.cierre">Abierto</b-badge>
                              <b-badge variant="danger" v-else>Cerrado</b-badge>
                           </div>
                           <div class="form-group">
                           </div>
                        </div>
                     
                        <div class=" col-12 col-sm-6 col-md-4">
                           <div class="input-group">
                              <b-form-timepicker v-model="horario.apertura" locale="es" now-button reset-button @hidden="guardarHorario(horario)" />
                              <!-- <el-time-select placeholder="Hora de Apertura" v-model="horario.apertura"
                                                      :picker-options="optionsApertura"></el-time-select> -->
                           </div>
                        </div>
                     
                        <div class=" col-12 col-sm-6 col-md-4">
                           <div class="input-group">
                              <b-form-timepicker v-model="horario.cierre" locale="es" now-button reset-button @hidden="guardarHorario(horario)" />

                              <!-- <el-time-select placeholder="Hora de Cierre" v-model="horario.cierre"
                                 :picker-options="{start:'07:00',step:'00:15',end:'23:00',minTime:horario.apertura}"></el-time-select> -->
                           </div>
                        </div>
                     
                     </div>
                  </b-container>
                    
               </b-row>
            
               <b-row>
                  <b-col cols="12">
                     <b-button-group size="sm">
                        <b-button @click="aperturarHorario" v-if="!formulario.horarios.length" variant="primary">
                           Aperturar Horario
                        </b-button>

                        <b-button variant="danger" v-else @click="quitarHorario()" v-loading="loading">
                           <feather-icon icon="TrashIcon" />
                           Quitar Horario
                        </b-button>

                        <b-button variant="dark" @click="regresar" v-loading="loading">
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
                        </b-button>
            
            
                     </b-button-group>
                  </b-col>
               </b-row>
            </b-container>
         </b-form>
      </validation-observer>
     
   </b-card>
</template>

<script>

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton,
   BForm,
   BFormTimepicker,
   BBadge
} from 'bootstrap-vue'

import {ValidationProvider,ValidationObserver} from 'vee-validate'

import store from '@/store'

import { regresar } from '@core/utils/utils'

import { toRefs,ref,computed,watch,onMounted } from '@vue/composition-api'
import {horarioDia} from '@core/utils/filter';

export default {
   
   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormInput,
      BFormInvalidFeedback,
      ValidationProvider,
      ValidationObserver,
      BButtonGroup,
      BButton,
      BForm,
      BFormTimepicker,
      BBadge



   },

   props:['id'],

   setup(props){
      
      const {id} = toRefs(props)
      const formValidate = ref(null)

      const {atraccion:formulario,atracciones} = toRefs(store.state.atraccion)

      const cargarForm  = () => {

         if(!atracciones.value.length){
            store.dispatch('atraccion/fetch',id.value)
         
         }else{
            store.commit('atraccion/capturar',id.value)
         }


      }

      onMounted(() => cargarForm())
      watch([atracciones,id], () => cargarForm())



      const aperturarHorario = () => {
         store.dispatch('atraccion/aperturarHorario').then(({result}) => {
            if(result){
            
               toast.success('Se ha aperturado el Horario para esta atracción Turística',{position:'bottom-right'})
               // cargarForm();
            }else{
               toast.info('No se pudo aperturar el horario, inténte de nuevo')
            }

         });

      }

      const optionsApertura = ref({
         start: '07:00',
         step: '00:15',
         end: '23:00',
      })

      const guardarHorario = (horario) => {

         if(horario.apertura && horario.cierre){
            
            store.dispatch('atraccion/guardarHorario', horario).then(({ result }) => {

               if (result) {
                  toast.success('Se ha actualizado el horario', { position: 'bottom-right' })
                  cargarForm();

               } else {

                  toast.info('No se ha actualizado el horario, inténte de nuevo', { position: 'bottom-right' })
               }

            })
         }
        

      }

      const quitarHorario = () => {

         store.dispatch('atraccion/quitarHorario',id.value).then(({result}) => {
            if (result) {
               toast.success('Se ha quitado con éxito el horario', { position: 'bottom-right' })
               cargarForm();
            } else {

               toast.info('No se ha quitado el horario, inténte de nuevo', { position: 'bottom-right' })
            }
         })

      }


      return {
         formulario,
         formValidate,
         loading:computed(() => store.state.loading),
         regresar,
         aperturarHorario,
         horarioDia,
         optionsApertura,
         guardarHorario,
         quitarHorario
      }
   }

}
</script>