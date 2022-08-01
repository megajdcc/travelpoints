<template>
   <b-container fluid px-0>
      <b-row>
         <b-col cols="12" md="2" class="d-flex justify-content-center">
            <logo :url="{ name: 'inicio' }" />
         </b-col>

         <b-col cols="12" md="10">
            <p class="text-justify font-weight-bold">
               <strong class="text-default">Travel Points</strong> acerca clientes a los negocios registrados.
               <br>
               Los compradores usan Travel Points para encontrar la información actualizada de los negocios, sus
               promociones y los regalos disponibles en nuestra tienda para ellos. Por eso usan Travel Points antes de
               decidir sus compras.
            </p>

         </b-col>


      </b-row>
      <b-row>
         <b-col cols="12" md="8">
            <h3 class="font-weight-bold">¿Qué gano como Negocio?</h3>
            <p class="text-justify font-weight-bold">
               Como negocio afiliado obtienes la preferencia de los usuarios del sistema, que son compradores reales
               para tu negocio.
               <br>
               Travel Points es una fuente de clientes reales que están buscando dónde comprar y están comprando.
               <br>
               El negocio obtiene una serie de herramientas para publicar su oferta, atraer a los compradores a través
               de los beneficios que ofrezca. El sistema le ofrece herramientas gratuitas de control de sus promociones
               y ventas para medir los resultados.
               <br>
               La afiliación al club es gratuita y el servicio cuesta solamente si logra concretar ventas.
               <br>
               El costo del servicio es una comisión de venta equivalente al 6% o superior, cantidad que el negocio
               elige libremente en su panel de negocio dentro del sitio.
               <br>
               La aplicación permite también promover tus eventos, promociones, novedades, etc. para que tus seguidores
               estén enterados.
            </p>
         </b-col>

         <b-col cols="12" md="4" :style="`background:url(${sales});
         background-repeat: no-repeat;
         background-size: contain;`">
         </b-col>
      </b-row>

      <b-row>
         <b-col cols="12" class="d-flex justify-content-center">
            <b-button :to="{name:'afiliar.negocio'}" variant="primary">
               <feather-icon icon="PlusIcon" />
               Afilia tu negocio aquí
            </b-button>
         </b-col>
      </b-row>
   </b-container>
</template>

<script>
import {
   BContainer, BCard,
   BRow, BCol,
   BImg,
   BLink,
   BButton

} from 'bootstrap-vue'

export default {
   components: {
      BContainer,
      BCard,
      BRow,
      BCol,
      BImg,
      Logo: () => import('components/Logo'),
      BLink,
      BButton


   },

   setup() {

      return {
         sales: require('@/assets/images/illustration/marketing.svg')
      }

   },
}
</script>