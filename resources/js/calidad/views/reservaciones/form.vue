<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
          <form-wizard
              color="#0293c9"
              :title="null"
              :subtitle="null"
              stepSize="sm"
              finish-button-text="Reservar"
              back-button-text="Anterior"
              next-button-text='Siguiente'
              class="steps-transparent mb-1"
              ref="wizarRef"
              @on-complete="handleSubmit(guardar)">

                  <tab-content title="Negocio" icon="fas fa-store">
                    <negocio-select v-model="formulario.negocio_id" :negocioId="formulario.negocio_id" />
                  </tab-content>

                  <tab-content title="Usuario" icon="fas fa-user-check" >
                      <user-select v-model="formulario.usuario_id" :usuarioId="formulario.usuario_id" />
                  </tab-content>

                  <tab-content title="Fecha y Hora" icon="fas fa-clock">

                    <b-card>
                      <b-container fluid>
                        <b-row>
                          <b-col cols="12" md="6">
                            <b-form-group>
                              <template #label>
                                Fecha de la reserva: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="fecha" rules="required" #default="{ valid, errors }">
                                <flat-pickr v-model="formulario.fecha" class="form-control" 
                                :config="{ dateFormat: 'Y-m-d', minDate: 'today', defaultDate: 'today', 
                                onChange: (_, dateStr) => consultarHoras(dateStr) }"
                                      placeholder="Today "  />

                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider>
                            </b-form-group>
                            <el-divider content-position="left">Horas Disponibles</el-divider>
                              <section class="d-flex flex-wrap" v-if="horas.length > 0 ? true : false">
                                <b-form-group description="AL seleccionar la hora, buscaremos la cantidad de lugares">
                            
                                  <validation-provider name="hora" rules="required" #default="{ valid, errors }">
                            
                                    <b-form-radio v-model="formulario.hora" v-for="(hora, i) in horas" :key="i" button button-variant="primary"
                                      class="btn-horas" size="sm mx-1" :value="hora.hora" :state="valid"
                                      @input="establecerLugaresDisponibles($event, hora.lugares)">
                                      {{ hora.hora | fecha('hh:mm A', true) }}
                                    </b-form-radio>

                                    <b-form-invalid-feedback :state="valid">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                            
                                  </validation-provider>
                                </b-form-group>
                              </section>
                                
                              <section v-else class="bg-danger horas-no-disponible">
                                <h3 class="text-white">Sin horas disponibles</h3>
                              </section>

                          </b-col>
                          <b-col cols="12" md="6">
                              <b-form-group>
                                  <template #label>
                                    Número de Personas: <span class="text-danger">*</span>
                                  </template>
                                
                                  <validation-provider name="personas" rules="required|min:1" #default="{valid,errors}">
                                
                                    <b-form-spinbutton v-model="formulario.personas" :min="0" :max="lugares"
                                      :disabled="!formulario.hora" :state="valid">
                                    </b-form-spinbutton>
                                
                                    <b-form-invalid-feedback :state="valid">
                                      {{ errors[0] }}
                                    </b-form-invalid-feedback>
                                
                                  </validation-provider>
                            </b-form-group>

                          </b-col>
                        </b-row>
                      </b-container>
                     </b-card>
                     
                  </tab-content>

                  <tab-content title="Nota" icon="fas fa-comment">
                    <b-card>
                       <b-form-group label="Observación" description="Agregue una observación o requerimiento a la reserva" >
                  
                          <validation-provider name="observacion" #default="{ valid, errors }">
                            <b-form-textarea v-model="formulario.observacion" :state="valid" :rows="4"></b-form-textarea>

                                <b-form-invalid-feedback :state="valid">
                                  {{ errors[0] }}
                                </b-form-invalid-feedback>
                          </validation-provider>

                        </b-form-group>
                    </b-card>
                   
                  </tab-content>

                  <template #next="{activeTabIndex, isLastStep }">

                    <b-button variant="primary" type="submit" v-if="isLastStep">
                      Reservar
                    </b-button>

                    <b-button variant="primary"  type="button" v-else @click="activeTabIndex++" :disabled="btnDisponible(activeTabIndex)" >
                     Siguiente
                    </b-button>
                  </template>


          </form-wizard>
      </b-form>
    </validation-observer>
</template>


<script>

import store from '@/store'
import router from '@/router'
import {onMounted,toRefs,ref,computed,watch} from 'vue'

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'
import flatPickr from 'vue-flatpickr-component'

import {required,min} from '@validations'

import {
  BForm,
  BFormGroup,
  BFormRadioGroup,
  BFormRadio,
  BCard,
  BCardText,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BFormSpinbutton,
  BContainer,
  BRow,
  BCol,
  BFormTextarea
} from 'bootstrap-vue'

import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'

export default {

  components:{
      BForm,
      BFormGroup,
      BFormRadioGroup,
      BFormRadio,
      BCard,
      BCardText,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback,
      ValidationObserver,
      ValidationProvider,
      FormWizard,
      TabContent,
      NegocioSelect: () => import('components/NegocioSelect.vue'),
      UserSelect: () => import('components/UserSelect.vue'),
      flatPickr,
      BFormSpinbutton,
      BContainer,
      BRow,
      BCol,
      BFormTextarea
  },

  setup(props,{emit}){
    const {reservacion:formulario} = toRefs(store.state.reservacion)
    
    const negocio_id = computed(() => formulario.value.negocio_id)
    const usuario_id = computed(() => formulario.value.usuario_id)
    const {usuario} = toRefs(store.state.usuario)
    const formValidate = ref(null)
    const wizarRef = ref(null)
    const horas = ref([])
    const lugares = ref(0)

    const guardar = () => {
      formulario.value.operador_id = usuario.value.id
      emit('save',formulario.value,formValidate.value)
    } 

    const cargarForm = () => {

      if(!formulario.value.id){
        formulario.value.fecha = moment().format('YYYY-MM-DD');
      }
      
      if (formulario.value.id){
        if(horas.value.length){
          establecerLugaresDisponibles(formulario.value.hora, horas.value.find(val => val.hora === formulario.value.hora).lugares)
        }
      }

    }

    onMounted(() => cargarForm());


    watch(negocio_id,(val) => {
      store.commit('negocio/capturar',val)
      consultarHoras(formulario.value.fecha)
    })

    watch(usuario_id,(val) => {
      store.commit('usuario/capturarUsuario',val)
    })

    watch(formulario,() => cargarForm())

    const consultarHoras = (fecha) => {
     
      if(!formulario.value.id){
         formulario.value.hora = null
      }
     
      lugares.value = 0

      store.dispatch('reservacion/consultarHoras', { negocio: formulario.value.negocio_id, fecha: fecha })
      .then((hours) => horas.value = hours)

    } 

    const establecerLugaresDisponibles = (hora, lars) => {
      // console.log(hora, lars)
      formulario.value.personas = 0
      lugares.value = lars - store.getters['reservacion/lugaresOcupados']({ fecha: formulario.value.fecha, hora: hora })
    }
  

    
    return {
        loading:computed(() => store.state.loading),
        formulario,
        formValidate,
        guardar,
        required,
        min,
        wizarRef,
        consultarHoras,
        horas,
        lugares,
        establecerLugaresDisponibles,
        btnDisponible:(idx) => {
          
          if(idx == 0){
            return formulario.value.negocio_id ? false : true
          }

          if (idx == 1) {
            return formulario.value.usuario_id ? false : true
          }

          if (idx == 2) {
            return formulario.value.fecha && formulario.value.hora && formulario.value.personas ? false : true
          }

          return false;
        }


      }
  }
}
</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-flatpicker.scss';

.dark-layout .stepTitle{
   color: #b5adad !important;
}


.btn-horas{

  .active{
    background-color: $success !important;
    border:1px solid $success !important;
  }
}

.horas-no-disponible{
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  font-weight: 900;

}

</style>