import Vue from 'vue'
import Vuex from 'vuex'


// Modules
import app from './app'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'



// Import Modulos

import usuario from './modules/usuario';
import rol from './modules/configuracion/rol.js';
import permiso from './modules/configuracion/permiso.js';
// 
import notificacion from './modules/notificaciones.js';

// Tableros 

import AdminTablero from './modules/tableros/AdminTablero.js';
import UserTablero from './modules/tableros/UserTablero.js';

import dashboard from './modules/dashboard/dashboard.js'


// Preguntas Frecuentes

import faq from './modules/faqs'

// categoria de Negocios

import categoriaNegocio from './modules/negocios/categorias'

// Solicitud de afiliacion de negocio

import solicitud from './modules/negocios/solicitudes'


// Divisas

import divisa from './modules/divisas';

// Cuentas y Movimientos 

import cuenta from './modules/cuentas_movimientos/cuenta'
import movimiento from './modules/cuentas_movimientos/movimiento'


// iata

import iata from './modules/iatas/iata.js'

// destino

import destino from './modules/destinos/destino.js'


Vue.use(Vuex)

export default new Vuex.Store({

  
	state: {
		errors: {},
		loading: false,
    token:null,
    canales:[],
    auth:{
      message:null
    }
	},

	mutations: {



		cerrarApp(state) {
			state.usuario = null
		},

		toggleLoading(state,bol = null) {
			state.loading = (bol != null) ? bol : !state.loading
		},



		setError(state, data) {

      
      if (typeof data === 'string'){
        state.errors.message = data;
      }else{
        state.errors = data;
      }

		},

		clearErrors(state) {

			state.errors = {
				carta: {}
			}

		},
    setAuthMessage(state,data){
      state.auth.message = data;

    },


    setToken(state,token){
      state.token = token
    },

    pushCanal(state,canal){
      state.canales.push(canal)
    }


	},

	actions: {

    async cerrarSesion({ state, commit }) {
      
      return await axios.get('/api/auth/logout',null,{
        headers: {
          'WWW-Authenticate': 'Bearer', 'Authorization': (state.token) ? state.token : localStorage.getItem('accessToken')
        }
      });

    }


	},

  modules: {
    app,
    appConfig,
    verticalMenu,
    usuario,
    rol,
    notificacion,
    permiso,
    'user-tablero': UserTablero,
    dashboard,
    faq,
    categoriaNegocio,
    solicitud,
    divisa,
    cuenta,
    movimiento,
    iata,
    destino
  },

  strict: process.env.DEV,

})
