<template>
  <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">

        <p>Saldo actual: <strong v-if="divisa" :class="{'text-danger' : saldo < 0}" >{{ saldo | currency(divisa.simbolo) }} {{ divisa.iso.toUpperCase(0) }}</strong></p>

        <p>Saldo después de la venta: </p>

        <b-card body-class="altura-container-search" :style="{'background-image':`url(${imageBanner})`}">
          <search-user text-search="Nombre de usuario del cliente" legend-tooltip="Ingrese el nombre propio, nombre de usuario o correo electrónico del socio de Travel Points. Verifique su coincidencia cuidadosamente." @userSelected="usuarioSeleccionado" />

        </b-card>

        <b-card v-if="reserva">
          <h3>Reservación asociada</h3>

          <table class="table table-sm table-hover table-bordered  w-100 mt-1">
            <thead >

              <th>
                Fecha
              </th>
              <th>
                Personas
              </th>
            </thead>

            <tbody>
              <tr>
                <td>
                  {{  `${reserva.fecha} ${reserva.hora}` | fecha('YYYY-MM-DD hh:mm A')  }}
                </td>
                <td>
                  {{ reserva.personas }} Pax
                </td>
              </tr>
            </tbody>

          </table>

          <el-divider content-position="left">Observación de la reserva</el-divider>

          <p class="font-weight-bolder text-justify"> {{ reserva.observacion  }}</p>

        </b-card>

        <b-card>
          <b-container fluid>
            <b-row>
              <b-col cols="12" md="3">
                <b-form-group>
                  <template #label>
                    Divisa: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="divisa_id" rules="required" #default="{valid,errors}">

                      <v-select v-model="formulario.divisa_id" :options="divisas.filter(val => !val.principal)" :reduce="option => option.id" label="nombre">  </v-select>

                      <b-form-invalid-feedback :state="valid">
                        {{  errors[0]  }}
                      </b-form-invalid-feedback>

                  </validation-provider>
                </b-form-group>

              

              </b-col>

              <b-col cols="12" md="3">
                  <b-form-group>
                    <template #label>
                      Total de venta: <span class="text-danger">*</span>
                    </template>
                  
                    <validation-provider name="monto" rules="required" #default="{valid,errors}">
                  
                      <currency-input v-model="formulario.monto" :options="{ currency: getCurrency, autoDecimalDigits:true }" InputClass="form-control"></currency-input>
                  
                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
              </b-col>

              <b-col cols="12" md="3">
                  <b-form-group>
                    <template #label>
                      Personas: <span class="text-danger">*</span>
                    </template>
                  
                    <validation-provider name="personas" rules="required" #default="{valid,errors}">
                  
                      <b-form-spinbutton v-model="formulario.personas" :min="1" :state="valid" ></b-form-spinbutton>
                  
                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>

                    </validation-provider>
                  </b-form-group>
              </b-col>

              <b-col cols="12" md="3">
                <b-form-group :description="negocio.tipo_comision == 1 ? 'Porcentaje sobre el monto total de la venta' : 'Monto por persona'">

                  <template #label>
                    TravelPoints de esta Venta Tps 
                  </template>
              
                  <validation-provider name="tps" rules="required" #default="{valid,errors}">

                    <b-input-group >

                      <b-input-group-prepend is-text>
                        <span class="" v-if="negocio.tipo_comision == 2">
                          {{  negocio.comision | currency(negocio.divisa.simbolo)  }}
                        </span>

                          <span class="" v-else>
                            {{ negocio.comision }} %
                          </span>

                      </b-input-group-prepend>
                      <b-form-input readonly v-model="formulario.tps" :state="valid"></b-form-input>

                    </b-input-group>
                    
              
                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
              
                  </validation-provider>
                </b-form-group>
              </b-col>



            </b-row>

          </b-container>

          <template #footer>
            <b-button-group size="sm">
              <b-button type="submit" variant="primary" title="Registrar Venta" v-loading="loading" :disabled="loading || !formulario.cliente_id">
                <feather-icon icon="SendIcon"/>
                Registrar Venta
              </b-button>

              <b-button variant="dark" @click="regresar" title="regresar" v-loading="loading">
                <feather-icon icon="ArrowLeftIcon"/>
                Regresar
              </b-button>
            </b-button-group>
          </template>
        </b-card>

        


    </b-form>
  </validation-observer>


</template>


<script>

import {ValidationObserver, ValidationProvider} from 'vee-validate'



import {
  BForm,
  BCard,
  BContainer,
  BCol,
  BRow,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BFormGroup,
  BFormInput,
  BInputGroup,
  BInputGroupPrepend,
  VBTooltip,
  BFormSpinbutton,
} from 'bootstrap-vue'

import {required} from '@validations'

import { regresar } from '@core/utils/utils'

import store from '@/store'
import {toRefs,ref,computed,onMounted,inject,watch, onActivated} from 'vue';

import { optionsCurrency } from '@core/utils/utils'

import vSelect from 'vue-select'

export default {

  components:{
    BForm,
    BCard, BContainer,
    BCol,
    BRow,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    ValidationObserver,
    ValidationProvider,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupPrepend,
    BFormSpinbutton,
    vSelect,
    CurrencyInput:() => import('components/CurrencyInput.vue'),

    SearchUser:() => import('components/SearchUser.vue')
    // FormWizard:() => import('@/views/forms/form-wizard/FormWizard.vue')

  },

  directives:{
    'b-tooltip' : VBTooltip
  },

  onActivated(){
    this.cargarForm();
  },

  setup(props,{emit}){
    const formValidate = ref(null)

    const {venta:formulario} = toRefs(store.state.venta)
    const {negocio} = toRefs(store.state.negocio)
    const search = ref('')
    const reserva = ref(null)

    const { divisas }  = toRefs(store.state.divisa)

    const tps = computed(() => {

      if(negocio.value.tipo_comision == 2){

        return negocio.value.comision * formulario.value.personas
      }

      return formulario.value.monto * negocio.value.comision / 100
    })

    

    const guardar = () => {
      
      formulario.value.model_type = "App\\Models\\Negocio\\Negocio";
      formulario.value.model_id = negocio.value.id

      formulario.value.tipo_comision = negocio.value.tipo_comision;
      formulario.value.comision = negocio.value.comision;

      emit('save',formulario.value,formValidate.value)
    }   

    const swal = inject('swal')

    const verificarReservaciones = (reservaciones) => {

      reserva.value = null
      const reserva_hoy = reservaciones.find(val => val.fecha === moment().format('YYYY-MM-DD') && val.status === 1)

      if (reserva_hoy != undefined){

        swal({
          icon: 'info',
          title: '¡Este usuario tiene una reserva para hoy!',
          text: '¿ Deseas adjudicarla a esta venta ?',
          confirmButtonText:'Sí',
          cancelButtonText:'Nó',
          showCancelButton:true,
          customClass: {
            confirmButton: 'btn btn-success',
          },
        }).then(({ isConfirmed, isDenied, isDismissed }) => {

            if(isConfirmed){
              toast.info('Reserva agregada a la venta',{position:'bottom-right'})
              reserva.value = reserva_hoy
              formulario.value.reservacion_id = reserva_hoy.id

            } else if (isDismissed){

              swal({
                icon: 'info',
                title: '¿ Vendrá para la reservación pendiente para hoy ? ',
                confirmButtonText: 'Sí',
                cancelButtonText: 'Nó, La cancelaremos',
                showCancelButton: true,
                customClass: {
                  confirmButton: 'btn btn-success',
                },
              }).then(({ isConfirmed, isDenied, isDismissed }) => {

                if(isConfirmed){
                  toast.info('Ok!')
                } else if (isDismissed){

                  store.dispatch('reservacion/cancelar',reserva_hoy.id).then(({result}) => {
                    if(result){
                      toast.info('Hemos cancelado la reservación que ténia pendiente',{position:'bottom-right'})
                    } 
                  })
                }

              })
              
            }
        })

      }

    } 

    const usuarioSeleccionado = (user) => {
      formulario.value.cliente_id  = user.id

      verificarReservaciones(user.reservaciones)
    } 
    const cargarForm =() => {

      if (!divisas.value.length) {
        store.dispatch('divisa/getDivisas')
      }

      formulario.value.divisa_id = negocio.value.divisa_id
      formulario.value.tps = tps.value
    }

    // onActivated(() => cargarForm())
    onMounted(() => cargarForm())
    watch([negocio],() => cargarForm())

    watch(tps,(val) => formulario.value.tps = val)
    return {
      reserva,
      search,
      regresar,
      required,
      formulario,
      formValidate,
      guardar,
      usuarioSeleccionado,
      divisas,
      optionsCurrency,
      negocio,
      tps,
      cargarForm,
      getCurrency:computed(() => {

        const divisa = divisas.value.find(val => val.id === formulario.value.divisa_id)

        if(divisa != undefined){
          return divisa.iso.toUpperCase()
        }

        return negocio.value.id ? negocio.value.divisa.iso.toUpperCase() : 'MXN';

      } ),

      saldo:computed(() => negocio.value.cuenta ? negocio.value.cuenta.saldo : 0),
      divisa:computed(() => negocio.value.divisa),
      loading:computed(() => store.state.loading),

      imageBanner: require('@images/banner/banner-travel.jpg'),

    }
  }
}
</script>

<style lang="scss">
.altura-container-search{
    height:160px;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
  }
</style>