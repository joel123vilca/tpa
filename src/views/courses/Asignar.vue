<template>
  <v-container fluid grid-list-lg>
    <NotPermission v-if="!authenticated" />
    <template v-else>
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
                :disabled='!form.curso_id'
                color="primary"
                @click="e1 = 2"
              >
                Continuar
              </v-btn>
              <v-btn flat @click="$router.push({ name: 'ListCourse' })">Cancelar</v-btn>
            </v-stepper-content>
            <v-stepper-content step="2">
              <v-card>
  <v-card-title>
      Colaboradores
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Buscador"
        single-line
        hide-details
        box
      ></v-text-field>
    </v-card-title>
  <v-data-table
    v-model="selected"
    :headers="headers"
    :items="colaboradoresDisponibles"
    :search="search"
    :rows-per-page-items="[10,25,35,50]"
    item-key="id"
    select-all
    class="elevation-1"
  >
    <template v-slot:items="props">
      <td>
        <v-checkbox
          v-model="props.selected"
          primary
          hide-details
        ></v-checkbox>
      </td>
      <td>{{ props.item.rut }}</td>
      <td>{{ props.item.primer_nombre}}</td>
      <td>{{ props.item.apellido_paterno }}</td>
      <td>{{ props.item.cargoActual.nombre}}</td>
    </template>
  </v-data-table>
  </v-card>
              <v-btn v-if="selected.length > 0"  large color="success" dark  @click="crear()" :loading="loading">Asignar Seleccionados</v-btn>
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
import { mapState, mapActions, mapGetters } from "vuex";

export default {
  metaInfo() {
    return { title: "Asignar curso" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      selected: [],
      search: '',
      headers: [
        {
          text: 'Rut',
          align: 'left',
          sortable: false,
          value: 'rut',
        },
        { text: 'Nombre', value: 'primer_nombre' },
        { text: 'Apellido', value: 'apellido_paterno' },
        { text: 'Cargo', value: 'cargoActual.nombre' },
      ],
      formErrors: {},
      e1: 0,
      searchUsers: '',
      loading: false,
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
      colaboradoresDisponibles: state => state.courses.colaboradoresDisponibles,
      loadingColaboradoresDisponibles: state => state.courses.loadingColaboradoresDisponibles
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
    this.getCourses({ interno: 0 });
  },
  methods: {
    ...mapActions({
      getCourses: 'courses/getCourses',
      getColaboradoresDisponibles: 'courses/getColaboradoresDisponibles',
      asignarCurso: 'courses/asignarCurso',
    }),
    getColaboradores() {
      this.getColaboradoresDisponibles({ cursoId: this.form.curso_id })
    },
    crear() {
      this.loading = true;
      this.form.colaboradores = this.selected.map(function(item) {return item.id});
      this.asignarCurso({
        cursoId: this.form.curso_id,
        data: this.form,
      })
        .then(response => {
          this.loading = false;
          this.$router.push({ name: "ListCourse" });
        })
        .catch(error => {
          this.formErrors = error.response.data.errors || {};
        });

    },
  }
};

</script>
