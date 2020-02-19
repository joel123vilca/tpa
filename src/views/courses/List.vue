<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Areas' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Cursos</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearCurso' }"
            color="success"
          >
            Agregar Curso
          </v-btn>
        </v-toolbar>
        <v-container
          fluid
          grid-list-lg
        >
          <v-layout
            row
            wrap
          >
            <v-flex
              v-if="courses.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchCursos"
                :disabled="loadingCourses"
                box
                append-icon="search"
                label="Buscar Curso"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombre', value: 'nombre'},
                  { text: 'Categoría', value: 'tipoCurso.cartegoria' },
                  { text: 'Tipo', value: 'interno' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="courses"
                :loading="loadingCourses"
                :search="searchCursos"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.nombre }}
                  </td>
                  <td class="px-3">
                    {{ props.item.tipoCurso.categoria }}
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.interno === 1"
                      small
                      color="teal"
                      text-color="white"
                    >
                      Interno
                    </v-chip>
                    <v-chip v-else-if="props.item.interno === 0" small>
                      Externo
                    </v-chip>
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.estado === 1"
                      small
                      color="primary"
                      text-color="white"
                    >
                      Activo
                    </v-chip>
                    <v-chip v-else-if="props.item.estado === 0" small>
                      Inactivo
                    </v-chip>
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn
                        class="ma-0"
                        :to="{ name: 'courseEdit', params: { id: props.item.id } }"
                        small
                        icon
                        flat
                        color="info"
                      >
                        <v-icon small>
                          edit
                        </v-icon>
                      </v-btn>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {

  metaInfo() {
    return { title: 'Listado de cursos' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
  },

  data() {
    return {
      searchCursos: '',
    };
  },

  computed: {
    ...mapState({
      courses: state => state.courses.courses,
      loadingCourses: state => state.courses.loadingCourses,
    })
  },
  created() {
    this.getCourses({ interno: 0 });
  },

  methods: {
    ...mapActions({
      getCourses: 'courses/getCourses',
      replaceCurrentCourse: 'courses/replaceCurrentCourse',
      deleteCourse: 'courses/deleteCourse',
      replaceCourses: 'courses/replaceCourses',
    }),
  }
}
</script>
