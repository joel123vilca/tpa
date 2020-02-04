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

            <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Tipo de Movilidad</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step v-if="movilidades.length > 0"  :complete="e1 > 2" step="2">Cargo Actual</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 3" step="3">Asignar cargo nuevo</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitMovilidad"
              >
            <v-stepper-content step="1">
              <v-autocomplete
                v-model="form.tipo_movilidad_id"
                :items="tipoMovilidades"
                outline
                clearable
                small-chips
                label="SELECCIONAR TIPO MOVILIDAD "
                item-text="tipo"
                item-value="id"
                :rules="rules.tipo_movilidad_id"
                :error="!!formErrors.tipo_movilidad_id"
                :error-messages="formErrors.tipo_movilidad_id"
                @keyup="() => {
                  formErrors.tipo_movilidad_id = undefined
                  delete formErrors.tipo_movilidad_id
                }"
              />
              <v-btn
                v-if="movilidades.length > 0"
                color="primary"
                @click="e1 = 2"
              >
                Continuar
              </v-btn>
              <v-btn
                v-else
                color="primary"
                @click="e1 = 3"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="$router.push({name: 'movilidades', params: { id: $route.params.id }})">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
                <div v-for="item in movilidades">
                  <div v-if="item.estado === 1">
                    <v-flex sm12 xs12>
                      <v-text-field
                        label="NOMBRE DEL CARGO"
                        :value="item.cargo_nombre"
                        outline
                        readonly
                      />
                    </v-flex>
                    <v-flex sm12 xs12>
                      <v-text-field
                        label="OBSERVACIONES"
                        :value="item.observaciones"
                        outline
                        readonly
                      />
                    </v-flex>
                    <v-flex sm12 xs12>
                      <v-text-field
                        :value="formatDate(item.fecha_inicio)"
                        label="FECHA DE INICIO"
                        outline
                        readonly
                      ></v-text-field>
                    </v-flex>
                    <v-flex sm6 xs12>
                    </v-flex>
                  </div>
                </div>
              <v-flex sm12 xs12>
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
                    <v-btn
                color="primary"
                @click="e1 = 3"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="e1 = 1">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="3">
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
                <v-layout row wrap>
                    <v-flex sm12 xs12>
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
                  </v-layout>
                  <v-text-field
                    v-model="form.observaciones"
                    :disabled="processingForm"
                    label="OBSERVACIONES"
                    outline
                    :rules="rules.observaciones"
                    :error="!!formErrors.observaciones"
                    :error-messages="formErrors.observaciones"
                    @keyup="
                      () => {
                        formErrors.observaciones = undefined;
                        delete formErrors.observaciones;
                      }
                    "
                  />
                <v-btn
                  type="submit"
                  color="success"
                  :disabled="!validForm || processingForm"
                  :loading="processingForm"
                >
                  Guardar
                </v-btn>
              <v-btn flat @click="e1 = 2">Cancel</v-btn>
            </v-stepper-content>
            </v-form>
          </v-stepper-items>
        </v-stepper>

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
    return { title: "Crear Movilidad" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},
      targetIssueDate5: false,
      targetIssueDate: false,
      e1: 0,
      form: {
        fecha_termino: '',
        fecha_inicio: '',
        observaciones: '',
        tipo_movilidad_id: '',
        cargo_id: '',
        estado: 1,
      },
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
      tipoMovilidades: state => state.colaboradores.tipoMovilidades,
      loadingTipoMovilidades: state => state.colaboradores.loadingTipoMovilidades,
      movilidades: state => state.colaboradores.movilidades,
      loadingMovilidades: state => state.colaboradores.loadingMovilidades,
    })
  },
  created() {
    this.getCargos();
    this.getTipoMovilidades();
    this.getMovilidad({ colaboradorId: this.$route.params.id });
  },
  methods: {
    ...mapActions({
      getCargos: 'cargos/getCargos',
      postMovilidad: 'colaboradores/postMovilidad',
      getTipoMovilidades: 'colaboradores/getTipoMovilidades',
      getMovilidad: 'colaboradores/getMovilidad',
    }),
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    submitMovilidad() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.postMovilidad({
        colaboradorId: this.$route.params.id,
        data: this.form,
      })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "movilidades", params: { id: this.$route.params.id }   });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
