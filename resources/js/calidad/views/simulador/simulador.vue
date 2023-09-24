<template>
    <b-card>
      <b-container fluid>
          <b-row >
            <b-col cols="12" md="6">
              <b-alert variant="primary" show class="align-self-start my-0" style="padding:.3rem" v-if="para == 'Coordinador'">
                <h5 class="my-0">Cada equipo promotor (1 Líder)</h5>
              </b-alert>
              <b-form-group v-if="para == 'Lider' || para == 'Coordinador'" label="Promotores" description="Cuántos promotores participarán en tu equipo">
                <template #label>

                    <span v-if="para == 'Lider'">
                        Promotores
                      </span>

                      <span v-if="para == 'Coordinador'">
                        Promotores por Equipo
                      </span>
                    </template>
                <el-slider v-model="form.promotores" show-input></el-slider>
              </b-form-group>

               <b-form-group label="Días de Trabajo" >

                <template #label>
                    <span v-if="para == 'Promotor'">
                      Días de Trabajo
                    </span>

                    <span v-if="para == 'Lider' || para == 'Coordinador'">
                      Días trabajado por Promotor
                    </span>
                </template>

                <template #description>
                  <span v-if="para == 'Promotor'">
                    Cuanto días de la semana trabajarás como promotor
                  </span>

                  <span v-if="para == 'Lider' || para == 'Coordinador'">
                    Cuántos días de la semana trabajará cada promotor.
                  </span>
                </template>
                  <el-slider v-model="form.dias_trabajado" show-input :min="1" :max="7"></el-slider>
              </b-form-group>


              <b-form-group label="Activaciones diarias" description="">
                <template #description>
                  <span v-if="para == 'Promotor'">
                   Anota a cuántos nuevos viajeros calculas que puedas invitar en el día a Travel Points.
                  </span>

                  <span v-if="para == 'Lider'">
                    Cuántos registros de nuevos viajeros logrará cada uno de tus promotores a Travel Points por día trabajado.
                  </span>
                </template>

                  <el-slider v-model="form.acti_diarias" show-input></el-slider>
                </b-form-group>

              <b-form-group label="Tarjetas Travel Points" description="Cuántos de ellos querrán comprar su tarjeta precargada">
                  <el-slider v-model="form.porc_tarjetas_precargadas" show-input :format-tooltip="(val) => `${val} %`"></el-slider>
              </b-form-group>

              <b-alert variant="primary" show class="align-self-start my-0" style="padding:.3rem" v-if="para == 'Coordinador'">
                <h5 class="my-0">Total equipos promotores (1 Líder cada uno)</h5>
              </b-alert>

              <b-form-group v-if="para == 'Coordinador'" label="Líderes a cargo" description="Cuántos líderes calculas puedas conseguir para tener a tu cargo">
                <el-slider v-model="form.lideres" show-input></el-slider>
              </b-form-group>
            </b-col>

            <b-col md="6">
              <section class="d-flex align-items-center h-100 flex-column justify-content-around ">
                  <h2 class="alert-heading">Tus ganancias mensuales estimadas</h2>
                  <b-alert variant="primary" show class="flex-grow-0 align-self-center justify-content-center p-1">
                    <h1 class="font-weight-bolder">
                     {{ ganancias | currency(divisaIso)  }} {{ simboloDivisa }}
                    </h1>
                  </b-alert>

                  <table class="table table-sm w-75">
                    <tr v-if="para == 'Promotor'">
                      <td>Días trabajados al mes:</td><td>{{ diasTrabajadosMes > 1 ? `${diasTrabajadosMes} Días` : `${diasTrabajadosMes} Día` }}</td>
                    </tr>
                     <tr>
                        <td>Total Activaciones {{ para == 'Lider' ? 'al mes' : '' }}:</td><td>{{ totalActivaciones }}</td>
                      </tr>

                      <tr>
                          <td>Ingresos por Tarjetas:</td><td>{{ ingresosPorTarjetas | currency(divisaIso)}} {{ simboloDivisa }}</td>
                        </tr>

                      <tr>
                        <td>Ingresos por Comisiones:</td><td>{{ ingresosPorComisiones | currency(divisaIso)}} {{ simboloDivisa }}</td>
                      </tr>

                  </table>

                  <strong class="text-justify align-self-start">
                    <span class="text-danger text-uppercase font-weight-bolder">Nota:</span> <br>
                    {{ legend }}
                  </strong>
              </section>
            </b-col>
          </b-row>

      </b-container>
    </b-card>
</template>

<script>
import {computed,ref,toRefs} from 'vue'

import store from '@/store'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BFormGroup,
  BAlert

} from 'bootstrap-vue'

export default {
  props:{
    para:String
  },

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BFormGroup,
    BAlert


  },

  setup(props){

    const {para} = toRefs(props)
    const {usuario} = toRefs(store.state.usuario)
    const form = ref({
      promotores:1,
      acti_diarias:3,
      porc_tarjetas_precargadas:75,
      dias_trabajado:4,
      lideres:20
    }) 


    const constantes = ref({
      // viajeros
      dias_promedio_vacaciones:7,
      personas_promedio:2.2,
      consumos_registrados_vacaciones:4,
      tps_registro:2.5,
      // travelpoints
      comision_empresa_promotor:35,
      // lider
      comision_lider:25,
      comision_promotor:100,
      comision_para_promotores:75,

    })  

    const  total_tps_ganados =  computed(() => {
      return (constantes.value.tps_registro * constantes.value.consumos_registrados_vacaciones ) * constantes.value.personas_promedio
    })  

    const diasTrabajadosMes = computed(() => {
      return  redondeo(form.value.dias_trabajado * 4.2) 
    })

    const totalActivaciones = computed(() => {
      let valor = 0;
      switch (para.value) {
        case 'Promotor':
            valor =  redondeo(form.value.dias_trabajado * 4.2 * form.value.acti_diarias);
          break;

        case 'Lider':
          valor = redondeo(form.value.promotores * (form.value.dias_trabajado * 4.2) * form.value.acti_diarias)
        break;
      
        default:
         valor = redondeo(form.value.promotores * (form.value.dias_trabajado * 4.2) * form.value.acti_diarias * form.value.lideres)
          break;
      }
      
      return valor;
     
    })

    const ingresosPorTarjetas = computed(() => {
      let valor = 0;
      switch (para.value) {
        case 'Promotor':
            valor =  totalActivaciones.value * (form.value.porc_tarjetas_precargadas / 100) * 2.5
          break;

        case 'Lider':
          valor = totalActivaciones.value * (form.value.porc_tarjetas_precargadas / 100) * 1.25
        break;
      
        default:
          valor = totalActivaciones.value * 0.2 * (form.value.porc_tarjetas_precargadas / 100);
          break;
      }

      return valor;
    })

    const ingresosPorComisiones = computed(() => {

      let valor = 0;
      switch (para.value) {
        case 'Promotor':
            valor =  (6.16 * totalActivaciones.value)
          break;

        case 'Lider':
          valor = totalActivaciones.value * 2.16
        break;
      
        default:
          valor = totalActivaciones.value * 0.42;
          break;
      }

      return valor;

    })

    const ganancias = computed(() => {

      if(para.value == 'Lider'){
        return ingresosPorTarjetas.value + ingresosPorComisiones.value
      }else if(para.value  == 'Promotor'){
        
        return ingresosPorTarjetas.value + ingresosPorComisiones.value
      }else {
        return ingresosPorTarjetas.value + ingresosPorComisiones.value
      }
    
    })

    const divisaIso =  computed(() => {
      if (usuario.value.cuenta) {
        return usuario.value.cuenta.divisa ? usuario.value.cuenta.divisa.iso : 'EUR'
      }
      return 'EUR'
    })

    const  simboloDivisa = computed(() => {
        if (usuario.value.cuenta) {
          return usuario.value.cuenta.divisa ? usuario.value.cuenta.divisa.simbolo : '€'
        }
        return '€'
    })
    

    const legend = computed(() => {
      const legendas = [
        'Esta calculadora de ingresos genera una proyección aproximada de los ingresos que puedes generar como promotor independiente con base en los parámteros ingresados. El resultado real será diferente ya que existen otras variables. El objetivo del presente simulador es dar una idea rápida de lo que podrías ganar con Travel Points como promotor independiente.',
        'Esta calculadora de ingresos genera una proyección aproximada de los ingresos que puede generar un líder con base en los parámteros ingresados. El resultado real será diferente ya que existen otras variables. El objetivo del presente simulador es dar una idea rápida de lo que podrías ganar con Travel Points liderando un equipo promotor.',
        'Esta calculadora de ingresos genera una proyección aproximada de los ingresos que puedes generar como Coordinador, con base en los parámetros ingresados. El resultado real será diferente ya que existen otras variables. El objetivo del presente simulador es dar una idea rápida de lo que podrías ganar con Travel Points como Coordinador de Líderes.'
      ]

      switch (para.value) {
        case 'Promotor':
            return legendas[0]
          break;

        case 'Lider':
          return legendas[1]
        break;
      
        default:
          return legendas[2]
          break;
      }
    })

    return {
      loading:computed(() => store.state.loading),
      form,
      ganancias,
      total_tps_ganados,
      divisaIso,
      simboloDivisa,
      diasTrabajadosMes,
      totalActivaciones,
      ingresosPorTarjetas,
      ingresosPorComisiones,
      legend
    }

  }
}
</script> 