import router from '@/router'
// eslint-disable-next-line object-curly-newline
import { reactive, getCurrentInstance, watch, toRefs,ref } from '@vue/composition-api'
import Swal from 'sweetalert2'
export const isObject = obj => typeof obj === 'object' && obj !== null
import 'animate.css';
import store from '@/store'
import axios from 'axios'
import moment from 'moment';


export const isToday = date => {
  const today = new Date()
  return (
    /* eslint-disable operator-linebreak */
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
    /* eslint-enable */
  )
}

const getRandomFromArray = array => array[Math.floor(Math.random() * array.length)]

// ? Light and Dark variant is not included
// prettier-ignore
export const getRandomBsVariant = () => getRandomFromArray(['primary', 'secondary', 'success', 'warning', 'danger', 'info'])

export const isDynamicRouteActive = route => {
  const { route: resolvedRoute } = router.resolve(route)
  return resolvedRoute.path === router.currentRoute.path
}

// Thanks: https://medium.com/better-programming/reactive-vue-routes-with-the-composition-api-18c1abd878d1
export const useRouter = () => {
  const vm = getCurrentInstance().proxy
  const state = reactive({
    route: vm.$route,
  })

  watch(
    () => vm.$route,
    r => {
      state.route = r
    },
  )

  return { ...toRefs(state), router: vm.$router }
}

export const  chartColors = {
  primaryColorShade: '#836AF9',
  yellowColor: '#ffe800',
  successColorShade: '#28dac6',
  warningColorShade: '#ffe802',
  warningLightColor: '#FDAC34',
  infoColorShade: '#299AFF',
  greyColor: '#4F5D70',
  blueColor: '#2c9aff',
  blueLightColor: '#84D0FF',
  greyLightColor: '#EDF1F4',
  tooltipShadow: 'rgba(0, 0, 0, 0.25)',
  lineChartPrimary: '#666ee8',
  lineChartDanger: '#ff4961',
  labelColor: '#6e6b7b',
  grid_line_color: 'rgba(200, 200, 200, 0.2)',
}

export const cantidadNoches = (fecha_inicial, fecha_final) => {
  let noches = moment(new Date(fecha_final)).diff(fecha_inicial, 'days');

  return noches;
} 


export const optionsCurrency = ref({
            currency:'MXN',
            locale:'es-ES',
            autoDecimalDigits:true,
         })




export const dateOption = { dateFormat: 'Y-m-d H:i', enableTime: true }
export const optionsEditor = {
    selector: 'textarea#premiumskinsandicons-snow',
    skin: 'snow',
    icons: 'thin',

    plugins: 'quickbars image lists code table codesample advlist autolink lists link image charmap print preview anchor searchreplace visualblocks code fullscreen insertdatetime media table paste code wordcount ',

    toolbar: 'formatselect | forecolor backcolor | bold italic underline strikethrough | link image blockquote codesample | align bullist numlist | code | table',
    height: 400,
    content_style: 'body { margin: 2rem 10%; }',
    branding: false,
    language: 'es'
  } 
  
export const getSituacionSolicitud = (situacion) => {

  const situaciones = [{
    id:1,
    text:'Solicitud enviada (Sin respuesta)',
    variant:'primary'
  },{
    id:2,
    text:'Solicitud de cambio',
    variant:'warning',
  },{
    id:3,
    text:'Aceptada',
    variant:'success'
  },{
    id:4,
    text:'Rechazada',
    variant:'danger'
  }]

  return situaciones.find(val =>val.id === situacion)

}



export const verificarActualizacion = () => {
  let miversion = store.state.app.version;

  axios.get('/api/get/version').then(({data}) => {

    if (data.version != localStorage.getItem('version-app')){
      Swal.fire({
        position: 'top-end',
        icon: 'info',
        title: `Nueva versión del sistema`,
        text: `Nota de la versión: ${data.nota}`,
        confirmButtonText: 'Actualizar',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }

      }).then((result) => {
        
        if(result.isConfirmed){
          store.commit('app/setVersion',data.version)
          setTimeout(() => {
            location.reload(true)
          }, 500);
        }

      })

    }


  })



} 


export const regresar = () => {

  window.history.length ? router.go(-1) : router.push('home');

}

export const getFecha = (fecha) => {
  return moment(fecha).format('LLL');
} 

export const getDay = (dia) => {

  const dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo'];


  return dias[dia -1];

} 

export const getHora = (hora) => {
  return moment(moment().format(`Y-M-D ${hora}`)).format('h:mm A');
}


export const getImage = (archivo) => {

  switch (archivo.tipo) {
    case 'jpg':
      return archivo.uri;
    break;

    case 'png':
      return archivo.uri;
      break;

    case 'jpeg':
      return archivo.uri;
      break;

    case 'svg':
      return archivo.uri;
      break;

    case 'xls':
      return require('@/assets/images/icons/xls.png')
    break;

    case 'xlsx':
      return require('@/assets/images/icons/xls.png')
    break;

    case 'pdf':
      return require('@/assets/images/icons/pdf.png')
    break;

    case 'doc':
      return require('@/assets/images/icons/doc.png')
    break;
  
    default:
      return require('@/assets/images/icons/unknown.png')
    break;
  }

}

export const getExt = (archivo,separator = '.') => {
  
  let archive =  archivo.split(separator)
  let ext =  (archive.length > 1) ? archive[archive.length - 1] : null;
  return ext;
} 
/**
 * This is just enhancement over Object.extend [Gives deep extend]
 * @param {target} a Object which contains values to be overridden
 * @param {source} b Object which contains values to override
 */
// export const objectExtend = (a, b) => {
//   // Don't touch 'null' or 'undefined' objects.
//   if (a == null || b == null) {
//     return a
//   }

//   Object.keys(b).forEach(key => {
//     if (Object.prototype.toString.call(b[key]) === '[object Object]') {
//       if (Object.prototype.toString.call(a[key]) !== '[object Object]') {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = b[key]
//       } else {
//         // eslint-disable-next-line no-param-reassign
//         a[key] = objectExtend(a[key], b[key])
//       }
//     } else {
//       // eslint-disable-next-line no-param-reassign
//       a[key] = b[key]
//     }
//   })

//   return a
// }
