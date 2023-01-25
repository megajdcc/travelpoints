<template>
  <validation-observer ref="formValidate" #default="{handleSubmit}">

    <form-wizard color="#0097CE" :title="null" :subtitle="null" finish-button-text="Guardar" back-button-text="Regresar" next-button-text="Siguiente"
      class="steps-transparent mb-3" @on-complete="handleSubmit(guardar)">

      <tab-content title="Account Details" icon="feather icon-file-text">
        <b-card>  
          <b-container fluid class="px-0 mx-0">
              <b-row>
                <b-col cols="12" class="mb-2">
                  <h5 class="mb-0">
                    Account Details
                  </h5>
                  <small class="text-muted">
                    Enter Your Account Details.
                  </small>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Username" label-for="i-username">
                    <b-form-input id="i-username" placeholder="johndoe" />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Email" label-for="i-email">
                    <b-form-input id="i-email" type="email" placeholder="john.doe@email.com" />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Password" label-for="i-password">
                    <b-form-input id="i-password" type="password" placeholder="Password" />
                  </b-form-group>
                </b-col>
                <b-col md="6">
                  <b-form-group label="Confirm Password" label-for="i-c-password">
                    <b-form-input id="i-c-password" type="password" placeholder="Re-type Password" />
                  </b-form-group>
                </b-col>
              </b-row>
          </b-container>

        </b-card>
     
      </tab-content>

      <tab-content title="Account Details" icon="feather icon-file-text">
        <b-card>
          <b-container fluid class="px-0 mx-0">
            <b-row>
              <b-col cols="12" class="mb-2">
                <h5 class="mb-0">
                  Account Details
                </h5>
                <small class="text-muted">
                  Enter Your Account Details.
                </small>
              </b-col>
              <b-col md="6">
                <b-form-group label="Username" label-for="i-username">
                  <b-form-input id="i-username" placeholder="johndoe" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Email" label-for="i-email">
                  <b-form-input id="i-email" type="email" placeholder="john.doe@email.com" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Password" label-for="i-password">
                  <b-form-input id="i-password" type="password" placeholder="Password" />
                </b-form-group>
              </b-col>
              <b-col md="6">
                <b-form-group label="Confirm Password" label-for="i-c-password">
                  <b-form-input id="i-c-password" type="password" placeholder="Re-type Password" />
                </b-form-group>
              </b-col>
            </b-row>
          </b-container>
      
        </b-card>
      
      </tab-content>

    

    </form-wizard>

    <!-- <form-wizard /> -->

  </validation-observer>


</template>


<script>

import {ValidationObserver, ValidationProvider} from 'vee-validate'
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'


import {
  BForm,
  BCard,BContainer,
  BCol,
  BRow,
  BFormInvalidFeedback,
  BButtonGroup,
  BButton,
  BFormGroup,
  BFormInput
} from 'bootstrap-vue'

import {required} from '@validations'

import { regresar } from '@core/utils/utils'

import store from '@/store'
import {toRefs,ref,computed,onMounted} from '@vue/composition-api';


export default {

  components:{
    BForm,
    BCard, BContainer,
    BCol,
    BRow,
    BFormInvalidFeedback,
    BButtonGroup,
    BButton,
    ValidationObserver,
    ValidationProvider,
    FormWizard,
    TabContent,
    BFormGroup,
    BFormInput,

    // FormWizard:() => import('@/views/forms/form-wizard/FormWizard.vue')

  },


  setup(props,{emit}){
    const formValidate = ref(null)

    const {venta:formulario} = toRefs(store.state.venta)


    const guardar = () => {
      emit('save',formulario.value,formValidate.value)
    }

    return {
      regresar,
      required,
      formulario,
      formValidate,
      guardar,
      loading:computed(() => store.state.loading)
    }
  }
}
</script>