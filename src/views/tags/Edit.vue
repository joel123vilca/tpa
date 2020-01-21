<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Tags'},
          { name: 'Editar Tag' }
        ]"
      />

      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Tag</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitUpdateTag"
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
                  <v-text-field
                    v-model="form.descripcion"
                    :disabled="processingForm"
                    label="Descripcion"
                    outline
                    :rules="rules.descripcion"
                    :error="!!formErrors.descripcion"
                    :error-messages="formErrors.descripcion"
                    @keyup="
                      () => {
                        formErrors.descripcion = undefined;
                        delete formErrors.descripcion;
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
                        label="Seleccionar tipo de curso"
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
                  <v-btn @click="$router.push({ name: 'listatags' })">
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
        descripcion: '',
        permisos: '',
        tipo: 0,
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
      currentTag: state => state.tags.currentTag,
    }),
  },

  created() {
    this.getTag({ tagId: this.$route.params.id }).then(response => {
      const tagInfo = response.data.data;
      this.setForm(tagInfo);
    });
  },

  methods: {
    ...mapActions({
      replaceCurrentTag: "tags/replaceCurrentTag",
      updateTag: "tags/updateTag",
      getTag: "tags/getTag"
    }),

    setForm(tag) {
      this.form.nombre = tag.nombre;
      this.form.descripcion = tag.descripcion;
      this.form.permisos = tag.permisos;
      this.form.estado = tag.estado;
      this.form.tipo = tag.tipo;
    },

    submitUpdateTag() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.updateTag({
        tagId: this.$route.params.id,
        data: this.form,
      })
        .then(response => {
          this.processingForm = false;
          this.$router.push({ name: "listatags" });
        })
        .catch(error => {
          this.processingForm = false;
          this.formErrors = error.response.data.errors || {};
        });
    }
  }
};
</script>
