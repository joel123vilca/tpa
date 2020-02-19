<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Colaborador' },
          { name: 'Listado de cursos' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Cursos Asignados</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'asignarCurso', params: { id: $route.params.id } }"
            color="success"
          >
            Agregar curso
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
                  { text: 'Nombre del curso' },
                  { text: 'Diploma' },
                  { text: 'Acciones'}
                ]"
                :items="cursos"
                :loading="loadingCursos"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.curso_nombre }}
                  </td>
                  <td class="px-3">
                    <v-btn class="ma-0"
                        v-if="!!props.item.diploma_path"
                        small
                        :href="props.item.diploma_path"
                        target="_blank"
                        color="success"
                        text-color="white"
                        >
                      Ver
                    </v-btn>
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn
                        class="ma-0"
                        small
                        icon
                        flat
                        color="error"
                        @click="openModalDeleteCurso(props.item)"
                      >
                        <v-icon small>
                          delete
                        </v-icon>
                      </v-btn>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
      <ModalDeleteCurso />
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
    ModalDeleteCurso: () => import('@/views/admin/ModalDeleteCurso'),
  },

  computed: {
    ...mapState({
      cursos: state => state.colaboradores.cursos,
      loadingCursos: state => state.colaboradores.loadingCursos,
    }),
  },
  created() {
    this.getCursos({ colaboradorId: this.$route.params.id });
  },

  methods: {
    ...mapActions({
      getCursos: 'colaboradores/getCursos',
      replaceShowModalDeleteCurso: 'colaboradores/replaceShowModalDeleteCurso',
      replaceCurrentCurso: 'colaboradores/replaceCurrentCurso',
    }),
    openModalDeleteCurso(curso) {
      this.replaceCurrentCurso({ curso });
      this.replaceShowModalDeleteCurso({ status: true });
    },
  },
};
</script>
