<template>

      <section class="w-100 d-flex justify-content-center content-search">
         
         <b-input-group class="el-search" size="md">
            <b-input-group-prepend is-text>
               <feather-icon icon="SearchIcon" />
            </b-input-group-prepend>
           
            <b-form-input v-model="search" @input="remoteMethod" placeholder="¿ A Donde ?" ref="refInput">
            </b-form-input>
         </b-input-group>
        
         
      
      
         <b-list-group class="collapseSearch d-flex flex-column align-items-center" ref="refToggle" v-if="search">
            <!-- <b-spinner v-show="loading" variant="primary" class="my-1"></b-spinner> -->
            
            <b-list-group-item button variant="light" @click="searchGPS">
               <feather-icon icon="SendIcon" />
               Cerca de mí
            </b-list-group-item>

            <b-list-group-item v-for="({nombre,id,ruta,tipo,imagen},i) in resultados" :key="i" class="cursor-pointer" button :to="ruta" >

               <article class="d-flex" @click="() => $router.push(ruta)">
                  <b-img :src="imagen" thumbnail style="height:70px; width:70px;object-fit:fill" class="mr-1" />
                  <main>
                     <h3>{{ nombre }}</h3>
                     <span>
                        {{ tipo }}
                     </span>
                  </main>
               </article>
            </b-list-group-item>

            <b-list-group-item v-if="!resultados.length" button variant="info">
               <b-link :to="`/search?q=${search}`">
                  Todos los resultados para "{{ search }}"
               </b-link>
            </b-list-group-item>

         </b-list-group>
      

      </section>

</template>

<script>

import {toRefs,ref,computed,onMounted,watch} from '@vue/composition-api'

import store from '@/store'
import router from '@/router'
import {useGeolocation}  from '@vueuse/core'

import {
   BFormInput,
   BCollapse,
   BListGroup,
   BListGroupItem,
   VBToggle,
   BSpinner,
   BImg,
   BContainer,
   BRow,
   BInputGroup,
   BCol,
   BInputGroupText,
   BInputGroupPrepend,
   BLink

} from 'bootstrap-vue'

export default {
   
   components:{
      BCollapse,
      BFormInput,
      BListGroup,
      BListGroupItem,
      BSpinner,
      BImg,
      BContainer,
      BRow,
      BCol,
      BInputGroup,
      BInputGroupText,
      BInputGroupPrepend,
      BLink,
   },

   directives:{
      'b-toggle':VBToggle
   },

   setup(props){

      const search = ref('')
      const refInput = ref(null);
      const resultados = ref([])
      const collapseSearch = ref(null)
      
      const inputSearch = ref(false)
      const listenToggle = ref(false)

      const { coords, locatedAt, error, resume, pause } = useGeolocation()
         


      const remoteMethod = (query) => {

         if(query !== ''){
            setTimeout(() => {
                 
               store.dispatch('searchPublic',query).then((data) => {
                  resultados.value = data
                 
               }).catch(e => console.log(e))

            }, 1000);
         }

      }

      const searchGPS =() => {
         
         if(error.value){
            toast.info(error.value.message,{position:'bottom-right'})
         }
         
         store.dispatch('searchLocation',{lat:coords.value.latitude,lng:coords.value.longitude}).then(data => {
            resultados.value = data
         }).catch(e => console.log(e))

      }

      const cargarForm = () => {
         // refInput.value.$el.addEventListener('focus', (event) => showToggle.value = true)
         // refInput.value.$el.addEventListener('blur', (event) => showToggle.value = false)

      }

      onMounted(() => cargarForm())

      return {
         remoteMethod,
         loading:computed(() => store.state.loading),
         search,
         resultados,
         collapseSearch,
         searchGPS,
         refInput,
         inputSearch,
         listenToggle
      }

   }

}

</script>

<style lang="scss">
.content-search{
   position:relative;
}

.el-search {
   width: 100%;
}

.collapseSearch{
   width: 100%;
   display: flex;
   // min-height: 50px;
   position: absolute;
   top: 3rem;
   background: #404656;
   transition:1.5s ease;
   list-style:none;
   z-index: 6000;
   height:0px;
   animation:establecerAltura 1.5s ;

}

@media (min-width:762px) {

   .el-search {
      width: 75% !important;
   }
   
   .collapseSearch{
      width:75%;
   }

}

@keyframes establecerAltura {
   to{
      top: 3rem;
   }
   from{
      top: 0rem;
   }


}
</style>