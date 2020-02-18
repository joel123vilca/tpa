<template>
  <v-container fluid grid-list-lg>
    <template>
      <Breadcrumbs
        :routes="[{ name: 'Inicio' }, { name: 'Asignar cursos' }]"
      />
      <v-layout row wrap>
        <v-flex md12 sm12 xs12>
          <v-card>
            <v-card-title primary-title>
              <span class="success--text font-weight-bold headline">Asignar curso a colaboradores</span>
            </v-card-title>

            <v-divider />
            <v-stepper v-model="e1">
            <v-stepper-header>
              <v-stepper-step :complete="e1 > 1" step="1">Paso 1: Seleccionar curso</v-stepper-step>
              <v-divider></v-divider>
              <v-stepper-step :complete="e1 > 2" step="2">Paso 2: Seleccionar colaboradores</v-stepper-step>
            </v-stepper-header>

            <v-stepper-items>

            <v-stepper-content step="1">

              <v-autocomplete
                v-model="form.curso_id"
                :items="courses"
                dense
                outline
                clearable
                small-chips
                label="SELECCIONAR CURSO"
                item-text="nombre"
                item-value="id"
                :error="!!formErrors.curso_id"
                :error-messages="formErrors.curso_id"
                @change="getColaboradores"
              />
              <v-btn
                color="primary"
                @click="e1 = 2"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="$router.push({ name: 'ListCourse' })">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-flex
              v-if="colaboradores.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchUsers"
                box
                append-icon="search"
                label="Buscador"
                clearable
                hide-details
              />
            </v-flex>
              <v-data-table
                :headers="[
                  { text: '',sortable: false},
                  { text: 'Rut', value: 'rut'},
                  { text: 'Nombre', value: 'primer_nombre'},
                  { text: 'Apellido',value: 'apellido_paterno'},
                  { text: 'Cargo'},
                ]"
                :items="colaboradores"
                :search="searchUsers"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    <v-checkbox v-model="form.colaboradores"  :value="props.item.id"></v-checkbox>
                  </td>
                  <td class="px-3">
                    {{ props.item.rut }}
                  </td>
                  <td class="px-3">
                    {{ props.item.primer_nombre }}
                  </td>
                  <td class="px-3">
                    {{ props.item.apellido_paterno }}
                  </td>
                  <td class="px-3">
                    {{ props.item.cargoActual.nombre}}
                  </td>
                </tr>
              </v-data-table>
              <v-btn v-if="form.colaboradores.length > 0"  large color="success" dark  @click="crear()">Asignar Seleccionados</v-btn>
              <v-btn flat @click="e1 = 1">Cancel</v-btn>
            </v-stepper-content>
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
    return { title: "Asignar curso" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      formErrors: {},
      e1: 0,
      searchUsers: '',
      form: {
        curso_id: '',
        colaboradores: [],
      },
      colaboradores: [],
    };
  },
  computed: {
    ...mapState({
      courses: state => state.courses.courses,
      loadingCourses: state => state.courses.loadingCourses,
    }),
  },
  created() {
    this.getCourses({ interno: 1 });
  },
  methods: {
    ...mapActions({
      getCourses: 'courses/getCourses',
      getCobaradoresDisponibles: 'courses/getCobaradoresDisponibles',
      asignarCurso: 'courses/asignarCurso',
    }),
    getColaboradores() {
      this.getCobaradoresDisponibles({ cursoId: this.form.curso_id })
      .then(response => {
      this.colaboradores = response.data.data;
    });
    },
    crear() {
      this.asignarCurso({
        cursoId: this.form.curso_id,
        data: this.form,
      })
        .then(response => {
          this.$router.push({ name: "ListCourse" });
        })
        .catch(error => {
          this.formErrors = error.response.data.errors || {};
        });

    },
  }
};

</script>
