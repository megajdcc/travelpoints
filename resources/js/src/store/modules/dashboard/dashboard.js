import axios from "axios";

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
            staticReservaciones:{
               total:0,
               series: [
                        {
                           name: 'Traffic Rate',
                           data: [150, 200, 125, 225, 200, 250],
                        },

                        {
                           name: 'Traffic Rate',
                           data: [100, 40, 125, 150, 180, 230],
                        },

                     ],
               
            },

            staticBodasTotales:{
               total:0,
               series: [
                        {
                           name: 'Traffic Rate',
                           data: [150, 200, 125, 225, 200, 250],
                        },

                        {
                           name: 'Traffic Rate',
                           data: [100, 40, 125, 150, 180, 230],
                        },

                     ],
               
            },

            staticBodasActivas: {
               total: 0,
               series: [
                  {
                     name: 'Traffic Rate',
                     data: [150, 200, 125, 225, 200, 250],
                  },

                  {
                     name: 'Traffic Rate',
                     data: [100, 40, 125, 150, 180, 230],
                  },

               ],

            },

            tarjetasAgrupadas:{
               ultimaActualizacion:null,
               statisticsItems:[],
            },

            reservasTotalesPorBodaChart:{
               series: [],
               chartOptions: {

                  chart: {
                     zoom: {
                        enabled: false,
                     },
                     toolbar: {
                        show: false,
                     },
                  },

                  markers: {
                     strokeWidth: 7,
                     strokeOpacity: 1,
                     strokeColors: ['#66DA26','#FF1E1E'],
                     colors: ['#66DA26', '#FF1E1E'],
                  },

                  colors: ['#66DA26', '#FF1E1E'],
                  dataLabels: {
                     enabled: false,
                  },
                  stroke: {
                     curve: 'smooth',
                  },
                  grid: {
                     xaxis: {
                        lines: {
                           show: true,
                        },
                     },
                  },
                  tooltip: {
                     custom(data) {
                        return `${'<div class="px-1 py-50"><span>'}${data.series[data.seriesIndex][data.dataPointIndex]
                           } Reservas</span></div>`
                     },
                  },
                  xaxis: {
                     labels: {
                        rotate: -45
                     },
                     categories: [],
               
                  },
                  yaxis: {
                     // opposite: isRtl,
                  },
               },
            },

            habitaciones_contratadas:0,
            habitaciones_confirmadas:0,
            habitaciones_por_confirmar:0,
         habitaciones_solicitadas:0,

      }
   },


   mutations:{
      
      setStaticReservaciones(state,{total,series}){
         state.staticReservaciones.total = total;
         state.staticReservaciones.series = series
      },

      setStaticBodasTotales(state,{total,series}){
         state.staticBodasTotales.total = total;
         state.staticBodasTotales.series = series
      },

      setStaticBodasActivas(state,{total}){
         state.staticBodasActivas.total = total;
      },

      setTarjetasAgrupadas(state,{ultimaActualizacion,items}){
         state.tarjetasAgrupadas.ultimaActualizacion = ultimaActualizacion
         state.tarjetasAgrupadas.statisticsItems = items
      },

      setDataReservasTotalesPorBoda(state,{data,categorias}){

         state.reservasTotalesPorBodaChart.series = data
         state.reservasTotalesPorBodaChart.chartOptions.xaxis.labels = { rotate:-45}
         state.reservasTotalesPorBodaChart.chartOptions.xaxis.categories = categorias

      },

      setTotalHabitacionesContratadas(state,total_habitaciones){
         state.habitaciones_contratadas = total_habitaciones
      },
      setTotalHabitacionesConfirmadas(state, total_habitaciones) {
         state.habitaciones_confirmadas = total_habitaciones
      },
      setTotalHabitacionesPorConfirmar(state, total_habitaciones) {
         state.habitaciones_por_confirmar = total_habitaciones
      },

      setTotalHabitacionesSolicitadas(state, total_habitaciones) {
         state.habitaciones_solicitadas = total_habitaciones
      }




   },

   actions:{


      cargarDataDashboard({state,commit}){
         
         commit('toggleLoading', null, { root: true })
         axios.get('/api/get/data/dashboard').then(({data}) => {

            // let {staticReservaciones} = respon.data;

            commit('setStaticReservaciones',data.staticReservaciones);
            commit('setStaticBodasTotales',data.staticBodasTotales);
            commit('setStaticBodasActivas',data.staticBodasActivas);
            commit('setTarjetasAgrupadas',data.tarjetasAgrupadas);
            commit('setTotalHabitacionesContratadas',data.habitaciones_contratadas);

            commit('setTotalHabitacionesConfirmadas',data.habitaciones_confirmadas)
            commit('setTotalHabitacionesPorConfirmar',data.habitaciones_por_confirmar | 0)
            commit('setTotalHabitacionesSolicitadas', data.habitaciones_solicitadas | 0)




            

         }).catch(e => {
            console.log(e);

         }).then(() => {
            commit('toggleLoading',null,{root:true})
         })
      },


      cargarReservasTotalesPorBodaChart({state,commit},boda_id){
         commit('toggleLoading', null, { root: true })

         axios.get(`/api/get/data/dashboard/grafica/reservas/boda/${boda_id}`).then(respon => {
            
            commit('setDataReservasTotalesPorBoda',respon.data);

         }).catch(e => {
            console.log(e)
         }).then(() => {
            commit('toggleLoading', null, { root: true })
         })


      },

      fetchBodasList({state,commit},searchQuery){
         return new Promise((resolve, reject) => {
            axios.post(`/api/fetch/bodas/home`, searchQuery)
               .then(response => resolve(response))
               .catch(error => reject(error))
         });
      }



   }


}
