import axios from "axios"

export default {

   namespaced:true,

   state:() => ({

      divisa:{
         id       : null,
         nombre   : '',
         iso      : '',
         simbolo  : '',
         tasa     : 0,
         principal: false
      },

      divisas:[]

   }),


   getters:{
      draft(state){
         return clone(state.divisa)
      }
   },



   mutations:{

      clear(state){
         state.divisa = {
            id: null,
            nombre: '',
            iso: '',
            simbolo: '',
            tasa: 0,
            principal: false
         }
      },


      setDivisas(state,data){

         if(data.length){
            state.divisas = data
         }
      },

      setDivisa(state,divisa){
         state.divisa = divisa
      },


      push(state,divisa){
         
         if(divisa.id){
            state.divisas.push(divisa)
         }

      },


      put(state,divisa_id){
         
         state.divisas.splice(
            state.divisas.findIndex(val => val.id === divisa_id),
            1
         );
      },


      capturar(state,divisa_id){

         if(divisa_id && state.divisas.length){
            state.divisa = state.divisas.find(val => val.id === divisa_id)
         }

      },

      update(state,divisa){
         let i = state.divisas.findIndex(val => val.id === divisa.id)

         if(i != -1){  
            state.divisas[i] = divisa
            if(state.divisa.id === divisa.id){
               state.divisa = divisa               
            }
         }

      }


   },


   actions:{

      fetchData({commit},datos){

         return new Promise((resolve, reject) => {
            
            axios.post('/api/divisas/fetch/data',datos).then(({data}) => {

               commit('setDivisas',data.divisas);
               resolve(data);
            }).catch(e => reject(e))

         });


      },


      fetch({commit},divisa_id){

         return new Promise((resolve, reject) => {

            axios.get(`/api/divisas/${divisa_id}/fetch`).then(({data}) => {
               commit('setDivisa',data)
               resolve(data);

            }).catch(e => reject(e))

         })
      },

      guardar({state,commit},datos){

         return new Promise((resolve, reject) => {

            if (state.divisa.id) {

               axios.put(`/api/divisas/${datos.id}`, datos).then(({ data }) => {
                  commit('update', data.divisa)
                  resolve(data)
               }).catch(e => reject(e))


            } else {

               axios.post(`/api/divisas`, datos).then(({ data }) => {

                  commit('push', data.divisa)
                  resolve(data)

               }).catch(e => reject(e))

            }
         })

        


      },

      eliminar({commit},divisa_id){

         return new Promise((resolve, reject) => {
            
            axios.delete(`/api/divisas/${divisa_id}`).then(({data}) => {

               if(data.result){
                  commit('put',divisa_id)
               }

               resolve(data)
            }).catch(e => {
               reject(e)
            })

         })

      },


      getPrincipal({commit}){


         return new Promise((resolve, reject) => {

            axios.get(`/api/divisas/get/principal`).then(({data}) => {

               commit('setDivisa',data)

               resolve(data)

            }).catch(e => reject(e))


         })
      }






   }

}
