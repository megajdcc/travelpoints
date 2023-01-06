import axios from "axios"

export default{
   namespaced:true,

   state:() => ({

      destino:{
         id:null,
         iata_id:null,
         iata:null,
         nombre:'',
         ciudad_id:null,
         estado_id:null,
         ciudad:null,
         estado:null,
         descripcion:'',
         lat:0,
         lng:0,
         titulo:'',
         imagenes:[],
         atracciones:[],
         negocios:[]
      },

      destinos:[]

   }),


   getters:{

      draft(state){
         return clone(state.destino)
      },


      getPortada(state){
         const portada = state.destino.imagenes.find(val => val.portada)
         
         if(portada){
            return `/storage/destinos/imagenes/${portada.imagen}`  
         }else{
            const primeraImagen = state.destino.imagenes[0]

            if(primeraImagen){
               return `/storage/destinos/imagenes/${primeraImagen.imagen}`  
            }else{
               return `/storage/destinos/imagenes/`  
            }
            
         }

       
         
      }

   },

   mutations:{

      clear(state){
         state.destino = {
            id: null,
            iata_id: null,
            iata: null,
            nombre: '',
            ciudad_id: null,
            estado_id: null,
            ciudad: null,
            estado: null,
            descripcion: '',
            lat: 0,
            lng: 0,
            titulo: '',
            atracciones: [],
            imagenes: [],
            negocios: []

         }
      },

      capturar(state,destino_id){

         if(destino_id){
            state.destino = state.destinos.find(val => val.id === destino_id)
         }

      },

      push(state,destino){
         state.destinos.push(destino)
      },

      put(state,destino_id){
         state.destinos.splice(
            state.destinos.findIndex(val => val.id === destino_id),
            1
         )
      },

      update(state,destino){
         const i = state.destinos.findIndex(val => val.id === destino.id)

         if(i !=  -1 ){
            state.destinos[i] = destino

          

         }

         if (state.destino.id === destino.id) {
            state.destino = destino
         }

      },


      setDestino(state,destino){
         state.destino = destino
      },

      setDestinos(state,destinos){
         state.destinos = destinos
      },

      togglePortada(state, { imagen_id, portada }) {

         if (state.destino.id) {

            state.destino.imagenes.forEach(val => val.portada = false)

            const image = state.destino.imagenes.find(val => val.id === imagen_id)
            image.portada = portada
         }

      }



   },

   actions:{

      fetch({commit},destino_id){
         return new Promise((resolve, reject) => {
               
            axios.get(`/api/destinos/${destino_id}/fetch/data`).then(({data}) => {
                  commit('setDestino',data)
                  resolve(data)
            }).catch(e => reject(e))

         })
      },

      fetchName({commit},destino_name){
         return new Promise((resolve,reject) => {

            axios.post(`/api/destinos/obtener/por-nombre`,{nombre:destino_name}).then(({data}) => {
               if(data.result){
                  commit('setDestino',data.destino)
               }
               resolve(data)
            }).catch(e => reject(e))

         })

      },

      fetchData({commit},datos){
         
         return new Promise((resolve, reject) => {
            axios.post(`/api/destinos/fetch/data`,datos).then(({data}) => {
               commit('setDestinos',data.destinos)
               resolve(data)
            }).catch(e => reject(e))

         })

      },


      guardar({commit},datos){

         return new Promise((resolve, reject) => {

            if(datos.id){
               
               axios.put(`/api/destinos/${datos.id}`,datos).then(({data}) => {
                  
                  if(data.result){
                     commit('update',data.destino)
                  }

                  resolve(data)

               }).catch(e => reject(e))

            }else{

                axios.post(`/api/destinos`,datos).then(({data}) => {

                  if(data.result){
                     commit('push',data.destino)

                  }
                  resolve(data)

                }).catch(e => reject(e))

            }
         })
      },

      eliminar({commit}, destino_id){

         return new Promise((resolve, reject) => {
               axios.delete(`/api/destinos/${destino_id}`).then(({data}) => {

                  if(data.result){
                     commit('put',destino_id)
                  }

                  resolve(data)


               }).catch(e => reject(e))

         })
      },


      cargarImagen({state,commit},{imagenes}){

         let formData = new FormData();

         imagenes.forEach(val => {
             formData.append('imagen[]', val)
         })
         
         formData.append('_method','put')

         return new Promise((resolve, reject) => {
            axios.post(`/api/destinos/${state.destino.id}/cargar/imagen`,formData,{
               headers:{
                  ContentType:"multipart/form-data: boundary=something"
               }
            }).then(({data}) => {

               if(data.result){
                  commit('update',data.destino)

               }

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      eliminarImagen({state,commit},imagen_id){

         return new Promise((resolve, reject) => {
            
            axios.delete(`/api/destinos/${state.destino.id}/eliminar/imagen/${imagen_id}`).then(({data}) => {

               if(data.result){
                  commit('update',data.destino);
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },

      togglePortada({ commit }, datos) {

         commit('togglePortada', { imagen_id: datos.imagen, portada: datos.portada })

         return new Promise((resolve, reject) => {

            axios.put(`/api/imagens/${datos.imagen}/toggle`, datos).then(({ data }) => {

               resolve(data)

            }).catch(e => reject(e))

         })

      },


      getDestinos({commit}){
         
         return new Promise((resolve, reject) => {

            axios.get(`/api/destinos/get/all`).then(({data}) => {
               commit('setDestinos',data)
               resolve(data)
            }).catch(e => reject(e))
            
         })
      }









   }





}
