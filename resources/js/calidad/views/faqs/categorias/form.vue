<template>
   <b-card>
      <validation-observer ref="formValidate" #default="{handleSubmit}">
         <b-form @submit.prevent="handleSubmit(guardar)">
            <b-container fluid>
               <b-row>
                  <b-col cols="12" md="8">
                     <b-form-group>

                        <template #label>
                           Categoría: <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="nombre" rules="required" #default="{errors}">
                           <b-form-input v-model="formulario.nombre" :state="errors.length ? false : null" />

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>


                     </b-form-group>
                  </b-col>

                  <b-col cols="12" md="4">
                     <b-form-group>

                        <template #label>
                           Icono:
                           <feather-icon :icon="formulario.icono" /> <span class="text-danger">*</span>
                        </template>

                        <validation-provider name="icono" rules="required" #default="{errors}">
                           <el-select v-model="formulario.icono" clearable filterable placeholder="Seleccione"
                              class="w-100">
                              <el-option v-for="(icono,i) in iconos" :key="i" :value="icono">
                                 <feather-icon :icon="icono" />
                                 {{ icono }}
                              </el-option>
                           </el-select>

                           <b-form-invalid-feedback>
                              {{ errors[0] }}
                           </b-form-invalid-feedback>
                        </validation-provider>


                     </b-form-group>
                  </b-col>

               </b-row>

               <b-row>
                  <b-col cols="12">
                     <b-button-group size="sm">
                        <b-button type="submit" variant="primary" v-loading="loading">
                           <feather-icon icon="SaveIcon" />
                           Guardar
                        </b-button>

                        <b-button @click="regresar" variant="danger" v-loading="loading">
                           <feather-icon icon="ArrowLeftIcon" />
                           Regresar
                        </b-button>

                     </b-button-group>
                  </b-col>
               </b-row>

            </b-container>
         </b-form>
      </validation-observer>
   </b-card>
</template>

<script>

import {
   BCard,
   BFormGroup,
   BFormInput,
   BContainer,
   BRow,
   BCol,
   BFormInvalidFeedback,
   BButtonGroup,
   BButton,
   BForm
} from 'bootstrap-vue'

import { ValidationObserver,ValidationProvider } from 'vee-validate'

import {required} from '@validations'

import {ref,toRefs,computed} from '@vue/composition-api'
import store from '@/store'

import { regresar } from '@core/utils/utils'

export default {

   components:{
      BCard,
      BFormGroup,
      BFormInput,
      BContainer,
      BRow,
      BCol,
      BFormInvalidFeedback,
      BButtonGroup,
      BButton,
      ValidationObserver,
      ValidationProvider,
      BForm

   },

   setup(_,{emit}) {

      const iconos = ref([
         'ActivityIcon',
         'AirplayIcon',
         'AlertCircleIcon',
         'AlertOctagonIcon',
         'AlertTriangleIcon',
         'AlignCenterIcon',
         'AlignJustifyIcon',
         'AlignLeftIcon',
         'AlignRightIcon',
         'AnchorIcon',
         'ApertureIcon',
         'ArchiveIcon',
         'ArrowDownCircleIcon',
         'ArrowDownLeftIcon',
         'ArrowDownRightIcon',
         'ArrowDownIcon',
         'ArrowLeftCircleIcon',
         'ArrowLeftIcon',
         'ArrowRightCircleIcon',
         'ArrowRightIcon',
         'ArrowUpCircleIcon',
         'ArrowUpLeftIcon',
         'ArrowUpRightIcon',
         'ArrowUpIcon',
         'AtSignIcon',
         'AwardIcon',
         'BarChart2Icon',
         'BarChartIcon',
         'BatteryChargingIcon',
         'BatteryIcon',
         'BellOffIcon',
         'BellIcon',
         'BluetoothIcon',
         'BoldIcon',
         'BookOpenIcon',
         'BookIcon',
         'BookmarkIcon',
         'BoxIcon',
         'BriefcaseIcon',
         'CalendarIcon',
         'CameraOffIcon',
         'CameraIcon',
         'CastIcon',
         'CheckCircleIcon',
         'CheckSquareIcon',
         'CheckIcon',
         'ChevronDownIcon',
         'ChevronLeftIcon',
         'ChevronRightIcon',
         'ChevronUpIcon',
         'ChevronsDownIcon',
         'ChevronsLeftIcon',
         'ChevronsRightIcon',
         'ChevronsUpIcon',
         'ChromeIcon',
         'CircleIcon',
         'ClipboardIcon',
         'ClockIcon',
         'CloudDrizzleIcon',
         'CloudLightningIcon',
         'CloudOffIcon',
         'CloudRainIcon',
         'CloudSnowIcon',
         'CloudIcon',
         'CodeIcon',
         'CodepenIcon',
         'CodesandboxIcon',
         'CoffeeIcon',
         'ColumnsIcon',
         'CommandIcon',
         'CompassIcon',
         'CopyIcon',
         'CornerDownLeftIcon',
         'CornerDownRightIcon',
         'CornerLeftDownIcon',
         'CornerLeftUpIcon',
         'CornerRightDownIcon',
         'CornerRightUpIcon',
         'CornerUpLeftIcon',
         'CornerUpRightIcon',
         'CpuIcon',
         'CreditCardIcon',
         'CropIcon',
         'CrosshairIcon',
         'DatabaseIcon',
         'DeleteIcon',
         'DiscIcon',
         'DivideCircleIcon',
         'DivideSquareIcon',
         'DivideIcon',
         'DollarSignIcon',
         'DownloadCloudIcon',
         'DownloadIcon',
         'DribbbleIcon',
         'DropletIcon',
         'Edit2Icon',
         'Edit3Icon',
         'EditIcon',
         'ExternalLinkIcon',
         'EyeOffIcon',
         'EyeIcon',
         'FacebookIcon',
         'FastForwardIcon',
         'FeatherIcon',
         'FigmaIcon',
         'FileMinusIcon',
         'FilePlusIcon',
         'FileTextIcon',
         'FileIcon',
         'FilmIcon',
         'FilterIcon',
         'FlagIcon',
         'FolderMinusIcon',
         'FolderPlusIcon',
         'FolderIcon',
         'FramerIcon',
         'FrownIcon',
         'GiftIcon',
         'GitBranchIcon',
         'GitCommitIcon',
         'GitMergeIcon',
         'GitPullRequestIcon',
         'GithubIcon',
         'GitlabIcon',
         'GlobeIcon',
         'GridIcon',
         'HardDriveIcon',
         'HashIcon',
         'HeadphonesIcon',
         'HeartIcon',
         'HelpCircleIcon',
         'HexagonIcon',
         'HomeIcon',
         'ImageIcon',
         'InboxIcon',
         'InfoIcon',
         'InstagramIcon',
         'ItalicIcon',
         'KeyIcon',
         'LayersIcon',
         'LayoutIcon',
         'LifeBuoyIcon',
         'Link2Icon',
         'LinkIcon',
         'LinkedinIcon',
         'ListIcon',
         'LoaderIcon',
         'LockIcon',
         'LogInIcon',
         'LogOutIcon',
         'MailIcon',
         'MapPinIcon',
         'MapIcon',
         'Maximize2Icon',
         'MaximizeIcon',
         'MehIcon',
         'MenuIcon',
         'MessageCircleIcon',
         'MessageSquareIcon',
         'MicOffIcon',
         'MicIcon',
         'Minimize2Icon',
         'MinimizeIcon',
         'MinusCircleIcon',
         'MinusSquareIcon',
         'MinusIcon',
         'MonitorIcon',
         'MoonIcon',
         'MoreHorizontalIcon',
         'MoreVerticalIcon',
         'MousePointerIcon',
         'MoveIcon',
         'MusicIcon',
         'Navigation2Icon',
         'NavigationIcon',
         'OctagonIcon',
         'PackageIcon',
         'PaperclipIcon',
         'PauseCircleIcon',
         'PauseIcon',
         'PenToolIcon',
         'PercentIcon',
         'PhoneCallIcon',
         'PhoneForwardedIcon',
         'PhoneIncomingIcon',
         'PhoneMissedIcon',
         'PhoneOffIcon',
         'PhoneOutgoingIcon',
         'PhoneIcon',
         'PieChartIcon',
         'PlayCircleIcon',
         'PlayIcon',
         'PlusCircleIcon',
         'PlusSquareIcon',
         'PlusIcon',
         'PocketIcon',
         'PowerIcon',
         'PrinterIcon',
         'RadioIcon',
         'RefreshCcwIcon',
         'RefreshCwIcon',
         'RepeatIcon',
         'RewindIcon',
         'RotateCcwIcon',
         'RotateCwIcon',
         'RssIcon',
         'SaveIcon',
         'ScissorsIcon',
         'SearchIcon',
         'SendIcon',
         'ServerIcon',
         'SettingsIcon',
         'Share2Icon',
         'ShareIcon',
         'ShieldOffIcon',
         'ShieldIcon',
         'ShoppingBagIcon',
         'ShoppingCartIcon',
         'ShuffleIcon',
         'SidebarIcon',
         'SkipBackIcon',
         'SkipForwardIcon',
         'SlackIcon',
         'SlashIcon',
         'SlidersIcon',
         'SmartphoneIcon',
         'SmileIcon',
         'SpeakerIcon',
         'SquareIcon',
         'StarIcon',
         'StopCircleIcon',
         'SunIcon',
         'SunriseIcon',
         'SunsetIcon',
         'TabletIcon',
         'TagIcon',
         'TargetIcon',
         'TerminalIcon',
         'ThermometerIcon',
         'ThumbsDownIcon',
         'ThumbsUpIcon',
         'ToggleLeftIcon',
         'ToggleRightIcon',
         'ToolIcon',
         'Trash2Icon',
         'TrashIcon',
         'TrelloIcon',
         'TrendingDownIcon',
         'TrendingUpIcon',
         'TriangleIcon',
         'TruckIcon',
         'TvIcon',
         'TwitchIcon',
         'TwitterIcon',
         'TypeIcon',
         'UmbrellaIcon',
         'UnderlineIcon',
         'UnlockIcon',
         'UploadCloudIcon',
         'UploadIcon',
         'UserCheckIcon',
         'UserMinusIcon',
         'UserPlusIcon',
         'UserXIcon',
         'UserIcon',
         'UsersIcon',
         'VideoOffIcon',
         'VideoIcon',
         'VoicemailIcon',
         'Volume1Icon',
         'Volume2Icon',
         'VolumeXIcon',
         'VolumeIcon',
         'WatchIcon',
         'WifiOffIcon',
         'WifiIcon',
         'WindIcon',
         'XCircleIcon',
         'XOctagonIcon',
         'XSquareIcon',
         'XIcon',
         'YoutubeIcon',
         'ZapOffIcon',
         'ZapIcon',
         'ZoomInIcon',
         'ZoomOutIcon',
      ])
      
      const {categoria:formulario} = toRefs(store.state.faq)
      const formValidate = ref(null)

     const guardar = () => {

         emit('save',formulario.value,formValidate.value)

     } 

      return {
         required,
         formulario,
         guardar,
         formValidate,
         loading:computed(() => store.state.loading),
         regresar,
         iconos
      }
   },
}
</script>