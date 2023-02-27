<template>

  <section>
     <pdf :src="uri" @num-pages="numeroPagina" :page="paginaMostrar" class="mipdf" :style="{
      height:height,
      width:width
     }">
                  
    </pdf>

    <section class="d-flex justify-content-center mt-1">

      <b-button-group size="sm">
        <b-button variant="dark" :href="uri" download title="Descargar" >
            <font-awesome-icon icon="fas fa-download"/>
        </b-button>
        
        <b-button @click="paginaAnterior" variant="primary" title="Pagina Anterior" 
          v-if="paginasPdf > 1 && paginaMostrar > 1">
            <font-awesome-icon icon="fas fa-arrow-left"/>
        </b-button>

        <b-button @click="siguientePagina" variant="primary" 
          title="Siguiente Pagina"    v-if="paginasPdf > 1 && paginaMostrar < paginasPdf">
          <font-awesome-icon icon="fas fa-arrow-right"/>
        </b-button>
      </b-button-group>
        
      </section>
  </section>
 
</template>

<script>

import pdf from 'vue-pdf'

import {
  BButton,
  BButtonGroup,
} from 'bootstrap-vue';

import { computed, toRefs, ref, onMounted } from '@vue/composition-api'

export default {
  

  props:{
    path:{
      type:String,
      default: `/storage/negocios/menu/`
    },
    pdf:String,
    width:{
      type:String|Number,
      default:'100%'
    },

    height: {
      type: String | Number,
      default: '450px'
    },

  },

  components:{
      BButton,
      pdf,
  BButtonGroup,

  },


  setup(props){

    const {pdf,path} = toRefs(props)

    const paginasPdf  = ref(0)
    const paginaMostrar  =ref(1)

    const numeroPagina = (sum) => paginasPdf.value = sum;

    const siguientePagina = () => {
        paginaMostrar.value++;
    }

     const paginaAnterior = () => {
      paginaMostrar.value--;
    }



    return {
      paginasPdf,
      paginaMostrar,
      numeroPagina,
      siguientePagina,
      paginaAnterior,
      uri:computed(() => `${path.value}${pdf.value}`)
    }
  }
}
</script>

<style lang="scss">

  .mipdf{
    display: flex !important;
    justify-content: center;
    
  }

  .mipdf canvas{
    height: 100% !important;
    width:auto !important;
  }

</style>