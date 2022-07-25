import axios from "axios";
import store from "..";

export default {

	namespaced:true,

	state:() => ({

			usuario: {
				id: null,
				nombre:null,
				apellido:null,
				telefono: '',
				bio: '',
				website: '',
				fecha_nacimiento: '',
				genero:1,
				codigo_postal:null,
				activo:true,
				imagen: '',
				direccion: '',
				email: '',
				password: '',
				lenguaje:1,
				rol: {},
				rol_id:null,
				avatar: '',
				lenguaje:'es',
				is_whatsapp:false,
				twitter:'',
				facebook:'',
				instagram:'',
				avatar:null,
				ultimo_login:null,
				ciudad_id:null,
				ciudad:null,


			},

			user: {
				id: null,
				nombre: null,
				apellido: null,
				telefono: '',
				bio: '',
				website: '',
				fecha_nacimiento: '',
				genero: 1,
				codigo_postal: null,
				activo: true,
				imagen: '',
				direccion: '',
				email: '',
				password: '',
				lenguaje: 1,
				rol: {},
				rol_id: null,
				avatar: '',
				lenguaje: 'es',
				is_whatsapp: false,
				twitter: '',
				facebook: '',
				instagram: '',
				avatar: null,
				ultimo_login: null,
				ciudad_id: null,
				ciudad: null,
			},

			usuarios: [],
	
			

		}),

	mutations:{
	

		cargarUser(state,data){			
	
			state.usuario = data;


		},

		setTelefono(state,numero){

			state.usuario.telefono = numero
		},


		setUsuarios(state,usuarios){
		
			
			state.usuarios = usuarios;
		},

		pushUsuario(state,usuario){
			state.usuarios.push(usuario);
		},

		capturarUsuario(state,id_usuario){
			state.user = state.usuarios.find((user) => user.id == id_usuario)
		},

		clearUsuario(state){
			state.user = {
				id: null,
				nombre: null,
				apellido: null,
				telefono: '',
				bio: '',
				website: '',
				fecha_nacimiento: '',
				genero: 1,
				codigo_postal: null,
				activo: true,
				imagen: '',
				direccion: '',
				email: '',
				password: '',
				lenguaje: 1,
				rol: {},
				rol_id: null,
				avatar: '',
				lenguaje: 'es',
				is_whatsapp: false,
				twitter: '',
				facebook: '',
				instagram: '',
				avatar: null,
				ultimo_login: null,
				ciudad_id: null,
				ciudad: null,
			}
		},


		updateUsuario(state,data){

			var i = state.usuarios.findIndex((user) => user.id == data.id);

			if(i != -1){
				state.usuarios[i] = data;
				state.user = data;
			}

		},



		update(state,data){

			var i = state.usuarios.findIndex((user) => user.id == data.id);

			if(i != -1){
				state.usuarios[i] = data;
				// state.usuario = data;
			}
		},

		updateAvatar(state,avatar){
			state.usuario.avatar = avatar;
		},

		actualizarAvatarDeUsuario(state,avatar){
			let user = state.usuarios.find(val => val.id == state.user.id)

			if(user != undefined){
				user.avatar = avatar
			}

		},


		updatePerfil(state,data){
			state.usuario = data
		},

		limpiarUsuario(state){

			state.usuario = {
				id: null,
				nombre: null,
				apellido: null,
				telefono: '',
				bio: '',
				website: '',
				fecha_nacimiento: '',
				genero: 1,
				codigo_postal: null,
				activo: true,
				imagen: '',
				direccion: '',
				email: '',
				password: '',
				lenguaje: 1,
				rol: {},
				rol_id: null,
				avatar: '',
				lenguaje: 'es',
				is_whatsapp: false,
				twitter: '',
				facebook: '',
				instagram: '',
				avatar: null,
				ultimo_login: null,
				ciudad_id: null,
				ciudad: null,
			}
			
		}


	},

	getters:{

		draft(state){
			return clone(state.user);
		},

		conPermiso:(state) => {
			return (permiso) => {

				if(state.usuario){
					return (state.usuario.roles[0].permissions.find((permission) => permission.name == permiso))
				}

				return false;
				
			}
		},


		getUsuarios: (state) => {
			return (rol) => {
				return state.usuarios.filter(user => {
					

					let i  = user.roles.findIndex((val,i ) => roles.name == rol)
					if(i > 0 ){
						return true;
					}else{
						return false;
					}

				});
			} 
		},


		getUsuario:(state) => {
			return (id) => {
				return state.usuarios.find(user => user.id ==  id);
			}
		},


		getListado:(state) => {
			return (users_id) => {

			

				var users = [];

				users_id.forEach((e,i) => {

					var us = state.usuarios.find((u) => {

					 return (u.id == e.user_id);
					})

					if(us != undefined){
						if(users.find((u) => u.id == us.id)  == undefined){
							users.push(us);
						}
						
					}
					
				});

				console.log(users);

				return users;

			}
		},


		isRol(state){
			return (rol) => {

				let role = state.usuario.roles.find((val) => val.name == rol);
				return (role != undefined);
			
			}
		},


		getFullName : (state) => `${state.usuario.nombre} ${state.usuario.apellido}`, 

		avatar:(state) => state.usuario.avatar,
		
		getCoordinadoresHotel:(state) => {

			return (rol) => {
				
				return state.usuarios.filter(val => val.rol.nombre == rol)

			}

		},

		getFilterUsers:(state) => {
			return (roles_name) => {


				let result =  state.usuarios.filter(val => {
					return (roles_name.find(value => value == val.rol.nombre) != undefined) ? true : false
				});
				
				return result.map(val => {
					return {label:val.nombre,value:val.id,id:val.id,email:val.email};
				})
			}
		}

	

	},

	actions:{

		cargarUsuarios({state,commit}){
			var result = false;

			commit('toggleLoading',null,{root:true});

			axios.get('/api/usuarios/all').then(respon => {
				result = true;
				commit('setUsuarios',respon.data);
			}).catch(e => {
				console.log(e)
			}).then(() => commit('toggleLoading', null, { root: true }) )

			return result;
		},

		async cargarUsuario({state,commit,dispatch}){

				// return await axios.get('/app/get/data');
				let options = {
					'headers': {
						'WWW-Authenticate': 'Bearer', 'Authorization': localStorage.getItem('token')
					}
				}
				return await axios.get('/api/auth/user',null,options);

		},

		async guardar({state,commit,dispatch},data){

			return new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})

				if (state.user.id) {
						
						axios.put(`/api/usuarios/` + state.user.id, data).then(({data:datos}) => {

							if(datos.result){
								commit('update',datos.usuario)
							}
							resolve(datos)

						}).catch(e => reject(e))
						.then(() => commit('toggleLoading',null,{root:true}))



				} else {
					
					axios.post('/api/usuarios', data).then(({data:datos}) => {

						if(datos.result){
							commit('pushUsuario',datos.usuario)
						}
						resolve(datos)
					
					 }).catch(e => reject(e))
					 .then(() => store.commit('toggleLoading',null,{root:true}))

				}
			
			})
			
	   
		},

		async guardarUsuario({state,commit,dispatch},draft){
			return await axios.put(`/api/perfil/update/usuario/`+state.usuario.id, draft);
		},

		async cambiarContrasena({state},data){
			return await axios.post(`/api/cambiar/contrasena/usuario/${state.usuario.id}`,data);
		},

		async eliminar({state},data){
			return await axios.delete(`/api/usuarios/${data}`);
		},
		
		async updateAvatarUser({state},data){
			return await axios.post(`/api/usuario/${state.user.id}/update/avatar`,data,{
				headers: {
					'Content-Type': 'multipart/form-data; boundary=something'
				}
			})
		},

		fetchUsers({state,commit},searchQuery){
				return new Promise((resolve, reject) => {
					axios.post('/api/fetch/usuarios', searchQuery)
						.then(response => resolve(response))
						.catch(error => reject(error))
				});
		},

		fetchMovimientos({ state,commit }, searchQuery){
			return new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})
				axios.post('/api/billetera/listar/movimientos', searchQuery)
					.then(response => resolve(response))
					.catch(error => reject(error))
					.then(() => commit('toggleLoading', null, { root: true }))
			});
		},

		login({state,commit},data){

			return new Promise((resolv,reject) => {

			}).catch(e => {
				console.log(e)

			}).then(() => {

			})
			

		},

		getUsuario({state,commit},id_usuario){
			return new Promise((resolve, reject) => {
					
				commit('toggleLoading',null,{root:true})

				axios.get(`/api/usuarios/${id_usuario}/get`).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))
				.then(() => {
					commit('toggleLoading', null, { root: true })

				})

				
			})
		}

	}
} 
