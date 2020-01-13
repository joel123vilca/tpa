<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Tags' },
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
            :to="{ name: 'sgcUsersCreate' }"
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
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Nombre'},
                  { text: 'Tipo' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="courses"
                :loading="loadingCourses"
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
                  </td>
                  <td class="px-3">
                  </td>
                  <td class="text-xs-center px-3">
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
import { mapState, mapActions } from 'vuex'

export default {

  metaInfo () {
    return { title: 'Listado de cursos' }
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs')
  },

  data () {
    return {
    }
  },

  computed: {
    ...mapState({
      courses: state => state.courses.courses,
      loadingCourses: state => state.courses.loadingCourses,
    })
  },
  created () {
    this.getCourses();
  },

  methods: {
    ...mapActions({
      getCourses: 'courses/getCourses',
    }),
  }
}
</script>
