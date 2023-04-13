let colorRand = () => {
   let colores = [
      '#397DAD',
      '#4D616C',
      '#D02412',
      '#CD960E',
      '#348022',
      '#17B6AA',
      '#5F2626',
      '#00AEFF',
      '#6574cd',
      '#9561e2',
      '#f66d9b',
      '#e3342f',
      '#f6993f',
      '#ffed4a',
      '#38c172',
      '#4dc0b5',
      '#6cb2eb',
      '#444444',
      '#00c0ef',
   ];


   var i = random(0, colores.length);


   return colores[i];

}
export default{
   namespaced:true,

   state(){
      return{
          
            // Travelpoints
            gastosTuristicos:{
               items:[],
               ultima_fecha:null
            },

            tiendaRegalos:{
               items:[],
               ultima_fecha:null
            },
            
            totalViajeros:{

               series: [],
               chartOptions: {
                  chart: {
                     width: 380,
                     type: 'pie',
                  },
                  labels: [],
                  responsive: [{
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200
                     },
                     legend: {
                        position: 'bottom'
                     }
                  }
                  }]
               },
          
            },

             totalPromotores:{

               series: [],
               chartOptions: {
                  chart: {
                     width: 380,
                     type: 'pie',
                  },
                  labels: [],
                  responsive: [{
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200
                     },
                     legend: {
                        position: 'bottom'
                     }
                  }
                  }]
               },
          
            },

            totalCoordinadores:{

               series: [],
               chartOptions: {
                  chart: {
                     width: 380,
                     type: 'pie',
                  },
                  labels: [],
                  responsive: [{
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200
                     },
                     legend: {
                        position: 'bottom'
                     }
                  }
                  }]
               },
          
            },

            totalComisionesGeneradas:{

               series: [],
               chartOptions: {
                  chart: {
                     width: 380,
                     type: 'pie',
                  },
                  labels: [],
                  responsive: [{
                  breakpoint: 480,
                  options: {
                     chart: {
                        width: 200
                     },
                     legend: {
                        position: 'bottom'
                     }
                  }
                  }]
               },
          
            },

            
            totalDestinosActivos:{
               series:[],
               chartOptions: {
                  chart: {
                     type: 'bar'
                  },
                  plotOptions: {
                     bar: {
                        horizontal: false,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                     },
                  },
                  dataLabels: {
                     enabled: false
                  },
                  stroke: {
                     show: true,
                     width: 2,
                     colors: ['transparent']
                  },
                  xaxis: {
                     categories: [],
                  },
                  yaxis: {
                     title: {
                        text: 'Total de negocios por destino',
                     }
                  },
                  tooltip: {
                    
                  },
               },
              
            },

            viajerosActivos:0,
            destinosActivos:0,

            paisesActivos:[{
               name: 'Random data',

               states: {
                  hover: {
                     color: '#BADA55'
                  }
               },
               dataLabels: {
                  enabled: true,
                  format: '{point.name}'
               },
               allAreas: false,
               data: [
                  ['km', 69],
                  ['mn', 145],
                  ['rw', 146],
                  ['so', 147],
                  ['bo', 148],
                  ['cm', 149],
                  // ['cg', 150],
                  ['ci', 170],
                  ['lr', 171],
                  ['bn', 172],
                  ['iq', 173],
                  ['kg', 211],
                  ['np', 212],
                  ['ve', 100]
               ]
            }],


            negociosAfiliados:{
               series:[],
               chartOptions: {
                  chart: {
                     type: 'bar'
                  },

                  plotOptions: {
                     bar: {
                        horizontal: true,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                     },
                  },

                  dataLabels: {
                     enabled: false
                  },

                  stroke: {
                     show: true,
                     width: 2,
                     colors: ['transparent']
                  },

                  xaxis: {
                     categories:[],
                  },

                  tooltip: {
                    
                  },
               },
            },

            porcentajeNegocio:{
               series:[],
               chartOptions:{

                  chart:{
                     type: 'donut'
                  },

                  plotOptions:{
                     bar: {
                        horizontal: true,
                        columnWidth: '55%',
                        endingShape: 'rounded'
                     },
                  },

                  responsive: [{
                     breakpoint: 480,
                     options: {
                        chart: {
                           width: 200
                        },
                        legend: {
                           position: 'right'
                        }
                     }
                  }],

                  dataLabels: {
                     enabled: false
                  },

                  legend: {
                     position: 'right',
                     offsetY: 0,
                     height: 230,
                  },

                  stroke:{
                     show: true,
                     width: 2,
                     colors: ['transparent']
                  },
                  tooltip:{
                     y: {
                        formatter: (val,{ series, seriesIndex, dataPointIndex, w }) => {
                           return `${val} %`
                        },
                        title: {
                           formatter: (seriesName) => seriesName,
                        },
                     },
                  },

                  labels:[]

               },
            },
            operacionesTravel:0

      }
   },


   mutations:{
      

      // Travelpoints
      setTotalViajeros(state,{data,categorias}){
         state.totalViajeros.chartOptions.labels = categorias
         state.totalViajeros.series = data
      },
      setTotalPromotores(state,{data,categorias}){
         state.totalPromotores.chartOptions.labels = categorias
         state.totalPromotores.series = data
      },

       setTotalCoordinadores(state,{data,categorias}){
         state.totalCoordinadores.chartOptions.labels = categorias
         state.totalCoordinadores.series = data
      },

      setTotalDestinosActivos(state,data){

         state.totalDestinosActivos.chartOptions.xaxis.categories = data.map(destino => destino.destino)
         state.totalDestinosActivos.series = data.map(destino => ({
               name: destino.destino,
               data: [destino.totalNegocios],
               dataNombres:[destino.nombresNegocios]
            })
            )
          
         
      },

      setViajerosActivos(state,viajeros){
         state.viajerosActivos = viajeros
      },
      
      setDestinosActivos(state,destinos){
         state.destinosActivos = destinos
      },

      setPaisesActivos(state,data){
         state.paisesActivos = data
      },

      setTotalNegociosAfiliados(state,{data,categorias}){
         state.negociosAfiliados.chartOptions.xaxis.categories = categorias
         state.negociosAfiliados.series = data
      },
      
      setPorcentajeNegocio(state,{data,categorias}){
         state.porcentajeNegocio.chartOptions.labels = categorias
         state.porcentajeNegocio.series = data
      },

      setGastosTuristicos(state,data){
         state.gastosTuristicos.items = data.items
         state.gastosTuristicos.ultima_fecha = data.ultima_fecha
      },


      setTiendaRegalos(state,data){
         state.tiendaRegalos.items = data.items
         state.tiendaRegalos.ultima_fecha = data.ultimaFecha

      },

      setTotalComisionesGeneradas(state,{categorias,data}){
         state.totalComisionesGeneradas.chartOptions.labels = categorias
         state.totalComisionesGeneradas.series = data
      },

      setTotalOperaciones(state,data){
         state.operacionesTravel = data
      }


   },

   actions:{


      cargarDataDashboard({state,commit}){
         
         commit('toggleLoading', null, { root: true })
         axios.get('/api/get/data/dashboard').then(({data}) => {

            commit('setViajerosActivos',data.viajerosActivos)

            

         }).catch(e => {
            console.log(e);

         }).then(() => {
            commit('toggleLoading',null,{root:true})
         })
      },

      cargarViajerosActivos({commit},dato){
         return new Promise((resolve, reject) => {
            axios.post(`/api/dashboard/get/viajeros/activos`,dato).then(({data}) => {
               commit('setViajerosActivos',data)
               resolve(data)
            }).catch( e => reject(e))

         })
      },

       cargarDestinosActivos({commit},dato){
         return new Promise((resolve, reject) => {

            axios.post(`/api/dashboard/get/destinos/activos`,dato).then(({data}) => {
               commit('setDestinosActivos',data)
               resolve(data)

            }).catch( e => reject(e))

         })
      },

      cargarDestinosActivosChart({commit}){
         return new Promise((resolve, reject) => {
            axios.get('/api/dashboard/total/destinos/activos').then(({data}) => {
               commit('setTotalDestinosActivos',data)
               resolve(data);
            }).catch(e => reject(e));

         })
      },

      cargarPaisesActivos({commit}){
         return new Promise((resolve, reject) => {
               axios.get(`/api/dashboard/get/paises/activos`).then(({data}) => {
                  commit('setPaisesActivos',data)
                  resolve(data)
               }).catch(e => reject(e))
         })
      },

      getTotalViajeros({state,commit},filtro){
         return new Promise((resolve, reject) => {
            axios.post(`/api/dashboard/total/viajeros`,filtro).then(({data}) => {
               commit('setTotalViajeros',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },


      cargarNegociosAfiliados({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/total/negocios/afiliados`).then(({data}) => {
               commit('setTotalNegociosAfiliados',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },

      cargarPorcentajeNegocio({commit}){

         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/porcentaje/negocios`).then(({data}) => {
               commit('setPorcentajeNegocio',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      },
      fetchGastosTuristicos({commit},filtro){
         return new Promise((resolve, reject) => {
            
            axios.post(`/api/dashboard/gastos/turisticos`,filtro).then(({data}) => {
            
               commit('setGastosTuristicos',data)
               resolve(data)
            
            }).catch(e => reject(e))


         })
      },

        fetchTiendaRegalos({commit}){
         return new Promise((resolve, reject) => {
            
            axios.post(`/api/dashboard/tienda/regalos`).then(({data}) => {
               commit('setTiendaRegalos',data)
               resolve(data)
            
            }).catch(e => reject(e))


         })
      },

      fetchTotalPromotores({commit}){
         return new Promise((resolve,reject) => {

            axios.get(`/api/dashboard/total/promotores`).then(({data}) => {
               commit('setTotalPromotores',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },
      
      fetchTotalCoordinadores({commit}){
         return new Promise((resolve,reject) => {

            axios.get(`/api/dashboard/total/coordinadores`).then(({data}) => {
               commit('setTotalCoordinadores',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },
      
      fetchTotalComisionesGeneradas({commit}){
         return new Promise((resolve,reject) => {

            axios.get(`/api/dashboard/total/comisiones/generadas`).then(({data}) => {
               commit('setTotalComisionesGeneradas',data)
               resolve(data)
            }).catch(e => reject(e))
            

         })
      },

      getTotalOperacionesTravel({commit}){

         return new Promise((resolve, reject) => {
            
            axios.get(`/api/dashboard/total/operaciones/travel`).then(({data}) => {
               commit('setTotalOperaciones',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      }




   }


}
