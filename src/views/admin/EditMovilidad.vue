<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
      <Breadcrumbs
        :routes="[{ name: 'Inicio' }, { name: 'Nuevo Movilidad' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Movilidad</span>
            </v-card-title>
            <v-divider />

            <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Paso 1: Datos Generales</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Paso 2: Asignacion</v-stepper-step>
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
                :disabled="form.estado === 1"
                @keyup="() => {
                  formErrors.tipo_movilidad_id = undefined
                  delete formErrors.tipo_movilidad_id
                }"
              />
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="$router.push({name: 'movilidades', params: { id: form.colaborador_id }})">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
                <v-autocomplete
                  v-model="form.cargo_id"
                  :items="filterData"
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
                    <v-flex sm6 xs12>
                        <v-text-field
                  v-model="form.fecha_inicio"
                  hint="Formato DD/MM/AAAA"
                  label="Fecha de Inicio"
                  outline
                  type="date"
                ></v-text-field>
                    </v-flex>
                    <v-flex sm6 xs12>

                    <v-text-field
                    v-if="form.estado === 0"
                  v-model="form.fecha_termino"
                  hint="Formato DD/MM/AAAA"
                  label="FECHA DE TERMINO"
                  outline
                  type="date"
                ></v-text-field>
                    <v-text-field
                    v-else
                  :value="formatDate(form.fecha_termino)"
                  hint="Formato DD/MM/AAAA"
                  label="FECHA DE TERMINO "
                  v-on="on"
                  outline
                  readonly
                ></v-text-field>
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
              <v-btn flat @click="e1 = 1">Cancel</v-btn>
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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  metaInfo() {
    return { title: "Crear Movilidad" };
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
      e1: 0,
      form: {
        fecha_termino: '',
        fecha_inicio: '',
        observaciones: '',
        tipo_movilidad_id: '',
        cargo_id: '',
        colaborador_id: '',
        estado: '',
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
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
    filterData() {
      let cargos = this.cargos
      return cargos.filter(o => o.estado === 1);
    },
  },
  created() {
    this.getCargos();
    this.getTipoMovilidades();
    this.getByIdMovilidad({ movilidadId: this.$route.params.id }).then(response => {
      const movilidadInfo = response.data.data;
      this.setForm(movilidadInfo);
    });
  },
  methods: {
    ...mapActions({
      getCargos: 'cargos/getCargos',
      updateMovilidad: 'colaboradores/updateMovilidad',
      getTipoMovilidades: 'colaboradores/getTipoMovilidades',
      getByIdMovilidad: 'colaboradores/getByIdMovilidad',
    }),
    setForm(movilidad) {
      this.form.fecha_termino = movilidad.fecha_termino;
      this.form.fecha_inicio = movilidad.fecha_inicio;
      this.form.observaciones = movilidad.observaciones;
      this.form.tipo_movilidad_id = movilidad.tipoMovilidad.id;
      this.form.cargo_id = movilidad.cargo_id;
      this.form.estado = movilidad.estado;
      this.form.colaborador_id = movilidad.colaborador_id;
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    submitMovilidad() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.updateMovilidad({
        movilidadId: this.$route.params.id,
        data: this.form,
      })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "movilidades", params: { id: this.form.colaborador_id }});
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
