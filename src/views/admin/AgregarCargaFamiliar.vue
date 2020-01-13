<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[{ name: 'Inicio' }, { name: 'Colaborador' }, {name: 'Agregar Carga Familiar'}]"
      />
      <v-layout row wrap>
        <v-flex md6 sm6 xs12>
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
                    :rules="rules.rut"
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
                    label="nombres"
                    outline
                    :rules="rules.nombres"
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
                    :rules="rules.apellidos"
                    :error="!!formErrors.apellidos"
                    :error-messages="formErrors.apellidos"
                    @keyup="
                      () => {
                        formErrors.apellidos = undefined;
                        delete formErrors.apellidos;
                      }
                    "
                  />
                  <v-text-field
                    v-model="form.fecha_nacimiento"
                    :disabled="processingForm"
                    label="Fecha de nacimiento"
                    outline
                    :rules="rules.fecha_nacimiento"
                    :error="!!formErrors.fecha_nacimiento"
                    :error-messages="formErrors.fecha_nacimiento"
                    @keyup="
                      () => {
                        formErrors.fecha_nacimiento = undefined;
                        delete formErrors.fecha_nacimiento;
                      }
                    "
                  />
                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                        v-model="form.tipo"
                        :items="tipos"
                        dense
                        outline
                        clearable
                        small-chips
                        label="Seleccionar tipo de Carga Familiar"
                        item-text="tipo"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.tipo"
                        :error-messages="formErrors.tipo"
                        @change="
                          () => {
                            formErrors.tipo = undefined;
                            delete formErrors.tipo;
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
                  <v-btn @click="$router.push({ name: 'sgcUsersList' })">
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
    return { title: "Nuevo tag" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},

      form: {
        rut: '',
        nombres: '',
        apellidos: '',
        fecha_nacimiento: '2020-01-13',
        tipo_carga_id: 1,
        estado: 0,
      },
      estados: [
        {id:0, nombre:'inactivo'},
        {id:1, nombre:'activo'}
      ],
      tipos: [
        {id:1, tipo:'papa'},
        {id:2, tipo:'mama'}
      ],
      validForm: true,
      processingForm: false,

      rules: {
        rut: [v => !!v || "El rut es requerido"],
      }
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

    submitCreateCargaFamiliar() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.postFamily({
        colaboradorId: this.$route.params.id,
        data: this.form })
        .then(response => {
          this.processingForm = false;
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
