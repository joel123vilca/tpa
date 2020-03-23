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
              <span class="success--text font-weight-bold headline">Crear Movilidad</span>
            </v-card-title>
            <v-divider />

            <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Tipo de Movilidad</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step  :complete="e1 > 2" step="2">Cargo Actual</v-stepper-step>
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
                color="primary"
                v-if="!form.tipo_movilidad_id"
                disabled
              >
                Continuar
              </v-btn>
              <v-btn
                color="primary"
                v-else
                @click="e1 = 2"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="$router.push({name: 'movilidades', params: { id: $route.params.id }})">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-layout row wrap>
                <v-flex sm6 xs12 v-if="movilidades.length > 0  ">
                  <v-card v-if="movilidades.length > 0  ">
                    <v-card-title class="title">Cargo Actual</v-card-title>
                    <v-container>
                <div v-for="item in movilidades">
                  <div v-if="item.estado === 1">
                      <h4>Tipo de Movilidad: {{item.tipoMovilidad.tipo}}</h4>
                      <br>
                      <v-text-field
                        v-if="item.cargo_nombre"
                        label="NOMBRE DEL CARGO"
                        :value="item.cargo_nombre"
                        outline
                        readonly
                      />
                      <v-text-field
                        v-else
                        label="NOMBRE DEL CARGO"
                        value="Sin Cargo"
                        outline
                        readonly
                      />
                      <v-text-field
                        :value="formatDate(item.fecha_inicio)"
                        label="FECHA DE INICIO"
                        outline
                        readonly
                      ></v-text-field>
                      <v-text-field
                        v-model="form.fecha_termino"
                        hint="Formato DD/MM/AAAA"
                        label="FECHA DE TERMINO"
                        outline
                        type="date"
                        @change="addDay"
                      ></v-text-field>
                      <v-text-field
                        v-if="item.observaciones"
                        label="OBSERVACIONES"
                        :value="item.observaciones"
                        outline
                        readonly
                      />
                  </div>
                </div>
                    </v-container>
                  </v-card>
                </v-flex>
                <v-flex sm6 xs12 v-if="form.tipo_movilidad_id < 4 ">
                  <v-card v-if="form.tipo_movilidad_id < 4 ">
                    <v-card-title class="title">Cargo Nuevo</v-card-title>
                    <v-container>
                    <h4>Tipo de Movilidad: {{ filterMovilidad(form.tipo_movilidad_id)}}</h4>
                    <br>
                    <v-autocomplete
                      v-model="form.cargo_id"
                      :items="filterData"
                      :search-input.sync="search"
                      dense
                      clearable
                      small-chips
                      label="SELECCIONAR CARGO NUEVO"
                      item-text="nombre"
                      item-value="id"
                      outline
                      :rules="rules.cargo_id"
                      @keyup="() => {
                        formErrors.cargo_id = undefined
                        delete formErrors.cargo_id
                      }"
                    />
                    <v-text-field
                      v-model="form.fecha_inicio"
                      hint="Formato DD/MM/AAAA"
                      label="FECHA DE INICIO CARGO NUEVO"
                      outline
                      :rules="rules.fecha_inicio"
                      type="date"
                    ></v-text-field>
                    <v-text-field
                      v-model="form.observaciones"
                      :disabled="processingForm"
                      label="OBSERVACIONES DEL CARGO NUEVO"
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
                    </v-container>
                  </v-card>
                </v-flex>
              </v-layout>
                    <v-btn
                  type="submit"
                  color="success"
                  :disabled="!validForm || processingForm"
                  :loading="processingForm"
                >
                  Guardar
                </v-btn>
              <v-btn flat @click="e1 = 1">Cancelar</v-btn>
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
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  metaInfo() {
    return { title: 'Crear Movilidad' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission'),
  },

  data() {
    return {
      formErrors: {},
      e1: 0,
      search: '',
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
        fecha_inicio: [v => !!v || "La fecha de inicio es requerido"],
        tipo_movilidad_id: [v => !!v || "El tipo de movilidad es requerido"],
        cargo_id: [v => !!v || "El cargo nuevo es requerido."]
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
    addDay() {
      var datatoday = new Date(this.form.fecha_termino);
      var datatodays = datatoday.setDate(new Date(datatoday).getDate() + 2);

      var newdate = new Date(datatodays);
      const fill = (number, len) =>
      "0".repeat(len - number.toString().length) + number.toString();
      var dd = newdate.getDate();
      var mm = newdate.getMonth() + 1;
      var y = newdate.getFullYear();
        dd = fill(dd, 2)
        mm = fill(mm, 2)
      this.form.fecha_inicio = y + '-' + mm + '-' + dd;
    },
    filterMovilidad(id){
      let tipoMovilidades = this.tipoMovilidades;
      const movilidades =  tipoMovilidades.filter(o => o.id === id);
      var nombre = movilidades.map(function (movilidad) {
      return movilidad.tipo
      });
      return String(nombre);

    },
    submitMovilidad() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      if(this.form.fecha_termino === ''){
        var datatoday = new Date(this.form.fecha_inicio);
        var datatodays = datatoday.setDate(new Date(datatoday).getDate());

        var newdate = new Date(datatodays);
        const fill = (number, len) =>
        "0".repeat(len - number.toString().length) + number.toString();
        var dd = newdate.getDate();
        var mm = newdate.getMonth() + 1;
        var y = newdate.getFullYear();
          dd = fill(dd, 2)
          mm = fill(mm, 2)
        this.form.fecha_termino = y + '-' + mm + '-' + dd;
      }
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
