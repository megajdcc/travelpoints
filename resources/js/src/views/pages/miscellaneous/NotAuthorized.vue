<template>
  <div class="misc-wrapper">
    <b-link class="brand-logo">
      <b-link class="brand-logo">
        
         <img src="/storage/logotipo.png" alt="Logo" />
        <!-- <h2 class="brand-text text-primary ml-1">
          Boda y Playa
        </h2> -->
      </b-link>
    </b-link>

    <div class="misc-inner p-2 p-sm-3">
      <div class="w-100 text-center">
        <h2 class="mb-1">
          No estas autorizado! 🔐
        </h2>
        <p class="mb-2">
          No tienes permiso para acceder a esta página. Vuelve a casa!!
        </p>
        <b-button
          variant="primary"
          class="mb-1 btn-sm-block"
          :to="loginRoute()"
        >De vuelta a casa</b-button>
        <b-img
          fluid
          :src="imgUrl"
          alt="Not authorized page"
        />
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable global-require */
import { BLink, BImg, BButton } from 'bootstrap-vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'
import store from '@/store/index'
import { getHomeRouteForLoggedInUser } from '@/auth/utils'
import { mapState } from 'vuex';

export default {
  components: {
    BLink,
    BImg,
    BButton,
    VuexyLogo,
  },
  data() {
    return {
      downImg: require('@/assets/images/pages/not-authorized.svg'),
    }
  },
  computed: {
    ...mapState('usuario',['usuario']),
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.downImg = require('@/assets/images/pages/not-authorized-dark.svg')
        return this.downImg
      }
      return this.downImg
    },
  },
  methods: {
    loginRoute() {

      if(this.usuario.id){
         this.$router.push('/home')
      }else{
         this.$router.push({name:'login'})
      }
     
    },
  },
}
</script>

<style lang="scss">
@import '~@core/scss/vue/pages/page-misc.scss';
</style>
