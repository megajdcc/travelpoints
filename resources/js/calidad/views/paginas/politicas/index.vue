<template>
   <b-container fluid class="px-0">
      <b-row>
         <b-col cols="12">
            <b-card :class="{ 'w-75 mx-auto': windowWidth >= 762}">
               
               <b-embed type="iframe" :aspect="relation" src="https://www.youtube.com/embed/1MorMmT-hPs"
                  allowfullscreen>
               </b-embed>
               
            </b-card>
         </b-col>
      </b-row>
      <b-row>
         <b-col cols="12">
            <b-card>
               <p class="text-justify">La presente Política de Privacidad establece los términos en que Travel Points
                  usa y protege la
                  información que es proporcionada por los usuarios al momento de utilizar el sitio web
                  TravelPoints.com.mx. Travel Points está comprometido con la seguridad de los datos de sus usuarios.
                  Cuando solicitamos llenar los campos de información personal con la cual usted pueda ser identificado,
                  lo hacemos asegurando que sólo se empleará de acuerdo con los términos de este documento. Sin embargo
                  esta Política de Privacidad puede cambiar con el tiempo o ser actualizada por lo que le recomendamos y
                  enfatizamos revisar continuamente esta página para asegurarse que está de acuerdo con dichos cambios.
               </p>
            </b-card>
         </b-col>
         <b-col cols="12">
            <b-card>
               <ol>
                  <li>
                     <h4 class="text-warning font-weight-bolder">Información recolectada</h4>
                     <p class="text-justify">
                        Nuestro sitio web recoge datos opcionales de información personal por ejemplo: Nombre,
                        fotografía de perfil, información de contacto como su dirección de correo electrónica o número
                        telefónico celular, hotel en el que está hospedado, nacionalidad y tipo de plan en su hotel.
                     </p>
                  </li>
                  <li>
                     <h4 class="text-warning font-weight-bolder">Uso de la información recolectada</h4>
                     <p class="text-justify ">
                        Nuestro sitio web emplea la información con el fin de proporcionarle el mejor servicio posible,
                        particularmente para mantener un registro de usuarios, de reservas, pedidos, entrega de regalos
                        en caso que aplique, y mejorar nuestros productos y servicios. Cuando usted realice una
                        reservación, se le enviará una confirmación a través de un mensaje SMS –solo si usted ingresa su
                        número celular-. Si usted activa el botón de notificaciones, recibirá las notificaciones de los
                        negocios a los que usted siga en la aplicación con sus mensajes comerciales y ofertas
                        especiales, nuevos productos y otra información publicitaria que consideremos relevante para
                        usted o que pueda brindarle algún beneficio, estos correos electrónicos serán enviados a la
                        dirección que usted proporcione y podrán ser cancelados en cualquier momento.
                        <br>
                        Travel Points está altamente comprometido para cumplir con el compromiso de mantener su
                        información segura. Usamos los sistemas más avanzados y los actualizamos constantemente para
                        asegurarnos que no exista ningún acceso no autorizado.
                     </p>
                  </li>

                  <li>
                     <h4 class="text-warning font-weight-bolder">Cookies</h4>
                     <p class="text-justify">
                        Una cookie se refiere a un fichero que es enviado con la finalidad de solicitar permiso para
                        almacenarse en su ordenador, al aceptar dicho fichero se crea y la cookie sirve entonces para
                        tener información respecto al tráfico web, y también facilita las futuras visitas a una web
                        recurrente. Otra función que tienen las cookies es que con ellas las web pueden reconocerte
                        individualmente y por tanto brindarte el mejor servicio personalizado de su web.
                        <br>
                        Nuestro sitio web emplea las cookies para poder identificar las páginas que son visitadas y su
                        frecuencia. Esta información es empleada únicamente para análisis estadístico interno y después
                        la información se elimina de forma permanente. Usted puede eliminar las cookies en cualquier
                        momento desde su ordenador o dispositivo móvil. Sin embargo las cookies ayudan a proporcionar un
                        mejor servicio de los sitios web, estás no dan acceso a información de su ordenador ni de usted,
                        a menos de que usted así lo quiera y la proporcione directamente. Usted puede aceptar o negar el
                        uso de cookies, sin embargo la mayoría de navegadores aceptan cookies automáticamente pues sirve
                        para tener un mejor servicio web. También usted puede cambiar la configuración de su ordenador
                        para declinar las cookies. Si se declinan es posible que no pueda utilizar algunos de nuestros
                        servicios.
                     </p>
                  </li>

                  <li>
                     <h4 class="text-warning font-weight-bolder">Enlaces a Terceros</h4>
                     <p class="text-justify">
                        Este sitio web pudiera contener enlaces a otros sitios que pudieran ser de su interés. Una vez
                        que usted de clic en estos enlaces y abandone nuestra página, ya no tenemos control sobre al
                        sitio al que es redirigido y por lo tanto no somos responsables de los términos o privacidad ni
                        de la protección de sus datos en esos otros sitios terceros. Dichos sitios están sujetos a sus
                        propias políticas de privacidad por lo cual es recomendable que los consulte para confirmar que
                        usted está de acuerdo con estas.
                     </p>
                  </li>


                  <li>
                     <h4 class="text-warning font-weight-bolder">Control de su información personal</h4>
                     <p class="text-justify">
                        En cualquier momento usted puede restringir la recopilación o el uso de la información personal
                        que es proporcionada a nuestro sitio web. Cada vez que se le solicite rellenar un formulario,
                        como el de alta de usuario, puede marcar o desmarcar la opción de recibir información por correo
                        electrónico. En caso de que haya marcado la opción de recibir nuestro boletín o publicidad usted
                        puede cancelarla en cualquier momento.
                        <br>
                        Travel Points no venderá, cederá ni distribuirá la información personal que es recopilada sin su
                        consentimiento, salvo que sea requerido por un juez con una orden judicial.
                        <br>
                        Travel Points se reserva el derecho de cambiar los términos de la presente Política de
                        Privacidad en cualquier momento.


                     </p>
                  </li>
               </ol>

               <strong>Última revisión: 21 de Julio 2021</strong>
            </b-card>
         </b-col>
      </b-row>
   </b-container>
</template>

<script>
import {
   BContainer,
   BCard,
   BRow,
   BCol,
   BMedia,
   BEmbed
} from 'bootstrap-vue'
import useAuth from '@core/utils/useAuth';

import {toRefs,computed,onMounted} from '@vue/composition-api'
import store from '@/store'
export default {

   components:{
      BContainer,
      BCard,
      BRow,
      BCol,
      BMedia,
      BEmbed

   },

   setup() {
      const { windowWidth } = toRefs(store.state.app)
      const {authGoogle} = useAuth();

      onMounted(() => authGoogle())
      return {
         windowWidth,
         relation:computed(() => {
            return windowWidth.value < 762 ? '4by3' :  '21by9' 
         })
      }
   },
}
</script>