<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs
        :routes="[{ name: 'Inicio', to: { name: 'listaPeriodo' } }, { name: 'Editar Encuesta' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Encuesta</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateEncuesta"
              >
                <v-container fluid grid-list-lg>
                  <v-autocomplete
                    v-model="form.periodo_id"
                    :items="periodos"
                    dense
                    outline
                    clearable
                    small-chips
                    disabled
                    label="Seleccionar Periodo"
                    item-text="nombre"
                    item-value="id"
                    :rules="rules.periodo_id"
                    :error="!!formErrors.periodo_id"
                    :error-messages="formErrors.periodo_id"
                    @change="
                      () => {
                        formErrors.periodo_id = undefined;
                        delete formErrors.periodo_id;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.encuesta_facil_id"
                    :disabled="colaboradoresAsignados"
                    label="Id de encuesta facil"
                    outline
                    :rules="rules.encuesta_facil_id"
                    :error="!!formErrors.encuesta_facil_id"
                    :error-messages="formErrors.encuesta_facil_id"
                    @keyup="
                      () => {
                        formErrors.encuesta_facil_id = undefined;
                        delete formErrors.encuesta_facil_id;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.nombre"
                    :disabled="processingForm"
                    label="nombre"
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
                  <v-text-field
                    v-model="form.fecha_inicio"
                    :disabled="processingForm"
                    label="Fecha inicio"
                    outline
                    :rules="rules.fecha_inicio"
                    :error="!!formErrors.fecha_inicio"
                    :error-messages="formErrors.fecha_inicio"
                    type="date"
                    @keyup="
                      () => {
                        formErrors.fecha_inicio = undefined;
                        delete formErrors.fecha_inicio;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.fecha_fin"
                    :disabled="processingForm"
                    label="Fecha final"
                    outline
                    type="date"
                    :rules="rules.fecha_fin"
                    :error="!!formErrors.fecha_fin"
                    :error-messages="formErrors.fecha_fin"
                    @keyup="
                      () => {
                        formErrors.fecha_fin = undefined;
                        delete formErrors.fecha_fin;
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
                  >Guardar</v-btn>
                  <v-btn
                    @click="$router.push({name: 'periodoEncuestas', params: { id: form.periodo_id }})"
                  >Cancelar</v-btn>
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
    return { title: "Nuevo encuesta" };
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
        descripcion: '',
        fecha_inicio: '',
        fecha_fin: '',
        encuesta_facil_id: '',
        periodo_id:'' ,
      },
      colaboradoresAsignados: '',
      validForm: true,
      processingForm: false,

      rules: {
        nombre: [v => !!v || "El nombre es requerido"],
      }
    };
  },
  computed: {
    ...mapState({
      periodos: state => state.periodos.periodos,
      loadingPeriodos: state => state.periodos.loadingPeriodos,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
    this.getPeriodos();
    this.getEncuesta({encuestaId: this.$route.params.id}).then(response => {
      const encuestaInfo = response.data.data;
      this.setForm(encuestaInfo);
    });
  },
  methods: {
    ...mapActions({
      putEncuesta: "encuestas/putEncuesta",
      getEncuesta: "encuestas/getEncuesta",
      getPeriodos: "periodos/getPeriodos",
    }),
    setForm(encuesta) {
      this.form.periodo_id= encuesta.periodo.id;
      this.form.nombre= encuesta.nombre;
      this.form.fecha_inicio = encuesta.fecha_inicio;
      this.form.fecha_fin = encuesta.fecha_fin;
      this.form.encuesta_facil_id = encuesta.encuesta_facil_id;
      this.form.descripcion = encuesta.descripcion;
      this.colaboradoresAsignados = encuesta.colaboradoresAsignados;
    },
    submitCreateEncuesta() {
      this.processingForm = true;
      this.putEncuesta({ 
        encuestaId: this.$route.params.id,
        data: this.form, })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "periodoEncuestas",  params: { id: this.form.periodo_id } });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
