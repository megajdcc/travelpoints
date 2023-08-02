<template>
  <b-card
   :img-src="usuario.portada"
      img-alt="Portada"
      img-top
      class="card-profile" v-if="usuario">
    <div class="profile-image-wrapper">
      <div class="profile-image p-0">
        <b-avatar
          size="114"
          variant="light"
          :src="usuario.avatar"
        />
      </div>
    </div>

     <h3 class="text-capitalize text-center">{{ usuario.nombre }}</h3>
      <h6 class="text-muted" v-if="usuario.pais">
        {{ usuario.pais }}
      </h6>
      <b-badge
        class="profile-badge"
        variant="light-primary"
      >
        {{ usuario.rol }}
      </b-badge>
      <hr class="mb-2">
      

    <!-- about -->
    <div
      v-for="(data,key,i) in aboutData"
      :key="i"
      :class="i ? 'mt-2':''"
    >
      <template v-if="data && !['rol', 'nombre', 'pais', 'avatar', 'portada'].includes(key)">
        <h5 class="text-capitalize mb-75 text-justify">
          {{ key }}
        </h5>
   
         <b-card-text v-if="key == 'teléfono'" class="text-justify">
            <div v-html="data">
            </div>
        </b-card-text>
         <b-card-text v-else class="text-justify">
            <div v-html="data">
            </div>
          </b-card-text>
      </template>
       
    </div>
  </b-card>
</template>

<script>
import { BCard, BCardText,
  BAvatar, BBadge } from 'bootstrap-vue'
import {toRefs} from 'vue'
export default {
  components: {
    BCard,
    BCardText,
    BAvatar, 
    BBadge
  },
  props: {
    aboutData: {
      type: Object,
      default: () => {},
    },
  },

  setup(props){

    const {aboutData:usuario} = toRefs(props)
    return {
      usuario,
    
    }
  }
}
</script>


<style lang="scss" scoped>
  
  .card-profile:deep(.card-img-top){
    max-height: 150px;
    object-fit: cover;
    object-position: center;
  }
</style>