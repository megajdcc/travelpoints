<template>
	<b-card>

		<validation-observer ref="formValidate" #default="{handleSubmit}">
			<b-form @submit.prevent="handleSubmit(guardar)">
				<b-container fluid>
					<b-row>
						<b-col cols="12" md="6">
							<b-form-group>
								<template #label>
									Nombre del permiso | <span class="text-danger">*</span>
								</template>

								<validation-provider name="nombre" rules="required" #default="{errors}">
									<b-form-input v-model="formulario.nombre" :state="errors.length ? false : null" />
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

								<b-button variant="primary" type="submit" v-loading="loading">
									<feather-icon icon="SaveIcon" />
									guardar
								</b-button>

								<b-button @click="regresar" variant="secondary">
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
  BButton,
  BMedia,
  BAvatar,
  BRow,
  BCol,
  BFormGroup,
  BFormInput,
  BForm,
  BTable,
  BCard,
  BCardHeader,
  BCardTitle,
  BFormCheckbox,
  BButtonGroup,
  BFormInvalidFeedback,
  BContainer,
} from 'bootstrap-vue'
	import { ValidationObserver,ValidationProvider } from 'vee-validate';
	import {required } from '@validations'
	import { regresar } from '@core/utils/utils';

	import { ref,computed,toRefs} from '@vue/composition-api'
	import store from '@/store'

	export default{  

		components: {
			BButton,
			BMedia,
			BAvatar,
			BRow,
			BCol,
			BFormGroup,
			BFormInput,
			BForm,
			BTable,
			BCard,
			BCardHeader,
			BCardTitle,
			BFormCheckbox,
			BButtonGroup,
			BFormInvalidFeedback,
			BContainer,
			ValidationObserver,
			ValidationProvider
		},

		setup(props,{emit}){

				const PickerOptions = ref({
					disabledDate(time) {
						return time.getTime() > Date.now()
					}
				})
				const formValidate = ref(null)

				const { permiso:formulario } = toRefs(store.state.permiso)


				const guardar = () => {

					emit('save',formulario.value,formValidate.value)

				}
				return{
					required,
					regresar,
					guardar,
					formulario,
					loading:computed(() => store.state.loading),
					PickerOptions
				}
			}

	} 

</script>