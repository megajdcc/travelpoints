<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="6">
                     <b-form-group>
                        <template #label>
                           Pregunta: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="pregunta" rules="required" #default="{ errors }">
                           <b-form-input v-model="formulario.pregunta" :state="errors.length ? false : null" />
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6">
                     <b-form-group>
                        <template #label>
                           Categoría: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="categoria_id" rules="required" #default="{ errors }">
                           <el-select v-model="formulario.categoria_id" placeholder="seleccione" clearable filterable
                              class="w-100">
                              <el-option v-for="(categoria, i) in categorias" :key="i" :label="categoria.nombre"
                                 :value="categoria.id"></el-option>
                           </el-select>

                           <b-form-invalid-feedback :state="errors.length ? false : null">
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

                        <validation-provider name="respuesta" rules="required" #default="{ errors }">


                           <editor output-format="html" :value="formulario.respuesta"
                              @input="formulario.respuesta = $event"
                              api-key="t1i940nuarrf1zefgxbf6ow5cxmgjmcad7q7l3fm5prgebyc" :init="optionsEditor" />



                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>

                     </b-form-group>
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group size="sm">
                        <b-button variant="primary" type="submit" v-loading="loading">
                           <feather-icon icon="SaveIcon" />
                           Guardar
                        </b-button>

                        <b-button variant="info" @click="regresar">
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
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

import { ValidationObserver,ValidationProvider } from 'vee-validate'
import {required} from '@validations'
import Editor from '@tinymce/tinymce-vue'

import {
   BForm,
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormGroup,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton
} from 'bootstrap-vue'
import {ref,onMounted,computed,toRefs} from '@vue/composition-api'

import store from '@/store'
import { regresar } from '@core/utils/utils'
export default {

   components:{
      BForm,
      BContainer,
      BRow,
      BCol,
      BFormInput,
      BFormGroup,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      ValidationObserver,
      ValidationProvider,
      Editor,
      BCard,

   },

   setup(_,{emit}) {
      const formValidate = ref(null)

      const {categorias} =  toRefs(store.state.faq)

      const {faq:formulario} = toRefs(store.state.faq)

      onMounted(() => {

         if(!categorias.value.length){

            store.dispatch('faq/cargarCategorias').then((data) => {
               categorias.value = data
            })

         }

      })

      const guardar = () => {
         emit('save',formulario.value,formValidate.value)
      }

       const optionsEditor = {
            selector: 'textarea#premiumskinsandicons-snow',
            skin: 'snow',
            icons: 'thin',

         plugins: 'quickbars image lists code table codesample advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code wordcount ',
            
            toolbar: 'formatselect | forecolor backcolor | bold italic underline strikethrough | link image blockquote codesample | align bullist numlist | code | table',
            height: 400,
            content_style: 'body { margin: 2rem 10%; }',
            branding:false,
            language:'es'
         }


      return {
         required,
         formValidate,
         formulario,
         guardar,
         loading:computed(() => store.state.loading),
         categorias,
         optionsEditor,
         regresar
         
      }

   },
}
</script>