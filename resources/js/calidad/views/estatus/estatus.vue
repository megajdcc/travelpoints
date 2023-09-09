<template>
    <b-container fluid class="mx-0 px-0 status-card">
      <b-row class="mx-0 px-0">
        <b-col cols="12" class="mx-0 px-0">
          <b-card v-if="$store.getters['usuario/isRol']('Promotor')">
            <strong>Última activación hace {{ ultimaActivacion }}</strong>
          </b-card>
        </b-col> 
      </b-row>

      <b-row class="legend">
        <b-col cols="12" md="4">
          <b-card :class="{'active' : getStatus == 'Activo'}">
            <section class="d-flex">
              <figure class="flex-shrink-1 flex-grow-0">
                <font-awesome-icon icon="fas fa-circle-check" size="5x" color="green" />
              </figure>

              <section class=" ml-1 flex-grow-0 d-flex flex-column">
                <h3>ACTIVO</h3>
                <p class="text-justify">
                 {{ getMessageStatus(1) }} 
                </p>
              </section>

            </section>
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <b-card :class="{ 'active': getStatus == 'En Peligro' }">
          <section class="d-flex">
            <figure class="flex-shrink-1 flex-grow-0">
                  <font-awesome-icon icon="fas fa-triangle-exclamation" size="5x" color="#fbcd2a" />
            </figure>

            <section class=" ml-1 flex-grow-0 d-flex flex-column">
                <h3>PELIGRO</h3>
                <p class="text-justify">
                   {{ getMessageStatus(2) }} 
                 
                </p>
            </section>
          </section>

            
          </b-card>
        </b-col>
        <b-col cols="12" md="4">
          <b-card :class="{ 'active': getStatus == 'Inactivo' }">
            <section class="d-flex">
            <figure class="flex-shrink-1 flex-grow-0" >
              <font-awesome-icon icon="fas fa-circle-exclamation" size="5x" color="red" />
            </figure>
            <section class=" ml-1 flex-grow-0 d-flex flex-column">
                  <h3>INACTIVO</h3>
                  <p class="text-justify">
                      {{ getMessageStatus(3) }} 

                  
                  </p>
              </section>
          </section>

          </b-card>
        </b-col>
      </b-row>


      <!-- niveles -->
      <b-row v-if="$store.getters['usuario/isRol']('Promotor')">
        <b-col cols="12">
          <b-card no-body>
            <b-container fluid>
              <b-row>
                <b-col cols="12">
                  <section class="d-flex justify-content-center flex-wrap">
                    
                    <section class="card-insignea p-1 my-1 my-md-0" v-for="(nivel,i) in niveles" :key="i" :class="{'active' : getNivel == (nivel.nivel - 1)}" >

                      <section v-if="getNivel == (nivel.nivel - 1)" class="figure-active-left" :style="`background:url('${decoreleft}')`"></section>
                      <section v-if="getNivel == (nivel.nivel - 1)" class="figure-active-right" :style="`background:url('${decoreright}')`"></section>

                      <header class="d-flex flex-column text-center">
                        <strong class="text-uppercase">
                          NIVEL {{ nivel.nivel }}
                        </strong>
                        <span>{{ nivel.activaciones }} <br> Activaciones</span>
                      </header>

                      <main class="text-center">
                        <figure>
                          <img :src="nivel.insignea" :alt="nivel.name">
                          <figcaption>{{ nivel.name.toUpperCase() }}</figcaption>
                        </figure>
                      </main>
                    </section>

                  </section>
                </b-col>
              </b-row>
            </b-container>
          </b-card>
        </b-col>
      </b-row>

    </b-container>
</template>

<script>

import {
  BContainer,
  BRow,
  BCol,
  BCard,
} from 'bootstrap-vue'

import {computed,toRefs,ref,onMounted} from 'vue'

import store from '@/store'

import nivel1 from '@images/insignias/nivel-1.png'
import nivel2 from '@images/insignias/nivel-2.png'
import nivel3 from '@images/insignias/nivel-3.png'
import nivel4 from '@images/insignias/nivel-4.png'
import nivel5 from '@images/insignias/nivel-5.png'
import decoreright from '@images/elements/decore-right.png'
import decoreleft from '@images/elements/decore-left.png'

export default {
  
  components:{
    BContainer,
    BRow,
    BCol,
    BCard,
  },

  setup(props){
    
    const ultimaActivacion = ref(0)
    const {usuario} = toRefs(store.state.usuario)
    const niveles = ref([
        {
          nivel:1,
          name:'Visitante',
          activaciones:1,
          insignea:nivel1
        },
         {
        nivel: 2,
        name: 'Recomendador',
        activaciones: 100,
        insignea: nivel2
      },
       {
        nivel: 3,
        name: 'Promotor',
        activaciones: 500,
        insignea: nivel3
      },
       {
        nivel: 4,
        name: 'Consul',
        activaciones: 1000,
        insignea: nivel4
      },
       {
        nivel: 5,
        name: 'Embajador',
        activaciones: 3000,
        insignea: nivel5
      }
    ])

    const cargarStatus = () => {

     

      if(store.getters['usuario/isRol']('Promotor')){
        store.dispatch('usuario/cargarStatus').then(({ultimaActivacion:ult}) => {
          ultimaActivacion.value = ult
        })

          store.dispatch('usuario/getStatusPromotor',usuario.value.id)
      }

      if (store.getters['usuario/isRol']('Lider')) {
        store.dispatch('usuario/getStatusLider',usuario.value.id)
      }

      if (store.getters['usuario/isRol']('Coordinador')) {
        store.dispatch('usuario/getStatusCoordinador')
      }

    }

    onMounted(() => {
      cargarStatus();
    })

    const getMessageStatus = (status) => {
      let mensajes =  [
        'Registra al menos 1 Viajero al mes, y que este registre cualquier consumo en cualquiera de los negocios afiliados a Travel Points.',
        ' No has hecho ningún registro en más de 30 días. ¡Rápido!, registra al menos un nuevo viajero. El dia 60 sin registros, el sistema borrará el vinculo con tus viajeros.',
        ' No ha registrado viajeros en 60 días. Tus viajeros han sido desvinculados de tu cuenta. Puedes activarla en cualquier momento, pero no recuperarás los viajeros  registrados.'
      ];

      if(store.getters['usuario/isRol']('Lider')){
        mensajes = [
          'Almenos uno de tus promotores debe estar activo',
          'No tiene promotores activos en más de 1 día y menos de 59.',
          'Cuando pasan 60 días sin un promotor activo. Pierde su red de viajeros que pasan a Travel Points. Su cuenta se resetea y pierde su red, pero no se borra.'
        ];
      }

      if(store.getters['usuario/isRol']('Coordinador')){
        mensajes = [
          'Almenos tienes 10 líderes activos',
          'Tienes menos de 10 líderes activos más de 1 día y menos de 29 días.',
          'Cuando pasan 30 días sin al menos 10 líderes activos. Perderás tu red de lideres y pasarán a TravelPoints'
        ];
      }


      return mensajes[status -1];

    } 

    return {
      ultimaActivacion:computed(() => {
        return ultimaActivacion.value > 1 ? `${ultimaActivacion.value} días` : `${ultimaActivacion.value} día`;
      }),
      niveles,
      getNivel:computed(() => {

        if(usuario.value.nivel){
          return usuario.value.nivel.nivel
        }

        return 1;
      }),

      decoreright,
      decoreleft,
      getStatus:computed(() => store.getters['usuario/getStatus']),
      getMessageStatus,
      
    } 

  }

}
</script>

<style lang="scss">
  .status-card{

    

    .legend .card{
      min-height:215px;
      height:auto;
      opacity: .5;
      &.active{
      opacity: 1;
      }
      p{
        font-size:10pt !important;
      }
    }
   
  }

  .card-insignea{
    position:relative;
    background-color: rgba(0,0,0,0.2);
    margin:auto .2rem;
    cursor:pointer;
    height:250px;
    display:flex;
    flex-direction: column;
    justify-content:space-around;
    opacity: .5;

    &.active{
      opacity: 1;
      // color:white !important;
      header{
        margin-top:2rem;
      }
    }

    .figure-active-left,
    .figure-active-right{
      position:absolute;
      top:0;
    }

    .figure-active-left{
      width: 50%;
      height: 80px;
      left: 0;
      z-index: 3;
      background-repeat: no-repeat !important;
      background-size: contain !important;
    }

    .figure-active-right{
      width: 50%;
      height: 80px;
      left: auto;
      right:0;
      z-index: 3;
      background-repeat: no-repeat !important;
      background-size: contain !important;
    }
   
    header,main{
      z-index:5;
    }

    figure{
      
      img{
        height:100px;
        width:auto;
      }
      figcaption{
        margin-top:1rem;
      }
    }
  }
</style>