<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
        <b-card>


          <b-container fluid class="px-0 mx-0">

            <b-row>
              <b-col cols="12" md="6">

                <b-form-group >
                  <template #label>
                    Usuario:<span class="text-danger">*</span>
                  </template>

                  <validation-provider name="usuario_id" rules="required" #default="{valid,errors}">
                      <v-select v-model="formulario.usuario_id"  :filter="filterUsuarios" :options="usuarios" :reduce="(option) => option.id ">
                          <template #no-options>
                            Sin Usuarios
                          </template>

                          <template #option="{nombre,email,apellido,avatar}">
                             <b-avatar :src="avatar" size="sm" class="mr-1"  />  <small> {{ `${nombre} ${apellido} - ${email}` }}</small> 
                          </template>

                          <template #selected-option="{nombre,email,apellido,avatar}">
                            <b-avatar :src="avatar" size="sm" class="mr-1" /> <small>{{ `${nombre} ${apellido} - ${email}` }} </small> 
                          </template>


                      </v-select>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>

                  </validation-provider>

                </b-form-group>
                
                <b-form-group>
                  <template #label>
                    Fecha de la reserva: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="fecha" #default="{valid,errors}">
                      
                    
                    <flat-pickr v-model="formulario.fecha" class="form-control" :config="{ dateFormat: 'Y-m-d', minDate: 'today', defaultDate: 'today', onChange:(_,dateStr) => consultarHoras(dateStr)  }"
                          placeholder="Today "  />

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0]  }}
                    </b-form-invalid-feedback>

                  </validation-provider>
                </b-form-group>

                        <el-divider content-position="left">Horas Disponibles</el-divider>
                        
                        <section class="d-flex flex-wrap" v-if="horas.length > 0 ? true : false">
                          <b-form-group description="AL seleccionar la hora, buscaremos la cantidad de lugares">
                        
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

              </b-col>

              <b-col cols="12" md="6">

                  <b-form-group>
                      <template #label>
                        Número de Personas: <span class="text-danger">*</span>
                      </template>
                    
                      <validation-provider name="personas" rules="required|min:1" #default="{valid,errors}">
                    
                        <b-form-spinbutton v-model="formulario.personas" :min="0" :max="lugares"
                          :disabled="!formulario.hora" :state="valid"></b-form-spinbutton>
                    
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                    
                      </validation-provider>
                </b-form-group>

                <b-form-group label="Observación" description="Agregue una observación o requerimiento a su Reserva" >
                  
                  <validation-provider name="observacion" #default="{valid,errors}">
                    <b-form-textarea v-model="formulario.observacion" :state="valid" :rows="4"></b-form-textarea>

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
                <b-button variant="primary" type="submit" title="Guardar" v-loading="loading" :disabled="loading">
                  <feather-icon icon="SaveIcon"/>
                  Guardar
                </b-button>

                <b-button variant="dark" @click="regresar" title="Regresar" v-loading="loading">
                  <feather-icon icon="ArrowLeftIcon" />
                  Regresar
                </b-button>

              </b-button-group>
          </template>
        </b-card>
      </b-form>
    </validation-observer>
</template>

<script>

import {ValidationProvider,ValidationObserver} from 'vee-validate'
import flatPickr from 'vue-flatpickr-component'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BForm,
  BFormRadioGroup,
  BFormRadio,
  BFormSpinbutton,
  BFormTextarea,
  BAvatar


} from 'bootstrap-vue'

import { required,min } from '@validations'

import {regresar} from '@core/utils/utils'

import {toRefs,ref,computed,onMounted,toRef,watch, onActivated} from '@vue/composition-api'

import store from '@/store'
import vSelect from 'vue-select'


export default {
  

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    ValidationProvider,
    ValidationObserver,
    BForm,
    flatPickr,
    BFormRadioGroup,
    BFormRadio,
    BFormSpinbutton,
    BFormTextarea,
    vSelect,
    BAvatar

  },


  setup(props,{emit}){

    const formValidate  = ref(null)
    const {negocio} = toRefs(store.state.negocio)
    const { reservacion: formulario, } = toRefs(store.state.reservacion)
    const {usuarios} = toRefs(store.state.usuario)
    
    const horas = ref([])
    const lugares = ref(0)

    const guardar = () => {
      formulario.value.negocio_id = negocio.value.id
      emit('save',formulario.value,formValidate.value)
    } 

    const consultarHoras = (fecha) => {
     
      if(!formulario.value.id){
         formulario.value.hora = null
      }
     
      lugares.value = 0

      store.dispatch('reservacion/consultarHoras', { negocio: negocio.value.id, fecha: fecha })
      .then((hours) => horas.value = hours)

    } 


    const cargarForm = () => {


        if(negocio.value.id){

          store.dispatch('reservacion/getReservacionesNegocio', negocio.value.id)

          if (!formulario.value.id) {
            formulario.value.hora = null
          }
          
          formulario.value.negocio_id = negocio.value.id

          formulario.value.fecha = moment().format('YYYY-MM-DD');


          consultarHoras(formulario.value.fecha)
          if(formulario.value.id){
            establecerLugaresDisponibles(formulario.value.hora,horas.value.find(val => val.hora === formulario.value.hora).lugares)
          }
        } 

        if(!usuarios.value.length){
          store.dispatch('usuario/cargarUsuarios');
        }

       


       
    }

    onActivated(() => cargarForm())
    onMounted(() => cargarForm())
    watch([negocio],() => cargarForm())


    const formatoHora =  (hora) => moment(`2020-01-01 ${hora}`).format('hh:mm A') 

    const filtrarUsuario = ({ nombre, apellido, email }, label, search) => {
      return ([nombre,apellido,email].toString() || '').toLocaleLowerCase().indexOf(search.toLocaleLowerCase()) > -1
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
      negocio,
      guardar,
      required,
      regresar,
      consultarHoras,
      horas,
      formatoHora,
      lugares,
      usuarios,
      min,
      filterUsuarios:(options,search) => {
        return options.filter(option => {
          
          let label = option.nombre

          return filtrarUsuario(option, label, search);
        });
      },
      filtrarUsuario,

      establecerLugaresDisponibles,
     
    }

  }
  
}
</script>


<style lang="scss" >
@import '~@core/scss/vue/libs/vue-flatpicker.scss';

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

