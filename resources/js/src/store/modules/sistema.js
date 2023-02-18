export default {

  namespaced:true,

  state:() => ({

    sistema:{
      id:null,
      nombre:'',
      terminos:'',
      logotipo_fondo_claro:null,
      logotipo_fondo_oscuro:null,
      paypal_id:null,
      paypal_secrect:null,
      production_paypal:false,
      paypa:false,
      divisa_id:null,
      cuenta:null
    },



  }),


  getters:{
    draft:(state) => clone(state.sistema),

    credentialPaypal(state){
      return { 
        sandbox: state.sistema.paypal_id || 'ARMAQ0_8KFm9nIJKGSOJUNWBfVWngxhsuu1Vj7N6yL2LVnXBAa_JXIDUeuqkMYU2yONIvpWZZQl-DLiw',
        production: "<production client id>"
      }
    }
  },

  mutations:{

    setSistema: (state,sistema) => state.sistema = sistema,
    update:(state,sistema) => state.sistema = sistema
    
  },

  actions:{

    fetch({commit}){

      return new Promise((resolve, reject) => {
        
        axios.get('/api/sistema/fetch').then(({data}) => {
          commit('setSistema',data)
          resolve(data)
        }).catch(e => reject(e))


      })
    },


    guardar:({state,commit},datos) => {

      return new Promise((resolve, reject) => {
        
        axios.put(`/api/sistema/${state.sistema.id}`, datos).then(({ data }) => {

          if (data.result) {
            commit('update', data.sistema)
          }
          resolve(data)

        }).catch(e => reject(e))
      })
    

    },

    guardarLogo({commit,state},datos){

      return  new Promise((resolve, reject) => {
        let formData = new FormData();

        formData.append('logo',datos.logo)
        formData.append('tipo_logo'.datos.tipo_logo)
        formData.append('_method','PUT')

        axios.post(`/api/sistema/${state.sistema.id}/upload/logo`,formData,{
          headers:{
            ContentType:'multipart/form-data'
          }
        }).then(({data}) => {
          if(data.result){
            
            commit('update',data.sistema)

          }

          resolve(data)
          
        }).catch(e => reject(e))
      })
    },


    crearCuenta({state,commit}){

      return new Promise((resolve, reject) => {
        axios.get(`/api/sistemas/${state.sistema.id}/crear/cuenta`).then(({data}) => {

          if(data.result){
            commit('update',data.sistema)
          }
          resolve(data)
        }).catch(e => reject(e))

      })
    }

  }
}