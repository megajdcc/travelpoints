import axios from "axios"

export default{
   namespaced:true,

   state:() => ({

      evento:{
         id          : null,
         titulo      : '',
         contenido   : '',
         fecha_inicio: null,
         fecha_fin   : null,
         status      : 1, // 1 > activo 2 > vencido 3 > prorrateado
         model_id    : null,
         model_type  : '',
         recurrente  : false,
         url         : '',

         model       : null,
         imagenes    : []
      },

      eventos:[]

   }),

   getters:{

      draft(state) {
         return clone(state.evento)
      }
   },

   mutations:{

      clear(state){
         state.evento = {
            id: null,
            titulo: '',
            contenido: '',
            fecha_inicio: null,
            fecha_fin: null,
            status: 1, // 1 > activo 2 > vencido 3 > prorrateado
            model_id: null,
            model_type: '',
            recurrente: false,
            url: '',

            model: null,
            imagenes: []
         }
      },

      capturar(state,evento_id){
         state.evento = state.eventos.find(val => val.id === evento_id)
      },

      setEvento(state,evento){
         state.evento = evento
      },

      setEventos:(state,eventos) => {
         state.eventos = eventos
      },

      update(state,evento){
         let i = state.eventos.findIndex(val => val.id === evento.id)

         if(i != -1){
            state.eventos[i] = evento
         }

         if(state.evento.id === evento.id){
            state.evento = evento
         }

      },

      push(state,evento){
         state.eventos.push(evento)
      },

      put(state,evento_id){

         state.eventos.splice(
            state.eventos.findIndex(val => val.id === evento_id),
            1
         )

      }
   },

   actions:{

      fetch({state,commit},evento_id){
         return new Promise((resolve, reject) => {
            
            axios.get(`/api/eventos/${evento_id}/fetch/data`).then(({data}) => {

               commit('setEvento',data)
               resolve(data)
            }).catch( e => reject(e))
         })
      },


      fetchData({state,commit},datos){

         return new Promise((resolve, reject) => {
            
            axios.post(`/api/eventos/fetch/data`,datos).then(({data}) => {
               commit('setEventos',data.eventos)
               resolve(data)
            }).catch(e => reject(e))


         })
      },

      guardar({commit},datos){

         return new Promise((resolve, reject) => {
            
            if(datos.id){
               
               axios.put(`/api/eventos/${datos.id}`,datos).then(({data}) => {
                  if(data.result){
                     commit('update',data.evento)
                  }
                  resolve(data)

               }).catch( e => reject(e))

            }else{

               axios.post(`/api/eventos`, datos).then(({ data }) => {
                  
                  if (data.result) {
                     commit('push', data.evento)
                  }
                  
                  resolve(data)

               }).catch(e => reject(e))

            }

         })
      },

      eliminar({ commit }, evento_id) {

         return new Promise((resolve, reject) => {

               axios.delete(`/api/eventos/${evento_id}`).then(({ data }) => {

                  if (data.result) {
                    commit('put',evento_id)
                  }
                  resolve(data)

               }).catch(e => reject(e))

          
         })
      },

       cargarImagen({ state, commit }, { imagenes }) {

         let formData = new FormData();

         imagenes.forEach(val => {
            formData.append('imagen[]', val)
         })

         formData.append('_method', 'put')

         return new Promise((resolve, reject) => {
            axios.post(`/api/eventos/${state.evento.id}/cargar/imagen`, formData, {
               headers: {
                  ContentType: "multipart/form-data: boundary=something"
               }
            }).then(({ data }) => {

               if (data.result) {
                  commit('update', data.evento)

               }

               resolve(data)

            }).catch(e => reject(e))

         })

      },

      eliminarImagen({ state, commit }, imagen_id) {

         return new Promise((resolve, reject) => {

            axios.delete(`/api/eventos/${state.evento.id}/eliminar/imagen/${imagen_id}`).then(({ data }) => {

               if (data.result) {
                  commit('update', data.evento);
               }

               resolve(data)

            }).catch(e => reject(e))

         })
      },




   }

}