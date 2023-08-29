<template>
    <b-card>
      <b-container>
          <b-row >
            <b-col cols="12" md="6">
              <b-form-group v-if="para == 'Lider'" label="Promotores" description="Cuántos promotores participarán en tu equipo">
                <el-slider v-model="form.promotores" show-input></el-slider>
              </b-form-group>

              <b-form-group label="Activaciones diarias" description="Anota a cuántos nuevos viajeros calculas que puedas invitar a Travel Points.">
                  <el-slider v-model="form.acti_diarias" show-input></el-slider>
                </b-form-group>

              <b-form-group label="Tarjetas Travel Points" description="Cuántos de ellos querrán comprar su tarjeta precargada">
                  <el-slider v-model="form.porc_tarjetas_precargadas" show-input :format-tooltip="(val) => `${val} %`"></el-slider>
              </b-form-group>

            </b-col>

            <b-col md="6">
              <section class="d-flex align-items-center h-100 flex-wrap justify-content-center ">
                  <h2 class="alert-heading">Tus ganancias mensuales estimadas</h2>
                  <b-alert variant="primary" show class="flex-grow-0 align-self-start p-1">
                    <h1 class="font-weight-bolder">
                     {{ ganancias | currency(divisaIso)  }} {{ simboloDivisa }}
                    </h1>
                  </b-alert>

                  <strong class="text-justify align-self-start">
                    <span class="text-danger text-uppercase font-weight-bolder">Nota:</span> <br>
                    Esta calculadora de ingresos es una proyección con base en promedios. El resultado será diferente ya que implica muchos valores variables y factores de constante cambio. La idea del presente simulador es darte una idea fácil de lo que podrías ganar.
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
      promotores:4,
      acti_diarias:4,
      porc_tarjetas_precargadas:85
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

    const ganancias = computed(() => {

      if(para.value == 'Lider'){
        const val1 = (form.value.acti_diarias * 5.5 * 4.35) * total_tps_ganados.value * (constantes.value.comision_empresa_promotor / 100) * (constantes.value.comision_lider / 100);
        const val2 = ((form.value.acti_diarias * 5.5 * 4.35) * (form.value.porc_tarjetas_precargadas / 100) * 2.5 * (constantes.value.comision_promotor / 100)) * form.value.promotores
        return val1 + val2
      }else if(para.value  == 'Promotor'){

         const val1 = (form.value.acti_diarias * 5.5 * 4.35) * total_tps_ganados.value * (constantes.value.comision_empresa_promotor / 100) * (constantes.value.comision_para_promotores / 100);
        const val2 = ((form.value.acti_diarias * 5.5 * 4.35) * (form.value.porc_tarjetas_precargadas / 100) * 2.5 * (constantes.value.comision_promotor / 100))
        return val1 + val2
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

    return {
      loading:computed(() => store.state.loading),
      form,
      ganancias,
      total_tps_ganados,
      divisaIso,
      simboloDivisa
    }

  }
}
</script> 