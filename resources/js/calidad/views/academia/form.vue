<template>
    <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
        <b-form @submit.prevent="handleSubmit(guardar)">
          <b-container fluid>
            <b-row>
              <b-col cols="12" md="6">
                <b-form-group >
                  <template #label>
                    Titulo: <span class="required">*</span>
                  </template>

                  <validation-provider name="titulo" rules="required" #default="{valid,errors}">
                    
                    <b-form-input v-model="formulario.titulo" :state="valid" />

                    <b-form-invalid-feedback :state="valid">
                      {{  errors[0] }}
                    </b-form-invalid-feedback>
                  </validation-provider>
                </b-form-group>
              </b-col>

              <b-col cols="12" md="6">
                  <b-form-group description="Rol al que vá dirigido este vídeo" >
                    <template #label>
                      Rol: <span class="required">*</span>
                    </template>

                    <validation-provider name="rol_id" rules="required" #default="{ valid, errors }">
                    
                      <v-select v-model="formulario.roles" :options="roles" multiple :reduce="option => option.id" label="nombre"></v-select>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
              </b-col>

              <b-col cols="12">
                <b-form-group>
            
                  <template #label>
                    Descripción:
                  </template>
            
                  <validation-provider name="descripcion" #default="{ errors,valid }">
            
                    <editor output-format="html" :value="formulario.descripcion" @input="formulario.descripcion = $event"
                      api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />
            
                    <b-form-invalid-feedback :state="valid">
                      {{ errors[0] }}
                    </b-form-invalid-feedback>
            
                  </validation-provider>
                </b-form-group>

              </b-col>

              <template>
                <el-divider content-position="left">Asociar Video</el-divider>
                <b-col cols="12">
                  <multimedia hideImagenes seleccionable />
                </b-col>
              </template>

              <b-col cols="12">
                <b-button-group size="sm">
                  <b-button variant="primary" type="submit" title="Guardar" v-loading="loading" :disabled="loading">
                    <font-awesome-icon icon="fas fa-paper-plane" class="mr-1"/>
                    Guardar
                  </b-button>

                  <b-button variant="warning"  title="Nuevo" v-loading="loading" :disabled="loading" v-if="formulario.id" :to="{name:'academia.create'}">
                    <font-awesome-icon icon="fas fa-square-plus" class="mr-1"/>
                    Nuevo Registro
                  </b-button>
                </b-button-group>
              </b-col>

            </b-row>
          </b-container>
        </b-form>
      </validation-observer>
    </b-card>
</template>

<script>

import {
  BCard,
  BContainer,
  BForm,
  BButtonGroup,
  BButton,
  BFormInvalidFeedback,
  BFormInput,
  BRow,
  BCol,
  BFormGroup

} from 'bootstrap-vue'

import {ValidationObserver,ValidationProvider} from 'vee-validate'

import store from '@/store'
import {required} from '@validations'

import { toRefs,computed,ref,onMounted,provide} from 'vue'
import { optionsEditor } from '@core/utils/utils';

import vSelect from 'vue-select'

export default {
  
  components:{
      ValidationObserver,
      ValidationProvider,
      BCard,
      BContainer,
      BForm,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback,
      BFormInput,
      BRow,
      BCol,
      BFormGroup,
      Editor:() => import('@tinymce/tinymce-vue'),
      vSelect,
      multimedia: () => import('views/multimedias/multimedia.vue')
  },


  setup(props,{emit}){
    
    const {video:formulario} = toRefs(store.state.academiaVideos)
    const {roles} = toRefs(store.state.rol)
    const formValidate = ref(null)

    const seleccionados = ref([])
    provide('seleccionados', seleccionados)

    onMounted(() => {
      
      formulario.value.videos.forEach(val => {
          if(typeof val == 'object'){
            seleccionados.value.push(val.id)
          }else{
            seleccionados.value.push(val)
          }

      });

    })

    const guardar = () => {

        let rols = [];

        formulario.value.roles.forEach($rol => {
          if(typeof $rol === 'object'){
            rols.push($rol.id);
          }else{
            rols.push($rol);
          }

        });

      let vids = [];

      formulario.value.videos.forEach($video => {
        if (typeof $video === 'object') {
          vids.push($video.id);
        } else {
          vids.push($video);
        }

      });

        formulario.value.roles = rols;
        formulario.value.videos = vids;


        if(seleccionados.value.length) {
            formulario.value.videos = seleccionados.value
        }

      emit('save',formulario.value,formValidate.value)
    }

    const cargarForm = () => {
      if(!roles.value.length){
        store.dispatch('rol/cargarRoles')
      }
    }    


    cargarForm();


    return {
      formulario,
      guardar,
      loading:computed(() => store.state.loading),
      formValidate,
      required,
      optionsEditor,
      roles
    }

  }
}
</script>