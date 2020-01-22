<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[{ name: 'Inicio' }, { name: 'Nuevo Movilidad' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Crear Movilidad</span>
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
                  <v-text-field
                    v-model="form.observacion"
                    :disabled="processingForm"
                    label="OBSERVACIONES"
                    outline
                    :rules="rules.observacion"
                    :error="!!formErrors.observacion"
                    :error-messages="formErrors.observacion"
                    @keyup="
                      () => {
                        formErrors.observacion = undefined;
                        delete formErrors.observacion;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.tipo"
                    :disabled="processingForm"
                    label="TIPO"
                    outline
                    :rules="rules.tipo"
                    :error="!!formErrors.tipo"
                    :error-messages="formErrors.tipo"
                    @keyup="
                      () => {
                        formErrors.tipo = undefined;
                        delete formErrors.tipo;
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
                  label="FECHA DE INICIO "
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
                  label="FECHA DE TERMINO "
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
                        v-model="form.cargo_id"
                        :items="cargos"
                        :search-input.sync="search"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar Cargo"
                        item-text="nombre"
                        item-value="id"
                        outline
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
  middleware: "auth",

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
        fecha_termino: '',
        fecha_inicio: '',
        observacion: '',
        tipo: '',
        cargo_id: '',
        estado: 1,
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
      cargos: state => state.cargos.cargos,
      loadingCargos: state => state.cargos.loadingCargos,
    })
  },
  created() {
    this.getCargos();
  },
  methods: {
    ...mapActions({
      getCargos: 'cargos/getCargos',
    }),
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
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
