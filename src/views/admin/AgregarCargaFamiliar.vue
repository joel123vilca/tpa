<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[{ name: 'Inicio' }, { name: 'Colaborador' }, {name: 'Agregar Carga Familiar'}]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Agregar Carga Familiar</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitCreateCargaFamiliar"
              >
                <v-container fluid grid-list-lg>
                  <v-text-field
                    v-model="form.rut"
                    :disabled="processingForm"
                    label="Rut"
                    outline
                    :error="!!formErrors.rut"
                    :error-messages="formErrors.rut"
                    @keyup="
                      () => {
                        formErrors.rut = undefined;
                        delete formErrors.rut;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.nombres"
                    :disabled="processingForm"
                    label="Nombres"
                    outline
                    :error="!!formErrors.nombres"
                    :error-messages="formErrors.nombres"
                    @keyup="
                      () => {
                        formErrors.nombres = undefined;
                        delete formErrors.nombres;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.apellidos"
                    :disabled="processingForm"
                    label="Apellidos"
                    outline
                    :error="!!formErrors.apellidos"
                    :error-messages="formErrors.apellidos"
                    @keyup="
                      () => {
                        formErrors.apellidos = undefined;
                        delete formErrors.apellidos;
                      }
                    "
                  />
                  <v-menu
                ref="menu"
                v-model="targetIssueDate"
                :close-on-content-click="false"
                transition="scale-transition"
                offset-y
                full-width
                min-width="290px"
              >
                        <template v-slot:activator="{ on }">
                        <v-text-field
                            :value="formatDate(form.fecha_nacimiento)"
                            hint="Formato (dd/mm/aa)"
                            label="FECHA DE NACIMIENTO"
                            v-on="on"
                            outline
                        ></v-text-field>
                        </template>
                        <v-date-picker
                          ref="picker"
                          v-model="form.fecha_nacimiento"
                          @input="targetIssueDate = false"
                        ></v-date-picker>
                      </v-menu>
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                        v-model="form.tipo_carga_id"
                        :items="tiposCarga"
                        dense
                        outline
                        clearable
                        small-chips
                        label="Seleccionar tipo de Carga Familiar"
                        item-text="tipo"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.tipo_carga_id"
                        :error-messages="formErrors.tipo_carga_id"
                        @change="
                          () => {
                            formErrors.tipo_carga_id = undefined;
                            delete formErrors.tipo_carga_id;
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
                  <v-btn @click="$router.push({name: 'ListaCargaFamiliar', params: { id: $route.params.id }})">
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
    return { title: "Nueva carga Familiar" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},
      targetIssueDate: false,
      date: new Date().toISOString().substr(0, 10),
      form: {
        rut: '',
        nombres: '',
        apellidos: '',
        fecha_nacimiento: '',
        tipo_carga_id: '',
        estado: 1,
      },
      estados: [
        {id:0, nombre:'inactivo'},
        {id:1, nombre:'activo'}
      ],
      validForm: true,
      processingForm: false,
    };
  },
  computed: {
    ...mapState({
      tiposCarga: state => state.colaboradores.tiposCarga,
      loadingTiposCarga: state => state.colaboradores.loadingTiposCarga,
    }),
  },
  created() {
    this.getTiposCarga();
  },
  methods: {
    ...mapActions({
      postFamily: "colaboradores/postFamily",
      getTiposCarga: "colaboradores/getTiposCarga",
    }),
     formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    submitCreateCargaFamiliar() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.postFamily({
        colaboradorId: this.$route.params.id,
        data: this.form })
        .then(response => {
          this.processingForm = false;
          this.$router.push({name: 'ListaCargaFamiliar', params: { id: this.$route.params.id }});
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
