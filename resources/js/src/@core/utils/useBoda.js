
import { ref, watch, computed } from '@vue/composition-api'

import router from '@/router'

import { Notification } from 'element-ui'
export default function useBoda(boda){



      const verificarFecha = () => {

         if (Date.now() > new Date(boda.value.check_in).getTime()) {

            setTimeout(() => {
               
               Notification.info({
                  message: `Ya esta Boda no admite Reservacion`,
                  position:'bottom-right'
               })
            }, 300);

            setTimeout(() => {
               router.push({ name: 'login' });
            }, 5500);

         }

      }

      const irUrl = (red) => {

         switch (red) {
            case 'twitter':
              window.location.href = boda.value.hotel.redes.twitter
               break;

            case 'facebook':
               window.location.href = boda.value.hotel.redes.facebook
               break;

             case 'instagram':
               window.location.href =  boda.value.hotel.redes.instagram
               break;

         }
         
      }

      const imagenes = () => {
         let imagenes = (boda.value.hotel.imagenes) ? boda.value.hotel.imagenes : [];

         return imagenes.map(val => {
            return { url: `/storage/hotel/imagenes/${val.imagen}` }
         });

      }

      const getTipoHabitacion = (val) => {
         return boda.value.habitaciones.find(value => value.id == val);
      }

      const getDiasRestante = () => {
         return moment(boda.value.fecha).diff(moment(),'days');
      }




      return {
         verificarFecha,
         irUrl,
         imagenes,
         getTipoHabitacion,
         getDiasRestante
      }

}

