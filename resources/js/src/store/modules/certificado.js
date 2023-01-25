export default{
   namespaced:true,

   state:() => ({

      certificado:{
         id:null,
         nombre:'',
         descripcion:'',
         condiciones:'',
         restricciones:'',
         imagen:null,
         expide:null,
         vence:null,
         disponibles:0,
         precio:0,
         divisa_id:null,
         negocio_id:null,
         negocio:null,
         divisa:null,
      },

      certificados:[]
   }),

   getters:{
      draft(state){
         return clone(state.certificado)
      }
   },

   mutations:{
      clear(state) {
         state.certificado = {
            id: null,
            nombre: '',
            descripcion: '',
            condiciones: '',
            restricciones: '',
            imagen: null,
            expide: null,
            vence: null,
            disponibles: 0,
            precio: 0,
            divisa_id: null,
            negocio_id: null,
            negocio: null,
            divisa: null,
         }
      },


      setCertificado(state, certificado) {
         state.certificado = certificado
      },

      update(state, certificado) {
         const i = state.certificados.findIndex(val => val.id === certificado.id)

         if (i != -1) {
            state.certificados[i] = certificado
         }

         if (state.certificado.id === certificado.id) {
            state.certificado = certificado
         }
      },

      push(state, certificado) {
         state.certificados.push(certificado)

      },

      put(state, certificado_id) {
         state.certificados.splice(
            state.certificados.findIndex(val => val.id === certificado_id),
            1
         )
      },

      capturar(state, certificado_id) {
         const certificado = state.certificados.find(val => val.id === certificado_id)

         if (certificado != undefined) {
            state.certificado = certificado
         }
      },

      setCertificados(state, certificados) {
         state.certificados = certificados
      }
   },


   actions:{
      getCertificados({ commit }) {
         return new Promise((resolve, reject) => {
            axios.get('/api/certificados/get/all').then(({ data }) => {
               commit('setCertificados', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchData({ state, commit }, datos) {

         return new Promise((resolve, reject) => {
            axios.post(`/api/certificados/fetch/data`, datos).then(({ data }) => {

               commit('setCertificados', data.certificados)

               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetch({ state, commit }, certificado_id) {

         return new Promise((resolve, reject) => {
            axios.get(`/api/certificados/${certificado_id}/fetch/data`).then(({ data }) => {
               commit('setCertificado', data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      guardar({ commit }, datos) {  

         const formData = new FormData()
         Object.keys(datos).forEach(val => {
            formData.append(val,datos[val])
         })


         return new Promise((resolve, reject) => {
            if (datos.id) {

               formData.append('_method','put')

               axios.post(`/api/certificados/${datos.id}`, formData,{
                  headers:{
                     ContentType:'multipart/form-data'
                  }
               }).then(({ data }) => {
                  if (data.result) {
                     commit('update', data.certificado)

                  }
                  resolve(data)
               }).catch(e => reject(e))

            } else {

               axios.post(`/api/certificados`, formData,{
                  headers:{
                     ContentType:'multipart/form-data'
                  }
               }).then(({ data }) => {
                  if (data.result) {
                     commit('push', data.certificado)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }
         })

      },

      eliminar({ commit }, certificado_id) {
         return new Promise((resolve, reject) => {
            axios.delete(`/api/certificados/${certificado_id}`).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      }
   }

}