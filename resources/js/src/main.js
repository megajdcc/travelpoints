import Vue from 'vue'
import { ToastPlugin, ModalPlugin } from 'bootstrap-vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import lang from 'element-ui/lib/locale/lang/es';
import locale from 'element-ui/lib/locale';
import '../../scss/app.scss';
// import '../../scss/loader.css';
Vue.prototype.$eventHub = new Vue();

locale.use(lang);

import TheMask from 'vue-the-mask';

Vue.use(TheMask);

// import * as VueGoogleMaps from 'vue2-google-maps';
import GmapVue from 'gmap-vue';
import VueGoogleAutocomlete from 'vue-google-autocomplete';

Vue.use(GmapVue, {
  load: {
    key: 'AIzaSyCnsLa_yFH7kb5s5GdIaE_P9aGKLkeVIUQ', //'AIzaSyCNWsVH2kmknm6knGSRKDuzGeMWM1PT6gA',
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
// import '@/libs/tour'
// import '@/libs/markdown-editor'

import VueCurrencyFilter from 'vue-currency-filter'

import moment from 'moment'
window.moment = moment
moment.locale('es')

// Swiper
import { register } from 'swiper/element/bundle'

register();

Vue.filter('fecha',(val,format = 'LL', time= false) => {
  if(val && !time) {
    return moment(new Date(val)).format(format);
  }else if(val && time){
    return moment(`2020-01-01 ${val}`).format(format);
  }
  
  return 'error en la fecha';

})

Vue.filter('dia',(val) => {
  const dias = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
  return dias[val - 1]
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


// Feather font icon - For form-wizard
// * Shall remove it if not using font-icons of feather-icons - For form-wizard
import '@core/assets/fonts/feather/iconfont.css' // For form-wizard

// import core styles
import '@core/scss/core.scss'

// import assets styles
import '@/assets/scss/style.scss'

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

import jQuery from 'jquery';
window.$ = window.jQuery = jQuery


import VueMask from 'v-mask'

Vue.use(VueMask);

import HighchartsVue from 'highcharts-vue';
import Highcharts from 'highcharts';
import Highcharts3d from 'highcharts/highcharts-3d'
import Maps from "highcharts/modules/map";

Maps(Highcharts);

import highchartsMore from "highcharts/highcharts-more.js"

highchartsMore(Highcharts);


Highcharts3d(Highcharts);
// Opcionalmente, también puedes importar módulos adicionales de Highcharts, como exporting o accessibility
import exportingInit from 'highcharts/modules/exporting';
exportingInit(Highcharts);

import SolidGaugeInit from 'highcharts/modules/solid-gauge'
SolidGaugeInit(Highcharts);

import accessibilityInit from 'highcharts/modules/accessibility';
accessibilityInit(Highcharts);

// Registra Highcharts Vue Wrapper como componente global
Highcharts.setOptions({
   colors:  [
    '#397DAD',
    '#4D616C',
    '#CD960E',
    '#348022',
    '#17B6AA',
    '#5F2626',
    '#00AEFF',
    '#6574cd',
    '#9561e2',
    '#f66d9b',
    '#38c172',
    '#4dc0b5',
    '#6cb2eb',
    '#444444',
    '#00c0ef',
  ],

	chart:{
    backgroundColor: {
          linearGradient: [0, 0, 500, 500],
          stops: [
              [0, 'rgba(255, 255, 255, 0)'],
              [1, 'rgba(240, 240, 255, 0)']
          ]
      },

		// borderWidth:2,
    borderColor:{
      pattern:{
        backgroundColor:'rgb(255,255,255)',
        opacity:0,
      }
    },
		style:{
			"fontFamily":'Myriad Regular Serif Roboto',

		},
		spacingTop:0,

	},
	credits:{
		enabled:true,
		href:"https://travelpoints.es",
		text:"TravelPoints",
	},
});

Vue.use(HighchartsVue,{
  Highcharts:Highcharts
});

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

import _ from 'lodash';

window._ = _;

let app = new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
  provide:() =>  ({swal : Vue.swal,i18n:i18n})

}).$mount('#app')

// app.provide();
