<template>
   <b-container fluid>
              <b-row>
                 <b-col cols="12" v-if="evento.imagenes.length">
                    <b-carousel  fade :id="`carousel-${evento.id}`" indicators controls background="#ababab" :intervals="3000">
                       <b-carousel-slide v-for="(imagen, e) in evento.imagenes" :key="e">
                          <template #img>
                            <b-img :src="`/storage/eventos/imagenes/${imagen.imagen}`" fluid-grow style=" max-height:450px; object-fit:contain; width:auto"></b-img>
                          </template>

                       </b-carousel-slide>

                    </b-carousel>
                 </b-col>
              </b-row>

              <b-row class="mt-3">

                 <b-col cols="12">
                    <strong>Evento de: {{ evento.model ? evento.model.nombre : 'Sin definir' }}</strong>
                 </b-col>

                 <b-col cols="12">
                    <small class="text-uppercase">
                       Inicia <br> {{ evento.fecha_inicio | fecha('ddd D [de] MMMM [del] YYYY [ a las ] h:mm A') }}
                       <br> <span v-if="evento.fecha_fin">Finaliza <br>
                          {{ evento.fecha_fin | fecha('ddd D [de] MMMM [del] YYYY [ a las ] h:mm A') }}
                       </span>
                    </small>

                 </b-col>

                 <b-col cols="12">

                    <b-badge variant="primary">
                       {{ $store.getters['evento/getStatus'](evento) }}
                    </b-badge>

                    <b-badge variant="info">
                       {{ evento.recurrente ? 'Evento Recurrente' : 'Evento no recurrente' }}
                    </b-badge>

                    <b-badge variant="warning" v-if="evento.recurrente" v-b-tooltip.hover="'Tipo de recurrencia'">
                       {{ $store.getters['evento/getRecurrencia'](evento) }}
                    </b-badge>

                 </b-col>

                 <b-col cols="12">
                    <el-divider content-position="left">Contenido</el-divider>
                    <div v-html="evento.contenido"></div>
                 </b-col>
              </b-row>
           </b-container>
</template>

<script>
import { computed, onMounted,toRefs,watch } from 'vue';
import { 
   BContainer,
  BCard,
  BRow,
  BCol,
  BButton,
  BButtonGroup,
  BTable,
  BFormInput,
  BInputGroup,
  BInputGroupAppend,
  BCarousel,
  BCarouselSlide,
  BImg,
  VBPopover,
  BBadge,
  BSidebar,
  VBTooltip,
  BLink
 } from 'bootstrap-vue';
import store from '@/store'

export default {
  components: {
     BContainer,
      BCard,
      BRow,
      BCol,
      BButton,
      BButtonGroup,
      BTable,
      BFormInput,
      BInputGroup,
      BInputGroupAppend,
      BCarousel,
      BCarouselSlide,
      BImg,
      VBPopover,
      BBadge,
      BSidebar,
      VBTooltip,
      BLink
  },
  props:{
    event:String
  },

  directives: {
      'b-popover': VBPopover,
      'b-tooltip': VBTooltip
   },

  setup(props) {
    const {evento} = toRefs(store.state.evento)
    const {event} = toRefs(props)

    watch(event,() => {
        store.dispatch('evento/fetchEventPublic',event.value)
    })

    return {
      evento,
    };
  },
};
</script>

<style lang="scss">

</style>
