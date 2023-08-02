<template>
    <b-sidebar :visible="showAgenda" @change="$emit('update:showAgenda',$event)"  
    sidebar-class="agenda-form-content" backdrop :width="currentBreakpoint  == 'xs' ? '320px' : '450px'" @hidden="limpiar">
      <template #title>
        <h3>{{ `Agregar ${getTitle}` }}</h3>
        <p v-if="sobre" class="text-black-50" style="font-size:10pt !important">Sobre {{ sobre }}</p>
      </template>

      <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardar)">
          <b-container fluid>
            <b-row>
              <b-col cols="12">
                <b-form-group >
                  <template #label>
                    Titulo: <span class="text-danger"></span>
                  </template>

                  <validation-provider name="titulo" rules="required" #default="{errors,valid}">
                    <b-form-input v-model="formulario.titulo" :state="valid" placeholder="Añade un título"/>

                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>


                <b-form-group>
                  <template #label>
                      Fecha {{ ['del','de la','del'][tipo - 1] + ' ' + getTitle }}: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="fecha_inicio" rules="required" #default="{ valid, errors }">
                    <el-date-picker
                          v-model="formulario.fecha_inicio"
                          :type="!formulario.all_dia ? 'datetime' : 'date' "
                          placeholder="Seleccione la fecha de inicio"  class="w-100" :picker-options="optionsDate">
                        </el-date-picker>
                        <!-- <flat-pickr v-model="formulario.fecha_inicio" class="form-control form-control-md " ref="formTimeRef"
                        :config="{ maxDate: formulario.fecha_fin, enableTime: false, dateFormat: 'Y-m-d' }" /> -->

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>

                    </validation-provider>

                </b-form-group>

                <b-form-group v-if="tipo == 3 && !formulario.recurrente">
                    <template #label>
                        Fecha de culminación:
                    </template>

                    <validation-provider name="fecha_fin" rules="required" #default="{ valid, errors }">
                      <el-date-picker
                            v-model="formulario.fecha_fin"
                            :type="!formulario.all_dia ? 'datetime' : 'date'"
                            placeholder="Seleccione la fecha de culminación"  class="w-100" :picker-options="{
                              disabledDate: (fecha) => fecha < (new Date(formulario.fecha_inicio))
                            }">
                          </el-date-picker>

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>

                      </validation-provider>

                </b-form-group>



                 <b-form-group>
           
                      <validation-provider name="all_dia" rules="required" #default="{ valid, errors }">
                          <b-form-checkbox v-model="formulario.all_dia" name="all_dia" switch>
                            ¿Todo el día?: {{ formulario.all_dia ? 'Sí todo el día' : 'No, una hora específica' }} <span class="text-danger">*</span>
                          </b-form-checkbox>
                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
            
                      </validation-provider>
            
                  </b-form-group>

                   <b-form-group>
           
                      <validation-provider name="recurrente" rules="required" #default="{ valid, errors }">
                          <b-form-checkbox v-model="formulario.recurrente" name="all_dia" switch>
                            ¿Recurrente?: {{ formulario.recurrente ? 'Recurrente' : 'No recurrente' }} <span class="text-danger">*</span>
                          </b-form-checkbox>
                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
          
                      </validation-provider>
            
                    </b-form-group>

                     <template v-if="formulario.recurrente">
                          <b-form-group>
                              <template #label>
                                Tipo de recurrencia: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="tipo_recurrencia" rules="required" #default="{ valid, errors }">
                                <b-form-radio-group v-model="formulario.tipo_recurrencia" 
                                :options="tipoRecurrencias" :state="valid" @change="cambiarDias">
                                </b-form-radio-group>
                                <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider>
                          </b-form-group>


                          <b-form-group description="Días de la semana" v-if="formulario.tipo_recurrencia == 1">
                              <template #label>
                                ¿Que días?: <span class="text-danger">*</span>
                              </template>

                              <validation-provider name="dia_semana" rules="required" #default="{ valid, errors }">
                                <b-form-checkbox-group v-model="formulario.recurrencia.dia_semana" :options="diasSemana" />
                                <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                </b-form-invalid-feedback>
                              </validation-provider>
                          </b-form-group>


                          <section class="" v-if="!formulario.all_dia">
                              <b-form-group >
                                    <template #label>
                                      Hora de inicio del {{ getTitle }}: <span class="text-danger">*</span>
                                    </template>

                                    <validation-provider name="hora_inicio" 
                                    :rules="!formulario.all_dia ? 'required' : ''" #default="{ valid, errors }">
                                      <b-form-timepicker :disabled="formulario.all_dia"  hour12  label-close-button="Cerrar"
                                      v-model="formulario.recurrencia.hora_inicio" v-bind="labels['es-ES'] || {}"  locale="es-ES"/>
                                      <b-form-invalid-feedback :state="valid">
                                          {{ errors[0] }}
                                      </b-form-invalid-feedback>
                                    </validation-provider>
                              </b-form-group>

                              <b-form-group >
                                      <template #label>
                                          Hora de finalización del {{  getTitle }}: <span class="text-danger">*</span>
                                      </template>

                                      <validation-provider name="hora_fin" :rules="!formulario.all_dia ? 'required' : ''" #default="{ valid, errors }">
                                          <b-form-timepicker :disabled="formulario.all_dia"  hour12  label-close-button="Cerrar"
                                          v-model="formulario.recurrencia.hora_fin" v-bind="labels['es-ES'] || {}"  locale="es-ES"/>
                                          <b-form-invalid-feedback :state="valid">
                                            {{ errors[0] }}
                                          </b-form-invalid-feedback>
                                      </validation-provider>
                              </b-form-group>
                          </section>
                        

                    </template>

                    <b-form-group :label="`Descripción ${['del','de la','del'][tipo - 1]} ${getTitle}`">
                      <validation-provider name="descripcion" #default="{errors,valid}">
                        <b-form-textarea v-model="formulario.descripcion" :state="valid" :placeholder="`Describe tu ${getTitle}`"></b-form-textarea>

                          <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                          </b-form-invalid-feedback>

                      </validation-provider>
                    </b-form-group>


                    <b-form-group label="Adjuntar Archivo">

                      <validation-provider name="archivo" #default="{valid,errors}">
                          <b-form-file
                            v-model="formulario.archivo"
                            :state="valid"
                            placeholder="Busque un archivo"
                            drop-placeholder="Suelta el archivo aquí..."
                            browse-text="Buscar"
                          ></b-form-file>

                           <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                          </b-form-invalid-feedback>

                      </validation-provider>
                    </b-form-group>

                     <b-form-group>
           
                    <validation-provider name="recordarme" rules="required" #default="{ valid, errors }">
                          
                          <b-form-checkbox v-model="recordarme" name="recordarme" switch>
                            ¿Recordarme por correo?: {{ recordarme ? 'Sí' : 'No' }}
                          </b-form-checkbox>

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>
          
                      </validation-provider>
            
                    </b-form-group>

                    <template v-if="recordarme">
                        <b-form-group v-if="formulario.participantes.length">
                          <validation-provider name="recordatorio.participantes" rules="required" #default="{ valid, errors }">
                              <b-form-checkbox v-model="formulario.recordatorio.participantes" name="recordatorio.participantes" switch>
                                ¿Le recordamos a los participantes?: {{ formulario.recordatorio.participantes ? 'Sí' : 'No' }}
                              </b-form-checkbox>

                              <b-form-invalid-feedback :state="valid">
                                {{ errors[0] }}
                              </b-form-invalid-feedback>
            
                          </validation-provider>
            
                        </b-form-group>


                      <b-form-group label="Nota para el recordatorio">

                        <validation-provider name="recordatorio.nota" rules="required" #default="{errors,valid}">
                          <b-form-textarea v-model="formulario.recordatorio.nota" :state="valid" placeholder="Esta nota te la enviaremos en el recordatorio"></b-form-textarea>

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>

                        </validation-provider>
                      </b-form-group>


                    </template>


              </b-col>

              <b-col cols="12" class="mb-2">
                <b-button-group size="sm">
                  <b-button variant="danger" @click="limpiar" v-loading="loading">
                    <font-awesome-icon icon="fas fa-trash-can"/>
                    Limpiar
                  </b-button>

                  <b-button variant="primary" type="submit" v-loading="loading" :disabled="loading">
                      <font-awesome-icon icon="fas fa-save"/>
                      Guardar
                  </b-button>
                </b-button-group>
              </b-col>
            </b-row >
          </b-container >
        </b-form>
      </validation-observer>
    </b-sidebar>
</template>

<script>

import {
  BSidebar,
  BForm,
  BFormGroup,
  BFormTextarea,
  BFormInput,
  BButtonGroup,
  BButton,
  BFormRadioGroup,
  BContainer,
  BRow,
  BCol,
  BFormInvalidFeedback,
  BFormCheckbox,
  BInputGroup,
  BInputGroupAppend,
  BFormTimepicker,
  BFormCheckboxGroup,
  BFormFile

} from 'bootstrap-vue';

import {toRefs,ref,computed,watch, nextTick,provide }  from 'vue'
import store from '@/store'
import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'
import { optionsEditor, dateOption, regresar, diasSemana } from '@core/utils/utils'
import flatPickr from 'vue-flatpickr-component'

export default {
  
  components:{
    BSidebar,
    ValidationObserver,
    ValidationProvider,
    BForm,
    BFormGroup,
    BFormTextarea,
    BFormInput,
    BButtonGroup,
    BButton,
    BFormRadioGroup,
    BContainer,
    BRow,
    BCol,
    BFormInvalidFeedback,
    BFormCheckbox,
    flatPickr,
    BInputGroup,
    BInputGroupAppend,
    BFormTimepicker,
    BFormCheckboxGroup,
    BFormFile



  },

  props:{
    showAgenda:Boolean,
    tipo:Number,
    reunionId:{
      type:String|Number,
      required:false,
    },
    sobre:String
  },

  model:{
    prop:'showAgenda',
    event:'update:showAgenda',
  },

  setup(props,{emit}){
    const { showAgenda,tipo,reunionId} = toRefs(props)
    const currentBreakpoint = computed(() => store.getters['app/currentBreakPoint'])
    const formulario = ref(store.getters['reunion/draft'])
    const {reunions} = toRefs(store.state.reunion)
    const {usuario} = toRefs(store.state.usuario)
    const hora1 = ref(null)
    const formValidate = ref(null)
    const formTimeRef  = ref(null)
    const recordarme = ref(false)
    
    const getTitle =  computed(() => {
      let titles = ['Recordatorio', 'Tarea', 'Evento']
      return titles[tipo.value - 1]

    })



    const guardar = () => {

      formulario.value.tipo = tipo.value
      formulario.value.usuario_id = usuario.value.id 
      
      store.dispatch('reunion/guardar',formulario.value).then(({result,reunion}) => {

        if(result){
          toast.success(`${getTitle.value} Agregado con éxito`)
          emit('update:showAgenda',false)
        }else{
          toast.info(`${getTitle.value} no se pudo agregar, inténtelo de nuevo mas tarde`)
        }
      }).catch(e => {
        
        console.log(e)
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }else{
          console.log(e)
        }

      })

    }


    const allDiaOptions = ref([
      {
        text:'Sí'
      }
    ])


    const optionsDate = {
      
      disabledDate:(fecha) => {
        const today = new Date().setHours(0, 0, 0, 0);

        return fecha < today
      }
    }

    const tipoRecurrencias = ref([
         { text: 'Diariamente', value: 0 },
         { text:'Semanal',value:1},
         // { text:'Mensual', value:2},
         { text:'Anual', value: 3 },
    ])

     const cambiarDias = (tipo) => {
      if (tipo == 0) {
        formulario.value.recurrencia.dia_semana = [0, 1, 2, 3, 4, 5, 6];
      }

    }

    const labels = ref({
       'es-ES': {
        labelHours: 'Horas',
        labelMinutes: 'Minutos',
        labelSeconds: 'Segundos',
        labelIncrement: 'Aumentar',
        labelDecrement: 'Reducir',
        labelSelected: 'Haora seleccionada',
        labelNoTimeSelected: 'Hora no seleccionada',
        labelCloseButton: 'Cerrar'
      },
    })

    watch(recordarme,(valor) => {
      formulario.value.recordatorio = {
        telefono: null,
        email: '',
        participantes: false,
        nota: ''
      }
      if(valor){
        formulario.value.recordatorio = {
          email:usuario.value.email,
          participantes:false,
          nota:''
        }
      }

    })

    return {
      loading:computed(() => store.state.loading),
      required,
      currentBreakpoint,
      guardar,
      formulario,
      dateOption,
      allDiaOptions,
      formTimeRef,
      hora1,
      optionsDate,
      tipoRecurrencias,
      diasSemana,
      cambiarDias,
      labels,
      formValidate,
      recordarme,
      limpiar:() => {
        store.commit('reunion/clear')
        formulario.value.recordatorio = {
         telefono:null,
         email:'',
         participantes:false,
         nota:''
      }
        recordarme.value = false
        formulario.value = store.getters['reunion/draft']
      },
      getTitle,
    }
  }
}
</script>

<style lang="scss">
.agenda-form-content{
  z-index: 1010 !important;
  position: fixed;
}
  
</style>
<style lang="scss" >
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>