<template>

  <validation-observer ref="formValidate" #default="{handleSubmit}">
    <b-form @submit.prevent="handleSubmit(guardar)">

      <b-card>
        <b-container fluid>
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group>
                <template #label>
                  Nombre del sistema: <span class="text-danger">*</span>
                </template>
        
                <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                  <b-form-input v-model="formulario.nombre" :state="valid" />
        
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
        
                </validation-provider>
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6">
              <b-form-group description="Descripción del sistema breve ...">
                <template #label>
                  Descripción:
                </template>
            
                <validation-provider name="descripcion"  #default="{errors,valid}">
                  <b-form-textarea v-model="formulario.descripcion" :rows="1" placeholder="Descripción del sistema ..." :state="valid">
                  
                  </b-form-textarea>
            
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            
                </validation-provider>
              </b-form-group>
            </b-col>

            
          </b-row>

          <b-row>
            <b-col cols="12">
              <b-form-group>
          
                <template #label>
                  Términos y condiciones:
                </template>
          
                <validation-provider name="terminos" #default="{ errors,valid }">
          
                  <editor output-format="html" :value="formulario.terminos" @input="formulario.terminos = $event"
                    api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
          
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
          
                </validation-provider>
          
              </b-form-group>
            </b-col>
          </b-row>

          <b-row>
            <b-col cols="12" md="6">
              <b-form-group label="¿ Paypal ?" description="Vas a integrar Paypal como metodo de pago ">
                
                <validation-provider name="paypal" rules="required" #default="{valid,errors}">
                  
                  <b-form-radio-group v-model="formulario.paypal"  button-variant="primary" :options="[{text:'Sí',value:true},{text:'No',value:false}]" :state="valid">
                  
                  </b-form-radio-group>

                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>

                </validation-provider>

              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" v-if="formulario.paypal">
              <b-form-group label="Producción o prueba ? " >
            
                <validation-provider name="production_paypal" rules="required" #default="{valid,errors}">
            
                  <b-form-radio-group v-model="formulario.production_paypal" button-variant="primary"
                    :options="[{text:'Producción',value:true},{text:'Prueba',value:false}]" :state="valid">
            
                  </b-form-radio-group>
            
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            
                </validation-provider>
            
              </b-form-group>
            </b-col>
            


            <b-col cols="12" md="6" v-if="formulario.paypal">
              <b-form-group label="Paypal Id">
            
                <validation-provider name="paypal_id" rules="required" #default="{valid,errors}">
            
                  <b-form-input v-model="formulario.paypal_id" :state="valid" ></b-form-input>
            
                  <b-form-invalid-feedback :state="valid">
                    {{ errors[0] }}
                  </b-form-invalid-feedback>
            
                </validation-provider>
            
              </b-form-group>
            </b-col>

            <b-col cols="12" md="6" v-if="formulario.paypal">
              <b-form-group label="Paypal Secrect">
            
                <validation-provider name="paypal_secrect" rules="required" #default="{valid,errors}">
            
                  <b-form-input v-model="formulario.paypal_secrect" :state="valid" ></b-form-input>
            
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

              <b-button type="submit" v-loading="loading" :disabled="loading" variant="primary">
                <feather-icon icon="SaveIcon" />
                Guardar
              </b-button>

              <b-button @click="regresar" variant="dark" title="Regresar">
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

import {ValidationObserver,ValidationProvider} from 'vee-validate'

import store from '@/store'

import { regresar,optionsEditor } from '@core/utils/utils';

import {required} from '@validations'
import Editor from '@tinymce/tinymce-vue'

import {
  BCard,
  BForm,
  BFormInput,
  BFormGroup,
  BFormFile,
  BImg,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BFormTextarea,
  BContainer,
  BRow,
  BCol,
  BFormRadioGroup
} from 'bootstrap-vue'

import {computed,toRefs,ref,onMounted} from '@vue/composition-api'

export default {
  
  components:{
    BCard,
    BForm,
    BFormInput,
    BFormGroup,
    BFormFile,
    BImg,
    BButtonGroup,
    BButton,
    BFormInvalidFeedback,
    BFormTextarea,

    ValidationObserver,
    ValidationProvider,

    BContainer,
    BRow,
    BCol,
    Editor,
    BFormRadioGroup



  },


  setup(){

    const formValidate = ref(null)

    const {sistema:formulario} = toRefs(store.state.sistema)
    const urlLogo1 = ref(null)
    const urlLogo2 = ref(null)

    const logoSeleccionado = ( tipo_logo = 1) => {



    }   

    const guardar  = () => {

      store.dispatch('sistema/guardar',formulario.value).then(({result}) => {

        if(result){
          toast.success('Se ha guardado con éxito',{position:'bottom-right'})
        }else{
          toast.info('No se pudo guardar, inténte de nuevo', { position: 'bottom-right' })

        }
      })
    }

    return {
      loading:computed(() => store.state.loading),
      formulario,
      formValidate,
      urlLogo1,
      urlLogo2,

      guardar,

      logoSeleccionado,

      regresar,
      required,
      optionsEditor


    }

  }
}
</script>