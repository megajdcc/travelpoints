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

// atracciones

import atraccion from './modules/destinos/atracciones/atraccion.js'


// Evento

import evento from './modules/eventos/evento.js'

// Negocio

import negocio from './modules/negocios/index.js'


// Opinion

import opinion from './modules/opinions/opinion.js'


// Paneles 

import panel from './modules/panel.js'

// Cargos

import cargo from './modules/negocio/cargo.js'

// Empledos 

import empleado from './modules/negocio/empleado.js'

// Amenidads 

import amenidad from './modules/amenidad.js'

// Formas de Pago

import formasPago from './modules/formasPago.js'

// Publicaciones

import publicacion from './modules/publicacion.js'


// cupones

import cupones from './modules/cupones.js'

// venta 
import venta from './modules/venta.js'

// HorarioReservacion
import horarioReservacion from './modules/negocios/horarioReservacion/horario.js'


// Reservacions

import reservacion from './modules/negocios/reservacion.js'

// sistema 
import sistema from './modules/sistema.js'

// categoria

import categoriaProducto from './modules/tienda/categoriaProducto.js'

// Tienda
import tienda from './modules/tienda/tienda.js';

// Producto
import producto from './modules/tienda/producto.js';

// Consumo

import consumo from './modules/tienda/consumo.js';

// carrito Compra

import carrito from './modules/tienda/carrito.js';

// Sucursales
import sucursal from './modules/sucursal.js'

// Comisiones

import comision from './modules/comision.js'

// Datos Pago 
import datosPago from './modules/datosPago.js';

// Retiros 

import retiro from './modules/retiro.js';


// Pais , Estados y Municipios

import pais from './modules/pais.js'
import estado from './modules/estado.js'
import ciudad from './modules/ciudad.js'

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

    },


    searchPublic({commit},query){
      return new Promise((resolve, reject) => {
        
        axios.post(`/api/search/public`,{q:query}).then(({data}) => {
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    searchLocation({commit},location){
      return new Promise((resolve, reject) => {
        axios.post(`/api/search/location`,location).then(({data}) => resolve(data)).catch(e => reject(e))
      })
    },

    getPermisosPorPanel({commit},panel){

      return new Promise((resolve, reject) => {
        axios.get(`/api/panels/${panel}/get/permisos`).then(({data}) => resolve(data)).catch(e => reject(e))
        
      })
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
    destino,
    atraccion,
    evento,
    negocio,
    opinion,
    panel,
    cargo,
    empleado,
    amenidad,
    formasPago,
    publicacion,
    cupones,
    venta,
    horarioReservacion,
    reservacion,
    sistema,
    categoriaProducto,
    tienda,
    producto,
    consumo,
    carrito,
    sucursal,
    comision,
    datosPago,
    retiro,

    pais,
    estado,
    ciudad
  },

  strict: process.env.DEV,

})
