<template>
  <listado :actions="actions" hideFooter searchPlaceholder="Escriba el nombre del negocio si no lo encuentra en el listado...">
    <template #contenido="{items}">
      <b-container fluid class="mx-0 px-0"> 
        <b-row>
          <b-col cols="12" sm="6" lg="3" v-for="(negocio,i) in items" :key="i">
               <b-card
                  :title="negocio.nombre"
                  :img-src="`/storage/negocios/logos/${negocio.logo}`"
                  img-alt="Image"
                  img-top
                  tag="article"
                  class="mb-2"
                  :class="{'negSelected' : negocio.id === nego.id}"
                   @click="$emit('update:negocioId', negocio.id)" 
                >
                  <b-card-text>
                    {{ negocio.breve }}
                  </b-card-text>

                  <b-button @click.stop="$emit('update:negocioId',negocio.id)" 
                  :variant="nego.id === negocio.id ? 'success' : 'primary'" >
                  {{ negocio.id === nego.id ? 'Seleccionado' : 'Seleccionar' }}
                </b-button>
                </b-card>
          </b-col>
        </b-row>
      </b-container>
    </template>
  </listado>
</template>

<script>
import useNegocioList from 'views/negocios/useNegocioListado.js';

import store from '@/store'

import {computed,ref,toRefs,onMounted} from 'vue'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BImg,
  BCardText,
  BButton

} from 'bootstrap-vue'
export default {

  components:{
    listado:() => import('components/Listado.vue'),
    // bs
    BCard,
    BCardText,
    BContainer,
    BRow,
    BCol,
    BImg,
    BButton

    
  },


  props:{
    negocioId:{
      type:Number,
      nullable:true,
    }
  },

  model:{
    prop:'negocioId',
    event:'update:negocioId'
  },

  setup(props,{emit}){
    const {negocios,negocio:nego} = toRefs(store.state.negocio)
    const {negocioId} = toRefs(props)

    const actions =  useNegocioList();

    actions.refetchData();

    return {
      loading:computed(() => store.state.loading),
      actions,
      nego

    }
  }

}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables/variables';
.card {
      width:100%;
      height:350px;
      cursor:pointer;

      &.negSelected{
        border:2px solid $primary;
      }


      img{
        height: 150px;
        width: auto;
        object-fit: contain;
      }

      .card-text{
        max-height:64px;
        overflow-y:scroll;
      }
      .card-body{
        display:flex;
        flex-direction:column;
        justify-content:space-between;

        button{
          align-self:flex-start;
        }
      }

    }
</style>