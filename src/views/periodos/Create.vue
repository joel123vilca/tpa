<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs
        :routes="[{ name: 'Inicio', to: { name: 'listaPeriodo' } }, { name: 'Nuevo periodo' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Crear Periodo</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreatePeriodo"
              >
                <v-container fluid grid-list-lg>
                  <v-autocomplete
                    v-model="form.encuesta_plantilla_id"
                    :items="plantillas"
                    dense
                    outline
                    clearable
                    small-chips
                    label="Seleccionar Encuesta Plantilla"
                    item-text="nombre"
                    item-value="id"
                    :disabled="processingForm"
                    :rules="rules.encuesta_plantilla_id"
                    :error="!!formErrors.encuesta_plantilla_id"
                    :error-messages="formErrors.encuesta_plantilla_id"
                    @change="
                      () => {
                        formErrors.encuesta_plantilla_id = undefined;
                        delete formErrors.encuesta_plantilla_id;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.year"
                    :disabled="processingForm"
                    label="año"
                    outline
                    type="number"
                    :rules="rules.year"
                    :error="!!formErrors.year"
                    :error-messages="formErrors.year"
                    @change="nombrePeriodo"
                    @keyup="
                      () => {
                        formErrors.year = undefined;
                        delete formErrors.year;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.detalle"
                    :disabled="processingForm"
                    label="detalle"
                    outline
                    :rules="rules.detalle"
                    :error="!!formErrors.detalle"
                    :error-messages="formErrors.detalle"
                    @change="nombrePeriodo"
                    @keyup="
                      () => {
                        formErrors.detalle = undefined;
                        delete formErrors.detalle;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.nombre"
                    :disabled="processingForm"
                    label="Nombre"
                    outline
                    :rules="rules.nombre"
                    :error="!!formErrors.nombre"
                    :error-messages="formErrors.nombre"
                    @keyup="
                      () => {
                        formErrors.nombre = undefined;
                        delete formErrors.nombre;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.descripcion"
                    :disabled="processingForm"
                    label="descripcion"
                    outline
                    :rules="rules.descripcion"
                    :error="!!formErrors.descripcion"
                    :error-messages="formErrors.descripcion"
                    @keyup="
                      () => {
                        formErrors.descripcion = undefined;
                        delete formErrors.descripcion;
                      }
                    "
                  />
                </v-container>
                <v-divider class="mb-3" />
                <div class="text-xs-center pb-3">
                  <v-btn
                    type="submit"
                    color="success"
                    :disabled="!validForm || processingForm"
                    :loading="processingForm"
                  >
                    Guardar
                  </v-btn>
                  <v-btn @click="$router.push({ name: 'listaPeriodo' })">
                    Cancelar
                  </v-btn>
                </div>
              </v-form>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  metaInfo() {
    return { title: "Nuevo periodo" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      formErrors: {},
      targetIssueDate5: false,
      targetIssueDate: false,
      form: {
        nombre: '',
        year: '',
        detalle: '',
        descripcion: '',
        encuesta_plantilla_id: ''
      },
      validForm: true,
      processingForm: false,

      rules: {
        nombre: [v => !!v || "El nombre es requerido"],
        tipo_curso_id: [v => !!v || "La categoria es requerido"],
      }
    };
  },
  computed: {
    ...mapState({
      plantillas: state => state.periodos.plantillas,
      loadingPlantillas: state => state.periodos.loadingPlantillas,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  watch: {
    'form.encuesta_plantilla_id': function () {
      this.nombrePeriodo();
    },
  },
  created() {
    this.getPlantillas();
  },
  methods: {
    ...mapActions({
      createPeriodo: "periodos/createPeriodo",
      getPlantillas: "periodos/getPlantillas",
    }),
    nombrePeriodo() {
      let periodos = this.plantillas;
      const periodo =  periodos.filter(o => o.id === this.form.encuesta_plantilla_id);
      var nombre = periodo.map(function (item) {
        return item.nombre
      });
      if(this.form.detalle.length != 0){
        this.form.nombre = String(nombre) + ' - ' + this.form.year + ' - ' + this.form.detalle;
      } else {
        this.form.nombre = String(nombre) + ' - ' + this.form.year;
      }
    },
    submitCreatePeriodo() {
      this.processingForm = true;
      this.createPeriodo({ data: this.form })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listaPeriodo" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
