<template>

   <validation-observer ref="formValidate" #default="{handleSubmit}">
      <b-form @submit.prevent="handleSubmit(guardar)">

         <b-card>
            <b-container fluid>
               <b-row>
                  <!-- Amenidades -->
                  <b-col cols="12" md="6">
                    
                   

                    <b-form-group>
                      <template #label>
                        <h3>Amenidades</h3>
                        <p class="text-mute py-0 my-0">
                           Selecciona las amenidades que ofrece tu negocio, estas serán visibles en el perfil.
                        </p>
                      </template>
                      <el-divider></el-divider>
                      
                      <validation-provider name="amenidad" #default="{valid,errors}">

                        <b-form-checkbox-group v-model="formAmenidades" :options="amenidades" value-field="id" text-field="nombre" stacked @change="guardarAmenidad">

                        </b-form-checkbox-group>
                     </validation-provider>


                    </b-form-group>
                  </b-col>

                  <!-- Formas de Pago -->
                  <b-col cols="12" md="6">
                     <b-form-group>
                        <template #label>
                           <h3>Formas de Pago</h3>
                           <p class="text-mute py-0 my-0">
                           Selecciona las formas de pago que admite tu negocio, también serán visibles en el perfil.
                           </p>
                        </template>
                        <el-divider></el-divider>
                     
                        <validation-provider name="formasPago" #default="{valid,errors}">
                           <b-form-checkbox-group v-model="formasPago" :options="formas" value-field="id" text-field="nombre"
                              stacked @change="guardarFormaPago">
                     
                           </b-form-checkbox-group>
                        </validation-provider>
                     
                     
                     </b-form-group>
                  </b-col>

               </b-row>
            </b-container>


            <template #footer>
               <b-button-group size="sm">
                  
                  <!-- <b-button variant="primary" type="submit" v-loading="loading" :disabled="loading">
                     <feather-icon icon="SaveIcon" />
                     Guardar
                  </b-button> -->

                  <b-button variant="dark"  v-loading="loading" :disabled="loading" @click="regresar">
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

import {
   BCard,
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormGroup,
   BFormInvalidFeedback,
   BFormCheckboxGroup,
   BButtonGroup,
   BButton,
   BForm
} from 'bootstrap-vue'

import {
   ValidationObserver,
   ValidationProvider
} from 'vee-validate'

import {required} from '@validations'
import { regresar } from '@core/utils/utils'

import {toRefs,computed,onMounted,ref,watch} from '@vue/composition-api'
import store from '@/store'

export default {
   
   components:{
      BCard,
      BContainer,
      BRow,
      BCol,
      BFormInput,
      BFormGroup,
      BFormInvalidFeedback,
      BFormCheckboxGroup,
      BButtonGroup,
      BButton,
      ValidationObserver,
      ValidationProvider,
      BForm

   },


   setup(){
      
      const {negocio:formulario} = toRefs(store.state.negocio)


      const formValidate = ref(null)
      const {amenidades} = toRefs(store.state.amenidad)
      const { formas } = toRefs(store.state.formasPago)

      const formAmenidades = ref([])
      const formasPago = ref([])


      const cargarForm = () => {
         
         if(!amenidades.value.length){
            store.dispatch('amenidad/getAmenidades')
         }

         if (!formas.value.length) {
            store.dispatch('formasPago/getFormas')
         }

         formAmenidades.value = formulario.value.amenidades.map(val => val.id)

         formasPago.value = formulario.value.formas_pago.map(val => val.id)


      }

      onMounted(() => {
         cargarForm()
      })


      const guardar = () => {

         store.dispatch('negocio/guardarAmenidad',formulario.value).then(({result})  => {
            
            if(result){
               toast.success('Se ha asignado con éxito la amenidad')
            }else{
               toast.info('No se pudo asignar la amenidad, inténtelo de nuevo')
            }

         })

      }

      const guardarAmenidad = (ams)  => {
         
         store.dispatch('negocio/guardarAmenidad',{negocio:formulario.value.id,amenidads:ams}).then(({result}) => {
            if (result) {
               toast.success('Se ha asignado con éxito la amenidad',{position:'bottom-right'})
            } else {
               toast.info('No se pudo asignar la amenidad, inténtelo de nuevo',{position:'bottom-right'})
            }
         })

      }

      const guardarFormaPago = (forms) => {
         store.dispatch('negocio/guardarFormaPago', { negocio: formulario.value.id, formas: forms }).then(({ result }) => {
            if (result) {
               toast.success('Se ha asignado con éxito la forma de pago',{position:'bottom-right'})
            } else {
               toast.info('No se pudo asignar la forma de pago, inténtelo de nuevo',{position:'bottom-right'})
            }
         }) 
      }


      watch([formas,amenidades,formulario],() => cargarForm())

      return {
         formValidate,
         guardar,
         required,
         regresar,
         loading:computed(() => store.state.loading),
         formulario,
         amenidades,
         formas,
         guardarAmenidad,
         guardarFormaPago,
         formAmenidades,
         formasPago
      }

   }


}
</script>