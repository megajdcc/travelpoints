export default{

	namespaced:true,

	state(){
		return{

			permiso:{
				id      : null,
				nombre  : '',
				panel_id: null,
				panel   : null
			},
			
			permisos:[],
		}
	},


	mutations:{

		setPermiso(state,permiso){
			state.permiso = permiso

		},

		setPermisos(state,permisos){

			state.permisos = permisos
		
		},


		clearPermiso(state){

			state.permiso = {
				id: null,
				nombre: '',
				panel_id: null,
				panel: null
			}
		
		},

		capturarPermiso(state,id_permiso){
			state.permiso = state.permisos.find((permiso) => permiso.id === id_permiso);
		},


		putPermiso(state,id_permiso){

			state.permisos.splice(state.permisos.findIndex((permiso) => permiso.id == id_permiso),1);
		},

		pushPermiso(state,permiso){
			var permis = state.permisos.find((permis) => permis.id == permiso.id);

			if(permis){
				state.permisos.forEach((permis,i ) => {
					if(permis.id == permiso.id){
						state.permisos[i] = permiso
					}
				})
			}else{

				state.permisos.push(permiso);
			}

		},







	},

	getters:{

		draft(state){
			return clone(state.permiso);
		},


		getPermissionUser:(state) => {
			
			return ({rol,permisos}) => {	

				return permisos.map(val => {
					let actions = null;

					if (rol.permissions) {
						const rolPermissions = rol.permissions.find(va => va.id == val.id);
						actions = rolPermissions ? JSON.parse(rolPermissions.pivot.actions) : null;
					}

					return {
						module: val.nombre,
						read: actions ? actions.find(v => v == 'read') ? true : false : false,
						write: actions ? actions.find(v => v == 'write') ? true : false : false,
						update: actions ? actions.find(v => v == 'update') ? true : false : false,
						delete: actions ? actions.find(v => v == 'delete') ? true : false : false,
					}
				})


			}

		},

		getPermissionUserForPanel:(state) => {

			return ({panels,rol}) => {

			
				const permisos = [];

				panels.forEach(val => permisos.push(...val.permisos))

			

				return permisos.map(val => {

					let actions = null;

					if (rol.permissions) {
						const rolPermissions = rol.permissions.find(va => va.id == val.id);
						actions = rolPermissions ? JSON.parse(rolPermissions.pivot.actions) : null;
					}

					const result = {
						panel_id:val.panel_id,
						module: val.nombre,
						read: actions ? actions.find(v => v == 'read') ? true : false : false,
						write: actions ? actions.find(v => v == 'write') ? true : false : false,
						update: actions ? actions.find(v => v == 'update') ? true : false : false,
						delete: actions ? actions.find(v => v == 'delete') ? true : false : false,
					};

				
					
					return result

				})
			}
		}




	},

	actions:{
		
		cargarPermisos({state,commit}){
			
			commit('toggleLoading',null,{root:true});

			axios.get('/api/cargar/permisos').then(({data}) => {

				commit('setPermisos',data);

			}).catch(e => {

				console.log(e);
			}).then(() => {
				commit('toggleLoading',null,{root:true});
			})


		},

		guardarPermiso({state,commit},datos){

			return new Promise((resolve, reject) => {
				if (datos.id) {
					axios.put(`/api/permisos/${datos.id}`, datos).then(({data}) => {

						if(data.result){
							commit('pushPermiso',data.permiso)
						}
						resolve(data)

					}).catch(e => reject(e))

				} else {
					
					axios.post('/api/permisos', datos).then(({data}) => {

						if(data.result){
							commit('pushPermiso',data.permiso)
						}
						resolve(data)

					}).catch(e => reject(e))
				

				}
			})
		
		},

		async eliminarPermiso({state,commit},id_permiso){

			return new Promise((resolve, reject) => {
				commit('toggleLoading',null,{root:true})
				axios.delete('/api/permisos/' + id_permiso).then(({data}) => {
					if(data.result){
						commit('putPermiso',id_permiso)
					}

					resolve(data)
				}).catch(e => reject(e))
				.then(() => {
					commit('toggleLoading', null, { root: true })
				})

			})
		},

		fetchData({ commit }, data) {

			return new Promise((resolve, reject) => {
				commit('toggleLoading', null, { root: true })

				axios.post(`/api/fetch/permisos`, data).then(({ data }) => {
					commit('setPermisos', data.permisos)
					resolve(data)
				}).catch(e => reject(e))
					.then(() => commit('toggleLoading', null, { root: true }))
			})

		},


		getPermiso({ commit }, id_permiso) {
			commit('toggleLoading', null, { root: true })
			return new Promise((resolve, reject) => {
				axios.get(`/api/permisos/${id_permiso}/get`).then(({ data }) => {
					commit('pushPermiso',data)
					resolve(data)
				}).catch(e => reject(e))
					.then(() => commit('toggleLoading', null, { root: true }))
			})

		}

	}

}