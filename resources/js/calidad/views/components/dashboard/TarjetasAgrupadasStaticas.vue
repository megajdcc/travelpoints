<template>
  <b-card
    no-body
    class="card-statistics"
  >
    <b-card-header>
      <b-card-title>Resultado de Bodas Activas</b-card-title>
      
      <b-card-text class="mr-25 mb-0">
        Actualizado {{ getFecha(tarjetasAgrupadas.ultimaActualizacion) }}
      </b-card-text>
    
    </b-card-header>
    <b-card-body class="statistics-body">
      <b-row>
        <b-col
          v-for="item in tarjetasAgrupadas.statisticsItems"
          :key="item.id"
          md="3"
          sm="6"
          class="mb-2 mb-md-0"
          :class="item.customClass"
        >
          <b-media no-body>
            <b-media-aside

              class="mr-1"
            >
              <b-avatar
                size="48"
                :variant="item.color"
              >
                <feather-icon
                  size="24"
                  :icon="item.icon"
                />
              </b-avatar>
            </b-media-aside>
            <b-media-body class="my-auto">
              <h5 class="font-weight-bolder mb-0">
                {{ item.title }}
              </h5>
              <b-card-text class="font-small-3 mb-0">
                {{ item.subtitle }}
              </b-card-text>
            </b-media-body>
          </b-media>
        </b-col>
      </b-row>
    </b-card-body>
  </b-card>
</template>

<script>
import {
  BCard, BCardHeader, BCardTitle, BCardText, BCardBody, BRow, BCol, BMedia, BMediaAside, BAvatar, BMediaBody,
} from 'bootstrap-vue'

import {mapState } from 'vuex';


export default {
  components: {
    BRow,
    BCol,
    BCard,
    BCardHeader,
    BCardTitle,
    BCardText,
    BCardBody,
    BMedia,
    BAvatar,
    BMediaAside,
    BMediaBody,
  },
  data() {
    return {
      statisticsItems: [
        {
          icon: 'TrendingUpIcon',
          color: 'light-primary',
          title: '230k',
          subtitle: 'Sales',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'UserIcon',
          color: 'light-info',
          title: '8.549k',
          subtitle: 'Customers',
          customClass: 'mb-2 mb-xl-0',
        },
        {
          icon: 'BoxIcon',
          color: 'light-danger',
          title: '1.423k',
          subtitle: 'Products',
          customClass: 'mb-2 mb-sm-0',
        },
        {
          icon: 'DollarSignIcon',
          color: 'light-success',
          title: '$9745',
          subtitle: 'Revenue',
          customClass: '',
        },
      ],
    }
  },

  computed:{
     ...mapState('dashboard',['tarjetasAgrupadas'])
  },


  methods:{
     getFecha(fecha){
        return moment(fecha).format('LLL');
     }
  }
}
</script>
