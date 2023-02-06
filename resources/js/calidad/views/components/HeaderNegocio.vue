<template>
      <b-card body-class="py-1">
        <b-container fluid class="px-0 mx-0">
          <b-row>
            <b-col cols="12" md="2" class="p-0">
              <b-badge variant="success">{{ getStatusNegocio }}</b-badge>
            </b-col>
      
            <b-col cols="12" md="10" class="p-0">
      
              <section class="d-flex justify-content-between">
                <b-link :to="{name:'perfil.negocio',params:{url:negocio.url}}">
                  Ver perfil de negocio
                </b-link>
      
                <strong>
                  Afiliado desde: {{ negocio.created_at | fecha("MM-DD-YYYY") }}
                </strong>
              </section>
      
            </b-col>
          </b-row>
        </b-container>
      </b-card>
</template>

<script>

import {
  BCard,
  BContainer,
  BRow,
  BCol,
  BBadge,
  BLink,
} from 'bootstrap-vue'

import {toRefs,computed} from '@vue/composition-api'


export default {

  components:{
    BCard,
    BContainer,
    BRow,
    BCol,
    BBadge,
    BLink,
  },

  props:{
    negocio:Object
  },


  setup(props) {

    const {negocio} = toRefs(props)

    return {
      getStatusNegocio: computed(() => {
        // 1 => activo , 2 => vacaciones, 3 => fuera de servicio
        const statuses = ['Activo', 'Vacaciones', 'Fuera de Servicio'];

        return statuses[negocio.value.status - 1]
      })
    }
  }
  

}
</script>