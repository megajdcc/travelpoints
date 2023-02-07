<template>
  <b-button-group>
    <b-button variant="primary" @click.stop="toggleSeguidor" :disabled="!usuario.id" class="font-weight-bolder flex-grow-1" v-b-tooltip.hover="legendSeguidor">
      <font-awesome-icon :icon="['fas', getIconSeguidor]" :class="{'mr-1' : !hideLegend}"  :color="getColorSeguidor"  />
        <template v-if="!hideLegend">
          {{ legendSeguidor }}
        </template>
    </b-button>

    <slot name="btns">
        
    </slot>
  
    <b-button variant="warning" :disabled="!usuario.id" @click.stop="toggleRecomendacion"
      class="font-weight-bolder flex-grow-1" v-b-tooltip.hover="legendRecomendacion">
      <font-awesome-icon icon="fa fa-heart" :class="{'mr-1' : !hideLegend}" :color="getColorRecomendacion" />

      <template v-if="!hideLegend">
        {{ legendRecomendacion }}
      </template>
    </b-button>

  </b-button-group>
</template>

<script>

import {
  BButtonGroup,
  BButton,
  VBTooltip

} from 'bootstrap-vue'
import store from '@/store'

import { computed,toRefs,ref, onMounted } from '@vue/composition-api'

export default{


  props:{
    negocio:Object,
    hideLegend:Boolean
  },
  
  directives:{
    'b-tooltip' : VBTooltip
  },

  components:{
    BButtonGroup,
    BButton,
  },

  setup(props){

    const {negocio} = toRefs(props)
    const {usuario} = toRefs(store.state.usuario)


    const toggleRecomendacion = () => {

      store.dispatch('negocio/toggleRecomendacions', { negocio: negocio.value.id, usuario:usuario.value.id })

    }


    const toggleSeguidor = () => {

      store.dispatch('negocio/toggleSeguidor', { negocio: negocio.value.id, usuario: usuario.value.id })

    }

    return {
      usuario,
      toggleRecomendacion,
      toggleSeguidor,


      getIconSeguidor: computed(() => {

        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return 'fa-handshake';
        }

        return 'fa-handshake-slash';

      }),


      getColorSeguidor: computed(() => {

        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return '#fff';
        }

        return '#ffffff';

      }),

      legendSeguidor: computed(() => {
        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return 'Lo sigo'
        }

        return '¿ Seguir ?'
      }),


      getColorRecomendacion: computed(() => {

        if (negocio.value.recomendaciones.find(val => val.usuario_id === usuario.value.id)) {
          return '#f60022';
        }

        return '#ffffff';

      }),

      legendRecomendacion: computed(() => {

        if (negocio.value.recomendaciones.find(val => val.usuario_id === usuario.value.id)) {
          return 'Lo recomiendas'
        }

        return '¿ Lo Recomiendas ?'
      }),




    }
  }


}
</script>