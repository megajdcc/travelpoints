export default {

  namespaced: true,

  state: () => ({
    consumo: {
      id: null,
      cliente_id: null,
      empleado_id: null,
      total:0,
      paypal_id:null,
      paypal:null,
      tps:0,
      comentado:false,
      divisa_id:null,
      cliente:null,
      empleado:null,
      divisa:null,
      productos: [],
    },

    consumos: [],

  }),

  getters: {
    draft(state) { return clone(state.consumo) }
  },

  mutations: {
    clear(state) {
      state.consumo = {
        id: null,
        cliente_id: null,
        empleado_id: null,
        total: 0,
        paypal_id: null,
        paypal: null,
        tps: 0,
        comentado: false,
        divisa_id: null,
        cliente: null,
        empleado: null,
        divisa: null,
        productos: [],
      }
    },


    setConsumo(state, consumo) {
      state.consumo = consumo
    },

    update(state, consumo) {
      const i = state.consumos.findIndex(val => val.id === consumo.id)

      if (i != -1) {
        state.consumos[i] = consumo
      }

      if (state.consumo.id === consumo.id) {
        state.consumo = consumo
      }
    },

    push(state, consumo) {
      state.consumos.push(consumo)

    },

    put(state, consumo_id) {
      state.consumos.splice(
        state.consumos.findIndex(val => val.id === consumo_id),
        1
      )
    },

    capturar(state, consumo_id) {
      const consumo = state.consumos.find(val => val.id === consumo_id)

      if (consumo != undefined) {
        state.consumo = consumo
      }
    },

    setConsumos(state, consumos) {
      state.consumos = consumos
    }
  },

  actions: {
    getConsumos({ commit }) {

      return new Promise((resolve, reject) => {
        axios.get('/api/consumos/get/all').then(({ data }) => {
          commit('setConsumos', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    fetchData({ state, commit }, datos) {

      return new Promise((resolve, reject) => {
        axios.post(`/api/consumos/fetch/data`, datos).then(({ data }) => {

          commit('setConsumos', data.consumos)

          resolve(data)
        }).catch(e => reject(e))

      })

    },

    fetch({ state, commit }, consumo_id) {

      return new Promise((resolve, reject) => {
        axios.get(`/api/consumos/${consumo_id}/fetch/data`).then(({ data }) => {
          commit('setConsumo', data)
          resolve(data)
        }).catch(e => reject(e))

      })
    },

    guardar({ commit }, datos) {

      return new Promise((resolve, reject) => {
        if (datos.id) {
          axios.put(`/api/consumos/${datos.id}`, datos).then(({ data }) => {
            if (data.result) {
              commit('update', data.consumo)

            }
            resolve(data)
          }).catch(e => reject(e))

        } else {

          axios.post(`/api/consumos`, datos).then(({ data }) => {
            if (data.result) {
              commit('push', data.consumo)
            }

            resolve(data)

          }).catch(e => reject(e))

        }
      })

    },

    eliminar({ commit }, consumo_id) {
      return new Promise((resolve, reject) => {
        axios.delete(`/api/consumos/${consumo_id}`).then(({ data }) => {

          resolve(data)

        }).catch(e => reject(e))

      })

    }
  }

}


