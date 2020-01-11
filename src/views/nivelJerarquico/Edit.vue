<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Nivel Jerarquico'},
          { name: 'Editar Nivel Jerarquico' }
        ]"
      />

      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Nivel Jerarquico</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitUpdateNivelJerarquico"
              >
                <v-container fluid grid-list-lg>
                  <v-text-field
                    v-model="form.nivel_nombre"
                    :disabled="processingForm"
                    label="Nombre"
                    outline
                    :rules="rules.nivel_nombre"
                    :error="!!formErrors.nivel_nombre"
                    :error-messages="formErrors.nivel_nombre"
                    @keyup="
                      () => {
                        formErrors.nivel_nombre = undefined;
                        delete formErrors.nivel_nombre;
                      }
                    "
                  />

                  <v-layout row wrap>
                    <v-flex sm12 xs12>
                      <v-autocomplete
                        v-model="form.estado"
                        :items="estados"
                        dense
                        outline
                        clearable
                        small-chips
                        label="Seleccionar estado"
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
                  <v-btn @click="$router.push({ name: 'listaniveljerarquico' })">
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
    return { title: "Editar Nivel Jerarquico" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},

      form: {
        nivel_nombre: '',
        estado: '',
      },
      estados: [
        {id:0, nombre:'inactivo'},
        {id:1, nombre:'activo'}
      ],

      validForm: true,
      processingForm: false,

      rules: {
        nivel_nombre: [v => !!v || "El nombre es requerido"],
      }
    };
  },

  computed: {
    ...mapState({
      currentNivelJerarquico: state => state.nivelesJerarquico.currentNivelJerarquico,
    })
  },

  created() {
    this.getNivelJerarquico({ jerarquiaId: this.$route.params.id }).then(response => {
      const nivelJerarquicoInfo = response.data.data;
      this.setForm(nivelJerarquicoInfo);
    });
  },

  methods: {
    ...mapActions({
      replaceCurrentNivelJerarquico: "nivelesJerarquico/replaceCurrentNivelJerarquico",
      updateNivelJerarquico: "nivelesJerarquico/updateNivelJerarquico",
      getNivelJerarquico: "nivelesJerarquico/getNivelJerarquico"
    }),

    setForm(nivelJerarquico) {
      this.form.nivel_nombre = nivelJerarquico.nivel_nombre;
      this.form.estado = nivelJerarquico.estado;
    },

    submitUpdateNivelJerarquico() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.updateNivelJerarquico({
        jerarquiaId: this.$route.params.id,
        data: this.form
      })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listaniveljerarquico" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
