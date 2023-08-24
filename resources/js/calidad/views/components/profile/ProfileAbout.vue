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
      <h6 class="text-muted my-0" v-if="usuario.pais">
        {{ usuario.pais }}
      </h6>
      <b-badge
        class="profile-badge"
        variant="light-primary"
      >
        {{ usuario.rol }}
      </b-badge>

      <b-form-checkbox v-model="form.activo" switch v-if="showEditActive" @change="toggleActive">{{  form.activo ? 'Activo' : 'Inactivo' }}</b-form-checkbox>
      <hr class="my-0 ">

    <!-- about -->
    <div
      v-for="(data,key,i) in aboutData"
      :key="i"
      :class="i==0 ? 'mt-1':''"
    >
      <template v-if="data && !['rol', 'nombre', 'pais', 'avatar', 'portada'].includes(key)">
        <h6 class="text-capitalize mb-0 text-justify">
          {{ key }}
        </h6>
   
         <b-card-text v-if="key == 'teléfono'" class="text-justify ">
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
  BAvatar, BBadge,
  BFormCheckbox
 } from 'bootstrap-vue'
import {toRefs,ref,onMounted,watch} from 'vue'
export default {
  components: {
    BCard,
    BCardText,
    BAvatar, 
    BBadge,
    BFormCheckbox
  },
  props: {
    aboutData: {
      type: Object,
      default: () => {},
    },

    showEditActive:Boolean
  },

  setup(props,{emit}){
   

    const {aboutData:usuario} = toRefs(props)
    const form = ref({
      activo: false
    })

    onMounted(() => {
      
      if(usuario.value.activo){
        form.value.activo = usuario.value.activo
      }

    })

    watch(() => usuario.value.activo,(val) => {
        form.value.activo = usuario.value.activo
    })


    const toggleActive = (val) => {
      emit('toggleActivePromotor',val)
    }

    return {
      usuario,
      form,
      toggleActive
    
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