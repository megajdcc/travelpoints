<template>
  <div class="navbar-header d-xl-block d-none">
    <ul class="nav navbar-nav">
      <li class="nav-item">
        <b-link class="navbar-brand" to="/">
          <span class="brand-logo">
            <b-img :src="logo" alt="logo" />
          </span>
          <!-- <h2 class="brand-text mb-0">
            {{ appName }}
          </h2> -->
        </b-link>
      </li>
    </ul>
  </div>
</template>

<script>
import { BLink, BImg } from 'bootstrap-vue'
import { $themeConfig } from '@themeConfig'
import {computed,toRefs,onMounted} from '@vue/composition-api'
import store from '@/store'


export default {
  components: {
    BLink,
    BImg,
  },
  setup() {
    // App Name
    const { appName, appLogoImage, applogoImageWhite } = $themeConfig.app
    const { skin } = toRefs(store.state.appConfig.layout)

    onMounted(() => {
      console.log(skin.value)
    })


    return {
      appName,
      logo:computed(() => {
        return skin.value == 'dark' || skin.value == 'semi-dark' ? applogoImageWhite : appLogoImage;
      })

    }
  },
}
</script>

<style>

</style>
