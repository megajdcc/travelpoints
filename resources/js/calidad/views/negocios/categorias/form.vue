<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12" class="justify-content-center d-flex mb-1">
                     <b-img class="mx-auto" :src="imgUrl" responsive style="max-height:300px" />
                  </b-col>
               </b-row>

               <b-row>
                  <b-col cols="12" md="6">
                     <b-form-group label="Imagen"
                        description="La imagen ha pesar de que no es requerida, muestra al usuario un gráfico representativo de la categoría creada">
                        <validation-provider name="imagen" #default="{errors}">
                           <b-form-file ref="formFile" :state="errors.length ? false : null" v-model="imagen"
                              browse-text="Buscar una imagen" accept="image/*" @input="imagenCargada" />

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>

                        </validation-provider>
                     </b-form-group>

                     <b-form-group>
                        <template #label>
                           Nombre: <span class="required">*</span>
                        </template>

                        <validation-provider name="categoria" rules="required" #default="{errors}">
                           <b-form-input v-model="formulario.categoria" :state="errors.length ? false : null" />
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>


                        </validation-provider>
                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="6">
                     <b-form-group description="Una descripción breve de la categoría">
                        <template #label>
                           Descripción:
                        </template>

                        <validation-provider name="descripcion" #default="{errors}">
                           <b-form-textarea v-model="formulario.descripcion" :state="errors.length ? false : null"
                              :rows="5" />
                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>


                        </validation-provider>
                     </b-form-group>
                  </b-col>


               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group>
                        <b-button variant="primary" type="submit" title="Guardar" v-b-tooltip.hover.top
                           v-loading="loading">
                           <feather-icon icon="SaveIcon" />
                           <strong>Guardar</strong>
                        </b-button>

                        <b-button variant="danger" @click="regresar" title="Regresar" v-b-tooltip.hover.top
                           v-loading="loading">
                           <feather-icon icon="ArrowLeftIcon" />
                           <strong>Regresar</strong>
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
import { ValidationProvider,ValidationObserver } from 'vee-validate'
import {required} from '@validations'
import {ref,computed,toRefs,onMounted, watch,onUnmounted} from 'vue'
import store from '@/store'
import { regresar } from '@core/utils/utils'
import {
   BContainer,
   BRow,
   BForm,
   BCol,
   BFormInput,
   BFormFile,
   BFormGroup,
   BFormTextarea,
   BButtonGroup,
   BButton,
   BFormInvalidFeedback,
   BImg,
   BCard,
   VBTooltip
} from 'bootstrap-vue'

export default {
   components:{
      BContainer,
      BRow,
      BCol,
      BForm,
      BFormInput,
      BFormFile,
      BFormGroup,
      BFormTextarea,
      BButtonGroup,
      BButton,
      BFormInvalidFeedback,
      ValidationObserver,
      ValidationProvider,
      BImg,
      BCard
   },

   directives:{
      'b-tooltip':VBTooltip
   },

   setup(_,{emit}) {

      const formValidate = ref(null)
      const imagen = ref(null)
      const formFile = ref(null)

      const { categoria:formulario } = toRefs(store.state.categoriaNegocio)
      const imgUrl = ref(null)

      const cargarForm = () => {


         if(formulario.value.id && formulario.value.imagen){
            imgUrl.value = formulario.value.imagen
            formulario.value.imagen = null
         }

      }

      onMounted(() => cargarForm())

      watch([formulario], () => cargarForm())

      const guardar = () => {
         emit('save',formulario.value,formValidate.value)
      }

      const imagenCargada =(file) => {
         imgUrl.value = URL.createObjectURL(file)
         formulario.value.imagen = imagen.value
      }

      onUnmounted(() => imgUrl.value = null)

      return {
         formValidate,
         regresar,
         formulario,
         required,
         guardar,
         imgUrl,
         formFile,
         imagenCargada,
         imagen,
         loading:computed(() => store.state.loading)
      }
   },
}
</script>