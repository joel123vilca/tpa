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
          { name: 'Listado de comentarios' }
        ]"
      />
       <v-card style="border-radius:10px 10px 0 0;">
        <v-toolbar
          card
          style="border-radius:10px 10px 0 0;"
          color="primary"
          dark
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
        <v-bottom-nav
        :active.sync="activeBtn"
        color="transparent"
        :value="true"
      >
        <v-btn :to="{ name: 'editcolaborador', params: { id: $route.params.id } }" flat  color="teal">
          <span>Informacion</span>
          <v-icon>assignment</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'movilidades', params: { id: $route.params.id } }" flat color="teal">
          <span>Movilidades</span>
          <v-icon>history</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'listacomentario', params: { id: $route.params.id } }" flat  color="teal">
          <span>Hoja de vida</span>
          <v-icon>description</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'ListaCargaFamiliar', params: { id: $route.params.id } }" flat  color="teal">
          <span>Cargas familiares</span>
          <v-icon>supervisor_account</v-icon>
        </v-btn>
        <v-btn :to="{ name: 'ListCursosColaborador', params: { id: $route.params.id } }" flat  color="teal">
          <span>Cursos</span>
          <v-icon>book</v-icon>
        </v-btn>
      </v-bottom-nav>
      <br>
        <v-toolbar
          color="grey darken-1"
          dark
          card
        >
          <v-toolbar-title>Listado de Comentarios</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearcomentario', params: { id: $route.params.id } }"
            color="primary"
          >
            Agregar Comentario
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
                  { text: 'Tipo', value: 'tipoComentario.tipo' },
                  { text: 'Autor' },
                  { text: 'Fecha', value: 'fecha' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="comentarios"
                :loading="loadingComentarios"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.tipoComentario.tipo }}
                  </td>
                   <td class="px-3">
                    {{ props.item.autor.primer_nombre }} {{ props.item.autor.apellido_paterno }}
                  </td>
                  <td class="px-3">
                    {{ formatDate(props.item.fecha) }}
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
                        :to="{ name: 'editcomentario', params: { id: props.item.id } }"
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
        <center>
        <v-btn color="error" @click="$router.push({name: 'listacolaboradores'})">
          Volver
        </v-btn>
        </center>
      </v-card>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {

  metaInfo() {
    return { title: 'Listado de comentarios' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },
  data() {
    return {
      activeBtn: 2,
      avatar: '',
      nombre_completo: '',
    };
  },

  computed: {
    ...mapState({
      comentarios: state => state.comentarios.comentarios,
      loadingComentarios: state => state.comentarios.loadingComentarios,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
  },
  created() {
    this.getComentarios({ colaboradorId: this.$route.params.id });
    this.getColaborador({ colaboradorId: this.$route.params.id }).then(response => {
      const colaboradorInfo = response.data.data;
      this.setForm(colaboradorInfo);
    });
  },

  methods: {
    ...mapActions({
      getComentarios: 'comentarios/getComentarios',
      replaceCurrentComentario: 'comentarios/replaceCurrentComentario',
      deleteComentario: 'comentarios/deleteComentario',
      replaceComentarios: 'comentarios/replaceComentarios',
      getColaborador: 'colaboradores/getColaborador',
    }),
    setForm(colaborador) {
      this.nombre_completo = colaborador.nombre_completo;
      this.avatar = colaborador.imagen_url;
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
