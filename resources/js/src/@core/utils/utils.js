import router from '@/router'
// eslint-disable-next-line object-curly-newline
import { reactive, getCurrentInstance, watch, toRefs,ref,computed } from 'vue'
import Swal from 'sweetalert2'
export const isObject = obj => typeof obj === 'object' && obj !== null
import 'animate.css';
import store from '@/store'
import axios from 'axios'
import moment from 'moment';

import { fab } from '@fortawesome/free-brands-svg-icons'
import { fas } from '@fortawesome/free-solid-svg-icons';

import { Pagination, Navigation } from "swiper";

const modules = [Pagination,Navigation] ;


import xlsImg from '@/assets/images/icons/xls.png';
import pdfImg from '@/assets/images/icons/pdf.png'
import docImg from '@/assets/images/icons/doc.png'
import unknownImg from '@/assets/images/icons/unknown.png'
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

export const eliminarDuplicados = (array) => {
   const uniqueArray = [];
  const seenValues = new Set();

  for (let obj of array) {
    const { label, value } = obj;
    const key = label + "_" + value;

    if (!seenValues.has(key)) {
      seenValues.add(key);
      uniqueArray.push(obj);
    }
  }

  return uniqueArray;
}

export const marcasFontAwesome = ref([...new Set(Object.keys(fab).map(val => fab[val].iconName))]);
export const iconosFontAwesome = ref(eliminarDuplicados([...new Set(Object.keys(fas).map(val => ({label:fas[val].iconName,value:fas[val].iconName})))]));


export const ultimosTresAnos = computed(() => {
  let anos = [];
  let anohoy = new Date().getFullYear();

  for (let index = 0; anos.length < 3; index++) {
      anos.push(anohoy - index);
  }

  return anos;
})
 

export const siguienteNivel = (nivelActual = null, activaciones = 0 ) => {
  
  const niveles = [
    { nombre: 'Visitante', activacionesRequeridas: 1 },
    { nombre: 'Recomendador', activacionesRequeridas: 100 },
    { nombre: 'Promotor', activacionesRequeridas: 500 },
    { nombre: 'Consul', activacionesRequeridas: 1000 },
    { nombre: 'Embajador', activacionesRequeridas: 3000 },
  ];

  if(nivelActual === null){
    return { nivel: niveles[0].nombre, teFaltan: 1,porcentaje:0 }
  } 

  if (nivelActual < 0 || nivelActual >= niveles.length) {
    // Si el nivel actual no corresponde a ningún índice válido, devuelve null
    return null;
  }

  const nivelActualObj = niveles[nivelActual];

  // Obtener el siguiente nivel
  const siguienteNivelIndex = nivelActual + 1;
  const siguienteNivel = niveles[siguienteNivelIndex];

  if (!siguienteNivel) {
    // Si no hay siguiente nivel, significa que ya está en el nivel máximo
    return { nivel: 'Embajador', teFaltan: 0,porcentaje:100 };
  }

  // Calcular cuántas activaciones faltan para el siguiente nivel
  const activacionesRequeridas = siguienteNivel.activacionesRequeridas;
  const activacionesFaltantes = activacionesRequeridas - activaciones;
  const porcentaje = activaciones * 100 / siguienteNivel.activacionesRequeridas
  return { nivel: siguienteNivel.nombre, teFaltan: activacionesFaltantes,porcentaje:porcentaje };
  
}

export const optionsSwiper = ref({
         slidesPerView: 1,
         'centered-slides': false,
         'space-between': 10,
         pagination: {
            type: 'fraction'
         },
         navigation: true,
         modules,
         loop: true,
         speed: 500,
         autoplay:{
          delay:5000
         },
         'css-mode': true,
         breakpoints: {
            1024: {
               slidesPerView: 4,
               spaceBetween: 40,
            },
            768: {
               slidesPerView: 3,
               spaceBetween: 30,
            },
            640: {
               slidesPerView: 2,
               spaceBetween: 20,
            },
            320: {
               slidesPerView: 1,
               spaceBetween: 10,
            },
         }

      })

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

export const getFecha = (val = Date(), format = 'LLL',time= false) => {
  if(val && !time) {
    return moment(new Date(val)).format(format);
  }else if(val && time){
    return moment(`2020-01-01 ${val}`).format(format);
  }
  return 'error en la fecha';

} 

export const getDay = (dia) => {

  const dias = ['Lunes','Martes','Miércoles','Jueves','Viernes','Sabado','Domingo'];


  return dias[dia -1];

} 


export const diasSemana = [
  {text:'Lunes',value:1},
  {text:'Martes',value:2},
  {text:'Miercoles',value:3},
  {text:'Jueves',value:4},
  {text:'Viernes',value:5},
  {text:'Sabado',value:6},
  {text:'Domingo',value:0},
]

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
      return xlsImg
    break;

    case 'xlsx':
      return xlsImg
    break;

    case 'pdf':
      return pdfImg
    break;

    case 'doc':
      return docImg
    break;
  
    default:
      return unknownImg
    break;
  }

}

// *===============================================---*
   // *--------- UI ---------------------------------------*
   // *===============================================---*

  export  const resolveUserRoleVariant = role => {
      if (role === 'Administrador') return 'primary'
      if (role === 'Super administrador') return 'warning'
      if (role === 'Desarrollador') return 'warning'
      if (role === 'Invitado') return 'success'
      if (role === 'Coordinador') return 'danger'
      if (role === 'Lider') return 'primary'
      if (role === 'Promotor') return 'warning'
      return 'primary'
   }

  export const resolveUserRoleIcon = role => {
      if(['Administrador','Super administrador','Desarrollador'].includes(role)) return 'ServerIcon'
      if(['Lider','Coordinador','Promotor','Invitado'].includes(role)) return 'Usericon'

      return 'UserIcon'
   }
   
export const getStatusLegendPromotor = (status ) => {

  const legend = [
    
    'Activo',
    'En peligro',
    'Inactivo'
  ];

  return legend[status - 1];
  
}

export const getStatusLegendLider = getStatusLegendPromotor
export const getStatusLegendCoordinador = getStatusLegendLider

export const getExt = (archivo,separator = '.') => {
  
  let archive =  archivo.split(separator)
  let ext =  (archive.length > 1) ? archive[archive.length - 1] : null;
  return ext;
} 

export const convertirKebabCase = (cadena) => {
  // Reemplazar guiones medios con espacios
  var resultado = cadena.replace(/-/g, ' ');
  return resultado;
}

export const capitalize = (cadena)  => {
  // Dividir la cadena en palabras separadas por espacios
  var palabras = cadena.split(' ');

  // Recorrer cada palabra y convertir la primera letra a mayúscula
  for (var i = 0; i < palabras.length; i++) {
    palabras[i] = palabras[i].charAt(0).toUpperCase() + palabras[i].slice(1);
  }

  // Unir las palabras nuevamente en una sola cadena
  var resultado = palabras.join(' ');
  return resultado;
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
