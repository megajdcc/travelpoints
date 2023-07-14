<template>
  <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">

        <p>Saldo actual: <strong v-if="divisa" :class="{'text-danger' : saldo < 0}" >{{ saldo | currency(divisa.simbolo) }} {{ divisa.iso.toUpperCase(0) }}</strong></p>

        <p>Saldo después de la venta:  <strong v-if="divisa" :class="{ 'text-danger': saldo_pos_venta < 0 }" >{{ saldo_pos_venta | currency(divisa.simbolo) }} {{ divisa.iso.toUpperCase(0) }}</strong></p>

        <p>Comisión para TravelPoints:  <strong v-if="divisa" class="text-warning" >{{ formulario.comision_travel | currency(divisa.simbolo) }} {{ divisa.iso.toUpperCase(0) }}</strong></p>

        <!-- :style="{'background-image':`url(${imageBanner})`}" -->
        <b-card body-class="altura-container-search" title="Identifique al Viajero de TravelPoints (Teclee su nombre de usuario)" >
          <search-user text-search="Nombre del viajero (Identifiquelo con su nombre de usuario)" legend-tooltip="Ingrese el nombre propio, nombre del viajero o correo electrónico del viajero de Travel Points. Verifique su coincidencia cuidadosamente." @userSelected="usuarioSeleccionado" :usuarioSeleccionado="userSeleccionado" />

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
                          {{  negocio.tps_referido | currency()  }}
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

            <el-divider content-position="left" v-if="cupones.length">Cupones</el-divider>
            
            <b-row>
               <b-col cols="12"  v-for="(cupon, i) in cupones" :key="i">
                       <b-card no-body class="p-1 d-flex flex-column">

                          <section class="d-flex justify-content-between align-items-md-center flex-wrap flex-column flex-md-row">
                             <section class="d-flex align-items-md-center flex-md-row flex-column">
                                <b-badge :variant="getVariantStatus(cupon)" class="mr-1">
                                   {{ getStatusCupon(cupon) }}
                                </b-badge>
                                <strong class="text-warning">
                                   Inicia: {{ cupon.expide | fecha('LL') }} & Termina: {{ cupon.vence | fecha('LL') }} | Disponibles: {{
                                     cupon.disponibles }} | Valor: {{ cupon.precio | currency(cupon ? cupon.divisa.iso : '') }}
                                </strong>

                             </section>
                     
                             <b-button-group size="sm">

                                <b-button variant="success" @click="aplicarCupon(cupon.id)" title="Aplicar Cupón" v-if="!formulario.cupon_id" >
                                   <font-awesome-icon icon="fas fa-check" />
                                   Aplicar Cupón
                                </b-button>

                                <b-button variant="danger" @click="quitarCupon(cupon.id)" title="Quitar Cupón" v-else >
                                    <font-awesome-icon icon="fas fa-trash" />
                                    Quitar Cupón
                                </b-button>

                               

                             </b-button-group>

                          </section>
                          <hr>

                          <section class="d-flex align-items-center justify-content-between flex-wrap flex-md-nowrap">

                             <article class="d-flex justify-content-center flex-grow-0 flex-shrink-1">
                                   <b-img :src="`/storage/negocios/cupones/${cupon.imagen}`" class="img-card" style="max-width:320px"/>
                             </article>

                             <main class="flex-grow-1 flex-chrink-0 mt-1 mt-md-0 ml-1">
                           
                                <h4 :title="cupon.nombre" class="text-warning">
                                   {{ cupon.nombre }}
                                </h4>
                           
                                <p class="text-justify" :title="cupon.nombre" >
                                   {{ cupon.descripcion }}
                                </p>

                                <section class="d-flex justify-content-between flex-wrap flex-md-nowrap">
                                   <article class="d-flex flex-column mr-md-1">
                                      <strong class="text-warning font-weight-bolder">Condiciones</strong>
                                      <p class="text-justify">
                                         {{ cupon.condiciones }}
                                      </p>
                                   </article>

                                   <article class="d-flex flex-column ">
                                      <strong class="text-warning font-weight-bolder ">Restricciones</strong>
                                      <p class="text-break text-justify">
                                         {{ cupon.restricciones }}
                                      </p>
                                   </article>
                             
                                </section>

                        
                             </main>

                          </section>

                      

                       </b-card>
                    </b-col>
            </b-row>

          </b-container>

        

          <template #footer>
            <b-button-group size="sm">
              <b-button type="submit" variant="primary" title="Registrar Venta" v-loading="loading" :disabled="loading || !formulario.cliente_id || saldo_pos_venta < 0">
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
  BBadge,
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
  BImg
} from 'bootstrap-vue'

import {required} from '@validations'

import { regresar } from '@core/utils/utils'

import store from '@/store'
import {toRefs,ref,computed,onMounted,inject,watch, onActivated} from 'vue';

import { optionsCurrency } from '@core/utils/utils'

import vSelect from 'vue-select'
import router from '@/router'

export default {

  components:{
    BForm,
    BCard, BContainer,
    BCol,
    BRow,
    BImg,
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
    BBadge,
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


  props:{
    reservaId:String|Number
  },

  setup(props,{emit}){

    const formValidate = ref(null)
    const cupones = ref([]);
    const {venta:formulario} = toRefs(store.state.venta)
    const {negocio} = toRefs(store.state.negocio)
    const search = ref('')
    const reserva = ref(null)
    const {reservaId} = toRefs(props);
    const userSeleccionado = ref({})
    const comision_travel = computed(() => {
      
      //  Monto por venta
      if (negocio.value.tipo_comision == 2) {
        return negocio.value.comision * formulario.value.personas
      }

      return formulario.value.monto * negocio.value.comision / 100
    })

    const { divisas }  = toRefs(store.state.divisa)

    const tps = computed(() => {

      //  Monto por venta
      if(negocio.value.tipo_comision == 2){
        return negocio.value.tps_referido * formulario.value.personas
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
      cupones.value = [];
      formulario.value.cliente_id  = user.id

      verificarReservaciones(user.reservaciones)
      cupones.value = user.cupones.filter(val => val.pivot.status == 1 && val.activo == true)
    } 

    const cargarForm =() => {

      
      if (!divisas.value.length) {
        store.dispatch('divisa/getDivisas')
      }

      formulario.value.divisa_id = negocio.value.divisa_id
      formulario.value.tps = tps.value
      formulario.value.comision_travel = comision_travel.value

      if(reservaId.value){

        store.dispatch('reservacion/fetch',reservaId.value).then((data) => {
          reserva.value = data
          formulario.value.cliente_id = data.usuario.id
          cupones.value = data.usuario.cupones
          formulario.value.reservacion_id = reservaId.value
          userSeleccionado.value = data.usuario
        })
      }

    }

    // onActivated(() => cargarForm())
    onMounted(() => cargarForm())
    watch([negocio],() => cargarForm())

    watch(tps,(val) => {
        formulario.value.tps = val
    })

    watch(comision_travel, (val) => {
      formulario.value.comision_travel = val
    })
    
    const saldo = computed(() => negocio.value.cuenta ? negocio.value.cuenta.saldo : 0)
    const saldo_pos_venta = computed(() => saldo.value - comision_travel.value) 

    watch(saldo_pos_venta,(val) => {
      if(val < 0){

          swal({
            icon: 'info',
            title: 'No puedes registrar la venta, porque no tienes fondos',
            message:'Porfa recarga mas saldo para poder continuar',
            confirmButtonText: 'Ok, Quiero recargar',
            cancelButtonText:'Ok, no quiero recargar ahora mismo',
            showCancelButton: true,
           
          }).then(({ isConfirmed}) => {

            if (isConfirmed) {
              router.push({name:'negocio.movimientos'});
            }

          })
      }

    })

    const aplicarCupon = (cupn) => {
        formulario.value.cupon_id = cupn
        toast.success("Cupón Aplicado con éxito")
    }

    const quitarCupon = () => {
      formulario.value.cupon_id = null
      toast.info("Cupón Quitado")
    }

    return {
      reserva,
      search,
      regresar,
      required,
      formulario,
      formValidate,
      guardar,
      usuarioSeleccionado,
      userSeleccionado,
      divisas,
      optionsCurrency,
      negocio,
      tps,
      cupones,
      cargarForm,
      quitarCupon,
      getCurrency:computed(() => {

        const divisa = divisas.value.find(val => val.id === formulario.value.divisa_id)

        if(divisa != undefined){
          return divisa.iso.toUpperCase()
        }

        return negocio.value.id ? negocio.value.divisa.iso.toUpperCase() : 'MXN';

      } ),

      saldo,
      divisa:computed(() => negocio.value.divisa),
      loading:computed(() => store.state.loading),

      imageBanner: require('@images/banner/banner-travel.jpg'),
      comision_travel,
      saldo_pos_venta,
      aplicarCupon,
      getVariantStatus: (cupo) => {
        let fecha_actual = moment();

        let fecha_inicio = moment(cupo.expide);
        let fecha_termina = moment(cupo.vence);

        return fecha_actual.isBetween(fecha_inicio, fecha_termina) ? 'success' : 'danger'

      },
      getStatusCupon: (cupo) => {
        let fecha_actual = moment();

        let fecha_inicio = moment(cupo.expide);
        let fecha_termina = moment(cupo.vence);

        if (fecha_actual.isAfter(fecha_termina)) {
          return 'Expirado';
        }

        return fecha_actual.isBetween(fecha_inicio, fecha_termina) ? 'Activo' : 'No activo'

      },
      

    }
  }
}
</script>

<style lang="scss">
.altura-container-search{
    height: auto;
    display: flex;
    align-items: stretch;
    flex-direction: column;
    justify-content: center;
    max-height: 200px;
  }
</style>