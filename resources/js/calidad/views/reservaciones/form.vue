<template>
  <section>

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

                  <tab-content :title="$t('Negocio')" icon="fas fa-store">
                     <b-breadcrumb style="margin-top: -20px;">
                        <b-breadcrumb-item @click="limpiarDestinos">
                            <font-awesome-icon icon="fas fa-rotate-right" />
                            {{ $t('Destinos') }}
                        </b-breadcrumb-item>
                        <b-breadcrumb-item :to="rutaDestino" text>{{ getDestinoName }}</b-breadcrumb-item>
                      </b-breadcrumb>

                    <negocio-select v-model="formulario.negocio_id" :negocioId="formulario.negocio_id" :destinoId="destino_id" @negocioSeleccionado="negocioSeleccionado" />
                  </tab-content>

                  <tab-content :title="$t('Usuario')" icon="fas fa-user-check" >
                      <user-select v-model="formulario.usuario_id" :usuarioId="formulario.usuario_id" @usuarioSeleccionado="wizarRef.nextTab()" />
                  </tab-content>

                  <tab-content :title="$t('Fecha y Hora')" icon="fas fa-clock">

                    <b-card>
                      <b-container fluid>
                        <b-row>
                          <b-col cols="12" md="6">

                            <b-form-group>
                              <template #label>
                                {{ $t('Fecha de la reserva') }}: <span class="text-danger">*</span>
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
                          </b-col>
                          <b-col cols="12" md="6">

                            <el-divider content-position="left">{{ $t('Horas Disponibles') }}</el-divider>
                              <section class="d-flex flex-wrap" v-if="horas.length > 0 ? true : false">
                                <b-form-group :description="$t('AL seleccionar la hora, buscaremos la cantidad de lugares')">
                            
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
                                <h3 class="text-white">{{ $t('Sin horas disponibles') }}</h3>
                              </section>

                          </b-col>

                          <b-col cols="12" md="6">
                              <b-form-group>
                                <template #label>
                                  {{ $t('Número de Personas') }}: <span class="text-danger">*</span>
                                </template>
                            
                                <validation-provider name="personas" rules="required|min:1" #default="{ valid, errors }">
                            
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

                  <tab-content :title="$t('Nota')" icon="fas fa-comment">
                    <b-card>
                       <b-form-group :label="$t('Observación')" :description="$t('Agregue una observación o requerimiento a la reserva')" >
                  
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
                      {{ $t('Reservar') }}
                    </b-button>

                    <b-button variant="primary"  type="button" v-else @click="activeTabIndex++" :disabled="btnDisponible(activeTabIndex)" >
                     {{ $t('Siguiente') }}
                    </b-button>
                  </template>


          </form-wizard>
      </b-form>
    </validation-observer>

    <!-- Si el usuario no Ha seleccionado un destino, debe hacerlo  -->
        <el-dialog title="Elija un Destino" :visible.sync="showDestino" width="90%" :show-close="false"
           :close-on-click-modal="false" :close-on-press-escape="false" class="dialogo-seleccion-destino">

           <template #title>
              <h3 class="card-title">
                 <strong class="text-primary">
                    Comencemos
                 </strong>
                 por elegir un destino
              </h3>
           </template>
           <destino-selected isSelected @destinoSelected="destinoSeleccionado" />
        </el-dialog>
  </section>
   
</template>


<script>

import store from '@/store'
import router from '@/router'
import {onMounted,toRefs,ref,computed,watch,inject} from 'vue'

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
  BFormTextarea,
  BBreadcrumb,
  BBreadcrumbItem
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
      BFormTextarea,
      BBreadcrumb,
      BBreadcrumbItem,
      destinoSelected: () => import('components/DestinoSelected.vue'),

  },

  setup(props,{emit}){
    const {reservacion:formulario} = toRefs(store.state.reservacion)
    
    const negocio_id = computed(() => formulario.value.negocio_id)
    const usuario_id = computed(() => formulario.value.usuario_id)
    const {usuario} = toRefs(store.state.usuario)
    const formValidate = ref(null)
    const wizarRef = ref(null)
    const horas = ref([])
    const destino_id = ref(localStorage.getItem('destino_id') || usuario.value.destino_id)
    const lugares = ref(0)
    const showDestino = ref(false)
    const {destino,destinos} = toRefs(store.state.destino)

    const swal = inject('swal')
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

      if(destino_id.value){
        store.dispatch('destino/fetch',destino_id.value)
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

    watch(destino_id,() => {
      store.dispatch('destino/fetch', destino_id.value)
      
    })

    const consultarHoras = (fecha) => {
     
      if(!formulario.value.id){
         formulario.value.hora = null
      }
     
      lugares.value = 0

      store.dispatch('reservacion/consultarHoras', { negocio: formulario.value.negocio_id, fecha: fecha })
      .then((hours) => horas.value = hours)

    } 

    // const establecerLugaresDisponibles = (hora, lars) => {
    //   // console.log(hora, lars)
    //   formulario.value.personas = 0
    //   lugares.value = lars - store.getters['reservacion/lugaresOcupados']({ fecha: formulario.value.fecha, hora: hora })
    // }

     const establecerLugaresDisponibles = (hora, lars) => {
      formulario.value.personas = 0
     

      lugares.value = lars - store.getters['reservacion/lugaresOcupados']({ fecha: formulario.value.fecha, hora: hora })
      let fecha_selected = moment(`${formulario.value.fecha} ${hora}`);

      if(fecha_selected.isBefore(moment())){
        setTimeout(() => {
            formulario.value.hora = null
        }, 400);
          
          swal({
            icon: 'info',
            title: "La hora seleccionada ha pasado. Por favor, elige otro momento.",
            cancelButtonText: 'Ok',
            showCancelButton: true,
            showConfirmButton: false
          })
      }else if(lugares.value < 1){
        setTimeout(() => {
          formulario.value.hora = null
        }, 400);

        swal({
          icon: 'info',
          title: "Esta hora no tiene lugares disponibles. Por favor, selecciona otro horario.",
          cancelButtonText: 'Ok',
          showCancelButton: true,
          showConfirmButton: false
        })
      }

    
    }


     const destinoSeleccionado = (dest_id) => {
         localStorage.setItem('destino_id', dest_id)
         destino_id.value = localStorage.getItem('destino_id')
        //  cargarForm();
         showDestino.value = false
         // window.location.reload();
      }

    
     const limpiarDestinos = () => {
         localStorage.removeItem('destino_id')
         showDestino.value = true
    }

    watch(() => formulario.value.negocio_id,() => {
      // wizarRef.value.nextTab();
    })  

    const negocioSeleccionado = () => {
      formulario.value.usuario_id = null
      wizarRef.value.nextTab()
    }

    return {
        destinoSeleccionado,
        loading:computed(() => store.state.loading),
        formulario,
        formValidate,
        showDestino,
        destino_id,
        guardar,
        required,
        min,
        wizarRef,
        limpiarDestinos,
        consultarHoras,
        horas,
        lugares,
        negocioSeleccionado,
        getDestinoName: computed(() => {

          if (destino_id.value && destino.value.id){
          
            return destino.value.nombre || ''
          } else {
            return 'Elejir Destino'
          }

        }),
        rutaDestino: computed(() => {
          if (destino_id.value && destinos.value.length) {

            let desti = destinos.value.find(val => val.id == destino_id.value)
            return desti != undefined ? desti.ruta : ''

          } else {
            return '#'
          }
        }),
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

<style lang="scss">
.el-dialog {
   width: 80% !important;
}

</style>

<style lang="scss" scoped>
   .dialogo-seleccion-destino::v-deep .el-dialog__body {
      padding-top: 0px !important;
   }
</style>
