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
          { name: 'Listado' },
          { name: 'Encuestas' }
        ]"
      />
    <v-card style="border-radius:10px 10px 0 0;">
        <v-bottom-nav
        color="transparent"
        :value="activeBtn"
      >
        <v-btn  flat color="teal">
          <span>Periodos</span>
          <v-icon>assignment</v-icon>
        </v-btn>
        <v-btn   flat color="teal">
          <span>Encuestas</span>
          <v-icon>history</v-icon>
        </v-btn>
        <v-btn  flat  color="teal">
          <span>Generar Resultados</span>
          <v-icon>description</v-icon>
        </v-btn>
        <v-btn  flat   color="teal">
          <span>Resultados</span>
          <v-icon>supervisor_account</v-icon>
        </v-btn>
      </v-bottom-nav>
      <br>
        <v-toolbar
          color="grey darken-1"
          dark
          card
        >
          <v-toolbar-title>Listado de Encuestas</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearEncuesta'}"
            color="primary"
          >
            Agregar encuesta
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
                  { text: 'Periodo' },
                  { text: 'Id encuesta facil' },
                  { text: 'fecha inicio' },
                  { text: 'fecha fin'},
                  { text: 'Acciones'}
                ]"
                :items="encuestas"
                :loading="loadingEncuestas"
                :rows-per-page-items="[10,25,35,50]"
                class="elevation-1"
              >
                <tr
                  slot="items"
                  slot-scope="props"
                >
                  <td class="px-3">
                    {{ props.item.periodo.nombre }}
                  </td>
                  <td class="px-3">
                    {{ props.item.encuesta_facil_id }}
                  </td>
                  <td class="px-3">
                    {{ props.item.fecha_inicio }}
                  </td>
                  <td class="px-3">
                    {{ props.item.fecha_fin }}
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn
                        class="ma-0"
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
        </center>
      </v-card>
      <ModalDelete />
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {

  metaInfo() {
    return { title: 'Listado de periodos' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      activeBtn: 5,
    };
  },

  computed: {
    ...mapState({
      encuestas: state => state.encuestas.encuestas,
      loadingEncuestas: state => state.encuestas.loadingEncuestas,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
    this.getEncuestas();
  },

  methods: {
    ...mapActions({
      getEncuestas: 'encuestas/getEncuestas',
    }),
  },
};
</script>
