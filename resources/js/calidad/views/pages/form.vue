<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">
        <b-card>
          <b-container fluid>
            <b-row>
              <b-col cols="12" md="6">

                 <b-form-group description="Este nombre lo mostraremos en los menus" >
                    <template #label>
                      Nombre: <span class="text-danger">*</span>
                    </template>
                    <validation-provider name="nombre" rules="required" #default="{errors,valid}">
                      <b-input-group>

                        <b-form-input v-model="formulario.nombre" :state="valid"
                            placeholder="nombre de la pagina" />
                      </b-input-group>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>

                    </validation-provider>
                
                </b-form-group>

                <b-form-group >
                    <template #label>
                      Ruta: <span class="text-danger">*</span>
                    </template>
                    <validation-provider name="ruta" rules="required" #default="{errors,valid}">
                      <b-input-group>
                        <b-input-group-prepend is-text>
                            {{ url }}/
                        </b-input-group-prepend>

                        <b-form-input v-model="formulario.ruta" :state="valid"
                            placeholder="nombre-de-la-pagina" />
                      </b-input-group>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>

                    </validation-provider>
                
                </b-form-group>

                <b-form-group description="Si la pagina está desabilitada, no podrá mostrarse en el menú, ni podrá visitarse desde la url" >
                        <template #label>
                          ¿ Deseas activar la pagina desde un principio ?: <span class="text-danger">*</span>
                        </template>
                        <validation-provider name="is_termino" rules="required" #default="{ errors, valid }">
                          <b-form-checkbox v-model="formulario.activo" :state="valid" switch />
                      
                          <b-form-invalid-feedback :state="valid">
                            {{ errors[0] }}
                          </b-form-invalid-feedback>

                        </validation-provider>
                
                </b-form-group>

                
              </b-col>

              <b-col cols="12" md="6">

                <b-form-group description="Si habilitas esta opción, mostraremos en el header, un icono con la opción de menú" >
                          <template #label>
                            ¿ Deseas mostrar un icono que represente a esta pagina en el header ?: <span class="text-danger">*</span>
                          </template>
                          <validation-provider name="showHeader" rules="required" #default="{ errors, valid }">
                            <b-form-checkbox v-model="formulario.showHeader" :state="valid" switch />
                      
                            <b-form-invalid-feedback :state="valid">
                              {{ errors[0] }}
                            </b-form-invalid-feedback>

                          </validation-provider>
                
                </b-form-group>

                <b-form-group v-if="formulario.showHeader" description="Selecciona un icono, para tu pagina, esto lo mostraremos en el header en vez del nombre" >
                            <template #label>
                              Selecciona un icono: <span class="text-danger">*</span>
                            </template>
                            <validation-provider name="icono" rules="required" #default="{ errors, valid }">
                              <v-select v-model="formulario.icono" :options="iconosFontAwesome" label="label" :reduce="option => option.value" >
                                <template #option="{label}">
                                    <font-awesome-icon :icon="['fas',`fa-${label}`]"/> 
                                    {{ label }}
                                </template>

                                 <template #selected-option="{ label }">
                                      <font-awesome-icon :icon="['fas',`fa-${label}`]"/> 
                                      {{ label }}
                                  </template>
                              </v-select>
                      
                              <b-form-invalid-feedback :state="valid">
                                {{ errors[0] }}
                              </b-form-invalid-feedback>

                            </validation-provider>
                
                  </b-form-group>

                 <b-form-group >
                      <template #label>
                        ¿ Es la pagina de terminos y condiciones ?: <span class="text-danger">*</span>
                      </template>
                      <validation-provider name="is_termino" rules="required" #default="{ errors, valid }">
                        <b-form-checkbox v-model="formulario.is_termino" :state="valid" switch />
                      
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>

                      </validation-provider>
                
                  </b-form-group>

                   <b-form-group >
                      <template #label>
                        ¿ Es la pagina de politicas de privacidad ?: <span class="text-danger">*</span>
                      </template>
                      <validation-provider name="is_politica" rules="required" #default="{ errors, valid }">
                        <b-form-checkbox v-model="formulario.is_politica" :state="valid" switch />
                    
                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>

                      </validation-provider>
              
                  </b-form-group>

                  <b-form-group >
                      <template #label>
                        ¿ Es la pagina de contacto ?: <span class="text-danger">*</span>
                      </template>
                      <validation-provider name="is_contacto" rules="required" #default="{ errors, valid }">
                        <b-form-checkbox v-model="formulario.is_contacto" :state="valid" switch />
                  
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
                    Contenido:
                  </template>
          
                  <validation-provider name="contenido" #default="{ errors, valid }">
          
                    <editor output-format="html" :value="formulario.contenido" @input="formulario.contenido = $event"
                      api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
          
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
              <b-button variant="primary" v-loading="loading" type="submit" title="Guardar">
                <font-awesome-icon icon="fas fa-save"/>
                Guardar
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
  ValidationProvider,

} from 'vee-validate'

import vSelect from 'vue-select'

import {
  BForm,
  BFormInput,
  BFormGroup,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BContainer,
  BRow,
  BCol,
  BFormCheckbox,
  BInputGroup,
  BInputGroupPrepend,
  BCard,

} from 'bootstrap-vue'

import {required} from '@validations'

import {toRefs,computed,ref} from 'vue'
import store from '@/store';
import { optionsEditor } from '@core/utils/utils';
import Editor from '@tinymce/tinymce-vue'

import { iconosFontAwesome } from '@core/utils/utils'
export default {


  components:{
    BForm,
    BFormInput,
    BFormGroup,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    ValidationObserver,
    ValidationProvider,
    BContainer,
    BRow,
    BCol,
    BFormCheckbox,
    BInputGroup,
    BInputGroupPrepend,
    Editor,
    BCard,
    vSelect


  },

  setup(props,{emit}){

    const {pagina:formulario} = toRefs(store.state.pagina);
    const formValidate = ref(null)
    const url = ref(window.location.origin)
    const guardar  = () => {

      emit('save',formulario.value,formValidate.value)
    }

    return {
      guardar,
      loading:computed(() => store.state.loading),
      formulario,
      required,
      url,
      optionsEditor,
      iconosFontAwesome

    }
  }

}
</script>