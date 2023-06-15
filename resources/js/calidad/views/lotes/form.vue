<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(save)">
        <b-card>

          <b-container fluid>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group>
                  <template #label>
                    Fecha de llegada: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="fecha_llegada" rules="required" #default="{errors,valid}">
                    <flat-pickr v-model="formulario.fecha_llegada" class="form-control"
                                      :config="{ dateFormat: 'Y-m-d' }" placeholder="YYYY-MM-DD" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>

                <b-form-group>
                    <template #label>
                      Cantidad de tarjetas: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="cantidad" rules="required" #default="{ errors, valid }">
                        <b-form-input type="number" v-model="formulario.cantidad" :step="1" :min="1" :max="10000" :state="valid" :disabled="formulario.id ? true : false" />

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>

                  <b-form-group description="El Código lada internacional">
                      <template #label >
                        Código LADA del Destino: <span class="text-danger">*</span>
                      </template>

                      <validation-provider name="codigo_lada" rules="required" #default="{ errors, valid }">
                          <b-form-input v-model.lazy="formulario.codigo_lada" @blur="onInputChange('codigo_lada',3)" v-mask="'###'" :state="valid" :disabled="formulario.id ? true : false" />

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>

                      </validation-provider>
                  </b-form-group>

                   <b-form-group description="Cual es el monto en tps que va a generar las tarjetas de este lote?">
                        <template #label >
                          Monto en TPS {{ formulario.tps | currency }} : <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="tps" rules="required" #default="{ errors, valid }">
                            <b-form-input v-model="formulario.tps" :state="valid" v-mask="'####'"></b-form-input>

                            <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                            </b-form-invalid-feedback>

                        </validation-provider>
                  </b-form-group>


              </b-col>

              <b-col cols="12" md="6">
                 

                <b-form-group description="El número inicial, tiene que ver con el primer número de la tarjeta, es decir los ultimos 5 digitos que va a contener con los ceros delante de ser necesario.">
                    <template #label >
                      Número Inicial: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="numero_inicial" rules="required" #default="{ errors, valid }">
                        <b-form-input v-model.lazy="formulario.numero_inicial" v-mask="'#####'" @blur="onInputChange('numero_inicial')" type="text" :state="valid"  :disabled="formulario.id ? true : false"  />

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>

                    </validation-provider>
                  </b-form-group>

                    <b-form-group description="Este campo la calcularé para tí no tienes que hacer algo">
                      <template #label >
                        Número Final: <span class="text-danger">*</span>
                      </template>

                      <validation-provider name="numero_final" rules="required" #default="{ errors, valid }">
                          <b-form-input v-model="formulario.numero_final" v-mask="'#####'" :state="valid" readonly />

                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>

                      </validation-provider>
                    </b-form-group>

                     <b-form-group description="Elija una divisa">
                        <template #label >
                          Divisa en la que se venderá la tarjeta: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="divisa_id" rules="required" #default="{ errors, valid }">
                           <v-select v-model="formulario.divisa_id" :disabled="formulario.id ? true : false" :options="divisas" label="nombre" :reduce="option => option.id"></v-select>

                            <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                            </b-form-invalid-feedback>

                        </validation-provider>
                      </b-form-group>


                      <b-form-group description="Cual es el monto?">
                        <template #label >
                          Monto en la que se venderá : <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="monto" rules="required" #default="{ errors, valid }">
                            <currency-input v-model="formulario.monto" :options="{
                              ...optionsCurrency,
                              ...{
                                currency: currencyDivisa
                              }
                            }" class="form-control" />

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
              <b-button variant="primary" title="Guardar" v-loading="loading" :disabled="loading" type="submit"> 
                Guardar
              </b-button>

              <b-button variant="dark" title="regresar" v-loading="loading" :disabled="loading" type="button" :to="{name:'lotes.list'}"> 
                  Regresar
                </b-button>
            </b-button-group>

          </template>
        </b-card>
      </b-form>
    </validation-observer>
</template>

<script>

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import {
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BContainer,
  BCol,
  BRow,
  BCard,
  BButtonGroup,
  BButton
} from 'bootstrap-vue'

import {required} from '@validations'

import {computed,toRefs,ref,watch,onMounted} from 'vue'
import store from '@/store'
import flatPickr from 'vue-flatpickr-component'

import vSelect from 'vue-select'

import { optionsCurrency } from '@core/utils/utils'

export default {
  
  components:{
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BContainer,
    BCol,
    BRow,
    BCard,
    BButtonGroup,
    BButton,

    ValidationObserver,
    ValidationProvider,
    flatPickr,
    vSelect,
    CurrencyInput:() => import('components/CurrencyInput.vue')

  },

  setup(props,{emit}){
    const { lote:formulario } = toRefs(store.state.lote)
    const formValidate = ref(null)
    
    const {divisas} = toRefs(store.state.divisa)


    const cargarForm =  () =>{
      if(!divisas.value.length){
          store.dispatch('divisa/getDivisas')
      }
    } 

    const save = () => {
      emit('save',formulario.value,formValidate.value)
    }

    watch([() => formulario.value.numero_inicial,() => formulario.value.cantidad],() => {
      formulario.value.numero_final = calcularNumeroFinal(formulario.value.numero_inicial)
    })

    const calcularNumeroFinal = (numeroInicial = formulario.value.numero_inicial)  => {
      var numeroFinal = Number(numeroInicial) + Number(formulario.value.cantidad - 1);
      return numeroFinal.toString().padStart(5, '0');
    }

    watch(() => formulario.value.numero_inicial,(val) => {
        if (val === null) {
          return '';
        }
        return formulario.value.numero_inicial.toString().padStart(5, '0');
    })


    const formatNumero = (numero) => {
      if (numero !== null) {
         numero = numero.padStart(5, '0');
      }else{
        numero = '00000'
      }
    }

    const onInputChange = (tipo,cant = 5)  => {

         // Remover caracteres no numéricos
        formulario.value[tipo] = formulario.value[tipo].replace(/\D/g, '');

        // Agregar ceros a la izquierda si es necesario
        while (formulario.value[tipo].length < Number(cant)) {
          formulario.value[tipo] = '0' + formulario.value[tipo];
        }

        // Asegurarse de que no se exceda la longitud máxima
        if (formulario.value[tipo].length > Number(cant)) {
          formulario.value[tipo] = formulario.value[tipo].slice(0, Number(cant));
        }
     
    }
    
    //   const onKeyPress = (event) =>  {
    //   const charCode = event.keyCode || event.which;
    //   const charStr = String.fromCharCode(charCode);

    //   // Permitir solo números y teclas de navegación
    //   if (!/^\d+$/.test(charStr) && !['Backspace', 'Tab', 'Delete', 'ArrowLeft', 'ArrowRight'].includes(event.key)) {
    //     event.preventDefault();
    //   }
    // }


    onMounted(() =>  {
      cargarForm()
      setTimeout(() => {
        calcularNumeroFinal(formulario.value.numero_inicial)
      }, 400);
    })


    return {
      formulario,
      loading:computed(() => store.state.loading),
      formValidate,
      save,
      required,
      formatNumero,
      onInputChange,
      divisas:computed(() => divisas.value.filter(val => !val.principal)),
      optionsCurrency,
      currencyDivisa:computed(() => {
        if(formulario.value.divisa_id){
          let divisa = divisas.value.find(val => val.id === formulario.value.divisa_id) 

          if(divisa != undefined){
            return divisa.iso
          }
          return 'EUR'
        }else{
          return 'EUR'
        }
      })
    }
  }

}
</script>

<style lang="scss" >
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>

