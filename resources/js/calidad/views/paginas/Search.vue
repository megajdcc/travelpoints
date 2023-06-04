<template>
  <b-container>
   <b-row>
      <b-col>
         Resultados : {{  search  }}
      </b-col>
   </b-row>
  </b-container>
</template>

<script>

import {
   BCard,
   BForm,
   BRow,
   BCol,
   BContainer,
   BFormInput,
   BFormGroup,
   BFormInvalidFeedback,
   BButton,
   BButtonGroup
} from 'bootstrap-vue'

import {ValidationObserver,ValidationProvider} from 'vee-validate'
import {required} from '@validations'

import {computed,toRefs,ref}  from 'vue'; 
import { regresar } from '@core/utils/utils';

export default {
   
   props:['query'],

   components:{
      BCard,
      BForm,
      BRow,
      BContainer,
      BCol,
      BFormInput,
      BFormGroup,
      ValidationObserver,
      ValidationProvider,
      BFormInvalidFeedback,
      BButton,
      
      BButtonGroup
   },


   setup(props){

      const {query} = toRefs(props)

      return {
         search:computed(() => query.value),
         required,
         regresar,
         loading:computed(() => store.state.loading)
      }
      
   }
}
</script>