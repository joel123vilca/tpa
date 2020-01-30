<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Administradores' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Administradores</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'creaAdministrador' }"
            color="success"
          >
            Agregar Administrador
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
                  { text: 'Username', value: 'username' },
                  { text: 'Nombre' },
                  { text: 'Estado' },
                  { text: 'Acciones'}
                ]"
                :items="administradores"
                :loading="loadingAdministradores"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.username }}
                  </td>
                  <td class="px-3">
                    {{ props.item.nombre }}
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
                        :to="{ name: 'editAdministrador', params: { id: props.item.id } }"
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
    return { title: 'Listado de administradores' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
  },

  computed: {
    ...mapState({
      administradores: state => state.administradores.administradores,
      loadingAdministradores: state => state.administradores.loadingAdministradores,
    }),
  },
  created() {
    this.getAdministradores();
  },

  methods: {
    ...mapActions({
      getAdministradores: 'administradores/getAdministradores',
    }),
  },
};
</script>
