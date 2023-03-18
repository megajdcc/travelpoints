<template>
         <b-row>
            <b-col cols="12">
         
               <h3>{{ titulo }}</h3>
               <p>Descubre los negocios que regalan Travel Points en estos destinos</p>
         
            </b-col>
         
            <b-col cols="12" style="position:relative">
               <!-- <SwiperComponent /> -->
         
               <swiper-container ref="swiperRef" init="false">
         
                  <!-- slides -->
         
                  <swiper-slide v-for="(destino, i) in destinos" :key="i" >
         
                     <b-card class="cursor-pointer" header-class="p-0 header-card" body-class="mt-1 px-1 contenido-card"
                        @click="$router.push(destino.ruta)" style="height:370px !important; ">
         
                        <template #header>
                           <b-img  v-if="destino.imagenes.length" :src="`/storage/destinos/imagenes/${destino.imagenes[0].imagen}`" 
                           thumbnail class="card-img"/>
         
                           <has-like :model="{ model_id: destino.id, model_type: destino.modelType }" />
         
                        </template>
         
         
                        <b-link :to="destino.ruta">
         
                           <h4 class="title-card mt-1 mb-0">
                              {{ destino.nombre }}
                           </h4>
         
         
                        </b-link>
                        <!-- <section class="section-rate d-flex mt-0 p-0">
                           <b-form-rating id="rating-sm-no-border" :value="5" no-border variant="warning" inline size="sm"
                              readonly class="ml-0 pl-0" /> <span class="d-flex align-items-center">{{
                                 destino.likes.length
                              }}</span>
                        </section> -->
         
                        <p class="text-justify parrafo-card">{{ destino.titulo }}</p>
         
                     </b-card>
         
                  </swiper-slide>

               </swiper-container>
           
         
            </b-col>
         
         
         </b-row>
</template>

<script>

import {
   BContainer,
   BRow,
   BCol,
   BFormInput,
   BFormGroup,
   BImg,
   BFormRating,
   BLink,
   BCard,
   BBadge

} from 'bootstrap-vue'

import { ref,onMounted} from 'vue'
import useAuth from '@core/utils/useAuth'
import { optionsSwiper } from '@core/utils/utils.js'

export default {

   props: {
      destinos: {
         type: Array,
         required: true
      },

      titulo: {
         type: String,
         required: false,
         default: 'Destinos Travel Points',
      }
   },

   components: {
      BContainer,
      BRow,
      BCol,
      BFormInput,
      BFormGroup,
      BImg,
      BLink,
      BFormRating,
      hasLike: () => import('components/HasLike.vue'),
      BCard,
      BBadge



   },


   setup(props) {

      const swiperRef = ref(null)
      onMounted(() => {
            Object.assign(swiperRef.value, optionsSwiper.value)
            swiperRef.value.initialize();
      })


      const {
         is_loggin
      } = useAuth();

      return {
         is_loggin,
         swiperRef
      }

   }


}
</script>


<style lang="scss" scoped>
.banner-search {
   height: 300px;
   background-position: center top;
   background-repeat: no-repeat;
   background-size: cover;
   background-attachment: fixed;
}

.title-card {
   font-size: 16pt;
}

.card-img {
   height: 200px !important;
   width: 100%;
   object-fit: cover;
}

.header-card {
   position: relative;
}


// .swiper-button-prev,
// .swiper-button-next {
//    // display: none;
// }
// .btn-swiper-next{
//    background: #1e9ad7;
//    border-radius: 50%;
//    width: 40px;
//    height: 40px;
//    color: white;
//    font-weight: 900;
// }

.contenido-card {
   overflow-y: hidden;
}

.parrafo-card {
   overflow-y: hidden;
   height: 60px;
   text-overflow: ellipsis;
   display: -webkit-box;
   -webkit-line-clamp: 3;
   -webkit-box-orient: vertical;

}

.swiper {
  width: 100%;
  height: 100%;
}

.swiper-slide {
  text-align: center;
  font-size: 18px;
  background: #fff;

  /* Center slide text vertically */
  display: flex;
  justify-content: center;
  align-items: center;
}

.swiper-slide img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.swiper {
  width: 100%;
  height: 300px;
  margin: 20px auto;
}
.append-buttons {
  text-align: center;
  margin-top: 20px;
}

.append-buttons button {
  display: inline-block;
  cursor: pointer;
  border: 1px solid #007aff;
  color: #007aff;
  text-decoration: none;
  padding: 4px 10px;
  border-radius: 4px;
  margin: 0 10px;
  font-size: 13px;
}


</style>

