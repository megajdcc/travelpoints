<template>
   <b-container fluid class="px-0 mx-0">
      <b-row>
         <b-col>
            <h3 class="font-weight-bolder titulo">
               <span class="text-warning">Explora</span>
               {{ destino.nombre }}
            </h3>
         </b-col>
      </b-row>

      <!-- Imagenes del Banner -->
      <b-row>

         <b-col cols="12" class="banner-imagenes" v-if="destino.imagenes.length">
            
          
            <article class="portada" >
               <b-img :src="portada" class="w-100"></b-img>

               <b-button variant="dark" @click="() => showGallerie = !showGallerie" size="sm" class="btn-gallerie" rounded>
                  <font-awesome-icon icon="fa-images" class="mr-1" />
                  Ver todas las fotos
               </b-button>

            </article>

            <article class="imagenes-principales">
               <template v-for="({imagen},i) in destino.imagenes.filter(val => !val.portada)">
                   <b-img :key="i"
                     :src="`/storage/destinos/imagenes/${imagen}`" class="w-100" v-if="i <= 1"></b-img>
               </template>
            </article>
         </b-col>

         <b-col cols="12">
            <small>Turismo en {{ destino.nombre }}, {{ destino.estado.pais.pais }} - Viajes a {{ destino.nombre }}</small>
         </b-col>


      </b-row>
      <b-row class="mt-1">
         <b-col cols="12">
            <h3>
               {{ destino.titulo  }}
            </h3>
            <div v-html="destino.descripcion"></div>

            <b-button v-b-toggle.collapse-1 variant="primary" v-if="destino.about_travel">
               {{ $t('Información de Interés sobre el Destino') }}
            </b-button>
               <b-collapse id="collapse-1" class="mt-2">
                  <b-card>
                     <b-card-body >
                        <section v-html="destino.about_travel"></section>
                     </b-card-body>
                  </b-card>
               </b-collapse>
         </b-col>
       
      </b-row>

      <el-divider></el-divider>

      <template v-if="!isHome">
         <!-- Atracciones -->
         <atracciones v-if="destino" :atracciones="destino.atracciones" :titulo="`Las atracciones más populares en ${destino.nombre}`"  />

         <!-- Negocios -->
         <negocios :destino="destino"/>
      </template>
      
      <gallerie :galleries="destino.imagenes" :showGallerie.sync="showGallerie" path="/storage/destinos/imagenes" />

   </b-container>
</template>

<script>

import {toRefs, ref,onMounted,computed} from 'vue'
import store from '@/store'

import {

   BContainer,
   BCard,
   BCollapse,
   BCardBody,
   BRow,
   BCol,
   BImg,
   BButton,
   VBToggle,

} from 'bootstrap-vue'


export default {
   
   props:['query'],

   components:{

      BContainer,
      BCard,
      BRow,
      BCol,
      BCollapse,
      BCardBody,
      BButton,
      BImg,
      atracciones:() => import('components/Atracciones.vue'),
      negocios:() => import('components/Negocios.vue'),
      Gallerie:() => import('components/Gallerie.vue'),
      Negocios:() => import('components/Negocios.vue')
   }, 

   props:{
      isHome:{
         type:Boolean
      }   
   },

   directives:{
      'b-toggle': VBToggle
   },

   setup(props){
      
      const {destino} = toRefs(store.state.destino)
      const showGallerie = ref(false)

      return {
         destino,
         showGallerie,
         portada: computed(() => store.getters['destino/getPortada'])
      }
      
   }


}
</script>

<style lang="scss">
.titulo{
      font-size:24pt;
   }
   
   .banner-imagenes{
      display:flex;
      height:250px;
      overflow: hidden;

      .portada{
         flex:1 1 60%;
         position:relative;
         img {
              height:250px;
              object-fit:cover;
               border: 2px solid white;
         }

         .btn-gallerie{
            position:absolute;
            left:1.5rem;
            top:auto;
            bottom:1.5rem;
            right:auto;
         }

      }

      .imagenes-principales{
         display:none;
         flex-direction: column;
         flex:0 1 40% ;

         img {
               flex: 1 1 calc(250px / 2) ;
               overflow: hidden;
               object-fit: cover;
               object-position: center center;
               border: 2px solid white;
            }
      }
   }

   @media (min-width:762px){
      .titulo {
            font-size: 36pt;
         }
      .portada{
         flex:1 1 50%;
      }
      .imagenes-principales{
         flex: 0 1 50%;
         display:flex !important;
         
        
      }
   }

       @media (min-width:992px) {
         
         .banner-imagenes{
            height: 300px;

            .portada {
               flex: 1 1 60%;
         
               img {
                  height: 300px;
               }
            }
            
            .imagenes-principales {
               flex: 0 1 40%;
         
               img {
                  flex: 1 1 calc(300px / 2);
               }
            }

         }

        
       }
</style>