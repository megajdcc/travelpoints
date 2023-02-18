<<<<<<< HEAD
import axios from "axios";
import router from '@/router';

=======
import router from '@/router';
>>>>>>> vite
export default{


	namespaced:true,

	state(){
		return{
			notificacion:{},
			todas:[],
			leidas:[],
			sinleer:[],
		}

	},


	getters:{
	
		cantidad(state){
			return state.sinleer.length;
		}
	},


	mutations:{

		setNotificacion(state,data){

			state.notificacion = data;
		},


		setNotificaciones(state,{leidas,sinleer,todas}){

			state.todas = todas;
			state.sinleer = sinleer;
			state.leidas = leidas;

		},

		pushLeida(state,notificacion){
			var index = state.sinleer.findIndex(noti => noti.id == notificacion.id);
			state.sinleer.splice(index,1);

			state.leidas.push(notificacion);
		},

		pushSinleer(state,notificacion){

			var index = state.leidas.findIndex(noti => noti.id == notificacion.id);

			state.leidas.splice(index,1);

			state.sinleer.push(notificacion);
		},

		pushNotificacion(state, notificacion){
			state.todas.push(notificacion);
		}
		

	},



	actions:{

		cargarNotificaciones({state,commit}, usuario){
			
			axios.get(`/api/notificaciones/${usuario}`).then(respon => {
				commit('setNotificaciones', {leidas:respon.data.leidas,sinleer:respon.data.sinleer,todas:respon.data.notificaciones});
			}).catch(e => {
<<<<<<< HEAD

				if(e.response.status == 401){
					localStorage.removeItem('token');
					router.push({ name: 'login' })
				}
				// console.log(e.response.status);
=======
>>>>>>> vite
				console.log(e);
			})

		},


		async marcarLeida({state,commit},{usuario,notificacion}){
			return await axios.get(`/api/notificaciones/markread/${notificacion}/usuario/${usuario}`);
		},

		async eliminar({state,commit},{notificacion,usuario}){
			return await axios.delete(`/api/notificaciones/${notificacion}/usuario/${usuario}`);
		},

		async marcarNoLeida({state,commit},{usuario,notificacion}){
			return await axios.get(`/api/notificaciones/marknoread/${notificacion}/usuario/${usuario}`); 
		},

		async todoleido({state,commit},usuario){
			return await axios.get(`/api/notificaciones/todoleido/usuario/${usuario}`);
		},


		async marcarSeleccionadosLeidos({state,commit},{usuario,seleccionados}){
			return await axios.post(`/api/notificaciones/seleccionados/leidos/usuario/${usuario}`,{seleccionados:seleccionados});
		},


		async eliminarSeleccionados({ state, commit }, { usuario, seleccionados }){
			return await axios.post(`/api/notificaciones/seleccionados/eliminar/usuario/${usuario}`, { seleccionados: seleccionados });
		}

	}



}