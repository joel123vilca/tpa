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
          { name: 'Movilidades' },
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
          <v-toolbar-title>Lista de Movilidades</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearmovilidad', params: { id: this.$route.params.id  } }"
            color="success"
          >
            Agregar Movilidad
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
                  { text: 'Cargo', value: 'cargo'},
                  { text: 'Fecha Inicio',value: 'fecha_inicio' },
                  { text: 'Fecha Final',value: 'fecha_final' },
                  { text: 'Tipo de movilidad',value: 'tipo' },
                  { text: 'Acciones', value: ''}
                ]"
                :items="movilidades"
                :loading="loadingMovilidades"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td v-if="props.item.cargo_nombre != ''" class="px-3">
                    {{ props.item.cargo_nombre }}
                  </td>
                  <td v-else class="px-3">
                    Sin Cargo
                  </td>
                  <td class="px-3">
                    {{ formatDate(props.item.fecha_inicio)}}
                  </td>
                  <td>
                    {{ formatDate(props.item.fecha_termino) }}
                  </td>
                  <td>
                    {{ props.item.tipoMovilidad.tipo }}
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn
                        class="ma-0"
                        :to="{ name: 'editMovilidad', params: { id: props.item.id } }"
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
                        @click="openModalDeleteMovilidad(props.item)"
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
      <ModalDeleteMovilidad />
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {

  metaInfo() {
    return { title: 'Listado de Movilidades' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    ModalDeleteMovilidad: () => import('@/views/admin/ModalDeleteMovilidad'),
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
      movilidades: state => state.colaboradores.movilidades,
      loadingMovilidades: state => state.colaboradores.loadingMovilidades,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
      user: 'auth/user',
    }),
  },
  created() {
    this.getMovilidad({ colaboradorId: this.$route.params.id });
    this.getColaborador({ colaboradorId: this.$route.params.id }).then(response => {
      const colaboradorInfo = response.data.data;
      this.setForm(colaboradorInfo);
    });
  },

  methods: {
    ...mapActions({
      getMovilidad: 'colaboradores/getMovilidad',
      replaceShowModalDeleteMovilidad: 'colaboradores/replaceShowModalDeleteMovilidad',
      replaceCurrentMovilidad: 'colaboradores/replaceCurrentMovilidad',
      getColaborador: 'colaboradores/getColaborador',
    }),
    setForm(colaborador) {
      this.nombre_completo = colaborador.nombre_completo;
      this.avatar = colaborador.imagen_url;
    },
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${year}`
    },
    openModalDeleteMovilidad(movilidad) {
      this.replaceCurrentMovilidad({ movilidad });
      this.replaceShowModalDeleteMovilidad({ status: true });
    },
  },
};
</script>
