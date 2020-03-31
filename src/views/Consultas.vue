<template>
  <v-container
    fluid
    grid-list-lg
  >
      <Breadcrumbs
        :routes="[
          { name: 'Inicio'},
          { name: 'Consultas' }
        ]"
      />
      <v-card>
        <v-toolbar
          color="grey darken-1"
          dark
          card
          style="border-radius:10px;"
        >
          <v-toolbar-title>Consultas</v-toolbar-title>
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
              v-if="consultas.length"
              sm6
              offset-sm6
            >
              <v-text-field
                v-model="searchConsultas"
                :disabled="loadingConsultas"
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
                  { text: 'Tipo', value: 'tipoConsulta.tipo' },
                  { text: 'Leido', value: 'leido' },
                  { text: 'Accion' },
                ]"
                :items="consultas"
                :search="searchConsultas"
                :loading="loadingConsultas"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    <a @click="$router.push({ name: 'editcolaborador', params: { id: props.item.colaborador.id } })">
                    {{ props.item.colaborador.nombre_completo }}
                    </a>
                  </td>
                  <td class="px-3">
                    {{ props.item.tipoConsulta.tipo }}
                  </td>
                  <td class="px-3">
                    <v-chip
                      v-if="props.item.leido === 1"
                      class="ma-2"
                      color="primary"
                      dark
                      small
                    >
                      Si
                    </v-chip>
                    <v-chip
                      v-else
                      class="ma-2"
                      color="error"
                      dark
                      small
                    >
                      No
                    </v-chip>
                  </td>
                  <td>
                    <v-btn
                        class="ma-0"
                        small
                        color="success"
                        @click="openModalVerConsultas(props.item)"
                    >
                        ver
                    </v-btn>
                  </td>
                </tr>
              </v-data-table>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    <ModalVerConsultas />
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
    ModalVerConsultas: () => import('@/views/ModalVerConsultas')
  },

  data() {
    return {
      searchConsultas: '',
    };
  },

  computed: {
    ...mapState({
      consultas: state => state.consultas.consultas,
      loadingConsultas: state => state.consultas.loadingConsultas,
    }),
  },
  created() {
    this.getConsultas();
  },

  methods: {
    ...mapActions({
      getConsultas: 'consultas/getConsultas',
      replaceShowModalVerConsultas: 'consultas/replaceShowModalVerConsultas',
      replaceCurrentConsulta: 'consultas/replaceCurrentConsulta',
      patchConsulta: 'consultas/patchConsulta',
    }),
    openModalVerConsultas(consulta) {
      this.replaceCurrentConsulta({ consulta });
      this.patchConsulta({ consultaId: consulta.id, data: { leido: 1 } });
      this.getConsultas();
      this.replaceShowModalVerConsultas({ status: true });
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
