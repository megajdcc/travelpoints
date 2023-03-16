<template>
   <b-card>
      
   </b-card>

</template>
<script>

import {ref,toRefs,onMounted,watch,computed} from 'vue'

import { ValidationObserver,ValidationProvider } from 'vee-validate'

import { required,email } from '@validations'

import {
   BCard,
   BContainer,
   BForm,
   BRow,
   BCol,
   BFormGroup,
   BFormInput,
   BFormInvalidFeedback,
   BInputGroup,
   BButtonGroup,
   BButton,
   BFormRadio,
   BFormRadioGroup,

} from 'bootstrap-vue'

export default {

   components:{
      BCard,
      BContainer,
      BForm,
      BRow,
      BCol,
      BFormGroup,
      BFormInput,
      BFormInvalidFeedback,
      BInputGroup,
      BButtonGroup,
      BButton,
      BFormRadio,
      BFormRadioGroup,
      ValidationObserver,
      ValidationProvider
   },

   setup() {


      return {
         required,
         email
      }
   },
}
</script>