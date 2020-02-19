<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Notificaciones' },
          { name: 'Listado' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-4"
          dark
          card
        >
          <v-toolbar-title>Notificaciones</v-toolbar-title>
          <v-spacer />
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
              v-if="notificaciones.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchNotificacion"
                :disabled="loadingNotificaciones"
                box
                append-icon="search"
                label="Buscar"
                clearable
                hide-details
              />
            </v-flex>
            <v-flex xs12>
              <v-data-table
                :headers="[
                  { text: 'Colaborador', value: 'colaborador.nombre_completo' },
                  { text: 'Mensaje', value: 'mensaje' },
                  { text: 'Tipo', value: 'tipo' },
                  { text: 'Fecha', value: 'updated_at'},
                ]"
                :items="notificaciones"
                :search="searchNotificacion"
                :loading="loadingNotificaciones"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.colaborador.nombre_completo }}
                  </td>
                  <td class="px-3">
                    {{ props.item.mensaje }}
                  </td>
                  <td class="px-3">
                      {{ props.item.tipo }}
                  </td>
                  <td class="px-3">
                      {{ formatDate(props.item.updated_at) }}
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
    return { title: 'Listado de Notificaciones' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
  },

  data() {
    return {
      searchNotificacion: '',
    };
  },

  computed: {
    ...mapState({
      notificaciones: state => state.notificaciones.notificaciones,
      loadingNotificaciones: state => state.notificaciones.loadingNotificaciones,
    })
  },
  created() {
    this.getNotificaciones();
  },

  methods: {
    ...mapActions({
      getNotificaciones: 'notificaciones/getNotificaciones',
    }),
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
  }
}
</script>

