<template>
    <section class="banner-perfil-negocio" :style="{ 'background-image': `url(${portada})` }">
      <b-container fluid class="py-2 px-3">
        <b-row>
    
          <b-col cols="12" md="8" class="d-flex flex-column flex-wrap">
    
    
            <section>
              <!-- Tipo de Restaurante -->
    
              <b-badge variant="warning">
                {{ negocio.categoria.categoria }}
              </b-badge>
    
              <!-- Comision por persona o porcentaje -->
    
              <b-badge variant="success" v-if="negocio.tipo_comision == 2" v-b-tooltip.hover="'Monto por Persona'">
                {{ negocio.comision | currency(negocio.divisa.iso) }}
              </b-badge>
    
              <b-badge variant="success" v-else v-b-tooltip.hover="'Porcentaje por lo que consumas'">
                {{ negocio.comision }} %
              </b-badge>
    
            </section>
    
            <section class="mt-2">
    
              <h2 class="display-4">{{ negocio.nombre }}</h2>
    
              <strong class="font-weight-bolder mb-1 text-white"> {{ negocio.breve }}</strong>
    
              <p class=" text-justify font-weight-bolder text-white" style="font-size:16pt">
    
                <font-awesome-icon icon="fas fa-map" />
    
                {{ negocio.direccion }}
              </p>
    
    
            </section>
    
            <section class="d-flex flex-column btn-options-banner">
              <b-button-group>
                <b-button variant="primary" @click="toggleSeguidor" :disabled="!usuario.id" class="font-weight-bolder flex-grow-1">
                  <font-awesome-icon :icon="['fas', getIconSeguidor]" class="mr-1" :color="getColorSeguidor"  />
                  {{ legendSeguidor }}
                </b-button>
    
                <b-button variant="warning" :disabled="!usuario.id" @click="toggleRecomendacion" class="font-weight-bolder flex-grow-1">
                  <font-awesome-icon icon="fa fa-heart" class="mr-1" :color="getColorRecomendacion" />
                  {{ legendRecomendacion }}
                </b-button>
              </b-button-group>

              <b-button variant="success" title="reservar" class="mt-1 font-weight-bolder" @click="isShowReservar = !isShowReservar" v-if="usuario.id" >

                <font-awesome-icon icon="fa fa-calendar" class="mr-1" />
                Reservar

              </b-button>

              
            </section>
    
    
    
          </b-col>
    
          <b-col cols="12" md="4">
    
          </b-col>
    
        </b-row>

      </b-container>

      <NegocioReservar v-model="isShowReservar" />

  </section>
</template>

<script>

import {
  BButtonGroup,
  BButton,
  BBadge,
  VBTooltip,
  BContainer,
  BRow,
  BCol
} from 'bootstrap-vue'

import {computed,toRef,ref,toRefs} from '@vue/composition-api'
import store from '@/store'


export default {
  
  props:{
    negocio:Object
  },  

  components:{
    BButtonGroup,
    BButton,
    BBadge,
    BContainer,
    BRow,
    BCol,
    NegocioReservar:() => import('components/NegocioReservar.vue')
  },

  directives:{
    'b-tooltip':VBTooltip
  },


  
  setup(props){

    const { negocio } = toRefs(props)
    const { usuario } = toRefs(store.state.usuario)
    const isShowReservar = ref(false)

    const portada = computed(() => {

      const imagen = negocio.value.imagenes.filter(val => val.portada)[0];

      if (imagen) {
        return `/storage/negocios/fotos/${imagen.imagen}`
      }

      return '';

    });

    const toggleRecomendacion = () => {

      store.dispatch('negocio/toggleRecomendacions',usuario.value.id)

    }


    const toggleSeguidor = () => {

      store.dispatch('negocio/toggleSeguidor', usuario.value.id)

    }


    return {
      portada,
      usuario,
      toggleRecomendacion,
      isShowReservar,

      getIconSeguidor:computed(() => {

        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return 'fa-handshake';
        }

        return 'fa-handshake-slash';

      }),

      getColorRecomendacion:computed(() => {

        if (negocio.value.recomendaciones.find(val => val.usuario_id === usuario.value.id)) {
          return '#f60022';
        }

        return '#ffffff';

      }),

      getColorSeguidor: computed(() => {

        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return '#fff';
        }

        return '#ffffff';

      }),

      legendRecomendacion:computed(() => {

        if(negocio.value.recomendaciones.find(val => val.usuario_id === usuario.value.id)){
          return 'Lo recomiendas'
        }

        return '¿ Lo Recomiendas ?'
      }),
      toggleSeguidor,

      legendSeguidor:computed(() => {
        if (negocio.value.seguidores.find(val => val.usuario_id === usuario.value.id)) {
          return 'Lo sigo'
        }

        return '¿ Seguir ?'
      })
    }


  }
}
</script>

<style lang="scss">
.banner-perfil-negocio {
  width: 100%;
  height: 400px;
  background-size: cover;
  background-position: center center;

  display: flex;
  align-items: center;

  &::before {
    content: '';
    background-color: rgba(0, 0, 0, 0.35);
    width: 100%;
    height: 100%;
    position: absolute;
  }
}


.btn-options-banner{
  width:100%;

}


@media (min-width:480px) {

  .btn-options-banner {
    width: 75%;
  }

}

@media (min-width:720px){

    .btn-options-banner {
      width: 50%;
    }

}
</style>
