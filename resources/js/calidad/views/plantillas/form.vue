
<template>

   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">

         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>


               <b-row>

                  <b-col cols="12">
                     <p><strong class="text-danger">Nota Importante:</strong><br> Es necesario que sepas que estas
                        plantillas utilizan un motor de renderizado para lenguaje de marcado ligero como lo es <a
                           href="https://daringfireball.net/projects/markdown/syntax"
                           target="_blank"><strong>MARKDOWN</strong></a>, ademas del motor de
                        plantillas de <a href="https://laravel.com/docs/9.x/blade" target="_blank"><strong>BLADE - LARAVEL</strong></a>. Es por ello que para crear y editar plantillas de email muy buenas, te recomiendo leer su documentación no te tomará mas de 20 minutos en leerlos. <br>
                        Ademas si tienes conocimientos de php puedes inyectar funciones de ayuda, como por ejemplo para poner una variable en Mayusculas o minusculas con la funcion strtolower() y strtoupper(), etc etc... <br>

                        Cada disparador tiene una plantilla por defecto, que puedes usar para apoyarte en su edición, por otro lado también tienen variables que puedes usar para crear plantillas dínamicas, estas variables son reemplazadas por datos reales al enviarse, para usar estas variables basta con dar clics sobre ellas...
                        </p>
                  </b-col>

               </b-row>

               <b-row>
                  <b-col cols="12" md="4">
                     <b-form-group>
                        <template #label>
                           <label>Boda:<span class="text-danger">*</span></label>
                        </template>

                        <validation-provider name="boda_id" rules="required" #default="{errors}">
                           <el-select v-model="formulario.boda_id" class="w-100" clearable filterable size="small">
                              <el-option v-for="(boda,i) in bodas" :key="i"
                                 :label="`${boda.novios.novia} & ${boda.novios.novio}`" :value="boda.id"></el-option>
                           </el-select>
                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{errors[0]}}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="4">
                     <b-form-group
                        description="El disparador, es el evento desencadenante que hará que el esta plantilla se envíe como correo.">
                        <template #label>
                           <label>Disparador:<span class="text-danger">*</span></label>
                        </template>

                        <validation-provider name="boda_id" rules="required" #default="{errors}">
                           <el-select v-model="formulario.disparador" class="w-100" clearable filterable size="small"
                              @change="disparadorSeleccionado">
                              <el-option v-for="(disparador,i) in disparadores" :key="i" :label="disparador.label"
                                 :value="disparador.value"></el-option>

                           </el-select>

                           <b-form-invalid-feedback :state="errors.length ? false : null">
                              {{errors[0]}}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="4">
                     <b-form-group description="Cual es el asunto del email que se enviará con esta plantilla">
                        <template #label>
                           <label>Tema:<span class="text-danger">*</span></label>
                        </template>

                        <validation-provider name="tema" rules="required" #default="{errors}">
                           <b-form-input v-model="formulario.tema" :state="errors.length ? false : null" />
                           <b-form-invalid-feedback>
                              {{errors[0]}}
                           </b-form-invalid-feedback>
                        </validation-provider>
                     </b-form-group>
                  </b-col>


               </b-row>

               <b-row>
                  <b-col cols="12" v-if="variables.length">
                     <label>Puedes usar las variables disponibles si lo deseas, Algunas variables son objetos por lo
                        cual puedes encadenarla con su valor: por ejemplo $hotel->nombre, $boda->check_in...</label>
                  </b-col>
                  <b-col cols="12">
                     <!-- <b-button-group size="sm" class="flex-wrap"> -->
                     <b-button size="sm" v-for="(variable,i) in variables" :key="i" @click="agregarVariable(variable)"
                        variant="primary" style="margin:0.2rem">{{ variable }}</b-button>

                     <!-- </b-button-group> -->
                  </b-col>
               </b-row>
               <b-row>
                  <b-col>
                     <b-form-group
                        description="El presente editor, busca facilitar la edición de plantillas de email con markdown">
                        <template #label>
                           <label>Contenido: <span class="text-danger">*</span></label>
                        </template>

                        <validation-provider rules="required" name="content" #default="{errors}">
                           <v-md-editor v-model="formulario.content" height="400px" ref="refEdit"></v-md-editor>

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

                        <b-button type="submit" variant="primary" v-loading="loading">
                           <feather-icon icon="SaveIcon" />
                           Guardar
                        </b-button>

                        <b-button target="_blank" :href="`/view/plantilla/email/${formulario.id}`" variant="secondary" v-if="formulario.id">
                           <feather-icon icon="EyeIcon" />
                           Mostrar
                        </b-button>

                        <b-button variant="dark" @click="regresar" title="regresar">
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

import {
   BContainer,
   BForm,
   BRow,
   BCol,
   BFormGroup,
   BFormInvalidFeedback,
   BCard,
   BButtonGroup,
   BButton,
   BFormInput
} from 'bootstrap-vue'

import { ValidationObserver,ValidationProvider } from 'vee-validate'
import {required} from '@validations'

import {ref,toRefs,onMounted,computed,watch} from 'vue'
import { regresar } from '@core/utils/utils';

import store from '@/store'


export default {
   
   components:{
      BContainer,
      BForm,
      BRow,
      BCol,
      BFormGroup,
      BFormInvalidFeedback,
      BCard,
      ValidationObserver,
      ValidationProvider,
      BButtonGroup,
      BButton,
      BFormInput

      
   },

   setup(props,{emit}) {

      const formulario = computed(() => store.state.plantilla.plantilla)

      const draft = computed(() => store.getters['plantilla/draft'])

      const bodas = computed(() => store.state.boda.bodas)

      const refEdit = ref(null)

      const variables = ref([])


      const formValidate = ref(null)

      const disparadores = computed(() => store.state.plantilla.disparadores)

      const cargarForm = () => {


         if(!bodas.value.length){
            store.dispatch('boda/cargarBodas')
         }

         if(formulario.value.disparador){
            cargarVariables(formulario.value.disparador)
         }


      }

      watch([draft],() => cargarForm())

      onMounted(() => {
         cargarForm();
      })

      const guardar = () => {

         emit('save',formulario.value,formValidate.value)

      }

      const agregarVariable = (variable) => {
         
         refEdit.value.replaceSelectionText(`\{\{ $${variable} \}\}`)
      } 

      const cargarVariables = (disparador) => {
         let dispa = disparadores.value.find(v => v.value === disparador)
         variables.value = dispa.variables

      }

      const disparadorSeleccionado = ( val ) => {
         variables.value = []

         if(val){
            cargarVariables(val)
           store.dispatch('plantilla/getTemplate',val).then(respon => {
               formulario.value.content = respon.data
           }).catch(e => console.log(e))
           
         }

      

      }




      return {
         required,
         formValidate,
         formulario,
         regresar,
         guardar,
         loading:computed(() => store.state.loading),
         bodas,
         disparadores,
         agregarVariable,
         variables,
         disparadorSeleccionado,
         refEdit
      }
      
   },
}
</script>

