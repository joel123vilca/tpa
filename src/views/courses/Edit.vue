<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'sgcUsersList' } },
          { name: 'Cursos', to: { name: 'sgcUsersList' } },
          { name: 'Editar curso' }
        ]"
      />

      <v-layout row wrap>
        <v-flex md6 sm6 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Editar Curso</span>
            </v-card-title>
            <v-divider />
            <v-card-text class="pa-0">
              <v-form
                ref="form"
                v-model="validForm"
                lazy-validation
                @submit.prevent="submitUpdateCourse"
              >
                <v-container fluid grid-list-lg>
                  <v-text-field
                    v-model="form.nombre"
                    :disabled="processingForm"
                    label="Nombre"
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
                        v-model="form.tipo"
                        :items="tipos"
                        dense
                        clearable
                        small-chips
                        label="Seleccionar tipo"
                        item-text="nombre"
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

  metaInfo() {
    return { title: "Editar Curso" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      imageUrl: "",

      formErrors: {},

      form: {
        nombre: "",
        tipo: '',
        estado: '',
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
      currentCourse: state => state.courses.currentCourse,
    })
  },

  created() {

    this.getCourse({ cursoId: this.$route.params.id }).then(response => {
      const courseInfo = response.data.data;
      this.setForm(courseInfo);
    });
  },

  methods: {
    ...mapActions({
      replaceCurrentCourse: "courses/replaceCurrentCourse",
      updateCourse: "courses/updateCourse",
      getCourse: "courses/getCourse"
    }),

    setForm(course) {
      this.form.nombre = course.nombre;
      this.form.tipo = course.tipo;
      this.form.estado = course.estado;
    },

    submitUpdateCourse() {
      if (!this.$refs.form.validate()) return false;

      this.processingForm = true;
      this.updateCourse({
        cursoId: this.$route.params.id,
        data: this.form
      })
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
