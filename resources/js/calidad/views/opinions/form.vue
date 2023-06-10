<template>
      <section >
         <b-button-group size="sm">
             <slot name="btn-prepend">
               
            </slot>
            <b-button @click="() => showOpinion = true" variant="outline-info" size="sm" v-if="is_loggin" >
               <slot name="labelButton">
                  Escribe una opinión
               </slot>
            </b-button>

            <slot name="btn-append">

            </slot>
         </b-button-group>
         

         <b-modal :visible="showOpinion" @hide="cerrar" hide-footer centered lazy no-close-on-backdrop title="Agregar Opinión">
            <validation-observer ref="formValidate" #default="{ handleSubmit }">
               <b-form @submit.prevent="handleSubmit(guardar)" style="max-height:450px;overflow-y:scroll">
                  <b-container fluid>
                     <b-row>
         
                        <b-col cols="12" >
                           <b-form-group>
            
                              <template #label v-if="!isCompra">
                                 Califica tu experiencia: <small>(Obligatorio)</small>
                              </template>

                                 <template #label v-else>
                                       Que calificación le pones al producto comprado: <small>(Obligatorio)</small>
                                 </template>
                              
                                

                              <validation-provider name="calificacion" rules="required" #default="{ valid, errors }">
            
                                 <el-rate v-model="formulario.calificacion" :texts="legendRate" show-text :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                                 </el-rate>
                              
            
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
            
                              </validation-provider>
            
                           </b-form-group>

                           <b-form-group>
                              <template #label>
                                 Escribir una opinión: <small>(Obligatorio)</small>
                              </template>

                              <template #description>
                                 <span class="ml-auto" :class="{'text-success' : formulario.opinion.length >= 100 }" >
                                    {{ formulario.opinion.length }} caracteres (100 mínimo)
                                 </span> 
                                
                              </template>


                              <validation-provider name="opinion" rules="required|min:100" #default="{errors,valid}">

                                 <b-form-textarea v-model="formulario.opinion" :state="valid" :rows="2" />

                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                              
                              </validation-provider>
                           </b-form-group>

                           <b-form-group>
                              <template #label>
                                 Dale un título a tu opinión: <small>(Obligatorio)</small>
                              </template>
                           
                              <validation-provider name="titulo" rules="required" #default="{errors,valid}">
                           
                                 <b-form-input v-model="formulario.titulo" :state="valid" />
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>

                           </b-form-group>

                           <b-form-group v-if="!isConsumo">
                              <template #label>
                                ¿ Cuando fuiste ?: <small>(Obligatorio)</small>
                              </template>
                           
                              <validation-provider name="asistencia" rules="required" #default="{errors,valid}">
                           
                                 <v-select v-model="formulario.asistencia" :options="optionsAsistencia"></v-select>
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           
                           </b-form-group>

                           <b-form-group v-if="!isCompra">
                              <template #label>
                                 ¿ Quién fue contigo ?: <small>(Obligatorio)</small>
                              </template>
                           
                              <validation-provider name="acompanante" rules="required" #default="{errors,valid}">
                           
                                 <v-select v-model="formulario.acompanante" :reduce="(option) => option.value" :options="optionsAcompanante"></v-select>
                           
                                 <b-form-invalid-feedback :state="valid">
                                    {{ errors[0] }}
                                 </b-form-invalid-feedback>
                           
                              </validation-provider>
                           
                           </b-form-group>

                            <b-form-group>
                             
                           
                           <b-form-checkbox id="checkbox-1" v-model="formulario.certificacion"  :value="true" :unchecked-value="false">
                              Certifico que esta opinión se basa en mi propia experiencia y es mi opinión genuina sobre este establecimiento; que no
                              tengo ninguna relación personal ni comercial con dicho establecimiento y que ningún establecimiento me ofreció ningún
                              tipo de incentivo o pago alguno para que escribiese esta opinión. Comprendo que Travelpoints tiene una política de
                              tolerancia cero con las opiniones falsas. <b-link :to="{ name:'terminos-condiciones'}"> Obtener más información</b-link>
                           </b-form-checkbox>
                           </b-form-group>
                        </b-col>

                        <b-col cols="12">
                           <b-button type="submit" variant="primary" v-loading="loading" :disabled="!formulario.certificacion">
                              Envía tu opinión
                           </b-button>
                        </b-col>
            
                     </b-row>
                  </b-container>
               </b-form>
            </validation-observer>
         </b-modal>
      </section>
     
</template>

<script>
import {ValidationObserver,ValidationProvider} from 'vee-validate'

import {
   BContainer,
   BRow,
   BCol,
   BForm,
   BFormInput,
   BFormGroup,
   BFormInvalidFeedback,
   BButton,
   BButtonGroup,
   BModal,
   BFormTextarea,
   BLink,
   BFormCheckbox
} from 'bootstrap-vue'

import vSelect from 'vue-select'

import {required,min} from '@validations'
import { regresar } from '@core/utils/utils';

import {ref,computed,onMounted,toRefs} from 'vue'
import store from '@/store'
import router from '@/router'
import useAuth from '@core/utils/useAuth';
export default {
   
   components:{
      ValidationObserver,
      ValidationProvider,
      BForm,
      BFormInput,
      BFormGroup,
      BFormInvalidFeedback,
      BButton,
      BButtonGroup,
      BContainer,
      BRow,
      BModal,
      BCol,
      BFormTextarea,
      vSelect,
      BLink,
      BFormCheckbox,
   },

   props:{
      modelType:String,
      modelId:Number,
      isConsumo:Boolean,
      isCompra:Boolean
   },

   setup(props,{emit}){
      
      const formValidate = ref(null)
      const showOpinion = ref(false)
      const {modelType,modelId} = toRefs(props)

      const {opinion:formulario} = toRefs(store.state.opinion)

      const cerrar = () => { showOpinion.value = false }
      const {
         is_loggin
      } = useAuth()
      
      const guardar = () => {

         console.log('guardando')
         formulario.value.model_id = modelId.value
         formulario.value.model_type = modelType.value

         store.dispatch('opinion/guardar',formulario.value).then(({result,opinion}) => {

            if(result){
             
               store.commit('opinion/clear')
               cerrar();

               emit('opinionGuardada',opinion)
               toast.success('Se ha agregado con éxito la opinión', { position: 'bottom-right' })
            }else{
               toast.success('No se pudo agregar la opinión, intente de nuevo', { position: 'bottom-right' })
            }

         }).catch(e => {

            console.log(e)

            if(e.response.status === 422){
               formValidate.value.setErrors(e.response.data.errrors)
            }

         })

      }

      const legendRate = computed(() => {

         return [
            'Pésimo',
            'Malo',
            'Regular',
            'Muy Bueno',
            'Excelente'
         ]
      })

      return {
         cerrar,
         regresar,
         loading:computed(() => store.state.loading),
         formulario,
         required,
         min,
         formValidate,
         guardar,
         showOpinion,
         legendRate,
         is_loggin,
         optionsAsistencia: computed(() => store.getters['opinion/optionsAsistencia']),
         optionsAcompanante: computed(() => store.getters['opinion/optionsAcompanante']),
         iconClasses: computed(() => ['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3'])
      }
   }

}
</script>