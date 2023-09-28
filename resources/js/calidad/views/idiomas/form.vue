<template>
  <validation-observer ref="formValidate" #default="{handleSubmit}">
    <b-form @submit.prevent="handleSubmit(guardar)">
      <b-card>

        <b-container fluid class="mx-0 px-0">
          <b-row>
            <b-col cols="12" md="6">
              <b-form-group>
                <template #label>
                  Idioma: <span class="text-danger">*</span>
                </template>

                <validation-provider name="languaje" rules="required" #default="{valid,errors}">
                  <b-form-input v-model="formulario.languaje" :state="valid" placeholder="Nombre del idioma, Ejemplo: Español, Ingles" />

                  <b-form-invalid-feedback :state="valid">
                    {{  errors[0]  }}
                  </b-form-invalid-feedback>
                </validation-provider>
              </b-form-group>
              </b-col>

              <b-col cols="12" md="6">
                <b-form-group description="Short lang del idioma, ejemplo: es para español o en para ingles...">
                  <template #label>
                    ISO: <span class="text-danger">*</span>
                  </template>

                  <validation-provider name="short-lang" rules="required" #default="{valid,errors}">
                    <b-form-input v-model="formulario.shortLang" :state="valid" placeholder="ISO del idioma. Ejmp es,en,uk,..." />

                    <b-form-invalid-feedback :state="valid">
                      {{  errors[0]  }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>

              </b-col>

              <b-col cols="12" md="6">
                  <b-form-group description="Elige una imagen para la bandera que represente al idioma.">
                    <template #label>
                      Bandera del idioma: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="flag" :rules="!formulario.id ? 'required' : ''" #default="{ valid, errors }">
                      <b-form-file v-model="formulario.flag" :state="valid" accept="image/*" browse-text="Buscar Flag" placeholder="Elije una imagen" />

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>

              </b-col>


               <b-col cols="12" md="6">
                    <b-form-group description="Si ya existe un idioma predeterminado, ya no lo será si estableces este en predeterminado"> 
                      <template #label>
                        ¿Es el idioma por defecto?: <span class="text-danger">*</span>
                      </template>

                      <validation-provider name="default" rules="required" #default="{ valid, errors }">
                        <b-form-radio-group v-model="formulario.default" :options="[{text:'Sí',value:true},{text:'No',value:false}]" :state="valid"></b-form-radio-group>
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
            <b-button variant="primary" v-loading="loading" :disabled="loading" type="submit">
              <font-awesome-icon icon="fas fa-save"/>
              Guardar
            </b-button>

             <b-button variant="danger" @click="() => $router.push({name:'idioma.list'})">
                <font-awesome-icon icon="fas fa-arrow-left"/>
                Regresar
              </b-button>
          </b-button-group>
        </template>
      </b-card>
    </b-form>
  </validation-observer>
</template>

<script>

import store from '@/store'

import {
  BCard,
  BContainer,
  BCol,
  BRow,
  BForm,
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BFormFile,
  BFormRadioGroup
} from 'bootstrap-vue'

import {
  ValidationObserver,
  ValidationProvider
} from 'vee-validate'

import {required} from '@validations'
import {toRefs,computed,ref,watch} from 'vue'

export default{

  components:{
    BCard,
    BContainer,
    BCol,
    BRow,
    BForm,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    ValidationObserver,
    ValidationProvider,
    BFormFile,
    BFormRadioGroup


  },


  setup(props,{emit}){

    const formValidate = ref(null)
    const {idioma:formulario} = toRefs(store.state.idioma)
    
    const guardar = () => {
      emit('save',formulario.value,formValidate.value)
    }


    const cargarForm = () => {

      if(formulario.value.id){
        formulario.value.flag = null
      }

    }
    watch(formulario,() => cargarForm())

    cargarForm()

    return {
      guardar,
      formValidate,
      loading:computed(() => store.state.loading),
      formulario,
      required
    }
  }
}
</script>
