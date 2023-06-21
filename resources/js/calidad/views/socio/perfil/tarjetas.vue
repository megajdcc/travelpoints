<template>
    <b-card >
      <b-card-title>
        Mis Tarjetas
      </b-card-title>
    </b-card>
</template>

<script>

import {onMounted,toRefs,ref, computed} from 'vue';
import store from '@/store'
import router from '@/store'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BCardTitle,
} from 'bootstrap-vue'


export default {
  

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BCardTitle,

  },

  setup(props){
    const {usuario} = toRefs(store.state.usuario);

    return {
      loading:computed(() => store.state.loading),
      usuario
    }
  }

}
</script>