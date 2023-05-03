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

            viajerosTotalesAnual:{
               series: [],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'line',
                     zoom: {
                        enabled: false
                     },
                     id:'viajeros-totales-anuales'
                  },
                  dataLabels: {
                     enabled: false
                  },
                  stroke: {
                     curve: 'straight'
                  },
                  
                  grid: {
                  row: {
                     colors: ['#f3f3f3', 'transparent'], 
                     opacity: 0.5
                  },
                  },
                  xaxis: {
                     categories: [],
                     labels: {
                           style: {
                           transform: "rotate(45deg)"
                           }
                        }
                  }
               },
            },

            eficaciaPromotores:{
               series: [{
                     name: 'Vue Chart',
                     data: [30, 40, 45, 50, 49, 60, 70, 81]
                     }],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'line',
                     zoom: {
                        enabled: false
                     },
                     id:'eficacia-promotores'
                  },
                  dataLabels: {
                     enabled: false
                  },
                  stroke: {
                     curve: 'straight'
                  },
                  
                  grid: {
                  row: {
                     colors: ['#f3f3f3', 'transparent'], 
                     opacity: 0.5
                  },
                  },
                  xaxis: {
                     categories: ['prueba'],
                     labels: {
                           style: {
                           transform: "rotate(45deg)"
                           }
                        }
                  }
               },
            },

            viajerosTotales:{
                series: [],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'line',
                     zoom: {
                        enabled: false
                     },
                     id:'viajeros-totales'
                  },
                  dataLabels: {
                     enabled: false
                  },
                  stroke: {
                     curve: 'straight'
                  },
                  
                  grid: {
                  row: {
                     colors: ['#f3f3f3', 'transparent'], 
                     opacity: 0.5
                  },
                  },
                  xaxis: {
                     categories: [],
                     labels: {
                           style: {
                           transform: "rotate(45deg)"
                           }
                        }
                  }
               },
            },


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
            operacionesTravel:0,
            totalViajerosRegistrados:0,
            totalViajerosConsumos:0,
            comisiones_cobradas:0,
            comisiones_por_cobrar:0,
            promotores_status:{
               activos:0,
               inactivos:0
            },
            misPromotores:[],

            porcentajeEficacia:{
               series: [],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'radialBar',
                  },
                  
                 
                  plotOptions: {
                     radialBar: {
                        // ...
                        dataLabels: {
                           enabled:true,
                           textAnchor: 'middle',
                           distributed: false,
                           offsetX: 0,
                           offsetY: 0,

                           style: {
                                 fontSize: '12px',
                                 fontFamily: 'Helvetica, Arial, sans-serif',
                                 fontWeight: 'bold',
                                 colors: undefined
                           }
                        },
                     }
                  },

                  dataLabels: {
                        enabled:true,
                        textAnchor: 'middle',
                        distributed: false,
                        offsetX: 0,
                        offsetY: 0,

                        style: {
                              fontSize: '12px',
                              fontFamily: 'Helvetica, Arial, sans-serif',
                              fontWeight: 'bold',
                              colors: undefined
                        }
                  },
                  
                  labels: ['Sobre el Total de Viajeros'],
                  
               },
               
               
            },
            porcentajeEficaciaPromotores:{
               series: [10],
               chartOptions: {
                  chart: {
                     height: 350,
                     type: 'radialBar',
                     toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                        download: false,
                        selection: true,
                        zoom: false,
                        zoomin: true,
                        zoomout: true,
                        pan: true,
                        reset: true,
                        },
                     },
                  },
                  
                 
                  plotOptions: {
                     radialBar: {
                        // ...
                        
                        dataLabels: {
                           show: true,
                           name: {
                              show: true,
                              fontSize: '24px',
                              fontFamily: 'Miriad, Arial, sans-serif',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              offsetY: -10,
                           },
                           value: {
                              show: true,
                              fontSize: '30px',
                              fontFamily: 'Miriad, Arial, sans-serif',
                              fontWeight: 600,
                              color: '#FFFFFF',
                              offsetY: 0,
                              formatter: function (val) {
                                 return val + '%'
                              },
                           },
                           total: {
                              show: true,
                              label: 'Eficacia', // Aquí se establece la etiqueta por defecto
                              formatter: function () {
                                 return ''
                              },
                           },
                        },
                     }
                  },

                  dataLabels: {
                        hideWhenZero: false,
                        enabled:true,
                        textAnchor: 'middle',
                        distributed: false,
                        offsetX: 0,
                        offsetY: 0,

                        style: {
                              fontSize: '12px',
                              fontFamily: 'Helvetica, Arial, sans-serif',
                              fontWeight: 'bold',
                              colors: undefined
                        }
                  },
                  
                  labels: ['Prueba'],
                  activeIndex:0,

                  legend: {
                     show: true,
                     position: 'bottom',
                  },
                  
               },
            }


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
      },

      setViejerosTotalesAnuales(state,{categorias,data}){
         state.viajerosTotalesAnual.chartOptions.xaxis.categories = categorias
         state.viajerosTotalesAnual.series = data
      },

      setTotalViajerosRegistrados(state,total){
         state.totalViajerosRegistrados = total
      },
      setTotalViajerosConsumo(state,total){
         state.totalViajerosConsumos = total
      },

      setComisionesPromotor(state,{comisiones_cobradas,comisiones_por_cobrar}){
         state.comisiones_cobradas = comisiones_cobradas
         state.comisiones_por_cobrar = comisiones_por_cobrar
      },

      setStatusPromotores(state,{promotores_activos,promotores_inactivos}){

         state.promotores_status.activos = promotores_activos
         state.promotores_status.inactivos = promotores_inactivos

      },

      setEficaciaPromotores(state,{promotores,data}){
         state.eficaciaPromotores.chartOptions.xaxis.categories = promotores
         state.eficaciaPromotores.series = data
      },

      setViajerosTotales(state,{categorias,data}){
         state.viajerosTotales.chartOptions.xaxis.categories = categorias
         state.viajerosTotales.series = data
      },

      setMisPromotores(state,promotores){
         state.misPromotores = promotores
      },
      setEficaciaMes(state,val) {
         state.porcentajeEficacia.series = [val];
      },

      setEficaciaMesPromotores(state,{promotores,data}){

         state.porcentajeEficaciaPromotores.chartOptions.labels = promotores
         state.porcentajeEficaciaPromotores.series = data
         
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
      },

      getTotalViajerosRegistradoAnual({commit}){

         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/total/viajeros/anual`).then(({data}) => {
               
               commit('setViejerosTotalesAnuales',data)
               commit('setTotalViajerosRegistrados',data.total_usuarios_registrados)
               commit('setTotalViajerosConsumo',data.total_viajeros_consumos)

               resolve(data)

            }).catch(e => reject(e))
         })
      },


      getTotalComisiones({commit},filtro){
         
         return new Promise((resolve, reject) => {
            
            axios.post(`/api/dashboard/total/comisiones/promotor`,filtro).then(({data}) => {
               commit('setComisionesPromotor',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },

      promotoresStatus({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/promotores/status`).then(({data}) => {

               commit('setStatusPromotores',data)
               resolve(data)

            }).catch(e => reject(e))

         })
      },


      getEficaciaPromotores({commit}){
         return new Promise((resolve, reject) => {
            axios.get('/api/dashboard/promotores/get/eficacia').then(({data}) => {

               commit('setEficaciaPromotores',data)
               resolve(data)
            }).catch(e => reject(e))
         })
      },

      getTotalesViajeros({commit},filtro){
         return new Promise((resolve, reject) => {
            axios.post(`/api/dashboard/lider/viajeros-totales`,filtro).then(({data}) => {

               commit('setViajerosTotales',data)
               resolve(data)

            }).catch(e => reject(e))


         })
      },

      getMisPromotores({commit}){

         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/lider/mis-promotores`).then(({data}) => {

               commit('setMisPromotores',data)
               resolve(data)
            }).catch(e => reject(e))

         })
      },


      getEficaciaMes({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/lider/eficacia-mes`).then(({data}) => {
               commit('setEficaciaMes',data)
               resolve(data)
            }).catch(e  => reject(e))
         })
      },
      getEficaciaMesPromotores({commit}){
         return new Promise((resolve, reject) => {
            axios.get(`/api/dashboard/lider/eficacia-mes/promotores`).then(({data}) => {
               commit('setEficaciaMesPromotores',data)
               resolve(data)
            }).catch(e  => reject(e))
         })
      }





   }


}
