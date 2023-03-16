<template>
    <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardar)">
          <b-card>
            <b-container fluid class="px-0 ">
              <b-row>
                <b-col cols="12" md="6">
                  <b-form-group>
                    <template #label>
                      Tipo de Menú: <span class="text-danger">*</span>
                    </template>

                    <validation-provider name="tipo_menu" rules="required" #default="{valid,errors}">
                      
                      <b-form-radio-group v-model="formulario.tipo_menu" :options="tipo_menu" >
                      
                      </b-form-radio-group>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0]  }}
                      </b-form-invalid-feedback>

                    </validation-provider>
                  </b-form-group>

                   <b-form-group v-if="formulario.tipo_menu">
                      <template #label>
                       {{ getLegenMenu }} : <span class="text-danger">*</span>
                      </template>

                      <validation-provider name="menu" :rules="formulario.tipo_menu == 1 ? 'required|url' : 'required'" #default="{ valid, errors }">
                      
                        <template v-if="[2, 3].includes(formulario.tipo_menu)">

                          <b-form-file v-model="archivo" :accept="formulario.tipo_menu == 2 ? '.pdf' : 'image/*'" 
                          browse-text="Buscar" :placeholder="getLegenMenu" />

                        </template>

                        <b-form-input v-model="formulario.menu" :state="valid"  v-else/>

                        <b-form-invalid-feedback :state="valid">
                          {{ errors[0] }}
                        </b-form-invalid-feedback>

                      </validation-provider>
                    </b-form-group>
                 </b-col>

                <b-col cols="12" md="6" >
                    <template v-if="formulario.tipo_menu == 2">
                       <mi-pdf :pdf="formulario.menu" ></mi-pdf>
                    </template>

                    <b-img v-if="formulario.tipo_menu == 3" 
                    :src="`/storage/negocios/menu/${formulario.menu}`" 
                    style="width: 100%; 
                    height: auto;" ></b-img>

                 </b-col>

              </b-row>

            
            </b-container>

            <template #footer>
              <b-button-group size="sm">
                <b-button type="submit" variant="primary" title="guardar" v-loading="loading" :disabled="loading">
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
  BCard,BContainer,
  BRow, BCol,
  BForm,BFormGroup,
  BFormInvalidFeedback,
  BButtonGroup,BButton,
  BFormRadioGroup,
  BFormFile,
  BFormInput,
  BImg
} from 'bootstrap-vue'

import {
  ValidationObserver,
  ValidationProvider,

} from 'vee-validate'
import {required,url} from '@validations';

import store from '@/store'

import { computed, toRefs, ref, onMounted } from 'vue'

import MiPdf from 'components/MiPdf.vue';


export default {


  components: {
    
    BCard, BContainer,
    BRow, BCol,
    BForm, BFormGroup,
    BFormInvalidFeedback,
    BButtonGroup, BButton,
    BFormRadioGroup,
    BFormFile,
    BFormInput,
    ValidationObserver,
    ValidationProvider,
    BImg,
    MiPdf

  },

  setup(props){ 
    const formValidate = ref(null);
    const {negocio:formulario} = toRefs(store.state.negocio)
    const archivo = ref(null)
    
    const cargarForm = () => {

      if([2,3].includes(formulario.value.tipo_menu)){
        archivo.value = null
      }

    }

    onMounted(() => {
      cargarForm();
    })


    const tipo_menu = ref([
      {text:'URL',value:1},
      { text: ' PDF', value: 2 },
      { text: 'Imagen', value: 3 },
    ])

    const guardar = () => {

      if([2,3].includes(formulario.value.tipo_menu)){
        formulario.value.menu = archivo.value;
      }


      store.dispatch('negocio/guardarMenu',formulario.value).then(({result}) => {
        
        if(result){
          archivo.value = null
          toast.success('Se ha guardado con éxito',{position:'bottom-right'})
        }else{
          toast.info('No se pudo guardar, Inténtelo con éxito...', { position: 'bottom-right' })
        }

      }).catch(e => {

        console.log(e)
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }

      })
    }


    return {
      loading:computed(() => store.state.loading),
      formValidate,
      formulario,
      tipo_menu,
      required,
      guardar,
      url,
      archivo,
      getLegenMenu:computed(() => {
        let legend = ['Url donde se encuentrá el menú','Busque la carta en archivo PDF','Cargue una imagen asociada al menú'];
        return legend[formulario.value.tipo_menu - 1];
      })

    }
  }

}
</script>