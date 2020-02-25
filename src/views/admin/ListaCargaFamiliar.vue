<template>
  <NotPermission v-if="!authenticated" />
  <v-container
    v-else
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio', to:{ name: 'listacolaboradores' }},
          { name: 'Carga Familiar' },
          { name: 'Listado' }
        ]"
      />
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
          <v-toolbar-title>lista de Carga Familiar</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'agregarCargaFamiliar', params: { id: this.$route.params.id  } }"
            color="success"
          >
            Agregar Carga Familiar
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
                  { text: 'Nombres', value: 'nombres' },
                  { text: 'Apellidos' },
                  { text: 'Tipo Carga' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="cargaFamiliar"
                :loading="loadingCargaFamiliar"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.nombres }}
                  </td>
                  <td class="px-3">
                    {{ props.item.apellidos }}
                  </td>
                  <td>
                    {{ props.item.tipoCarga.tipo }}
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
                        :to="{ name: 'EditarCargaFamiliar', params: { id: props.item.id } }"
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
import { mapState, mapActions, mapGetters } from 'vuex'

export default {

  metaInfo() {
    return { title: 'Listado de tags' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      avatar: '',
      nombre_completo: '',
    };
  },

  computed: {
    ...mapState({
      cargaFamiliar: state => state.colaboradores.cargaFamiliar,
      loadingCargaFamiliar: state => state.colaboradores.loadingCargaFamiliar,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
  },
  created() {
    this.getFamily({ colaboradorId: this.$route.params.id });
    this.getColaborador({ colaboradorId: this.$route.params.id }).then(response => {
      const colaboradorInfo = response.data.data;
      this.setForm(colaboradorInfo);
    });
  },

  methods: {
    ...mapActions({
      getFamily: 'colaboradores/getFamily',
      getColaborador: 'colaboradores/getColaborador',
    }),
    setForm(colaborador) {
      this.nombre_completo = colaborador.nombre_completo;
      this.avatar = colaborador.imagen_url;
    },
  },
};
</script>
