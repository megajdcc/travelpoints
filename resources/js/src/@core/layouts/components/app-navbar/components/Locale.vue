<template>
  <b-nav-item-dropdown
    id="dropdown-grouped"
    variant="link"
    class="dropdown-language"
    right
  >
    <template #button-content v-if="currentLocale">
      <b-img
        
        :src="currentLocale.img"
        height="14px"
        width="22px"
        :alt="currentLocale.locale"
      />
      <span class="d-none d-md-inline ml-50 text-body">{{ currentLocale.locale }}</span>
    </template>
    <b-dropdown-item
      v-for="localeObj in locales"
      :key="localeObj.locale"
      @click="idiomaElegido(localeObj.locale)"
    >
      <b-img
        :src="localeObj.img"
        height="14px"
        width="22px"
        :alt="localeObj.locale"
      />
      <span class="ml-50">{{ localeObj.name }}</span>
    </b-dropdown-item>
  </b-nav-item-dropdown>
</template>

<script>
import { BNavItemDropdown, BDropdownItem, BImg } from 'bootstrap-vue'
import esImg from '@/assets/images/flags/es.png'
import enImg from '@/assets/images/flags/en.png'
import store from '@/store'
import useAuth  from '@core/utils/useAuth';
import {toRefs,ref,computed,toRef,inject} from 'vue'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BImg,
  },
  // ! Need to move this computed property to comp function once we get to Vue 3
  // computed: {
  //   currentLocale() {
  //     return this.locales.find(l => l.locale === this.$i18n.locale)
  //   },
  // },
  setup() {
    /* eslint-disable global-require */
    
    const usuario_id = computed(() => store.state.usuario.usuario.id)
    const {is_loggin} = useAuth();
    const locales = computed(() => store.state.idioma.locales)
    const i18n = inject('i18n')
    const loadLocaleAsync = inject('loadLocaleAsync')
    // const locales = [

    //   {
    //     locale: 'es',
    //     img: esImg,
    //     name: 'Español',
    //   },

    //   {
    //     locale: 'en',
    //     img: enImg,
    //     name: 'English',
    //   },
    
    // ]

    const cargarLocales = () => {
      store.dispatch('idioma/cargarIdiomas')
    }
    
    cargarLocales();
    /* eslint-disable global-require */
    const currentLocale = computed(() => locales.value.find(l => l.locale === i18n.locale));

    const idiomaElegido = (loc) => {
      localStorage.setItem('locale', loc)
      loadLocaleAsync(loc)

      if(is_loggin.value){
        store.dispatch('usuario/updateLocale',{usuario:usuario_id.value,locale:loc}).then(({result}) => {
          toast.info('Idioma cambiado con éxito')
        })
      }
    }
    return {
      locales,
      currentLocale,
      idiomaElegido
    }
  },
}
</script>

<style>

</style>
