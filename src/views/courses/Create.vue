<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[{ name: 'Inicio', to: { name: 'ListCourse' } }, { name: 'Nuevo curso' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Crear Curso</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateCourse"
              >
                <v-container fluid grid-list-lg>
                  <v-autocomplete
                    v-model="form.tipo_curso_id"
                    :items="tipoCursos"
                    dense
                    outline
                    clearable
                    small-chips
                    label="Seleccionar Categoría"
                    item-text="categoria"
                    item-value="id"
                    :disabled="processingForm"
                    :error="!!formErrors.estado"
                    :error-messages="formErrors.estado"
                    @change="
                      () => {
                        formErrors.estado = undefined;
                        delete formErrors.estado;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.nombre"
                    :disabled="processingForm"
                    label="Nombre del Curso"
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
                    v-model="form.titulo"
                    :disabled="processingForm"
                    label="Título Diploma"
                    outline
                    :rules="rules.titulo"
                    :error="!!formErrors.titulo"
                    :error-messages="formErrors.titulo"
                    @keyup="
                      () => {
                        formErrors.titulo = undefined;
                        delete formErrors.titulo;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.horas_cronologicas"
                    :disabled="processingForm"
                    label="Horas cronológicas"
                    outline
                    :rules="rules.horas_cronologicas"
                    :error="!!formErrors.horas_cronologicas"
                    :error-messages="formErrors.horas_cronologicas"
                    @keyup="
                      () => {
                        formErrors.horas_cronologicas = undefined;
                        delete formErrors.horas_cronologicas;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.realizado"
                    :disabled="processingForm"
                    label="Realizado"
                    outline
                    :rules="rules.realizado"
                    :error="!!formErrors.realizado"
                    :error-messages="formErrors.realizado"
                    @keyup="
                      () => {
                        formErrors.realizado = undefined;
                        delete formErrors.realizado;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.anio"
                    :disabled="processingForm"
                    label="Por su aprobación"
                    outline
                    :rules="rules.anio"
                    :error="!!formErrors.anio"
                    :error-messages="formErrors.anio"
                    @keyup="
                      () => {
                        formErrors.anio = undefined;
                        delete formErrors.anio;
                      }
                    "
                  />
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                  <v-menu
                ref="menu1"
                v-model="targetIssueDate5"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatDate(form.fecha_inicio)"
                  hint="Formato DD/MM/AAAA"
                  label="Fecha de inicio "
                  v-on="on"
                  outline
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker5"
                v-model="form.fecha_inicio"
                @input="targetIssueDate5 = false"
              ></v-date-picker>
            </v-menu>
                    </v-flex>
                    <v-flex sm6 xs12>
            <v-menu
                ref="menu1"
                v-model="targetIssueDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
              <template v-slot:activator="{ on }">
                <v-text-field
                  :value="formatDate(form.fecha_termino)"
                  hint="Formato DD/MM/AAAA"
                  label="Fecha de termino "
                  v-on="on"
                  outline
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker5"
                v-model="form.fecha_termino"
                @input="targetIssueDate = false"
              ></v-date-picker>
            </v-menu>
                    </v-flex>
                  </v-layout>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                        v-model="form.interno"
                        :items="tipos"
                        dense
                        outline
                        clearable
                        small-chips
                        label="Seleccionar Tipo"
                        item-text="nombre"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.interno"
                        :error-messages="formErrors.interno"
                        @change="
                          () => {
                            formErrors.interno = undefined;
                            delete formErrors.interno;
                          }
                        "
                      />
                    </v-flex>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                        v-model="form.estado"
                        :items="estados"
                        dense
                        outline
                        clearable
                        small-chips
                        label="Seleccionar Estado"
                        item-text="nombre"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.estado"
                        :error-messages="formErrors.estado"
                        @change="
                          () => {
                            formErrors.estado = undefined;
                            delete formErrors.estado;
                          }
                        "
                      />
                    </v-flex>
                  </v-layout>
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
                  <v-btn @click="$router.push({ name: 'ListCourse' })">
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
import { mapState, mapActions } from "vuex";

export default {

  metaInfo() {
    return { title: "Nuevo curso" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},
      targetIssueDate5: false,
      targetIssueDate: false,
      form: {
        nombre: '',
        titulo: '',
        realizado: '',
        fecha_inicio: '',
        fecha_termino: '',
        anio: '',
        interno: '',
        estado: 1,
        tipo_curso_id: '',
        horas_cronologicas: '',
      },
      tipos: [
        {id:0, nombre:'externo'},
        {id:1, nombre:'interno'}
      ],
      estados: [
        {id:0, nombre:'inactivo'},
        {id:1, nombre:'activo'}
      ],
      validForm: true,
      processingForm: false,

      rules: {
        nombre: [v => !!v || "El nombre es requerido"],
      }
    };
  },
  computed: {
    ...mapState({
      tipoCursos: state => state.courses.tipoCursos,
      loadingTipoCursos: state => state.courses.loadingTipoCursos,
    }),
  },
  created() {
    this.getTipoCursos();
  },
  methods: {
    ...mapActions({
      createCourse: "courses/createCourse",
      getTipoCursos: "courses/getTipoCursos",
    }),
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
    submitCreateCourse() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.createCourse({ data: this.form })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "ListCourse" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
