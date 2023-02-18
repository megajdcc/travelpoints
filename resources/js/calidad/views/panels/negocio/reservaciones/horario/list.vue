<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
          <b-container fluid class="mx-0 px-0">

            <!-- Floor Plan o no -->
            <b-row>
              <b-col cols="12">
                  <b-card>
                    <b-container fluid class="mx-0 px-0">
                      <b-row>
                        <b-col cols="12" md="6">
                          <b-form-group label="¿Este negocio acepta floor plan?" v-b-tooltip.hover="'Por Ahora todos los negocios no pueden trabajar con floor Plan'">
                            <validation-provider name="negocio.floor_plan" rules="required" #default="{valid,errors}">
                                <b-form-radio-group v-model="negocio.floor_plan" :state="valid" :options="[{text:'Sí',value:true},{text:'No',value:false}]" @change="guardarNegocio" disabled ></b-form-radio-group>

                                <b-form-invalid-feedback :state="valid">
                                  {{  errors[0]  }}
                                </b-form-invalid-feedback>

                            </validation-provider>
                          </b-form-group>
                        </b-col>
                      </b-row>
                    </b-container>
                  </b-card>
              </b-col>
            </b-row>

            <!-- Formulario de Asignacion de Horario -->
           

              <b-row>
              <b-col cols="12">
                <b-card>

                  <b-button variant="primary" @click="asignarHorario">Asignar Horario</b-button>

                  <section class="seccion-dias " v-for="({dia,label},i) in diasSemana" :key="i">
                    
                    <el-divider content-position="left">{{ label }}</el-divider>

                    <section class="seccion-horario d-flex">

                      <section class="horas mx-1"  v-for="(hor,e) in getHorarioPorDia(dia)" :key="e">
                        <b-input-group>

                            <b-input-group-prepend>
                              <b-button variant="danger" @click="eliminarHora(hor.id)" title="Eliminar Hora" size="sm">
                                <feather-icon icon="TrashIcon"/>
                              </b-button>
                            </b-input-group-prepend>

                            <validation-provider name="hora" rules="required" #default="{valid,errors}">

                              <flat-pickr v-model="hor.hora" class="form-control" :config="{
                                                  dateFormat: 'H:i', 
                                                  enableTime: true,
                                                  noCalendar: true,
                                                }" placeholder="9:00..." @change="updateHorario(hor)" />
                            
                              <b-form-invalid-feedback :state="valid">
                                {{ errors[0] }}
                              </b-form-invalid-feedback>

                              <b-input-group-append>
                                  <b-form-spinbutton id="sb-vertical" v-model="hor.lugares" @change="updateHorario(hor)" ></b-form-spinbutton>
                              </b-input-group-append>
                            
                            </validation-provider>

                            
                          
                        </b-input-group>
                      </section>
                      
                    </section>

                  </section>
                  
                </b-card>
              </b-col>
            </b-row>


          
            <b-row>
              <b-col cols="12">
                <b-button-group size="sm">
                  <!-- <b-button type="submit" variant="primary" title="Guardar" v-loading="loading" :disabled="loading">
                    <feather-icon icon="SaveIcon"/>
                    Guardar
                  </b-button> -->

                  <b-button variant="dark" @click="regresar" title="Regresar">
                    <feather-icon icon="ArrowLeftIcon" />
                    Regresar
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row>


          </b-container>


      </b-form>

      <b-sidebar v-model="showHorario" >

        <template #header>
          <h3>Asignar Horario</h3>
        </template> 

        <b-container fluid>
          <b-row>
            
            <b-col>
              <b-form-group  description="Seleccione los días a la que le va agregar este horario de reservación">
                <template #label>
                  Días : <span class="text-danger">*</span>
                </template>
                <validation-provider name="formulario.dias" rules="required" #default="{valid,errors}">
                  <b-form-checkbox-group text-field="label" :options="diasSemana.map(val => ({label:val.label,value:val.dia}))" v-model="formulario.dias" >
                  
                  </b-form-checkbox-group>

                  <b-form-invalid-feedback :state="valid">
                    {{  errors[0]  }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-form-group>


              <b-form-group label="Hora" label-for="hora">
                <validation-provider name="hora" rules="required" #default="{valid,errors}">
                    <flat-pickr v-model="formulario.hora" class="form-control" :config="{
                      dateFormat: 'H:i', 
                      enableTime: true,
                      noCalendar: true,
                    }" placeholder="9:00..." />
                    
                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>

                </validation-provider>
              </b-form-group>

              <b-form-group label="Lugares" label-for="Lugares" v-if="!formulario.floor_plan">

                <validation-provider name="lugares" rules="required" #default="{valid,errors}">
                  <b-form-spinbutton v-model="formulario.lugares" id="sb-wrap" wrap min="1" max="25" placeholder="--"></b-form-spinbutton>
                  <b-form-invalid-feedback :state="valid">
                    {{  errors[0]  }}
                  </b-form-invalid-feedback>
                </validation-provider>
                
              </b-form-group>

            </b-col>
          </b-row>
        </b-container>


        <template #footer="{hide}">

          <section class="p-1">
            <b-button-group size="sm">
              <b-button variant="primary" @click="guardarHorario" title="Guardar Horario">
                <feather-icon icon="SaveIcon" />
                Asignar Horario
              </b-button>
              <b-button variant="dark" @click="hide">Cerrar</b-button>
            </b-button-group>
          </section>
        </template>
      </b-sidebar>
    </validation-observer>
</template>


<script>

import {ValidationObserver,ValidationProvider} from 'vee-validate'

import {
  BForm,
  BFormGroup,
  BFormInput,
  BButtonGroup,
  BButton,
  BCard,
  BContainer,
  BRow,
  BCol,
  VBPopover,
  VBTooltip,
  BFormCheckbox,
  BFormCheckboxGroup,
  BFormInvalidFeedback,
  BFormRadioGroup,
  BSidebar,
  BFormSpinbutton,
  BInputGroup,
  BInputGroupPrepend,
  BInputGroupAppend
} from 'bootstrap-vue'

import { regresar } from '@core/utils/utils'
import {required} from '@validations'

import store from '@/store'

import {computed,onMounted,toRefs,ref,watch} from '@vue/composition-api'

import flatPickr from 'vue-flatpickr-component'
import { tooltip } from 'leaflet'

export default {

  directives:{
    'b-popover':VBPopover,
    'b-tooltip':VBTooltip
  },

  components:{
    BForm,
    BFormGroup,
    BFormInput,
    BButtonGroup,
    BCard,
    BContainer,
    BRow,
    BButton,
    BCol,
    BFormCheckbox,
    ValidationObserver,
    ValidationProvider,
    BFormCheckboxGroup,
    BFormInvalidFeedback,
    BFormRadioGroup,
    BSidebar,
    flatPickr,
    BFormSpinbutton,
    BInputGroup,
    BInputGroupPrepend,
    BInputGroupAppend


  },


  setup(){

    const formValidate = ref(null);
    const { horario,horarios } = toRefs(store.state.horarioReservacion)
    const showHorario = ref(false)
    const { negocio } = toRefs(store.state.negocio)
    const formulario = ref({
      dias:[],
      hora:null,
      lugares:0,
      negocio_id:computed(() => negocio.value.id),
      floor_plan:computed(() => negocio.value.floor_plan)

    })

    const cargarform = () => {
      
      if(!horarios.value.length && negocio.value.id){
        store.dispatch('horarioReservacion/getHorariosNegocio',negocio.value.id)
      }

    }

    onMounted(() => {
      cargarform()
    })

    watch([negocio],() => cargarform())

    const guardar = () => {

    }

    const guardarNegocio = () => {

      store.dispatch('negocio/guardar',negocio.value).then(({result}) => {

        if(result){
          toast.success('Negocio actualizado con éxito',{position:'bottom-right'})
        }else{
          toast.info('El negocio no se pudo actualizar', { position: 'bottom-right' })
        }
      })
    }


    const asignarHorario = () => {
      showHorario.value = true
    }

    const guardarHorario = () => {

      formValidate.value.validate().then((val) => {
        
        if(val){
          store.dispatch('horarioReservacion/agregarHorario',formulario.value).then(({result}) => {
            if(result){
              toast.success('Se ha asignado con éxito el horario de reservación',{position:'bottom-right'})
              showHorario.value = false
              formulario.value  = {
                dias: [],
                hora: null,
                lugares: 0,
                negocio_id: computed(() => negocio.value.id),
                floor_plan: computed(() => negocio.value.floor_plan)
              }
            }else{
              toast.info('No se pudo asignar el horario, inténte de nuevo', { position: 'bottom-right' })

            }
          })

        }

      })

    }

    const eliminarHora =(id_horario)  => {

      store.dispatch('horarioReservacion/eliminar',id_horario).then(({result}) => {
          if(result){

            toast.success('Se ha eliminado con éxito la hora',{position:'bottom-right'})
          }else{
            toast.success('No se pudo eliminar la hora', { position: 'bottom-right' })

          }
      })

    }

    const updateHorario = (datos) => {
      
      store.dispatch('horarioReservacion/guardar',datos).then(({result}) => {
        
        if(result){
          toast.success('Se ha actualizado con éxito el horario',{position:'bottom-right'})
        }else{
          toast.info('No se pudo actualizar, inténte de nuevo', { position: 'bottom-right' })

        }

      })

    }

    return {
      loading:computed(() => store.state.loading),
      negocio,
      horario,
      formValidate,
      regresar,
      required,
      guardar,
      guardarNegocio,
      showHorario,
      asignarHorario,
      formulario,
      guardarHorario,
      horarios,
      eliminarHora,
      updateHorario,
      diasSemana:computed(() => store.getters['negocio/diasAbiertos']),

      getHorarioPorDia: (dia) => horarios.value.filter(val => val.dia == dia)
    }
  }
}
</script>

<style lang="scss" >
@import '~@core/scss/vue/libs/vue-flatpicker.scss';

.seccion-dias{
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 1rem;

  border: 1px solid rgba(0, 0, 0, 0.4);
    border-radius: 10px;
    margin: 0.5rem auto;

}
</style>

