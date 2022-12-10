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
         imagenes:[]
      },

      destinos:[]

   }),


   getters:{

      draft(state){
         return clone(state.destino)
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
            imagenes: []
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
      }








   }





}
