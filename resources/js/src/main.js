
import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import VueCompositionAPI from '@vue/composition-api'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/es';
import locale from 'element-ui/lib/locale';

Vue.prototype.$eventHub = new Vue();

locale.use(lang);

import TheMask from 'vue-the-mask';

Vue.use(TheMask);

import * as VueGoogleMaps from 'vue2-google-maps';
// import VueGoogleAutocomlete from 'vue-google-autocomplete';

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyCNWsVH2kmknm6knGSRKDuzGeMWM1PT6gA',
    libraries: 'places',
  },
  installComponents: true

});

import i18n from '@/libs/i18n'
import router from './router'
import store from './store'
import App from './App.vue'

// Global Components
import './global-components'


// 3rd party plugins
import '@axios'
import '@/libs/acl'
import '@/libs/portal-vue'
import '@/libs/clipboard'
import '@/libs/toastification'
import '@/libs/sweet-alerts'
import '@/libs/vue-select'
import '@/libs/tour'
import '@/libs/markdown-editor'

import VueCurrencyFilter from 'vue-currency-filter'
import moment from 'moment';

window.moment = require('moment');
moment.locale('es')

Vue.filter('fecha',(val,format = 'LL') => {
  if(val) {
    return moment(new Date(val)).format(format);
  }
  return 'error en la fecha';

})

Vue.use(VueCurrencyFilter, {
  symbol: '$',
  thousandsSeparator: ',',
  fractionCount: 2,
  fractionSeparator: '.',
  symbolPosition: 'front',
  symbolSpacing: true,
  avoidEmptyDecimals: undefined,
});

// BSV Plugin Registration
Vue.use(ToastPlugin)
Vue.use(ModalPlugin)
Vue.use(ElementUI);


// Composition API
Vue.use(VueCompositionAPI)


// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
require('@core/assets/fonts/feather/iconfont.css') // For form-wizard

// import core styles
require('@core/scss/core.scss')

// import assets styles
require('@/assets/scss/style.scss')

Vue.config.productionTip = false




window.clone = function (obj) {
  return JSON.parse(JSON.stringify(obj));
}

window.random = (min, max) => {
  return Math.round(Math.random() * (max - min) + min);
}

window.redondeo = function (num, decimales = 2) {
  var signo = (num >= 0 ? 1 : -1);
  num = num * signo;

  if (decimales === 0)
    return signo * Math.round(num);

  num = num.toString().split('e');

  num = Math.round(+(num[0] + 'e' + (num[1] ? (+num[1] + decimales) : decimales)));
  num = num.toString().split('e');
  return signo * (num[0] + 'e' + (num[1] ? (+num[1] - decimales) : -decimales));
}


window.colorRand = () => {
  let colores = [
    '#397DAD',
    '#4D616C',
    '#D02412',
    '#CD960E',
    '#348022',
    '#17B6AA',
    '#5F2626',
    '#00AEFF',
    '#6574cd',
    '#9561e2',
    '#f66d9b',
    '#e3342f',
    '#f6993f',
    '#ffed4a',
    '#38c172',
    '#4dc0b5',
    '#6cb2eb',
    '#444444',
    '#00c0ef',
  ];


  var i = random(0, colores.length);


  return colores[i];

}

window.$ = window.jQuery = require('jquery');
require('datatables.net-buttons-bs4');
require('datatables.net-buttons/js/buttons.flash.js');
require('datatables.net-buttons/js/buttons.html5.js');
require('datatables.net-buttons/js/buttons.print.js');
require('datatables.net-buttons/js/dataTables.buttons.min.js');
require('datatables.net-responsive-bs4');

import VueMask from 'v-mask'

Vue.use(VueMask);

// Laravel Echo

// import Echo from 'laravel-echo';

// window.Pusher = require('pusher-js');


// window.Echo = new Echo({
//   broadcaster: 'pusher',
//   key: process.env.MIX_PUSHER_APP_KEY,
//   cluster: process.env.MIX_PUSHER_APP_CLUSTER,
//   encrypted:true,
//   wsPort: 6001,
//   wssPort:6001,
//   wsHost:'ws.bodayplaya.com',
//   disableStats: true,
//   forceTLS: true,
//   enabledTransports: ['ws','wss']
// });

// import VueEcho from 'vue-echo-laravel';

// Vue.use(VueEcho, lecho);

// Conekta

// window.conekta = require('conekta');
// conekta.api_key = 'key_OsW8LuyVL6ESxfQWduVKzEw';
// conekta.locale = 'es';

/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'


/* add icons to the library */
library.add(fas,fab,far)
/* add font awesome icon component */
Vue.component('font-awesome-icon', FontAwesomeIcon)
Vue.config.productionTip = false

window._ = require('lodash');


let app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')

// app.provide();
