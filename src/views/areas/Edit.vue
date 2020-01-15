<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Areas'},
          { name: 'Editar Area' }
        ]"
      />

      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Area</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitUpdateArea"
              >
                <v-container fluid grid-list-lg>
                  <v-text-field
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

                  <v-layout row wrap>
                    <v-flex sm6 xs12>
                      <v-autocomplete
                        v-model="form.tipo_area_id"
                        :items="tiposArea"
                        dense
                        outline
                        clearable
                        small-chips
                        label="Seleccionar tipo de area"
                        item-text="tipo_nombre"
                        item-value="id"
                        :disabled="processingForm"
                        :error="!!formErrors.tipo_area_id"
                        :error-messages="formErrors.tipo_area_id"
                        @change="
                          () => {
                            formErrors.tipo_area_id = undefined;
                            delete formErrors.tipo_area_id;
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
                  <v-btn @click="$router.push({ name: 'listaArea' })">
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
    return { title: "Editar Tag" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},

      form: {
        nombre: '',
        padre_id: '',
        tipo_area_id: '',
        estado: 0,
      },
      tipos: ['POSITIVO', 'NEGATIVO'],
      estados: [
        { id: 0, nombre: 'inactivo' },
        { id: 1, nombre: 'activo' },
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
      currentArea: state => state.areas.currentArea,
      tiposArea: state => state.tiposArea.tiposArea,
      loadingTiposArea: state => state.tiposArea.loadingTiposArea,
    }),
  },

  created() {
    this.getArea({ areaId: this.$route.params.id }).then(response => {
      const areaInfo = response.data.data;
      this.setForm(areaInfo);
    });
    this.getTiposArea();
  },

  methods: {
    ...mapActions({
      replaceCurrentArea: "areas/replaceCurrentArea",
      updateArea: "areas/updateArea",
      getArea: "areas/getArea",
      getTiposArea: "tiposArea/getTiposArea",
    }),

    setForm(tag) {
      this.form.nombre = tag.nombre;
      this.form.padre_id = tag.padre_id;
      this.form.tipo_area_id = tag.tipoArea.id;
      this.form.estado = tag.estado;
    },

    submitUpdateArea() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.updateArea({
        areaId: this.$route.params.id,
        data: this.form,
      })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listaArea" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
