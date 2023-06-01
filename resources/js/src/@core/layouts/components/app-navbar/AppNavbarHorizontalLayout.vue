<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-none d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>


    <b-navbar-nav class="nav align-items-center mr-auto d-none d-sm-flex d-lg-none" style="">
      <!-- <search-bar /> -->
    </b-navbar-nav>

    <!-- Left Col -->
    <b-navbar-nav class="nav align-items-center d-none d-lg-flex flex-grow-1 justify-content-end" style="">
      <!-- <search-bar /> -->
    </b-navbar-nav>

    <div class="bookmark-wrapper align-items-center flex-lg-grow-0 flex-grow-1 d-none d-lg-flex justify-content-end">
      <!-- <bookmarks /> -->
    </div>

    <!-- Right Col -->
    <b-navbar-nav class="nav align-items-center ml-auto">
      <locale class="d-none d-md-flex" />
      <dark-Toggler class="d-none d-lg-block" />
      <!-- <search-bar /> -->
      <!-- <cart-dropdown /> -->
      <notification-dropdown />
      <academia  v-if="is_loggin && usuario.rol.academia.length"/>

      <!-- <observation-dropdown class="d-none d-sm-flex"/> -->
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>
import {
  BLink, BNavbarNav, BNavItem
} from 'bootstrap-vue'
import Bookmarks from './components/Bookmarks.vue'
import Locale from './components/Locale.vue'
import DarkToggler from './components/DarkToggler.vue'
import SearchBar from './components/SearchBar.vue'
import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from '@/components/notifications.vue'
import ObservationDropdown from './components/ObservationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'

import useAuth from '@core/utils/useAuth.js'

import store from '@/store'
import { toRefs } from 'vue'

export default {
  components: {
    BLink,
    // Navbar Components
    BNavbarNav,
    Bookmarks,
    Locale,
    DarkToggler,
    SearchBar,
    CartDropdown,
    NotificationDropdown,
    ObservationDropdown,
    UserDropdown,
    BNavItem,
    Academia: () => import('components/Academia.vue')

  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },


  setup(){

    const { usuario } = toRefs(store.state.usuario)

    const {
      is_loggin
    } = useAuth();
    
    return {
      is_loggin,
      usuario
    }
  }

}
</script>


<style lang="scss">
  .vertical-overlay-menu .navbar .navbar-header {
      min-width: 180px !important;
  }
</style>