<template>
   <b-container fluid>
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

         <b-col cols="12" class="banner-imagenes">
            
          
            <article class="portada" >
               <b-img :src="portada" class="w-100"></b-img>
            </article>

            <article class="imagenes-principales">
               <b-img v-for="({imagen},i) in destino.imagenes.filter(val => !val.portada)" :key="i"
                  :src="`/storage/destinos/imagenes/${imagen}`" class="w-100" v-if="i <= 1"></b-img>
            </article>
            
         </b-col>


      </b-row>
      <b-row class="mt-1">
         <b-col cols="12">
            <h3>
               {{ destino.titulo  }}
            </h3>
            <p class="text-justify">{{ destino.descripcion  }}</p>
         </b-col>
      </b-row>
   </b-container>
</template>

<script>

import {toRefs, ref,onMounted,computed} from '@vue/composition-api'
import store from '@/store'

import {

   BContainer,
   BCard,
   BRow,
   BCol,
   BImg,

} from 'bootstrap-vue'


export default {
   
   props:['query'],

   components:{

      BContainer,
      BCard,
      BRow,
      BCol,
      BImg,
   }, 

   setup(props){
      
      const {destino} = toRefs(store.state.destino)

      return {
         destino,

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
         img {
              height:250px;
              object-fit:cover;
               border: 2px solid white;
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