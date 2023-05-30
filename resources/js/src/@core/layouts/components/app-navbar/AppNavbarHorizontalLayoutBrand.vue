<template>
  <div class="navbar-header d-xl-block">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link class="navbar-brand" to="/">
          <span class="brand-logo">
            <b-img-lazy :src="logo" alt="logo" height="60" show />
          </span>
          
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { BLink, BImg, BImgLazy } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import {computed,toRefs,onMounted} from 'vue'
import store from '@/store'


export default {
  components: {
    BLink,
    BImg,
    BImgLazy
  },
  setup() {
    // App Name
    const { appName, appLogoImage, applogoImageWhite } = $themeConfig.app
    const { skin } = toRefs(store.state.appConfig.layout)

    const logo = computed(() => {
      return skin.value == 'dark' || skin.value == 'semi-dark' ? applogoImageWhite : appLogoImage
    })
    return {
      appName,
      logo 
    }
  },
}
</script>

<style>

</style>
