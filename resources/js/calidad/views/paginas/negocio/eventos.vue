<template>
    <section class="mt-2">
        <h4 class="display-4">Event<strong class="text-warning">os</strong> </h4>
        <listado :actions="actions" class="mt-1">
            <template #contenido="{ items }">
                <b-container fluid>
                    <b-row>
                        <b-col cols="12" class="px-0 mx-0">

                            <b-card class="my-2" header-class="py-0 px-1" v-for="(evento, i) in items" :key="i">
                                <section class="d-flex w-100">
                                    <article class="flex-shrink-1 flex-grow-0 d-flex flex-column justify-content-center"
                                        v-if="evento.imagenes.length">
                                        <b-carousel id="carousel-fade"
                                            style="text-shadow: 0px 0px 2px #000;min-width:314px;max-width:314px" fade
                                            controls indicators img width="314" img-height="220px">
                                            <b-carousel-slide v-for="({ imagen }, i) in evento.imagenes" :key="i"
                                                :img-src="`/storage/eventos/imagenes/${imagen}`" img-height="200px"
                                                style="max-height:200px;height:200px; object-fit: containt;">
                                            </b-carousel-slide>

                                        </b-carousel>
                                    </article>

                                    <main class="flex-grow-1 d-flex flex-column align-items-start ml-1">
                                        <h4 :title="evento.titulo" class="mt-1">
                                            {{ evento.titulo }}
                                        </h4>

                                        <b-badge :variant="getStatus(evento.status).variant">
                                            {{ getStatus(evento.status).status }}
                                        </b-badge>
                                        
                                        <br>
                                        
                                        <small>
                                            Del {{ evento.fecha_inicio | fecha('LL') }} al {{ evento.fecha_fin | fecha('LL') }}
                                        </small>


                                        <p class="text-justify" style="max-height:150px; overflow-y:scroll" >
                                            <span v-html="evento.contenido"></span>
                                        </p>
                                    </main>
                                </section>



                            </b-card>
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
    BBadge

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
        BBadge
    },

    directives: {
        'b-popover': VBPopover
    },

    setup() {
        const { negocio } = toRefs(store.state.negocio)


        const actions = useEventosList(negocio,true);

        watch(negocio, () => actions.refetchData())


        return {
            loading: computed(() => store.state.loading),
            negocio,
            actions,
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