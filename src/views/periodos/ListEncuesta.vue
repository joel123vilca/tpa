<template>
  <NotPermission v-if="!authenticated" />
  <v-container v-else fluid grid-list-lg>
    <Breadcrumbs
      :routes="[
          { name: 'Inicio'},
          { name: 'Listado' },
          { name: 'Periodos Encuestas' }
        ]"
    />
    <v-card style="border-radius:10px 10px 0 0;">
      <v-toolbar card style="border-radius:10px 10px 0 0;" color="primary" dark>
        <v-toolbar-title>{{nombre}}</v-toolbar-title>
      </v-toolbar>
      <br />
      <v-toolbar color="grey darken-1" dark card>
        <v-toolbar-title>Listado de Encuestas</v-toolbar-title>
        <v-spacer />
        <v-btn
          :to="{ name: 'crearEncuesta', params: { id: $route.params.id }}"
          color="primary"
        >Agregar encuesta</v-btn>
      </v-toolbar>
      <v-container fluid grid-list-lg>
        <v-layout row wrap>
          <v-flex xs12>
            <v-data-table
              :headers="[
                  { text: 'Nombre' },
                  { text: 'Encuesta Facil' },
                  { text: 'Fecha inicio' },
                  { text: 'Fecha Fin'},
                  { text: 'Colaboradores'},
                  { text: 'Acciones'}
                ]"
              :items="periodoEncuestas"
              :loading="loadingPeriodoEncuestas"
              :rows-per-page-items="[10,25,35,50]"
              class="elevation-1"
            >
              <tr slot="items" slot-scope="props">
                <td class="px-3">{{ props.item.nombre }}</td>
                <td class="px-3">{{ props.item.encuesta_facil_id }}</td>
                <td class="px-3">{{ formatDate(props.item.fecha_inicio) }}</td>
                <td class="px-3">{{ formatDate(props.item.fecha_fin) }}</td>
                <td class="text-xs-center px-3">
                  <v-btn
                    class="ma-0"
                    small
                    flat
                    :to="{ name: 'encuestaAsignados', params: { id: props.item.id } }"
                    color="info"
                  >colaboradores</v-btn>
                </td>
                <td>
                  <v-btn
                    class="ma-0"
                    small
                    icon
                    flat
                    :to="{ name: 'encuestaEditar', params: { id: props.item.id } }"
                    color="info"
                  >
                    <v-icon small>edit</v-icon>
                  </v-btn>
                  <v-btn
                    v-if="props.item.colaboradoresAsignados != true"
                    class="ma-0"
                    small
                    icon
                    flat
                    color="error"
                    @click="openModalDelete(props.item)"
                  >
                    <v-icon small>delete</v-icon>
                  </v-btn>
                  <v-tooltip bottom v-else>
                    <template v-slot:activator="{ on }">
                      <v-btn small icon flat color="error" class="ma-0" dark v-on="on">
                        <v-icon small>delete</v-icon>
                      </v-btn>
                    </template>
                    <span>Tiene colaboradores asignados</span>
                  </v-tooltip>
                </td>
              </tr>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
      <center>
        <v-btn color="error" @click="$router.push({name: 'listaPeriodo'})">Volver</v-btn>
      </center>
    </v-card>
    <ModalDeleteEncuesta />
  </v-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {

  metaInfo() {
    return { title: 'Listado de periodos-encuestas' };
  },

  components: {
    Breadcrumbs: () => import('@/components/Breadcrumbs'),
    NotPermission: () => import('@/views/errors/NotPermission'),
    ModalDeleteEncuesta: () => import('@/views/periodos/ModalDeleteEncuesta'),
  },

  data() {
    return {
      activeBtn: 5,
      nombre:''
    };
  },

  computed: {
    ...mapState({
      periodoEncuestas: state => state.periodos.periodoEncuestas,
      loadingPeriodoEncuestas: state => state.periodos.loadingPeriodoEncuestas,
    }),
    ...mapGetters({
      authenticated: 'auth/check',
    }),
  },
  created() {
    this.getPeriodoEncuestas({ periodoId: this.$route.params.id });
    this.getPeriodo({ periodoId: this.$route.params.id }).then(response => {
      const periodo = response.data.data;
      this.setForm(periodo);
    });
  },

  methods: {
    ...mapActions({
      getPeriodoEncuestas: 'periodos/getPeriodoEncuestas',
      getPeriodo: "periodos/getPeriodo",
      replaceShowModalDeleteEncuesta: 'encuestas/replaceShowModalDeleteEncuesta',
      replaceCurrentEncuesta: 'encuestas/replaceCurrentEncuesta',
    }),
    setForm(periodo) {
      this.nombre = periodo.nombre;
    },
    openModalDelete(encuesta) {
      this.replaceCurrentEncuesta({ encuesta });
      this.replaceShowModalDeleteEncuesta({ status: true });
    },
    formatDate(date) {
      if (!date) return null;
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    },
  },
};
</script>
