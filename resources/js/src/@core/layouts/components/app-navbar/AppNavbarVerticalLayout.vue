<template>
  <div class="navbar-container d-flex content align-items-center">

    <!-- Nav Menu Toggler -->
    <ul class="nav navbar-nav d-xl-none">
      <li class="nav-item">
        <b-link class="nav-link" @click="toggleVerticalMenuActive">
          <feather-icon icon="MenuIcon" size="21" />
        </b-link>
      </li>
    </ul>

    <!-- Left Col -->
    <b-navbar-nav class="nav align-items-center mr-auto d-none d-sm-flex d-lg-none">
      <!-- <search-bar /> -->
    </b-navbar-nav>

    <b-navbar-nav class="nav align-items-center d-none d-lg-flex flex-grow-1 justify-content-end" style="">
      <!-- <search-bar /> -->
    </b-navbar-nav>

    <div class="bookmark-wrapper align-items-center flex-lg-grow-0 flex-grow-1 d-none d-lg-flex justify-content-end">

      <!-- Bookmarks Container -->
      <!-- <bookmarks /> -->
    </div>

    <b-navbar-nav class="nav align-items-center ml-auto">
      <locale />
      <dark-Toggler class="d-none d-lg-block" />
      <!-- <cart-dropdown /> -->
      <notification-dropdown />
      <user-dropdown />
    </b-navbar-nav>
  </div>
</template>

<script>

import {
  BLink, BNavbarNav, BNavItem
} from 'bootstrap-vue'

// import Bookmarks from './components/Bookmarks.vue'
import Locale from './components/Locale.vue'
// import SearchBar from './components/SearchBar.vue'
import DarkToggler from './components/DarkToggler.vue'
// import CartDropdown from './components/CartDropdown.vue'
import NotificationDropdown from '@/components/notifications.vue'
// import ObservationDropdown from './components/ObservationDropdown.vue'
import UserDropdown from './components/UserDropdown.vue'
import {mapState, mapMutations, mapActions, mapGetters} from 'vuex';



export default {
  components: {
    BLink,
    BNavbarNav,
    Locale,
    DarkToggler,
    NotificationDropdown,
    UserDropdown,
    BNavItem
  },
  props: {
    toggleVerticalMenuActive: {
      type: Function,
      default: () => {},
    },
  },


  data(){    
    return{
    
    }
  },

  computed:{
    ...mapState('usuario',['usuario'])
  },


  setup(){

    return {
    }



  }




	


}
</script>

