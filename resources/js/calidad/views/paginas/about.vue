<template>
   <b-container fluid px-0>
      <b-row>
         <b-col cols="12" md="2" class="d-flex justify-content-center">
            <logo :url="{name:'inicio'}" />
         </b-col>

         <b-col cols="12" md="10">
            <p class="text-justify font-weight-bold">
               <strong class="text-default">Travel Points</strong> es un sistema de premiación para los compradores
               registrados, con afiliación y uso totalmente gratuito, que permite reunir puntos generados en varios
               negocios dentro de una misma cartera digital.
               <br>
               En un solo sitio los compradores encuentran negocios, promociones y regalos, lo que lo convierte en una
               app muy conveniente antes de ir a comprar cualquier cosa.
            </p>

         </b-col>


      </b-row>
      <b-row>
         <b-col cols="12" md="8">
            <h3 class="font-weight-bold">¿Qu&eacute; gano como Usuario de Travel Points?</h3>
            <p class="text-justify font-weight-bold">
               <mark>Gana Regalos</mark> de calidad, Productos y Servicios como joyas, hospedajes, masajes y mucho más.
               Velos ahora mismo en nuestra <b-link :to="{name:'store'}">tienda</b-link> .
               <br>
               Elige tus regalos favoritos y págalos con tus puntos (<strong>Travel Points</strong>) que vas acumulando
               con cada compra registrada en cualquiera de los negocios afiliados.
               <br>
               Cada negocio te regala un porcentaje de tu compra en puntos, y se suman todos en tu cuenta de Travel
               Points: así sumas puntos mucho más rápido.
               <br>
               Para saber cuánto te ofrece cada negocio puedes visitarlo y verlo. Está en el cuadrito de color ubicado
               junto a la categoría del negocio.
               <br>
               Cuando ingresas a tu cuenta podrás ver tus puntos, y si vas a compras podrás ver todas las compras que te
               han registrado. No te olvides de pedir que te registren tus puntos cada vez que compres en cualquiera de
               los negocios afiliados.
               <br>
               También puedes seguir a tus negocios favoritos para enterarte de todas sus novedades y promociones.
               <br>
               Podrás publicar tu opinión del negocio tras cada compra, y así ayudarás a los demás usuarios. También tú
               podrás ver la opinión de los demás, para que elijas ir a los negocios que más te atraigan.

            </p>


         </b-col>

         <b-col cols="12" md="4" :style="`background:url(${sales});
                                          background-repeat: no-repeat;
                                          background-size: contain;`">
         </b-col>
      </b-row>
   </b-container>
</template>

<script>
import {
   BContainer,BCard,
   BRow,BCol,
   BImg,
   BLink

} from 'bootstrap-vue'
<<<<<<< HEAD
=======
import useAuth from '@core/utils/useAuth';
import {onMounted} from '@vue/composition-api'
>>>>>>> vite

export default {
   components:{
      BContainer, 
      BCard,
      BRow,
      BCol,
      BImg,
      Logo:() => import('components/Logo'),
      BLink

   },

   setup() {
      
<<<<<<< HEAD
=======
      const {authGoogle} = useAuth();

      onMounted(() => authGoogle())
      
      
>>>>>>> vite
      return {
         sales:require('@/assets/images/illustration/sales.svg')
      }

   },
}
</script>