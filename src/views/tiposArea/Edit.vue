<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Tipos Area'},
          { name: 'Editar Tipos' }
        ]"
      />

      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Tipos Area</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitUpdateTipoArea"
              >
                <v-container fluid grid-list-lg>
                  <v-text-field
                    v-model="form.tipo_nombre"
                    :disabled="processingForm"
                    label="nombre"
                    outline
                    :rules="rules.tipo_nombre"
                    :error="!!formErrors.tipo_nombre"
                    :error-messages="formErrors.tipo_nombre"
                    @keyup="
                      () => {
                        formErrors.tipo_nombre = undefined;
                        delete formErrors.tipo_nombre;
                      }
                    "
                  />

                  <v-layout row wrap>
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
                  <v-btn @click="$router.push({ name: 'listatipoarea' })">
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
    return { title: "Editar Tipos Area" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},

      form: {
        tipo_nombre: '',
        estado: 0,
      },
      estados: [
        { id: 0, nombre: 'inactivo' },
        { id: 1, nombre: 'activo' },
      ],

      validForm: true,
      processingForm: false,

      rules: {
        tipo_nombre: [v => !!v || "El tipo nombre es requerido"],
      }
    };
  },

  computed: {
    ...mapState({
      currentTipoArea: state => state.tipoArea.currentTipoArea,
    }),
  },

  created() {
    this.getTipoArea({ tipoAreaId: this.$route.params.id }).then(response => {
      const tipoAreaInfo = response.data.data;
      this.setForm(tipoAreaInfo);
    });
  },

  methods: {
    ...mapActions({
      replaceCurrentTipoArea: "tiposArea/replaceCurrentTipoArea",
      updateTipoArea: "tiposArea/updateTipoArea",
      getTipoArea: "tiposArea/getTipoArea"
    }),

    setForm(tipoArea) {
      this.form.tipo_nombre = tipoArea.tipo_nombre;
      this.form.estado = tipoArea.estado;
    },

    submitUpdateTipoArea() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.updateTipoArea({
        tipoAreaId: this.$route.params.id,
        data: this.form,
      })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listatipoarea" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
