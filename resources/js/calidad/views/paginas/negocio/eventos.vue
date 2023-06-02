<template>
    <section class="mt-2">
        <h4 class="display-4">Event<strong class="text-warning">os</strong> </h4>
        <listado :actions="actions" class="mt-1">
            <template #contenido="{ items }">
                <b-container fluid>
                    <b-row>
                       <b-col cols="12" md="3" v-for="(item, i) in items" :key="i">
                    <div class="card-simple" :style="`background-image:url(${portada(item.imagenes)})`">
                      <div class="card-simple-background">
                        <div class="card-simple-content">
                          <h2>
                            <b-link :to="{ name: 'evento.show', params: { event: item.url } }">
                              {{ item.titulo }}
                            </b-link>
                          </h2>
                          <!-- <div class="card-simple-rating">
                        <el-rate :value="promedioCalificacion(item)" disabled disabled-void-color="#4f4f4f"
                          void-color="#000000" class="d-flex flex-nowrap" />
                      </div> -->

                          <div class="card-simple-actions">
                            <b-button-group >
                              <b-button :to="{ name: 'evento.show', params: { event: item.url } }" variant="outline-primary">
                                <font-awesome-icon icon="fas fa-eye"/>
                              </b-button>
                            </b-button-group>

                          </div><!-- /.card-simple-actions -->
                        </div><!-- /.card-simple-content -->

                        <div class="card-simple-label">
                          {{ getModel(item.model_type) }}
                        </div>


                        <b-badge class="card-simple-price" :variant="getStatus(item.status).variant">
                          {{ getStatus(item.status).status }}
                        </b-badge>

                

                      </div><!-- /.card-simple-background -->
                    </div><!-- /.card-simple -->
                  </b-col>

                    </b-row>
                </b-container>
            </template>
        </listado>
    </section>

</template>

<script>

import useEventosList from 'views/panels/negocio/eventos/useEventosList.js'

import store from '@/store'

import { toRefs, ref, computed, onMounted, watch } from 'vue';

import {
    BCard,
    BContainer,
    BRow,
    BCol,
    BButtonGroup,
    BButton,
    VBPopover,
    BCarousel,
    BCarouselSlide,
    BMedia,
    BBadge,
    BLink

} from 'bootstrap-vue'


export default {

    components: {
        Listado: () => import('components/Listado.vue'),

        BCard,
        BContainer,
        BRow,
        BCol,
        BButtonGroup,
        BButton,
        BCarousel,
        BCarouselSlide,
        BMedia,
        BBadge,
        BLink

    },

    directives: {
        'b-popover': VBPopover
    },

    setup() {
        const { negocio } = toRefs(store.state.negocio)


        const actions = useEventosList(negocio,true);

        watch(negocio, () => actions.refetchData())
        
        const portada = (imagenes) => {
            const portada = imagenes.find(val => val.portada)

            if (portada) {
                return `/storage/eventos/imagenes/${portada.imagen}`
            }

            return imagenes.length ? `/storage/eventos/imagenes/${imagenes[0].imagen}` : ''
        
        }

        return {
            loading: computed(() => store.state.loading),
            negocio,
            actions,
            portada,
            getModel: (model_type) => {

                switch (model_type) {
                    case "App\\\Models\\\Destino":
                        return 'Destino'
                        break;

                    case "App\\Models\\Atraccion":
                        return 'Atraccion'
                        break;

                    default:
                        return 'Negocio'
                        break;
                }


            },
             
            getStatus: (estado) => {
                let status = {
                    variant: 'info',
                    status: 'Sin definir'
                };
                switch (estado) {
                    case 1:
                        status = {
                            variant: 'success',
                            status: 'Activo'
                        };
                        break;

                    case 2:
                        status = {
                            variant: 'danger',
                            status: 'Vencido'
                        };
                        break;

                    case 3:
                        status = {
                            variant: 'warning',
                            status: 'A Destiempo'
                        };
                        break;

                }

                return status;
            }
        }
    }


}

</script>

<style lang="scss">
.cards-simple-wrapper {
    margin-bottom: -30px;
}

.card-simple {
    background-size: cover;
    background-position: center center;
    background-repeat: no-repeat;
    -webkit-backface-visiblity: hidden;
    margin-bottom: 30px;
    overflow: hidden;
    transform: translateZ(0px);
}

.card-simple:hover .card-simple-background:before {
    opacity: 1;
    -webkit-transform: translateY(0%);
    -ms-transform: translateY(0%);
    transform: translateY(0%);
    -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-label {
    margin-top: -25px;
}

.card-simple:hover .card-simple-content,
.card-simple:active .card-simple-content {
    padding-top: 0px;
    transform: translateX(-50%) translateY(-50%);
    -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-rating {
    opacity: 1;
    transition-delay: .05s;
    -webkit-backface-visiblity: hidden;
}

.card-simple:hover .card-simple-actions {
    opacity: 1;
    transition-delay: .1s;
    -webkit-backface-visiblity: hidden;
}

.card-simple-background {
    height: 200px;
    position: relative;
}

.card-simple-background img {
    width: 100%;
}

.card-simple-background:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: -webkit-linear-gradient(top, rgba(54, 54, 54, 0) 0%, rgba(54, 54, 54, 0.7) 75%);
    background: linear-gradient(to bottom, rgba(54, 54, 54, 0) 0%, rgba(54, 54, 54, 0.7) 75%);
    content: '';
    opacity: 1;
    -webkit-transform: translateY(50%);
    -ms-transform: translateY(50%);
    transform: translateY(50%);
    transition: all ease .35s;
}

.card-simple-background:after {
    background-color: rgba(0, 0, 0, 0.3);
    bottom: 0px;
    content: '';
    display: block;
    left: 0px;
    position: absolute;
    right: 0px;
    top: 0px;
    z-index: 1;
}

.card-simple-label {
    background-color: #e6b42e;
    color: #fff;
    left: 50%;
    font-size: 13px;
    padding: 3px 15px;
    position: absolute;
    top: 0px;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    transition: all ease .35s;
    z-index: 2;
}

.card-simple-label a {
    color: #fff;
}

.card-simple-label a:hover {
    color: #fff;
    text-decoration: none;
}

.card-simple-content {
    left: 50%;
    padding-top: 85px;
    position: absolute;
    top: 50%;
    -ms-transform: translateX(-50%) translateY(-50%);
    transform: translateX(-50%) translateY(-50%);
    -webkit-transform: translateX(-50%) translateY(-50%);
    transition: all ease .35s;
    width: 100%;
    z-index: 2;
}

.card-simple-content h2 {
    color: #fff;
    display: block;
    font-size: 20px;
    margin: 0px;
    overflow: hidden;
    padding: 0px 20px;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.card-simple-content h2 a {
    color: #fff;
    text-shadow: 0px 1px 2px rgba(0, 0, 0, 0.1);
}

.card-simple-content h2 a:hover {
    text-decoration: none;
}

.card-simple-rating {
    color: #ffd925;
    margin-top: 10px;
    opacity: 0;
    font-size: 15px;
    text-align: center;
    transition: all ease .35s;
    display: flex;
    justify-content: center;

}

.card-simple-rating i {
    margin-right: 2px;
}

.card-simple-actions {
    color: #fff;
    margin-top: 20px;
    opacity: 0;
    text-align: center;
    transition: all ease .35s;
}

.card-simple-actions .fa,
.card-simple-actions .far,
.card-simple-actions .fas {
    border: 1px solid #fff;
    border-radius: 50%;
    color: #fff;
    height: 32px;
    margin: 0px 6px;
    padding-top: 8px;
    transition: all ease .2s;
    width: 32px;
}

.card-simple-actions .fa:hover {
    background-color: #fff;
    color: #363636;
}

.card-simple-actions .fa-search {
    font-size: 18px;
    height: 40px;
    padding-top: 9px;
    width: 40px;
}

.card-simple-price {
    background-color: #0082b7;
    bottom: 0px;
    color: #fff;
    font-size: 13px;
    left: 50%;
    padding: 3px 15px;
    position: absolute;
    -ms-transform: translateX(-50%);
    transform: translateX(-50%);
    -webkit-transform: translateX(-50%);
    white-space: nowrap;
    z-index: 2;
}
</style>