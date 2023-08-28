<template>  
        <validation-observer ref="formValidate" #default="{handleSubmit}">

          <b-form @submit.prevent="handleSubmit(guardar)">
            <b-card>

            <b-container fluid>
              <b-row>
                <b-col cols="12" md="6">

                  <b-form-group>
                    <template #label>
                      Comisión a tus promotores: <span class="text-danger"> * </span>
                    </template> 

                    <validation-provider name="comision_promotores" rules="required" #default="{errors,valid}" >
                      
                        <el-slider
                          v-model="formulario.comision_promotores"
                          show-input>
                        </el-slider>

                      <b-form-invalid-feedback :state="valid">
                        {{ errors[0] }}
                      </b-form-invalid-feedback>
                    </validation-provider>
                  </b-form-group>
                </b-col>

                <b-col cols="12" md="6">
                  <b-form-group label="Tu cobras el:" description="De las comisiones obtenidas">
                    <h2>{{ miComision }} %</h2>
                  </b-form-group>
                </b-col>
              </b-row>

            </b-container>
          

            <template #footer>
              <b-button-group size="sm">
                <b-button type="submit" variant="primary" v-loading="loading" :disabled="loading">
                  <font-awesome-icon icon="fas fa-save"/>
                  Guadar
                </b-button>
              </b-button-group>

            </template>
          </b-card>
            
          </b-form>
        </validation-observer>
    
</template>

<script>

import {ValidationProvider,ValidationObserver} from 'vee-validate'

import {computed,toRefs,ref,watch} from 'vue'

import store from '@/store'

import {required} from '@validations'


import {
  BFormGroup,
  BFormInput,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BContainer,
  BCard,
  BRow,
  BCol,
  BForm
} from 'bootstrap-vue'

export default {
  
  components:{
    ValidationObserver,
    ValidationProvider,

    // Bs

    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    BContainer,
    BCard,
    BRow,
    BCol,
    BForm

  },


  setup(props){
    const {usuario} = toRefs(store.state.usuario)
    const formValidate = ref(null)

    const formulario = ref({
      comision_promotores:0,
      id:computed(() => usuario.value.id)
    })

    const cargarForm = () => {
      formulario.value.comision_promotores = usuario.value.comision_promotores
    }


   
    cargarForm();

    const guardar = () => {

      
      store.dispatch('usuario/guardarComisionPromotor',formulario.value).then(({result}) => {
        if(result){
          toast.success('Se ha actualizado con éxito, la comisión que le darás a tus promotores.')
        }else{
          toast.info('No se pudo, guardar, inténtelo de nuevo mas tarde.')
        }
      }).catch(e => {
        if(e.response.status === 422){
          formValidate.value.setErrors(e.response.data.errors)
        }
        console.log(e)
      })


    }



    return {
      loading:computed(() => store.state.loading),
      formulario,
      required,
      guardar,
      formValidate,
      miComision:computed(() => {
        return 100 - formulario.value.comision_promotores;
      })
    }

  }
}
</script>