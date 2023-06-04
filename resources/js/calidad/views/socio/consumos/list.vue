<template>
    <listado :actions="actions" hideHeader hideFooter>
      
      <template #titulo="{total}">
        <h3> He hecho {{ total > 1 ? `${total} consumos` : `${total} consumo` }}</h3>
      </template>

      <template #contenido="{items}">
          <b-card v-for="(venta,i) in items" :key="i" :class="{'mt-1' : i == 0}" >
              <b-container fluid>
                <b-row>
                  <b-col cols="12">
                    <section class="d-flex justify-content-between align-items-center">
                      <p>
                        <b-link>{{ venta.model.nombre  }}</b-link>
                         Ha reigistrado un consumo por la cantidad de {{ venta.monto | currency(venta.divisa.iso) }}. 
                         El {{ venta.created_at | fecha('LLLL') }}
                      </p>

                      <strong>
                        # {{ venta.id }}
                      </strong>

                    </section>
                  </b-col>
                  <el-divider></el-divider>
                  <b-col cols="12">
                    <section class="d-flex justify-content-between">

                      <section class="flex-grow-1 d-flex flex-column ">
                        <strong>Total del consumo</strong>
                        <strong class="text-warning">{{ venta.comision | currency(venta.divisa.iso) }}</strong>
                      </section>

                      <section class="flex-grow-1 d-flex flex-column ">
                          <strong>Comisión</strong>
                          <strong class="text-warning">{{ venta.comision | currency(venta.divisa.iso) }}</strong>
                      </section>

                      <section class="flex-grow-1 d-flex flex-column ">
                          <strong>Travel Points Bonificados</strong>
                          <strong class="text-warning">Tp{{ venta.tps | currency }}</strong>
                      </section>

                    </section>
                  </b-col>

                    <el-divider></el-divider>
                    <b-col cols="12">
                          <b-card v-if="venta.opinions.length" no-body >
                            <b-list-group>
                              
                              <b-list-group-item v-for="({usuario,opinion,calificacion,titulo,asistencia,created_at},y) in venta.opinions" :key="y">
                                <b-container fluid>
                                  <b-row>
                                    <b-col cols="12">
                          
                                      <b-media vertical-align="center">
                                        <template #aside>
                                          <b-avatar size="32" :src="usuario.avatar" :text="avatarText(`${usuario.nombre} ${usuario.apellido}`)"
                                            :variant="`light-info`" disabled />
                                        </template>
                                        <b-link disabled class="font-weight-bold d-block text-nowrap">
                                          {{ `${usuario.nombre} ${usuario.apellido}` }}
                                        </b-link>
                                        <small class="text-muted" v-if="usuario.username">{{ usuario.username }}</small>
                                      </b-media>
                          
                                    </b-col>
                          
                                    <b-col cols="12" class="d-flex flex-column">
                                      <el-rate :value="Number(calificacion)" disabled disabled-void-color="#4f4f4f" void-color="#000000" />
                                      <h3 class="font-weight-bolder">{{ titulo }}</h3>
                                      <span>
                                        {{ asistencia }}
                                      </span>
                                      <section class="opinion">
                                        <p>{{ opinion }}</p>
                                      </section>
                          
                                      <small>Escrita el {{ created_at | fecha('DD MMMM YYYY h:mm A') }}</small>
                          
                                      <small>
                                        Esta opinión es la opinión subjetiva de un miembro de Travelpoints, no de TravelPoints. TravelPoints les
                                        hace controles
                                        a todas las opiniones.
                                      </small>
                                    </b-col>
                                  </b-row>
                                  <b-row>
                          
                                  </b-row>
                                </b-container>
                              </b-list-group-item>
                            </b-list-group>
                          </b-card>

                        <OpinionForm v-else model-type="App\Models\Venta" :model-id="venta.id" @opinionGuardada="opinionGuardada" isConsumo>
                          <template #labelButton>
                            NO hay opinión, Registra una...
                          </template>
                        </OpinionForm>

                    </b-col>
                </b-row>
              </b-container>
          </b-card>
      </template>
       
    </listado>
</template>

<script>

import store from '@/store'
import { avatarText } from '@core/utils/filter'

import {toRefs,computed,onMounted,ref,watch} from 'vue'
import useConsumosList from './useConsumosList'

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BButton,
  BButtonGroup,
  BLink,
  BMedia,
  BAvatar,
  BListGroup,
  BListGroupItem
} from 'bootstrap-vue'
export default{

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BButton,
    BButtonGroup,
    BLink,
    Listado:() => import('components/Listado.vue'),
    BMedia,
    BAvatar,
    BListGroup,
    BListGroupItem,
    OpinionForm: () => import('views/opinions/form.vue')
  },

  setup(props){

    const {usuario} = toRefs(store.state.usuario)
    const venta_id  = ref(null)
    const actions = useConsumosList(usuario);

    onMounted(() => actions.refetchData())
    watch([usuario],() => actions.refetchData());

    const opinionGuardada = () => {

      setTimeout(() => {
        actions.refetchData();
      }, 500);

    }

    return {

      actions,
      avatarText,
      venta_id,
      opinionGuardada
    }
  }
}
</script>