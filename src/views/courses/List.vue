<template>
  <v-container>
    <template >
      <v-card-title class="white cyan--text headline">
        Mi Perfil
        <v-spacer />
        <v-spacer />
        <Breadcrumbs
        :routes="[
          { name: 'Inicio', to: { name: 'ListCourse' } },
          { name: 'Mi Perfil' },
          { name: 'Datos Generales' }
        ]"
      />
      </v-card-title>

      <br>
      <v-card>
        <v-toolbar color="grey darken-4" dark card>
          <v-toolbar-title>Cursos</v-toolbar-title>
          <v-spacer />
          <v-btn :to="{ name: 'CreateCourse' }" color="success">
            Agregar Curso
          </v-btn>
        </v-toolbar>
        {{courses}}
        <v-container fluid grid-list-lg>
          <v-layout row wrap>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombres', value: 'nombre' },
                  { text: 'Tipo', value: 'tipo' },
                  { text: 'Estado', value: 'estado' },
                  { text: 'Acciones', align: 'center', sortable: false, width: '220' }
                ]"
                :items="courses"
                :search="searchCourses"
                :loading="loadingCourses"
                class="elevation-1"
              >
                <tr slot="items" slot-scope="props">
                  <td class="px-3">
                    {{ props.item.nombre }}
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.tipo === 1"
                      small
                      color="primary"
                      text-color="white"
                    >
                      INTERNO
                    </v-chip>
                    <v-chip v-else-if="props.item.tipo === 0" small>
                      EXTERNO
                    </v-chip>
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.estado === 1"
                      small
                      color="primary"
                      text-color="white"
                    >
                      ACTIVO
                    </v-chip>
                    <v-chip v-else-if="props.item.estado === 0" small>
                      DESACTIVO
                    </v-chip>
                  </td>
                  <td class="text-xs-center px-3">
                    <template>
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
                    </template>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  metaInfo() {
    return { title: "Listado de Cursos" };
  },

  components: {
    Breadcrumbs: () => import("@/components/Breadcrumbs"),
  },

  data() {
    return {
      searchCourses: "",
    };
  },
  created() {
    this.getCourses();
  },
  computed: {
    ...mapState({
      courses: state => state.courses.courses,
      loadingCourses: state => state.courses.loadingCourses,
    }),
  },

  methods: {
    ...mapActions({
      replaceCurrentCourse: 'courses/replaceCurrentCourse',
      getCourses: "courses/getCourses",
      deleteCourse: 'courses/deleteCourse',
      replaceCourses: 'courses/replaceCourses',
    }),
  },
};
</script>
<style scoped>
.list-buttons{
  color:white;
  background: #283848;
  line-height: 1.1;
  text-align: center;
  font-size: 20px;
  padding: 8px 0 0 10px;
  vertical-align: middle;
  width: 230px;
  height: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 5px;
  margin-bottom: 25px;
}
.title-button{
  font-family: inherit;
}
.tab:hover {
    color: white !important;
    background: #44b5ba !important;
  }
</style>
