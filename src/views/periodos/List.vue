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
          { name: 'Periodos' }
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
          <v-toolbar-title>Listado de Periodos</v-toolbar-title>
          <v-spacer />
          <v-btn
            :to="{ name: 'crearPeriodo'}"
            color="primary"
          >
            Agregar periodo
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
                  { text: 'Nombre' },
                  { text: 'Año' },
                  { text: 'detalle' },
                  { text: 'Platilla'},
                  { text: 'Acciones'}
                ]"
                :items="periodos"
                :rows-per-page-items="[10,25,35,50]"
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
                    {{ props.item.year }}
                  </td>
                  <td class="px-3">
                    {{ props.item.detalle }}
                  </td>
                  <td class="px-3">
                    {{ props.item.encuestaPlantilla.nombre }}
                  </td>
                  <td class="text-xs-center px-3">
                    <v-btn
                        class="ma-0"
                        small
                        flat
                        :to="{ name: 'periodoEncuestas', params: { id: props.item.id } }"
                        color="info"
                      >
                      encuestas
                      </v-btn>
                    <v-btn
                        class="ma-0"
                        small
                        icon
                        flat
                        :to="{ name: 'editPeriodo', params: { id: props.item.id } }"
                        color="info"
                      >
                        <v-icon small>
                          edit
                        </v-icon>
                      </v-btn>
                    <v-btn
                      v-if="props.item.encuestas != true"
                        class="ma-0"
                        small
                        icon
                        flat
                        color="error"
                        @click="openModalDelete(props.item)"
                      >
                        <v-icon small>
                          delete
                        </v-icon>
                      </v-btn>
                      <v-tooltip bottom v-else>
                        <template v-slot:activator="{ on }">
                          <v-btn 
                            small
                            icon
                            flat
                            color="error" 
                            dark
                            v-on="on">
                            <v-icon small>
                              delete
                            </v-icon>
                          </v-btn>
                        </template>
                        <span>Tiene encuesta relacionada</span>
                      </v-tooltip>
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
    ModalDelete: () => import('@/views/periodos/Delete'),
    NotPermission: () => import('@/views/errors/NotPermission')
  },

  data() {
    return {
      activeBtn: 5,
    };
  },

  computed: {
    ...mapState({
      periodos: state => state.periodos.periodos,
      loadingPeriodos: state => state.periodos.loadingPeriodos,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
    this.getPeriodos();
  },

  methods: {
    ...mapActions({
      getPeriodos: 'periodos/getPeriodos',
      replaceShowModalDeletePeriodo: 'periodos/replaceShowModalDeletePeriodo',
      replaceCurrentPeriodo: 'periodos/replaceCurrentPeriodo',
    }),
    openModalDelete(periodo) {
      this.replaceCurrentPeriodo({ periodo });
      this.replaceShowModalDeletePeriodo({ status: true });
    },
  },
};
</script>
