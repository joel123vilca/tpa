<template>
  <NotPermission v-if="!authenticated" />
  <v-container
    v-else
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
      <v-bottom-nav
        color="transparent"
        :value="activeBtn"
      >
        <v-btn :to="{ name: 'editcolaborador', params: { id: $route.params.id } }"  flat color="teal">
          <span>Informacion</span>
          <v-icon>assignment</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'movilidades', params: { id: $route.params.id } }"  flat color="teal">
          <span>Movilidades</span>
          <v-icon>history</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'listacomentario', params: { id: $route.params.id } }" flat  color="teal">
          <span>Hoja de vida</span>
          <v-icon>description</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'ListaCargaFamiliar', params: { id: $route.params.id } }" flat   color="teal">
          <span>Cargas familiares</span>
          <v-icon>supervisor_account</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'ListCursosColaborador', params: { id: $route.params.id } }" flat   color="teal">
          <span>Cursos</span>
          <v-icon>book</v-icon>
        </v-btn>
      </v-bottom-nav>
      <v-card>
        <v-toolbar
          color="white darken-4"
          card
        >
          <v-avatar
            size="45px"
          >
            <img
              v-if="avatar"
              :src='avatar'
              alt="Avatar"
            >
          </v-avatar>
          <v-toolbar-title>{{nombre_completo}}</v-toolbar-title>
        </v-toolbar>
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
                        :to="{ name: 'editCursoAsignado', params: { id: props.item.id } }"
                        small
                        icon
                        flat
                        color="info"
                      >
                        <v-icon small>
                          edit
                        </v-icon>
                      </v-btn>
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
        <center>
        <v-btn color="error" @click="$router.push({name: 'listacolaboradores'})">
          Volver
        </v-btn>
        </center>
      </v-card>
      <ModalDeleteCurso />
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {

  metaInfo() {
    return { title: 'Listado de cursos' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    ModalDeleteCurso: () => import('@/views/admin/ModalDeleteCurso'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      activeBtn: 5,
      avatar: '',
      nombre_completo: '',
    };
  },

  computed: {
    ...mapState({
      cursos: state => state.colaboradores.cursos,
      loadingCursos: state => state.colaboradores.loadingCursos,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
  },
  created() {
    this.getCursos({ colaboradorId: this.$route.params.id });
    this.getColaborador({ colaboradorId: this.$route.params.id }).then(response => {
      const colaboradorInfo = response.data.data;
      this.setForm(colaboradorInfo);
    });
  },

  methods: {
    ...mapActions({
      getCursos: 'colaboradores/getCursos',
      replaceShowModalDeleteCurso: 'colaboradores/replaceShowModalDeleteCurso',
      replaceCurrentCurso: 'colaboradores/replaceCurrentCurso',
      getColaborador: 'colaboradores/getColaborador',
    }),
    setForm(colaborador) {
      this.nombre_completo = colaborador.nombre_completo;
      this.avatar = colaborador.imagen_url;
    },
    openModalDeleteCurso(curso) {
      this.replaceCurrentCurso({ curso });
      this.replaceShowModalDeleteCurso({ status: true });
    },
  },
};
</script>
