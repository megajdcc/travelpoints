<template>
  <validation-observer ref="formValidate" #default="{handleSubmit}">

    <b-form @submit.prevent="handleSubmit(enviarReserva)">
      <b-modal :visible="isShowDialog" centered @hide="cerrarModal" title="Crea tu reserva" @show="cargarForm">
        <b-form-group>
          <template #label>
            Fecha de la reserva: <span class="text-danger">*</span>
          </template>
        
          <validation-provider name="fecha" #default="{valid,errors}">
        
        
            <flat-pickr v-model="formulario.fecha" class="form-control"
              :config="{ dateFormat: 'Y-m-d', minDate: 'today', defaultDate: 'today', onChange:(_,dateStr) => consultarHoras(dateStr)  }"
              placeholder="Today " />
        
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
        
          </validation-provider>
        </b-form-group>

        <el-divider content-position="left">Horas Disponibles</el-divider>
        
        <section class="d-flex flex-wrap" v-if="horas.length > 0 ? true : false">
          <b-form-group description="AL seleccionar la hora, buscaremos la cantidad de lugares disponibles">
        
            <validation-provider name="hora" rules="required" #default="{valid,errors}">
        
              <b-form-radio v-model="formulario.hora" v-for="(hora,i) in horas" :key="i" button button-variant="primary"
                class="btn-horas" size="sm mx-1" :value="hora.hora" :state="valid"
                @input="establecerLugaresDisponibles($event,hora.lugares)">
                {{ hora.hora | fecha('hh:mm A',true) }}
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

        <b-form-group>

          <template #label>
            Número de Personas: <span class="text-danger">*</span>
          </template>
        
          <validation-provider name="personas" rules="required|min:1" #default="{valid,errors}">
        
            <b-form-spinbutton v-model="formulario.personas" :min="0" :max="lugares" :disabled="!formulario.hora"
              :state="valid"></b-form-spinbutton>
        
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }}
            </b-form-invalid-feedback>
        
          </validation-provider>

        </b-form-group>
        
        <b-form-group label="Observación" description="Agregue una observación o requerimiento a su Reserva">
        
          <validation-provider name="observacion" #default="{valid,errors}">
            <b-form-textarea v-model="formulario.observacion" :state="valid" :rows="4" placeholder="Agregue una observación o requerimiento a su Reserva"></b-form-textarea>
        
            <b-form-invalid-feedback :state="valid">
              {{ errors[0] }} 
            </b-form-invalid-feedback>
          </validation-provider>
        </b-form-group>



        <template #modal-footer="{hide}">
            <b-button-group size="sm">
              <b-button variant="primary" @click="enviarReserva" title="Enviar Reservar" :disabled="loading || formulario.personas < 1" v-loading="loading">
                <font-awesome-icon icon="fas fa-paper-plane" />
                Enviar Reserva
              </b-button>

              <b-button variant="dark" title="Cerrar" @click="hide" >
                <font-awesome-icon icon="fas fa-xmark" />
                Cerrar
              </b-button>
            </b-button-group>
          </template>

      </b-modal>
    </b-form>
   
  </validation-observer>
   
</template>


<script>

import {
  BModal,
  BContainer,
  BRow,
  BButtonGroup,
  BButton,
  BFormInput,
  BFormGroup,
  BFormInvalidFeedback,
  BForm,
  BFormRadio,
  BFormSpinbutton,
  BFormTextarea

} from 'bootstrap-vue';

import flatPickr from 'vue-flatpickr-component'
import {ValidationObserver,ValidationProvider}  from 'vee-validate'
import {required} from '@validations';

import store from '@/store'
import { toRefs, ref, computed, onMounted,onActivated,watch,inject } from 'vue'
import useAuth from '@core/utils/useAuth';
export default {
  
  components:{
    BModal,
    BContainer,
    BRow,
    BButtonGroup,
    BButton,
    BFormInput,
    BFormGroup,
    BFormInvalidFeedback,
    ValidationObserver,
    ValidationProvider,
    BForm,
    flatPickr,
    BFormRadio,
    BFormSpinbutton,
    BFormTextarea
  },

  props:['isShowDialog'],

  model:{
    prop: 'isShowDialog',
    event:'update:isShowDialog'
  },

  setup(props,{emit}){


    const swal = inject('swal')

    const lugares = ref(0)

    const { isShowDialog } = toRefs(props)
    const formValidate = ref(null)
    const {negocio} = toRefs(store.state.negocio)
    const { reservacion: formulario, } = toRefs(store.state.reservacion)
    const horas = ref([])
    const {usuario} = toRefs(store.state.usuario)


    const enviarReserva = () => {
      formValidate.value.validate().then(result => {

          if(result){

            formulario.value.usuario_id = usuario.value.id;


            store.dispatch('reservacion/guardar', formulario.value).then(({ result }) => {

              if (result) {
                // toast.success('Se ha generado con éxito la reservación', { position: 'bottom-right' })

                 swal({
                    icon: 'success',
                    title: 'Su reserva ha sido enviada con éxito!',
                    cancelButtonText:'Ok',
                    showCancelButton:true,
                    showConfirmButton:false
                   
                  })

                store.commit('reservacion/clear')

                emit('update:isShowDialog', false)

              } else {
                toast.info('No se pudo generar la reserva, inténte de nuevo mas tarde...', { position: 'bottom-right' })
                emit('update:isShowDialog', false)
              }

            }).catch(e => {

              console.log(e)

              if (e.response.status === 422) {
                formValidate.value.setErrors(e.response.data.errors)
              }

            })

          }

      })
    }

    const consultarHoras = (fecha) => {

      if (!formulario.value.id) {
        formulario.value.hora = null
      }

      lugares.value = 0

      store.dispatch('reservacion/consultarHoras', { negocio: negocio.value.id, fecha: fecha })
        .then((hours) => horas.value = hours)

    } 


    const cargarForm = () => {


      if (negocio.value.id) {

        store.dispatch('reservacion/getReservacionesNegocio', negocio.value.id)

        if (!formulario.value.id) {
          formulario.value.hora = null
        }

        formulario.value.negocio_id = negocio.value.id

        formulario.value.fecha = moment().format('YYYY-MM-DD');


        consultarHoras(formulario.value.fecha)

        if (formulario.value.id) {
          establecerLugaresDisponibles(formulario.value.hora, horas.value.find(val => val.hora === formulario.value.hora).lugares)
        }
      }

    }

    const {
      is_loggin
    } = useAuth();

    onActivated(() => {
        if(is_loggin){
          cargarForm();
        }
    })
    onMounted(
      () => {
        if (is_loggin) {
          cargarForm();
        }
      }
    )
    watch([negocio], () => {
      if (is_loggin) {
        cargarForm();
      }
    })

    const formatoHora = (hora) => moment(`2020-01-01 ${hora}`).format('hh:mm A') 

    const establecerLugaresDisponibles = (hora, lars) => {
      // console.log(hora, lars)
      formulario.value.personas = 0
      lugares.value = lars - store.getters['reservacion/lugaresOcupados']({ fecha: formulario.value.fecha, hora: hora })
    }

    const cerrarModal = () => {

      store.commit('reservacion/clear')

      emit('update:isShowDialog',false)
    }

    return {

      loading:computed(() => store.state.loading),
      formatoHora,
      establecerLugaresDisponibles,
      consultarHoras,
      required,
      formValidate,
      enviarReserva,
      formulario,
      lugares,
      horas,
      cerrarModal
    }

  }

}

</script>

<style lang="scss">
@import '~@core/scss/vue/libs/vue-flatpicker.scss';

.btn-horas {

  .active {
    background-color: $success !important;
    border: 1px solid $success !important;
  }
}

.horas-no-disponible {
  border-radius: 10px;
  display: flex;
  justify-content: center;
  padding: 1rem;
  font-weight: 900;

}

</style>