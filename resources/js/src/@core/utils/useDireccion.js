
import store from '@/store'

import {ref,onMounted, watch } from '@vue/composition-api'
import axios from 'axios'

export default function useDireccion(){
   const paises = ref([])
   const ciudades = ref([])
   const estados = ref([])

   const pais_id = ref(null)
   const estado_id =ref(null)

    
   const cargarPaises = () => {

      store.commit('toggleLoading')
      
      axios.get(`/api/get/paises`).then(({data}) => {

         paises.value = data
      }).catch(e => {
         console.log(e)
      })
      .then(() => {
         store.commit('toggleLoading')
      })

   }

   const cargarEstados = (pais_id) => {
      store.commit('toggleLoading')
      axios.get(`/api/get/estados/${pais_id}`).then(({ data }) => {
         estados.value = data
      }).catch(e => {
         console.log(e)
      })
         .then(() => {
            store.commit('toggleLoading')
      })
   }

   const cargarCiudades = (estado_id) => {
      store.commit('toggleLoading')
      axios.get(`/api/get/ciudades/${estado_id}`).then(({ data }) => {
         ciudades.value = data
      }).catch(e => {
         console.log(e)
      })
         .then(() => {
            store.commit('toggleLoading')
         })
   }

   onMounted(() => {
      cargarPaises()
   })

   watch(pais_id,(val) => {
      cargarEstados(val)
   })

   watch(estado_id, (val) => {
      cargarCiudades(val)
   })

   
   return {
      paises,
      ciudades,
      estados,
      cargarPaises,
      cargarEstados,
      cargarCiudades,
      pais_id,
      estado_id
   }

}