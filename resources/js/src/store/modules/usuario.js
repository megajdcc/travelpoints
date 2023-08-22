import store from "..";

export default {

	namespaced:true,

	state:() => ({

			usuario: {
				username:null,
				id: null,
				nombre:null,
				apellido:null,
				telefonos:[],
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
				codigo_referidor:null,
				referidos:[],
				referidor:[],
				likes:[],
				negocios:[],
				cupones:[],
				carrito_compra:[],
				status:3,
				lider:null,
				promotores:[],
				tarjeta_id:null,
				tarjeta:null,
				destino_id:null,
				destino:null,
				portada:null,
				porcentaje_perfil:0,
				nivel:{nivel:null,activaciones:0}
			},

			user: {
				username: null,
				id: null,
				nombre: null,
				apellido: null,
				telefonos:[],
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
				codigo_referidor: null,
				referidos: [],
				referidor: [],
				negocios: [],
				cupones: [],
				tarjeta_id:null,
				tarjeta:null,
				destino_id:null,
				destino:null,
				portada:null,
				porcentaje_perfil:0,
				nivel:{nivel:null,activaciones:0},
				status:3,
			},

			usuarios: [],

		}),

	mutations:{

		cargarUser(state,data){
			localStorage.setItem('userData',JSON.stringify(data))			
			state.usuario = {...state.usuario,...data};
		},

		setTelefono(state,numero){
			state.usuario.telefono = numero
		},

		setUsuarios(state,usuarios){
			if(usuarios.length){
				state.usuarios = usuarios;
			}
		},

		setUsuario(state,usuario){
			if(usuario != undefined || usuario != null){
				state.user = usuario
			}
			
		},

		pushUsuario(state,usuario){
			state.usuarios.push(usuario);
		},

		capturarUsuario(state,id_usuario){
			state.user = state.usuarios.find((user) => user.id == id_usuario)
		},

		clearUsuario(state){
			state.user = {
				username: null,
				id: null,
				nombre: null,
				apellido: null,
				telefonos:[],
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
				codigo_referidor: null,
				referidos: [],
				referidor: [],
				negocios: [],
				cupones: [],
				tarjeta_id:null,
				tarjeta:null,
				destino_id:null,
				destino:null,
				portada:null,
				porcentaje_perfil:0,
				nivel:{nivel:null,activaciones:0},
				status:3,



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
			const user = JSON.parse(localStorage.getItem('userData'))
			user.avatar = avatar;
			localStorage.setItem('userData',JSON.stringify(user))
			state.usuario.avatar = avatar;
		},

		updatePortada(state,portada){
			const user = JSON.parse(localStorage.getItem('userData'))
			user.portada = portada;
			localStorage.setItem('userData',JSON.stringify(user))
			state.usuario.portada = portada;
		},

		actualizarAvatarDeUsuario(state,avatar){
			let user = state.usuarios.find(val => val.id == state.user.id)

			if(user != undefined){
				user.avatar = avatar
			}

		},

		updatePerfil(state,data){
			localStorage.setItem('userData',JSON.stringify(data))
			state.usuario = {...state.usuario,...data}
		},

		desactivarCuenta(state, result) {
			const user = JSON.parse(localStorage.getItem('userData'))
			user.activo = !result;
			localStorage.setItem('userData', JSON.stringify(user))

			state.usuario.activo = !result;

		},


		limpiarUsuario(state){

			state.usuario = {
				id: null,
				username: null,
				nombre: null,
				apellido: null,
				telefonos:[],
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
				codigo_referidor: null,
				referidos: [],
				referidor: [],
				likes:[],
				status:3,
				lider:null,
				promotores:[],
				tarjeta_id:null,
				tarjeta:null,
				portada:null,
				porcentaje_perfil:0,
				nivel:{nivel:null,activaciones:0},
				status:3,
			}
		},

		agregarTelefono(state,user = 'user'){
			
			if(user == 'user'){
				state.user.telefonos.push({
					telefono: '',
					is_whatsapp: false,
					principal: false
				})
			}else{
				state.usuario.telefonos.push({
					telefono: '',
					is_whatsapp: false,
					principal: false
				})
			}
		},

		quitarTelefono(state,i){
				state.user.telefonos.splice(
					i,
					1
				) 
		},

		updateTelefono(state, telefono) {

			const i = state.user.telefonos.findIndex(val => val.telefono === telefono.telefono)
			if (i != -1) {
				state.user.telefonos[i] = telefono
			}

		},

		actualizarTelefono(state,telefono){
			const i = state.usuario.telefonos.findIndex(val => val.telefono === telefono.telefono)
			if (i != -1) {
				state.usuario.telefonos[i] = telefono
			}
		},

		removerTelefono(state,i = 0 ){

				state.usuario.telefonos.splice(
					i,
					1
				) 
		},

		setLikesUser(state,likes){
			state.usuario.likes = likes
		},

		setStatusPromotor(state,{referidos}){
			const {ultimo_mes,ultimo_trimestre } = referidos

			if(ultimo_mes > 0){
				state.usuario.status = 1;
			}else if(ultimo_trimestre > 0){
				state.usuario.status = 2;
			}else{
				state.usuario.status = 3
			}
		},


		setStatusLider(state,{promotores_activos}){
			const {ultimo_mes,ultimo_trimestre } = promotores_activos

			if(ultimo_mes > 0){
				state.usuario.status = 1;
			}else if(ultimo_trimestre > 0){
				state.usuario.status = 2;
			}else{
				state.usuario.status = 3
			}
		},


		setStatusCoordinador(state,{lideres_activos}){
				const {ultimo_mes,ultimo_trimestre } = lideres_activos

				if(ultimo_mes > 0){
					state.usuario.status = 1;
				}else if(ultimo_trimestre > 0){
					state.usuario.status = 2;
				}else{
					state.usuario.status = 3
				}
		}

	},

	getters:{

		draft(state){
			return clone(state.user);
		},

		draftUsuario(state){
			return clone(state.usuario)
		},


		isLikeModel:(state) => {

			return ({model_id,model_type}) => {
				return state.usuario.likes.filter(val => val.model_id === model_id && val.model_type == model_type).length ? true : false
			}
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


				return users;

			}
		},


		isRol(state){
			return (rol) => {
				if(state.usuario.rol){
					return rol  == state.usuario.rol.nombre
				}
				return false;
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
		},

		miSaldo(state){
			return state.usuario.cuenta ? state.usuario.cuenta.saldo : 0
		},

		miDivisa:(state) => {
			return state.usuario.cuenta ? state.usuario.cuenta.divisa.iso : 'USD'
		},

		rolUser(state){
			return state.usuario.rol ? state.usuario.rol.nombre : ''
		},

		activaciones(state){
			
			if(state.usuario.nivel){
				return state.usuario.nivel
			}
			return {nivel:null,activaciones:0}

		},

		getStatus(state) {
			let statuses = ['Activo','En Peligro','Inactivo']
			return state.usuario.status != undefined ? statuses[state.usuario.status - 1] : statuses[2];
		},

		getNivel(state){
			let niveles = ['Visitante','Recomendador','Promotor','Consul','Embajador']
			return state.usuario.nivel ? niveles[state.usuario.nivel.nivel] : niveles[0]

		},

		rolName(state){
			return state.usuario.rol ? state.usuario.rol.nombre : '';
		},

		totalPromotores(state){
			return state.usuario.promotores ? state.usuario.promotores.length : 0
		}

		
	},

	actions:{

		cargarUsuarios({state,commit}){

			return new Promise((resolve, reject) => {
				axios.get('/api/usuarios/all').then(({data}) => {
					commit('setUsuarios',data);
					resolve(data)
				}).catch( e => reject(e))
			})

		},

		cargarLideres({state,commit}){

			return new Promise((resolve, reject) => {
					axios.get('/api/usuarios/get/lideres').then(({data}) => {
						commit('setUsuarios',data);
						resolve(data)
					}).catch(e => {
						reject(e)
					})
			})
		

		},

		cargarCoordinadores({state,commit}){

			return new Promise((resolve, reject) => {
					axios.get('/api/usuarios/get/coordinadores').then(({data}) => {
						commit('setUsuarios',data);
						resolve(data)
					}).catch(e => {
						reject(e)
					})
			})
		

		},


		cargarUsuario({state,commit,dispatch}){

				// return await axios.get('/app/get/data');
				let options = {
					'headers': {
						'WWW-Authenticate': 'Bearer', 'Authorization': localStorage.getItem('token')
					}
				}
				return new Promise((resolve, reject) => {
					axios.get(`/api/auth/user/`,null,options).then(({data}) => {
						commit('cargarUser',data)
						resolve(data)
					}).catch(e => reject(e))

				})

		},

		async guardar({state,commit,dispatch},data){

			return new Promise((resolve, reject) => {
				if (data.id) {
						
						axios.put(`/api/usuarios/` + data.id, data).then(({data:datos}) => {

							if(datos.result){
								commit('update',datos.usuario)
							}
							resolve(datos)

						}).catch(e => reject(e))



				} else {
					
					axios.post('/api/usuarios', data).then(({data:datos}) => {

						if(datos.result){
							commit('pushUsuario',datos.usuario)
						}
						resolve(datos)
					
					 }).catch(e => reject(e))
				}
			
			})
			
	   
		},

		async guardarUsuario({state,commit},data){

			return await new Promise((resolve, reject) => {
				commit('toggleLoading', null, { root: true })
				axios.put(`/api/perfil/update/usuario/${state.usuario.id}`,data).then(({data}) => {
					if(data.result){
						commit('updatePerfil',data.usuario)
					}
					resolve(data)
				}).catch(e => reject(e))
				.then(() => commit('toggleLoading',null,{root:true}))

			})
		},

		async cambiarContrasena({commit,state},data){
			return await new Promise((resolve, reject) => {
				axios.put(`/api/cambiar/contrasena/usuario/${state.usuario.id}`,data).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))

			})
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

		updatePortada({state,commit},datos){

			let formData = new FormData();

			formData.append('portada',datos.portada)

			return new Promise((resolve, reject) => {
				axios.post(`/api/usuarios/${state.usuario.id}/toggle-portada`,formData,{
					headers:{
						ContentType:"multipart/form-data"
					}
				}).then(({data}) => {

					if(data.result){
						commit('updatePortada',data.portada)
					}
					resolve(data)
				}).catch( e => reject(e))

			})

		},

		

		fetchUsers({state,commit},searchQuery){
				return new Promise((resolve, reject) => {
					axios.post('/api/fetch/usuarios', searchQuery)
						.then(({data}) => {
							commit('setUsuarios',data.users)
							resolve(data)
						})
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
				axios.get(`/api/usuarios/${id_usuario}/get`).then(({data}) => {
					commit('setUsuario',data)
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		async desactivarCuenta({commit},data) {
			return await new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})

				axios.post(`/api/desactivar/usuario`,data).then(({data:datos}) => {
					commit('desactivarCuenta',datos.result)
					resolve(datos)

				}).catch( e => reject(e))
				.then(() => {
					commit('toggleLoading', null, { root: true })
				})

			})
		},

		async crearLinkReferido({commit},data) {
			return await new Promise((resolve, reject) => {
				axios.put(`/api/usuarios/${data.id}/crear/link/referidor`,data).then(({data:datos}) => {
					commit('updatePerfil',datos.usuario)
					resolve(datos)
				}).catch(e => reject(e))
				

			})
		},

		async verificarCodigoReferido({commit},codigo){
			return await new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})
				axios.get(`/api/usuarios/verificar/codigo/${codigo}`).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))
				.then(()=> {
					commit('toggleLoading', null, { root: true })
				})
			})
		},

		async nuevoUsuario({commit},data){

			return await new Promise((resolve, reject) => {

				axios.post('/api/auth/nuevo/usuario',data).then(({data:datos}) => {
					resolve(datos)
				}).catch(e => {
					reject(e)
				})

			})

		},
		async misReferidos({commit},data){

			return new Promise((resolve, reject) => {
					commit('toggleLoading',null,{root:true})

					axios.post('/api/usuario/perfil/referidos',data).then(({data:datos}) => {
						resolve(datos)
					}).catch(e => reject(e))
					.then(() => commit('toggleLoading',null,{root:true}))

			})

		},


		guardarTelefono({state,commit},{telefono,usuario}){
			
			return new Promise((resolve, reject) => {

				axios.put(`/api/usuarios/${usuario}/add/telefono`,telefono).then(({data}) => {
					
					if(data.result){

						if(state.usuario.id === usuario){
						
							commit('actualizarTelefono',data.telefono)
							commit('updatePerfil', state.usuario)
						}

						if(state.user.id){
							commit('updateTelefono', data.telefono)
						}

						
					}

					resolve(data)

				}).catch(e => {
					reject(e)
				})

			})
		},

		quitarTelefono({commit},telefono){
			return new Promise((resolve, reject) => {
				
				axios.delete(`/api/telefonos/${telefono.id}`).then(({data}) => {
					resolve(data)
				
				}).catch(e => reject(e))

			})
		},


		toggleLike({state,commit},model){

			return new Promise((resolve, reject) => {
				
				axios.put(`/api/usuarios/${state.usuario.id}/toggle-like`,model).then(({data}) => {

					if(data.result){
						commit('setLikesUser',data.likes)
						commit('updatePerfil',state.usuario)
					} 

					resolve(data)
				
				}).catch(e => reject(e))

			})
		},


		searchUser({commit},query){
			return new Promise((resolve, reject) => {
				
				axios.post(`/api/users/search`,{q:query}).then(({data}) => resolve(data)).catch(e => reject(e))
			})
		},


		getStatusPromotor({commit}){

			return new Promise((resolve, reject) => {
				axios.get(`/api/dashboard/tablero/promotor/get-status`).then(({data}) => {
					commit('setStatusPromotor',data.status)
					resolve(data)
				}).catch(e => reject(e))

			})
		},

		getStatusLider({commit}){

			return new Promise((resolve, reject) => {
				axios.get(`/api/dashboard/tablero/lider/get-status`).then(({data}) => {
					commit('setStatusLider',data.status)
					resolve(data)
				}).catch(e => reject(e))

			})
		},

		getStatusCoordinador({commit}){

			return new Promise((resolve, reject) => {
				axios.get(`/api/dashboard/tablero/coordinador/get-status`).then(({data}) => {
					commit('setStatusCoordinador',data)
					resolve(data)
				}).catch(e => reject(e))

			})
		},

		cambiarDivisa({commit},dato){

			return new Promise((resolve, reject) => {
				axios.put(`/api/usuarios/${dato.usuario}/change-divisa`,dato).then(({data}) => {

					commit('update',data.usuario)

					resolve(data)
				}).catch(e => reject(e))
			})
		},

		cambiarEstado({commit},usuario_id){
			
			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/${usuario_id}/cambiar/estado`).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))

			})
		},


		fetchPromotores({commit},filtro){
			return new Promise((resolve, reject) => {
				
				axios.post(`/api/usuarios/promotores/fetch/data`,filtro).then(({data}) => {
					// commit('setUsuarios',data.promotores)
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		fetchLideres({commit},filtro){
			return new Promise((resolve, reject) => {
				
				axios.post(`/api/usuarios/lideres/fetch/data`,filtro).then(({data}) => {
					commit('setUsuarios',data.lideres)
					resolve(data)
				}).catch(e => reject(e))
			})
		},


		fetchCoordinadores({commit},filtro){
			return new Promise((resolve, reject) => {
				
				axios.post(`/api/usuarios/coordinadores/fetch/data`,filtro).then(({data}) => {
					commit('setUsuarios',data.coordinadores)
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		asignarLiderPromotor({commit},dato) {
			return new Promise((resolve, reject) => {
				axios.post(`/api/usuarios/promotor/asignar/lider`,dato).then(({data}) => {
					resolve(data)

				}).catch(e => reject(e))
			})
		},

		asignarCoordinadorLider({commit},dato) {

			return new Promise((resolve, reject) => {
				axios.post(`/api/usuarios/lider/asignar/coordinador`,dato).then(({data}) => {
					resolve(data)

				}).catch(e => reject(e))
			})

		},


		quitarLider({commit},promotor){
			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/promotor/${promotor}/quitar/lider`).then(({data}) => resolve(data)).catch(e => reject(e))
				
			})
		},

		quitarCoordinador({commit},lider){
			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/lider/${lider}/quitar/coordinador`).then(({data}) => resolve(data)).catch(e => reject(e))
				
			})
		},


		guardarPromotor({commit},datos){
			return new Promise((resolve, reject) => {
				axios.post('/api/usuarios/promotor/save',datos).then(({data}) => {

					resolve(data)

				}).catch(e => reject(e))

			})
		},
		
		guardarLider({commit},datos){
			return new Promise((resolve, reject) => {
				axios.post('/api/usuarios/lider/save',datos).then(({data}) => {

					resolve(data)

				}).catch(e => reject(e))

			})
		},


		getPromotores({commit}){

			return new Promise((resolve, reject) => {
				axios.get('/api/usuarios/get/all/promotores').then(({data}) => {
					resolve(data)

				}).catch(e => reject(e))

			})
		},

		asociarTarjeta({state,commit},tarjeta){

			return new Promise((resolve, reject) => {
				axios.put(`/api/usuarios/${state.usuario.id}/asociar/tarjeta`,tarjeta).then(({data}) => {
					if(data.result){
						commit('updatePerfil',data.usuario)
					}

					resolve(data)
					
				}).catch(e => reject(e))
			})
		},

		cancelarTarjeta({state,commit},tarjeta_id){
			return new Promise((resolve, reject) => {
				axios.delete(`/api/usuarios/${state.usuario.id}/cancelar/tarjeta/${tarjeta_id}`).then(({data}) => {
					if(data.result){
						commit('updatePerfil',data.usuario)
					}

					resolve(data)
				}).catch(e => reject(e))
				
			})
		},

		getMovimientosPorMes({state,commit},datos){
			return new Promise((resolve, reject) => {
				axios.put(`/api/usuarios/${datos.usuario}/get-movimiento-por-mes`,datos).then(({data}) => {
					resolve(data)
				}).catch(e => reject(e))
			})
		},

		getAcumuladoPorAno({state,commit}){
			return new Promise((resolve,reject) => {
				if(state.usuario.id){
						axios.get(`/api/usuarios/${state.usuario.id}/get-acumulado-por-ano`).then(({data}) => {
							resolve(data)
						}).catch(e => reject(e))
				}else{
					reject()
				}
			

			})
		},

		getEfectividad({state}){

			return new Promise((resolve, reject) => {
				if(state.usuario.id){
					axios.get(`/api/usuarios/${state.usuario.id}/get-efectividad`).then(({data})  => resolve(data)).catch(e => reject(e))
				}else{
					reject();
				}
				
			})
		},
		
		cargarStatus({state,commit}){

			return new Promise((resolve, reject) => {
				axios.get(`/api/usuarios/${state.usuario.id}/get-status`).then(({data}) => resolve(data)).catch(e => reject(e))
			})
		},

		misInvitados({state,commit},datos){
			return new Promise((resolve, reject) => {
				if(state.usuario.id){
					axios.post(`/api/usuarios/${state.usuario.id}/mis-invitados`,datos).then(({data}) => resolve(data)).catch(e => reject(e))
				}else{
					reject()
				}
					
			})
		}


	}

} 